import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import chatRoute, { getProvider } from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 8787

// Allow only the browser origins listed in ALLOWED_ORIGINS (comma-separated).
// If none are set, fall back to the common Vite dev ports.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      // Non-browser clients (curl, same-origin server calls) send no Origin.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error(`Origin ${origin} not allowed by CORS`))
    },
  }),
)

// Small JSON bodies only — the chat route also enforces a message length cap.
app.use(express.json({ limit: '16kb' }))

app.get('/api/health', (_req, res) => {
  const { mode } = getProvider()
  res.json({
    ok: true,
    provider: (process.env.AI_PROVIDER || 'openai').toLowerCase(),
    mode, // 'openai' | 'gemini' | 'mock'
    keyConfigured: mode !== 'mock',
  })
})

app.use('/api/chat', chatRoute)

// Generic error handler — never leak internals to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server] unhandled error:', err.message)
  res.status(500).json({ error: 'internal_error' })
})

app.listen(PORT, () => {
  const { mode } = getProvider()
  console.log(`Ideal Pack AI server listening on http://localhost:${PORT}`)
  console.log(`  CORS origins : ${allowedOrigins.join(', ')}`)
  if (mode === 'mock') {
    console.warn(
      '  AI mode      : MOCK (rule-based). Set OPENAI_API_KEY (or GEMINI_API_KEY + AI_PROVIDER=gemini) in server/.env for real AI.',
    )
  } else {
    console.log(`  AI mode      : ${mode} (real LLM)`)
  }
})
