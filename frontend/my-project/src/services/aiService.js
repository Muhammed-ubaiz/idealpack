/**
 * Frontend client for the Ideal Pack AI assistant.
 *
 * All AI calls go through our own backend (`POST /api/chat`) so the LLM API
 * key stays server-side. In dev, Vite proxies `/api` to the local server
 * (see vite.config.js). In prod, set `VITE_AI_API_URL` to the deployed API
 * URL — that is a plain URL, never a secret key.
 */

const API_URL = import.meta.env.VITE_AI_API_URL || '/api/chat'

export const MAX_MESSAGE_LENGTH = 2000

/** Routes the assistant is allowed to navigate to. Mirrors the server whitelist. */
export const ALLOWED_ROUTES = ['/', '/about', '/products', '/services', '/blogs', '/contact']

const PRODUCT_CATEGORIES = [
  'kraft-packaging',
  'foil-containers',
  'food-containers',
  'tissues-napkins',
  'cling-film-bags',
  'hygiene-solutions',
]

export const AI_FALLBACK_REPLY =
  "Sorry, I'm having trouble connecting right now. You can still browse our products or contact our team."

/**
 * Validate a navigation path against the internal whitelist.
 * Returns a safe path string, or null if it is not allowed.
 * Never trust a raw path from the model.
 */
export function resolveSafePath(path) {
  if (typeof path !== 'string') return null
  const value = path.trim()
  if (!value.startsWith('/') || value.startsWith('//')) return null

  const [pathname, query = ''] = value.split('?')
  if (!ALLOWED_ROUTES.includes(pathname)) return null

  if (query) {
    const category = new URLSearchParams(query).get('category')
    if (pathname === '/products' && category && PRODUCT_CATEGORIES.includes(category)) {
      return `/products?category=${category}`
    }
    return pathname
  }
  return pathname
}

/**
 * Send a chat message to the backend.
 *
 * @param {string} message
 * @param {{role: 'user'|'assistant', content: string}[]} [history]
 * @returns {Promise<{ reply: string, action: {type:'navigate', path:string} | null }>}
 *
 * Never throws — on any failure it resolves to a safe fallback reply.
 */
export async function sendChatMessage(message, history = []) {
  const trimmed = String(message || '').trim().slice(0, MAX_MESSAGE_LENGTH)
  if (!trimmed) return { reply: AI_FALLBACK_REPLY, action: null }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, history }),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      // Surface the real problem in the console; users still get the fallback.
      console.error('AI Chat Error:', res.status, res.statusText, data)
    }

    // The server returns a fallback reply even on 502, so use whatever it gave.
    const reply =
      typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : AI_FALLBACK_REPLY

    const action =
      data.action && data.action.type === 'navigate'
        ? { type: 'navigate', path: resolveSafePath(data.action.path) }
        : null

    return { reply, action: action && action.path ? action : null }
  } catch (error) {
    // Network / proxy / CORS / timeout — log the real cause for debugging.
    console.error(
      'AI Chat Error:',
      error,
      `\n→ Could not reach ${API_URL}. Is the AI server running? (cd server && npm install && npm run dev)`,
    )
    return { reply: AI_FALLBACK_REPLY, action: null }
  }
}
