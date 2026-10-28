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
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../config/firebase'
import { blogs as staticBlogs } from '../data/blogs'

/**
 * Blog storage for admin-added articles.
 *
 * Built-in articles live in ../data/blogs.js. Articles added from the admin
 * page are stored in the Firestore `blogs` collection with the same fields
 * plus a `createdAt` server timestamp. A live `onSnapshot` listener keeps
 * every page in sync, so new or deleted posts show up without a refresh.
 * If Firebase is not configured or unreachable, the static list is used.
 */
const blogsCol = collection(db, 'blogs')

export function addBlog(blog) {
  return addDoc(blogsCol, { ...blog, createdAt: serverTimestamp() })
}

export function deleteBlog(id) {
  return deleteDoc(doc(db, 'blogs', id))
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

/**
 * Sort key: when the post was created. Built-in articles (and any document
 * without a timestamp) fall back to their article date.
 */
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

function mergeBlogs(remote) {
  const remoteSlugs = new Set(remote.map((b) => b.slug))
  return [...remote, ...staticBlogs.filter((b) => !remoteSlugs.has(b.slug))].sort(byNewest)
}

// One shared Firestore listener for all public pages, open while any page uses it.
let shared = { blogs: mergeBlogs([]), loading: true }
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
      (remote) => emit({ blogs: mergeBlogs(remote), loading: false }),
      (err) => {
        if (import.meta.env.DEV) console.warn('[blogs] Firestore unavailable:', err.message)
        emit({ ...shared, loading: false })
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

/** All blogs (Firestore + built-in), newest first, updated live. */
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
