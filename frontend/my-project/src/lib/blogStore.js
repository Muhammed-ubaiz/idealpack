import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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
 * page are stored in the Firestore `blogs` collection with the same fields,
 * and `useBlogs()` merges both lists (newest first) for the public pages.
 * If Firebase is not configured or unreachable, the static list is used.
 */
const blogsCol = collection(db, 'blogs')

export async function fetchRemoteBlogs() {
  if (!isFirebaseConfigured) return []
  const snap = await getDocs(query(blogsCol, orderBy('date', 'desc')))
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

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

function mergeBlogs(remote) {
  const remoteSlugs = new Set(remote.map((b) => b.slug))
  return [...remote, ...staticBlogs.filter((b) => !remoteSlugs.has(b.slug))].sort((a, b) =>
    b.date.localeCompare(a.date),
  )
}

// Cached across page navigations so the blog list doesn't refetch every time.
let cache = null

/** All blogs (Firestore + built-in). `loading` is true until Firestore answers. */
export function useBlogs() {
  const [state, setState] = useState(() => ({
    blogs: cache || mergeBlogs([]),
    loading: !cache,
  }))

  useEffect(() => {
    if (cache) return
    let active = true
    fetchRemoteBlogs()
      .then((remote) => {
        cache = mergeBlogs(remote)
        if (active) setState({ blogs: cache, loading: false })
      })
      .catch((err) => {
        if (import.meta.env.DEV) console.warn('[blogs] Firestore unavailable:', err.message)
        if (active) setState((s) => ({ ...s, loading: false }))
      })
    return () => {
      active = false
    }
  }, [])

  return state
}

/** Drop the cached list so the public pages pick up admin changes. */
export function invalidateBlogs() {
  cache = null
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
