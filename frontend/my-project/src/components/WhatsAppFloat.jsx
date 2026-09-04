import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../data/contact'

/**
 * Global floating WhatsApp button.
 * Fixed bottom-right, above page content, opens WhatsApp with a pre-filled
 * message in a new tab. Rendered once in App, so it appears on every route.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsappPrefilledHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  )
}
