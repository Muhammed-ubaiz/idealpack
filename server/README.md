# Ideal Pack AI server

Small Express API that powers the website AI assistant. It keeps the LLM API
key **server-side** — the browser never sees it.

```
server/
  server.js          # Express app, CORS, JSON limits, routes
  routes/
    chat.js          # POST /api/chat  → { reply, action }
  .env.example        # copy to .env and add ONE provider key
```

## Setup

```bash
cd server
npm install
cp .env.example .env      # then edit .env
npm run dev               # http://localhost:8787  (node --watch)
```

Set **one** provider in `.env`:

| Provider | Vars |
|----------|------|
| OpenAI (default) | `AI_PROVIDER=openai`, `OPENAI_API_KEY=...`, optional `OPENAI_MODEL` |
| Gemini | `AI_PROVIDER=gemini`, `GEMINI_API_KEY=...`, optional `GEMINI_MODEL` |

Also set `ALLOWED_ORIGINS` to the browser origin(s) that may call the API
(comma-separated). Dev defaults cover the Vite ports.

## API

### `POST /api/chat`

Request:

```json
{ "message": "open products page", "history": [{ "role": "user", "content": "..." }] }
```

- `message` — required, 1–2000 chars.
- `history` — optional, last 10 `{ role: "user" | "assistant", content }` turns.

Response:

```json
{ "reply": "Sure, opening our Products page.", "action": { "type": "navigate", "path": "/products" } }
```

`action` is `null` unless the model asked to navigate. Navigation is
**whitelisted server-side** to `/`, `/about`, `/products`, `/services`,
`/blogs`, `/contact` (plus `/products?category=<known id>`). Anything else is
dropped.

On upstream failure the API returns `502` with a safe fallback `reply`; the
frontend also degrades gracefully on any network error.

### `GET /api/health`

`{ "ok": true, "provider": "openai" }`

## Frontend wiring

- **Dev:** `vite.config.js` proxies `/api` → `http://localhost:8787`, so run
  this server alongside `npm run dev`.
- **Prod:** deploy this server anywhere Node runs and point the frontend at it
  with `VITE_AI_API_URL=https://your-api-host/api/chat` (a URL, not a secret),
  or reverse-proxy `/api/*` from the static host to this server.
