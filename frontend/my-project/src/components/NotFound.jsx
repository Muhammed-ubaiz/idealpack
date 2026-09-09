import { Link } from 'react-router-dom'
import HoverFill from './HoverFill'

/** Catch-all route so unknown / stale URLs never render a blank screen. */
export default function NotFound() {
  return (
    <div className="bg-blue-50">
      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="mx-auto flex h-1 w-16 overflow-hidden rounded-full">
          <span className="w-1/2 bg-blue-400" />
          <span className="w-1/2 bg-red-600" />
        </span>
        <p className="mt-6 text-5xl font-bold text-slate-900">404</p>
        <h1 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl bg-white text-red-600 border border-red-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-red-600/25 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <HoverFill className="bg-red-600" />
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
              Back to Home
            </span>
          </Link>
          <Link
            to="/products"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl border border-blue-400 bg-white px-6 py-3 text-sm font-semibold text-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <HoverFill className="bg-blue-400" />
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
              Browse Products
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
