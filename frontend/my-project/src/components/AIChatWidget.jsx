import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Mic, RotateCcw, Send, Volume2, VolumeX, X } from 'lucide-react'
import {
  AI_FALLBACK_REPLY,
  MAX_MESSAGE_LENGTH,
  resolveSafePath,
  sendChatMessage,
} from '../services/aiService'

/**
 * Global floating AI Assistant widget.
 *
 * Rendered once in App (inside <BrowserRouter>) so it survives route changes.
 * Real AI replies come from our backend via `sendChatMessage` — the LLM key
 * lives on the server, never here. Also supports:
 *   - website navigation actions (whitelisted routes only)
 *   - voice input  (Web Speech API — SpeechRecognition)
 *   - voice output (speechSynthesis) — off by default
 */

const WELCOME =
  "Hi 👋 I'm the Ideal Pack AI Assistant. I can help you find products, explore our services, request a quote, or navigate the website."

const QUICK_ACTIONS = [
  'Find Products',
  'Request a Quote',
  'Packaging Help',
  'Contact Sales',
]

const STORAGE_KEY = 'idealpack.chat.v1'
const NAV_DELAY_MS = 550

let mid = 1
const nextId = () => `${Date.now()}-${mid++}`

function loadMessages() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (Array.isArray(parsed) && parsed.length) return parsed
  } catch {
    /* ignore unavailable / corrupt storage */
  }
  return [{ id: nextId(), from: 'bot', text: WELCOME }]
}

