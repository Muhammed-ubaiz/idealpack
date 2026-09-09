import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/ChatGPT Image Sep 2, 2026, 10_50_55 AM.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-md font-sans">
      <Link
        to="/"
        aria-label="Ideal Pack — go to home"
        onClick={() => setOpen(false)}
        className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <img src={logo} alt="Ideal Pack" className="h-9 sm:h-10 w-auto" />
      </Link>

      <ul className="hidden lg:flex flex-1 items-center justify-end gap-x-8 text-base text-slate-900 font-medium">
        {navLinks.map((link) => {
          if (link.label === 'Contact Us') {
            return (
              <li key={link.label} className="whitespace-nowrap">
                <NavLink
                  to={link.to}
                  className="group relative inline-flex items-center overflow-hidden rounded-lg bg-white px-5 py-2 font-semibold text-red-600 border border-red-600"
                >
                  {/* Red fill wipes in from left -> right on hover, retracts
                      right -> left on leave. Sits behind the label. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-red-600 transition-transform duration-700 ease-in-out group-hover:scale-x-100"
                  />
                  <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            )
          }
          return (
            <li key={link.label} className="relative group whitespace-nowrap text-right">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `transition-colors hover:text-blue-500 ${
                    isActive && link.to !== '#' ? 'text-red-600' : ''
                  }`
                }
              >
                {({ isActive }) => {
                  const active = isActive && link.to !== '#'
                  return (
                    <>
                      {link.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 w-full origin-left transition-transform duration-300 ${
                          active
                            ? 'bg-red-600 scale-x-100'
                            : 'bg-blue-400 scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )
                }}
              </NavLink>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-blue-100 shadow-md overflow-hidden text-slate-900 font-medium"
          >
            {navLinks.map((link) => {
              const isCta = link.label === 'Contact Us'
              return (
                <li
                  key={link.label}
                  className="group relative flex items-center justify-center border-t border-blue-50 first:border-t-0 hover:bg-blue-50 transition-colors"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => {
                      const active = isActive && link.to !== '#'
                      if (isCta) {
                        return 'group/cta relative overflow-hidden my-2 mx-6 w-[calc(100%-3rem)] rounded-lg bg-white px-6 py-3 text-center font-semibold text-red-600 border border-red-600'
                      }
                      return `relative w-full px-6 py-3 text-center transition-colors hover:text-blue-500 ${
                        active ? 'text-red-600' : ''
                      }`
                    }}
                  >
                    {({ isActive }) => {
                      const active = isActive && link.to !== '#'
                      if (isCta) {
                        return (
                          <>
                            {/* Red fill wipes in left -> right on hover/tap,
                                retracts right -> left on leave. Behind label. */}
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-red-600 transition-transform duration-700 ease-in-out group-hover/cta:scale-x-100 group-active/cta:scale-x-100"
                            />
                            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover/cta:text-white group-active/cta:text-white">
                              {link.label}
                            </span>
                          </>
                        )
                      }
                      return (
                        <>
                          {link.label}
                          <span
                            className={`absolute left-0 -bottom-1 h-0.5 w-full origin-left transition-transform duration-300 ${
                              active
                                ? 'bg-red-600 scale-x-100'
                                : 'bg-blue-400 scale-x-0 group-hover:scale-x-100'
                            }`}
                          />
                        </>
                      )
                    }}
                  </NavLink>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
