import { Link } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import HoverFill from './HoverFill'

/**
 * Holding page for Privacy Policy / Terms of Service.
 *
 * The project ships no legal copy, and inventing policy text would be
 * misleading, so this page states plainly that the document is being
 * finalised and routes the visitor to a real contact channel. Replace the
 * body with the approved legal text when it is available.
 */
export default function LegalPage({ title }) {
  return (
    <div className="bg-blue-50">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="flex h-1 w-16 overflow-hidden rounded-full">
          <span className="w-1/2 bg-blue-400" />
          <span className="w-1/2 bg-red-600" />
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
          Our full {title.toLowerCase()} is being finalised. In the meantime, if you have any
          questions about this topic, please contact us and our team will be happy to help.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={CONTACT.emailInfoHref}
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl bg-white text-red-600 border border-red-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-red-600/25 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <HoverFill className="bg-red-600" />
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
              Email {CONTACT.emailInfo}
            </span>
          </a>
          <Link
            to="/contact"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl border border-blue-400 bg-white px-6 py-3 text-sm font-semibold text-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <HoverFill className="bg-blue-400" />
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
              Go to Contact page
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