export default function AIChatWidget() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(loadMessages)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'thinking'
  const [voiceOn, setVoiceOn] = useState(false)
  const [listening, setListening] = useState(false)

  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)
  const sendRef = useRef(null)
  const [micSupported] = useState(
    () =>
      typeof window !== 'undefined' &&
      !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  )

  /* ── persist + autoscroll ─────────────────────────────────────────── */
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)))
    } catch {
      /* storage may be unavailable (private mode) — chat still works in memory */
    }
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, status, open])

  /* ── close on Escape ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* ── text-to-speech ──────────────────────────────────────────────── */
  const speak = useCallback((text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'
      u.rate = 1
      window.speechSynthesis.speak(u)
    } catch {
      /* speech synthesis not usable — ignore */
    }
  }, [])

  const toggleVoice = () => {
    setVoiceOn((on) => {
      if (on && 'speechSynthesis' in window) window.speechSynthesis.cancel()
      return !on
    })
  }

  /* ── start a fresh conversation ──────────────────────────────────── */
  const resetChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage may be unavailable — fine */
    }
    setInput('')
    setStatus('idle')
    setMessages([{ id: nextId(), from: 'bot', text: WELCOME }])
  }

  /* ── send a message to the AI ────────────────────────────────────── */
  const send = useCallback(
    async (raw) => {
      const text = String(raw || '').trim().slice(0, MAX_MESSAGE_LENGTH)
      if (!text || status === 'thinking') return

      setInput('')
      setMessages((prev) => [...prev, { id: nextId(), from: 'user', text }])
      setStatus('thinking')

      // Send recent turns for context (skip local system notices).
      const historySource = [...messages, { from: 'user', text }]
      const history = historySource
        .filter((m) => m.from === 'user' || m.from === 'bot')
        .slice(-10)
        .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))

      let reply = AI_FALLBACK_REPLY
      let action = null
      try {
        const res = await sendChatMessage(text, history.slice(0, -1))
        reply = res.reply
        action = res.action
      } catch {
        reply = AI_FALLBACK_REPLY
      }

      setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text: reply }])
      setStatus('idle')

      if (voiceOn) speak(reply)

      const safePath = action?.type === 'navigate' ? resolveSafePath(action.path) : null
      if (safePath) {
        // Let the user read/hear the reply first, then navigate.
        window.setTimeout(() => navigate(safePath), NAV_DELAY_MS)
      }
    },
    [messages, status, voiceOn, speak, navigate],
  )

  useEffect(() => {
    sendRef.current = send
  }, [send])

  /* ── speech-to-text setup ────────────────────────────────────────── */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    const recognition = new SR()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.continuous = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim()
      if (transcript) {
        setInput(transcript)
        sendRef.current?.(transcript)
      }
    }
    recognition.onerror = (event) => {
      setListening(false)
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            from: 'system',
            text: 'Microphone access is required to use voice commands.',
          },
        ])
      }
    }
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    return () => {
      try {
        recognition.abort()
      } catch {
        /* ignore */
      }
    }
  }, [])

  const toggleListening = () => {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      setListening(false)
      return
    }
    try {
      setListening(true)
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  /* ── render ──────────────────────────────────────────────────────── */
  return (
    <>
      {/* CHAT PANEL */}
      <div
        role="dialog"
        aria-label="Ideal Pack AI Assistant"
        aria-hidden={!open}
        className={`fixed z-[60] left-4 right-4 bottom-[84px] sm:left-auto sm:right-6 sm:bottom-[96px] sm:w-[370px] flex max-h-[70vh] origin-bottom-right flex-col overflow-hidden rounded-[22px] border border-blue-400/40 bg-white shadow-2xl shadow-blue-950/20 transition-all duration-200 ease-out ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-blue-400/20 bg-blue-50/60 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-400 text-white">
            <Bot className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">Ideal Pack AI</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
          <button
            type="button"
            onClick={resetChat}
            aria-label="Start a new chat"
            title="New chat"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-blue-500"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((m) =>
            m.from === 'system' ? (
              <p
                key={m.id}
                className="mx-auto rounded-full bg-amber-50 px-3 py-1 text-center text-xs text-amber-700"
              >
                {m.text}
              </p>
            ) : (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.from === 'bot' && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                    <Bot className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                )}
                <p
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'rounded-br-md bg-blue-400 text-white'
                      : 'rounded-bl-md bg-blue-50 text-slate-800'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ),
          )}

          {status === 'thinking' && (
            <div className="flex items-end gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <Bot className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-blue-50 px-3.5 py-2.5 text-xs text-slate-500">
                Ideal Pack AI is typing
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                </span>
              </span>
            </div>
          )}

          {/* Quick actions */}
          <div className="mt-1 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => send(label)}
                disabled={status === 'thinking'}
                className="rounded-full border border-blue-400/50 bg-white px-3 py-1.5 text-xs font-semibold text-blue-500 transition-colors hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-blue-400/20 px-3 py-2.5">
          {listening && (
            <p className="mb-2 flex items-center gap-2 px-1 text-xs font-medium text-blue-500">
              <span className="h-2 w-2 animate-ping rounded-full bg-blue-400" />
              Listening&hellip;
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            {micSupported && (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={listening ? 'Stop listening' : 'Start voice input'}
                aria-pressed={listening}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  listening
                    ? 'animate-pulse border-blue-400 bg-blue-400 text-white'
                    : 'border-blue-400/40 bg-white text-blue-500 hover:bg-blue-50'
                }`}
              >
                <Mic className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Ask me anything..."
              aria-label="Message"
              className="min-w-0 flex-1 rounded-full border border-blue-400/40 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || status === 'thinking'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-400 text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
          <button
            type="button"
            onClick={toggleVoice}
            aria-pressed={voiceOn}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-500"
          >
            {voiceOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            {voiceOn ? 'Voice On' : 'Voice Off'}
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI Assistant' : 'AI Assistant'}
        aria-expanded={open}
        className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 text-white shadow-lg shadow-blue-400/40 ring-4 ring-blue-400/15 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        {open ? <X className="h-6 w-6" strokeWidth={2.5} /> : <Bot className="h-7 w-7" strokeWidth={2} />}
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            AI Assistant
          </span>
        )}
      </button>
    </>
  )
}
