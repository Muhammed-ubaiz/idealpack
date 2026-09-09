import { whatsappLink } from '../data/contact'

/**
 * Global floating WhatsApp contact button.
 *
 * Rendered once in App (shared layout) so it appears on every page and
 * survives route changes. Opens a wa.me chat with the official Ideal Pack
 * number (from data/contact.js) and a pre-filled enquiry message.
 */
const PREFILL =
  'Hello Ideal Pack, I would like to know more about your packaging products.'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(PREFILL)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ideal Pack on WhatsApp"
      className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex h-[52px] w-[52px] sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-4 ring-[#25D366]/15 transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.258.59 4.462 1.712 6.404L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.234 1.588h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.634-3.752-9.052A12.71 12.71 0 0 0 16.004 3.2Zm0 23.36h-.004a10.55 10.55 0 0 1-5.376-1.472l-.386-.229-3.898 1.022 1.04-3.8-.251-.39a10.53 10.53 0 0 1-1.614-5.62c0-5.866 4.774-10.64 10.646-10.64a10.57 10.57 0 0 1 7.524 3.12 10.56 10.56 0 0 1 3.116 7.526c0 5.866-4.774 10.64-10.647 10.64Zm5.834-7.968c-.32-.16-1.892-.934-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.571-1.586-.95-.848-1.592-1.895-1.779-2.215-.186-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.824.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.614-.092 1.892-.774 2.158-1.52.267-.747.267-1.387.187-1.52-.08-.134-.293-.214-.613-.374Z" />
      </svg>
      {/* Tooltip — hidden on mobile to save space, fades in on hover on desktop */}
      <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 opacity-0 shadow-md ring-1 ring-black/5 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  )
}
