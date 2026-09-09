import express from 'express'

const router = express.Router()

/* ──────────────────────────────────────────────────────────────────────────
 * Website knowledge + safety config
 * ────────────────────────────────────────────────────────────────────────── */

// Only these internal routes may ever be returned as a navigation action.
// Anything else the model produces is dropped.
const ALLOWED_ROUTES = new Set(['/', '/about', '/products', '/services', '/blogs', '/contact'])

// Category ids the Products page already filters by (?category=<id>).
const PRODUCT_CATEGORIES = [
  'kraft-packaging',
  'foil-containers',
  'food-containers',
  'tissues-napkins',
  'cling-film-bags',
  'hygiene-solutions',
]

const MAX_MESSAGE_LEN = 2000
const MAX_HISTORY = 10

const FALLBACK_REPLY =
  "Sorry, I'm having trouble connecting right now. You can still browse our products or contact our team."

const SYSTEM_PROMPT = `You are the Ideal Pack UAE website AI assistant.

Ideal Pack is a UAE-based supplier of packaging and hygiene products, based in Industrial Area 12, Sharjah, UAE.

Your job is to:
- Help users find suitable products and explain the product categories.
- Help with business enquiries (bulk orders, quotations, sales, accounts).
- Guide users through the Ideal Pack website and help them reach the right department.
- Give concise, professional answers (usually 1-3 short sentences).

Product categories: Kraft Packaging, Foil Containers, Food Containers, Tissues & Napkins, Cling Film & Bags, Hygiene Solutions.

Services: bulk & wholesale supply, custom packaging solutions, delivery & order support, product consultation.

Contact details you may share:
- General enquiries: info@idealpackuae.com
- Sales enquiries: sales@idealpackuae.com
- Accounts & billing: accounts@idealpackuae.com
- Phone: +971 6 564 2072
- WhatsApp: +971 54 991 0027
- Location: Industrial Area 12, Sharjah, UAE

Rules:
- Never invent product names, prices, stock levels, or delivery promises.
- If a user asks for exact pricing, stock, or delivery details, reply exactly: "Please contact our team for the latest availability and pricing."
- Recommend contacting Ideal Pack (sales email / Contact page) for anything you cannot answer.
- Do not answer questions unrelated to Ideal Pack or its website; politely steer back.

Navigation: when the user asks to open or go to a page, set an "action" to navigate there.
Known routes: "/" (Home), "/about" (About Us), "/products" (Products), "/services" (Services), "/blogs" (Blogs), "/contact" (Contact).
For a specific product category, use "/products?category=<id>" where <id> is one of:
kraft-packaging, foil-containers, food-containers, tissues-napkins, cling-film-bags, hygiene-solutions.
When you set a navigate action, the "reply" must be a short confirmation like "Sure, opening our Products page." Never put a URL inside "reply".

You MUST respond with a single JSON object and nothing else, in this exact shape:
{"reply": "<your message>", "action": null}
or, when navigating:
{"reply": "Sure, opening our Products page.", "action": {"type": "navigate", "path": "/products"}}`

/* ──────────────────────────────────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────────────────────────────────── */

/** Return a safe internal path, or null if the action is not allowed. */
function sanitizeAction(action) {
  if (!action || action.type !== 'navigate' || typeof action.path !== 'string') return null

  let raw = action.path.trim()
  if (!raw.startsWith('/')) return null // no absolute URLs, no protocol-relative

  const [pathname, query = ''] = raw.split('?')
  if (!ALLOWED_ROUTES.has(pathname)) return null

  if (query) {
    // Only ?category=<known id> on /products is permitted.
    const params = new URLSearchParams(query)
    const category = params.get('category')
    if (pathname === '/products' && category && PRODUCT_CATEGORIES.includes(category)) {
      return { type: 'navigate', path: `/products?category=${category}` }
    }
    return { type: 'navigate', path: pathname }
  }

  return { type: 'navigate', path: pathname }
}

