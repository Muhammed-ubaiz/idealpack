import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
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
      <img src={logo} alt="Ideal Pack" className="h-9 sm:h-10 w-auto shrink-0" />

      <ul className="hidden lg:flex flex-1 items-center justify-end gap-x-8 text-base text-black font-medium">
        {navLinks.map((link) => (
          <li key={link.label} className="relative group whitespace-nowrap text-right">
            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `hover:text-blue-600 transition-colors ${isActive && link.to !== '#' ? 'text-blue-600' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600 origin-left transition-transform duration-300 ${
                      isActive && link.to !== '#' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden flex items-center justify-center w-10 h-10 text-black"
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
            className="lg:hidden absolute left-0 right-0 top-full bg-white shadow-md overflow-hidden text-black font-medium"
          >
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="group relative flex items-center justify-center border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `relative w-full px-6 py-3 text-center hover:text-blue-600 transition-colors ${
                      isActive && link.to !== '#' ? 'text-blue-600' : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600 origin-left transition-transform duration-300 ${
                          isActive && link.to !== '#' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
