// Firebase initialization for the app.
//
// Credentials are read from Vite env vars (VITE_FIREBASE_*), never hardcoded.
// Set them in `.env` (see `.env.example`). Vite exposes only vars prefixed
// with `VITE_` to client code via `import.meta.env`.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Helpful during setup: warn (dev only) if the config was not filled in.
if (import.meta.env.DEV) {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)
  if (missing.length) {
    console.warn(
      `[firebase] Missing env values: ${missing.join(', ')}. ` +
        'Add them to your .env file (see .env.example).',
    )
  }
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
