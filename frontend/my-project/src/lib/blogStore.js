import { useSyncExternalStore } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../config/firebase'

/**
 * Blog storage. Every article lives in the Firestore `blogs` collection and is
 * managed from the admin page. Each document has the article fields plus a
 * `createdAt` server timestamp. A live `onSnapshot` listener keeps every page
 * in sync, so new, edited or deleted posts show up without a refresh.
 *
 * Article fields:
 *   slug, title, category, date (YYYY-MM-DD), image, excerpt, featured, shopUrl
 *   intro          - what the product / category is
 *   benefits[]     - main benefits
 *   uses[]         - recommended uses
 *   businesses[]   - suitable businesses
 *   practical      - why it is practical
 *   tip            - useful tip callout
 *   relatedOptions - related Ideal Pack packaging options (prose)
 *   relatedProducts[] - {name, image, url} from the store
 */
const blogsCol = collection(db, 'blogs')

export function addBlog(blog) {
  return addDoc(blogsCol, { ...blog, createdAt: serverTimestamp() })
}

/** Update an existing post. `createdAt` is left untouched so its position stays the same. */
export function updateBlog(id, blog) {
  return updateDoc(doc(db, 'blogs', id), { ...blog, updatedAt: serverTimestamp() })
}

export function deleteBlog(id) {
  return deleteDoc(doc(db, 'blogs', id))
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Lower-case, hyphenated URL slug from a title. */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Sort key: when the post was created, falling back to the article date. */
const createdMillis = (b) => b.createdAt?.toMillis?.() ?? (Date.parse(b.date) || 0)

/** Newest first. */
export const byNewest = (a, b) => createdMillis(b) - createdMillis(a)

/**
 * Live list of Firestore blogs, newest first. Calls `onChange` immediately
 * after a local add/delete (Firestore applies pending writes locally, with an
 * estimated `createdAt`) and again whenever the collection changes.
 * Returns the unsubscribe function.
 */
export function subscribeBlogs(onChange, onError) {
  if (!isFirebaseConfigured) {
    onChange([])
    return () => {}
  }
  return onSnapshot(
    query(blogsCol, orderBy('createdAt', 'desc')),
    (snap) => {
      const posts = snap.docs.map((d) => ({
        ...d.data({ serverTimestamps: 'estimate' }),
        id: d.id,
      }))
      onChange(posts.sort(byNewest))
    },
    onError,
  )
}

// One shared Firestore listener for all public pages, open while any page uses it.
let shared = { blogs: [], loading: true, error: null }
const listeners = new Set()
let unsubscribe = null

function emit(next) {
  shared = next
  listeners.forEach((fn) => fn())
}

function subscribeShared(onStoreChange) {
  listeners.add(onStoreChange)
  if (!unsubscribe) {
    unsubscribe = subscribeBlogs(
      (blogs) => emit({ blogs, loading: false, error: null }),
      (err) => {
        if (import.meta.env.DEV) console.warn('[blogs] Firestore unavailable:', err.message)
        emit({ ...shared, loading: false, error: err })
      },
    )
  }
  return () => {
    listeners.delete(onStoreChange)
    if (listeners.size === 0 && unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }
}

/** All blogs from Firestore, newest first, updated live: `{ blogs, loading, error }`. */
export function useBlogs() {
  return useSyncExternalStore(subscribeShared, () => shared)
}

/**
 * Resize an image file in the browser and return a JPEG data URL. Images are
 * stored inline in the Firestore document, so this keeps each one well under
 * Firestore's 1 MB document limit without needing Firebase Storage.
 */
export function imageFileToDataUrl(file, maxWidth = 1400, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read this image file.'))
    }
    img.src = url
  })
}