/** Coerce the model's raw text into { reply, action }. */
function parseModelOutput(text) {
  if (typeof text !== 'string' || !text.trim()) {
    return { reply: FALLBACK_REPLY, action: null }
  }
  try {
    const data = JSON.parse(text)
    const reply =
      typeof data.reply === 'string' && data.reply.trim()
        ? data.reply.trim()
        : FALLBACK_REPLY
    return { reply, action: sanitizeAction(data.action) }
  } catch {
    // Model didn't return JSON — use the raw text as the reply.
    return { reply: text.trim(), action: null }
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Provider calls (server-side only — the API key never leaves this process)
 * ────────────────────────────────────────────────────────────────────────── */

async function callOpenAI(chatMessages) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY is not set')
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 400,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...chatMessages],
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`OpenAI ${res.status}: ${detail.slice(0, 200)}`)
  }

  const data = await res.json()
  return parseModelOutput(data?.choices?.[0]?.message?.content)
}

async function callGemini(chatMessages) {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not set')
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  const contents = chatMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 400,
          responseMimeType: 'application/json',
        },
        contents,
      }),
    },
  )

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 200)}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? ''
  return parseModelOutput(text)
}

/* ──────────────────────────────────────────────────────────────────────────
 * Mock provider — used automatically when no API key is configured, or when
 * AI_PROVIDER=mock. It is rule-based (NOT a real LLM) and exists only so the
 * frontend ↔ backend connection is testable and navigation keeps working
 * before a key is added. Every mock response is flagged via the `X-AI-Mode`
 * header and the server startup log.
 * ────────────────────────────────────────────────────────────────────────── */

const CATEGORY_MATCHERS = [
  { id: 'kraft-packaging', re: /\bkraft\b/i },
  { id: 'foil-containers', re: /\bfoil\b|alumini?um/i },
  { id: 'food-containers', re: /\bfood container|\bcontainers?\b/i },
  { id: 'tissues-napkins', re: /\btissue|napkin/i },
  { id: 'cling-film-bags', re: /\bcling|\bfilm\b|\bbags?\b|\bwrap\b/i },
  { id: 'hygiene-solutions', re: /\bhygiene|cleaning|sanit/i },
]

const PAGE_MATCHERS = [
  { path: '/about', re: /\babout\b/i },
  { path: '/services', re: /\bservices?\b/i },
  { path: '/blogs', re: /\bblogs?\b/i },
  { path: '/contact', re: /\bcontact\b/i },
  { path: '/products', re: /\bproducts?\b|\bcatalog(ue)?\b|\bshop\b/i },
  { path: '/', re: /\bhome\b|home ?page|take me home/i },
]

const WANTS_NAV = /\b(open|go to|goto|show|take me|navigate|visit|bring up)\b/i

