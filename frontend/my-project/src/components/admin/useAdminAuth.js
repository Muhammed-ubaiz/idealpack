import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'

/**
 * Current Firebase user: `undefined` while Firebase is still checking the
 * session, `null` when signed out (or Firebase is not configured).
 */
export default function useAdminAuth() {
  const [user, setUser] = useState(() => (auth ? auth.currentUser || undefined : null))

  useEffect(() => (auth ? onAuthStateChanged(auth, (u) => setUser(u)) : undefined), [])

  return user
}
