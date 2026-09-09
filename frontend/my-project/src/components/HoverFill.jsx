/**
 * Premium left → right background fill for CTA / action buttons.
 *
 * Usage — drop it as the FIRST child of a button that is
 * `group relative overflow-hidden`, and put the button's label + icons in a
 * sibling wrapped with `relative z-10`:
 *
 *   <button className="group relative overflow-hidden … (no hover:bg-*)">
 *     <HoverFill className="bg-red-600" />
 *     <span className="relative z-10 …">Label</span>
 *   </button>
 *
 * On hover the coloured layer scales in from the left (origin-left, ~700ms,
 * ease-in-out); on mouse-leave it retracts back toward the left, reading as a
 * right → left reverse. `group-active` mirrors it for touch/tap.
 *
 * `className` MUST carry the fill colour — pass the button's *existing* hover
 * colour, e.g. `bg-red-600`, `bg-blue-400`, `bg-[#1ebe5b]`.
 */
export default function HoverFill({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 group-active:scale-x-100 ${className}`}
    />
  )
}