function callMock(chatMessages) {
  const text = chatMessages[chatMessages.length - 1]?.content?.trim() || ''
  const t = text.toLowerCase()

  // 1) explicit navigation intent → action
  if (WANTS_NAV.test(t) || /^\/?(home|about|products|services|blogs|contact)\b/.test(t)) {
    const cat = CATEGORY_MATCHERS.find((c) => c.re.test(t))
    if (cat) {
      return Promise.resolve({
        reply: `Sure, opening our ${cat.id.replace(/-/g, ' ')} products.`,
        action: { type: 'navigate', path: `/products?category=${cat.id}` },
      })
    }
    const page = PAGE_MATCHERS.find((p) => p.re.test(t))
    if (page) {
      const name =
        page.path === '/' ? 'Home' : page.path.slice(1).replace(/^\w/, (c) => c.toUpperCase())
      return Promise.resolve({
        reply: `Sure, opening our ${name} page.`,
        action: { type: 'navigate', path: page.path },
      })
    }
  }

  // 2) pricing / stock / delivery → fixed line
  if (/\b(price|pricing|cost|stock|availability|delivery time|how long)\b/i.test(t)) {
    return Promise.resolve({
      reply: 'Please contact our team for the latest availability and pricing.',
      action: null,
    })
  }

  // 3) topical replies
  let reply
  if (/\b(hi|hello|hey|good (morning|afternoon|evening))\b/i.test(t)) {
    reply =
      "Hello! I'm the Ideal Pack AI Assistant. I can help you find products, request a quote, or navigate the website. What do you need?"
  } else if (/\b(quote|quotation|pricing request)\b/i.test(t)) {
    reply =
      'Please share the product name, required quantity, and your contact details. You can also email sales@idealpackuae.com or use the Contact page for a quotation.'
  } else if (/\b(bulk|wholesale|large quantit)/i.test(t)) {
    reply =
      'We support bulk and wholesale supply depending on product availability and quantity. Email sales@idealpackuae.com with your requirements to get started.'
  } else if (/\b(contact|sales|email|phone|whatsapp|reach)\b/i.test(t)) {
    reply =
      'You can reach us at sales@idealpackuae.com (sales), info@idealpackuae.com (general), or +971 6 564 2072. WhatsApp: +971 54 991 0027.'
  } else if (/\b(location|where|address|based)\b/i.test(t)) {
    reply = 'Ideal Pack is located at Industrial Area 12, Sharjah, UAE.'
  } else if (
    /product|categor|packaging|hygiene|takeaway|catering|restaurant|retail|napkin|tissue|\bfoil\b|\bkraft\b|\bcontainers?\b|what (do|have) you/i.test(t)
  ) {
    reply =
      'Our categories are Kraft Packaging, Foil Containers, Food Containers, Tissues & Napkins, Cling Film & Bags, and Hygiene Solutions. Tell me what you are packaging and I can point you to the right one.'
  } else {
    reply =
      "I can help with Ideal Pack products, quotations, bulk orders, contact details, and website navigation. For anything specific, email sales@idealpackuae.com or visit our Contact page."
  }
  return Promise.resolve({ reply, action: null })
}

/**
 * Pick the active provider. Falls back to the mock provider (with a warning)
 * when the configured provider has no API key, so the endpoint always works.
 */
function getProvider() {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()

  if (provider === 'mock') return { fn: callMock, mode: 'mock' }

  if (provider === 'gemini') {
    if (process.env.GEMINI_API_KEY) return { fn: callGemini, mode: 'gemini' }
  } else if (process.env.OPENAI_API_KEY) {
    return { fn: callOpenAI, mode: 'openai' }
  }

  return { fn: callMock, mode: 'mock' }
}

export { getProvider }

/* ──────────────────────────────────────────────────────────────────────────
 * POST /api/chat
 * ────────────────────────────────────────────────────────────────────────── */

router.post('/', async (req, res) => {
  const body = req.body || {}

  // ── validate the message ──
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) {
    return res.status(400).json({ error: 'A non-empty "message" string is required.' })
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return res.status(400).json({ error: `Message must be ${MAX_MESSAGE_LEN} characters or fewer.` })
  }

  // ── sanitise optional history ──
  const history = Array.isArray(body.history) ? body.history : []
  const cleanHistory = history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LEN) }))

  const chatMessages = [...cleanHistory, { role: 'user', content: message }]

  const { fn: call, mode } = getProvider()
  res.set('X-AI-Mode', mode)

  try {
    const { reply, action } = await call(chatMessages)
    if (mode === 'mock') {
      console.warn('[chat] mock reply (no API key configured) for:', JSON.stringify(message))
    }
    return res.json({ reply, action: action ?? null })
  } catch (err) {
    // Log the real error server-side; send a safe message to the client.
    console.error(`[chat] ${mode} provider error:`, err.stack || err.message)
    return res.status(502).json({ error: 'ai_unavailable', reply: FALLBACK_REPLY, action: null })
  }
})

export default router
