import { Link } from 'react-router-dom'

/**
 * Unified CTA button. Three variants of one blue-400 + red system:
 *
 *   <FillButton to="/x">Label</FillButton>                 // secondary: blue-400 outline
 *   <FillButton to="/x" variant="primary">Label</FillButton>  // solid blue-400
 *   <FillButton to="/x" variant="cta">Label</FillButton>      // red outline (important CTA)
 *
 * secondary / cta: white surface, coloured text + border; the colour sweeps in
 *   on hover (or tap) and the text turns white.
 * primary:         solid blue-400, white text, darkens to blue-500 on hover.
 */
export default function FillButton({
  to,
  href,
  external = false,
  variant = 'secondary',
  children,
  className = '',
}) {
  const surface = {
    secondary: 'bg-white text-blue-500 border-blue-400 focus-visible:outline-blue-400',
    primary: 'bg-blue-400 text-white border-blue-400 focus-visible:outline-blue-400',
    cta: 'bg-white text-red-600 border-red-600 focus-visible:outline-red-600',
  }[variant]

  const sweep = {
    secondary: 'bg-blue-400',
    primary: 'bg-blue-500',
    cta: 'bg-red-600',
  }[variant]

  // secondary + cta start white and turn white-on-colour on hover/tap.
  const swaps = variant === 'primary' ? '' : 'group-hover:text-white group-active:text-white'

  const base = `group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center px-7 py-3.5 rounded-xl font-semibold border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${surface} ${className}`

  const layers = (
    <>
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 group-active:scale-x-100 ${sweep}`}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${swaps}`}
      >
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
