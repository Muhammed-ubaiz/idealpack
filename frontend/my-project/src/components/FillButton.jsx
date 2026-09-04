import { Link } from 'react-router-dom'

/**
 * White button with a smooth left-to-right blue fill on hover.
 *
 *   <FillButton to="/contact">Contact Us</FillButton>
 *   <FillButton href={url} external>Visit Online Store</FillButton>
 *
 * Default: white bg, blue text, light-blue border.
 * Hover:   bg-blue-400 sweeps in from the left (scale-x, origin-left, ~500ms),
 *          text transitions blue -> white. Reverses on mouse-out.
 */
export default function FillButton({ to, href, external = false, children, className = '' }) {
  const base = `group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center px-7 py-3.5 rounded-xl font-semibold bg-white text-blue-600 border border-blue-200 transition-colors duration-300 ${className}`

  const layers = (
    <>
      <span className="absolute inset-0 bg-blue-400 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
        className={base}
      >
        {layers}
      </a>
    )
  }

  return (
    <Link to={to} className={base}>
      {layers}
    </Link>
  )
}
