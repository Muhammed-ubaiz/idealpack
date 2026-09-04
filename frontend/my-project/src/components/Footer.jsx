import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import logo from '../assets/ChatGPT Image Sep 2, 2026, 10_50_55 AM.png'
import { CONTACT } from '../data/contact'

/** Small inline-SVG icon wrapper for the social brand marks. */
function BrandIcon({ children, className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      {children}
    </svg>
  )
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
]

// The site has one Products page; every category link routes there so nothing breaks.
const productLinks = [
  'Kraft Products',
  'Paper Products',
  'Plastic Products',
  'Aluminium Containers',
  'Clear Containers',
  'Eco-Friendly Products',
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/idealpack.uae?igsi=MXI5MmlpcXFwZ3RiOQ==',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100092517775347',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z"
      />
    ),
  },
]

const underline =
  'relative inline-block group transition-colors hover:text-blue-950'
const underlineBar =
  'absolute left-0 -bottom-1 h-0.5 w-full bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white to-blue-50 text-blue-950 font-sans">
      <div className="px-4 sm:px-6 md:px-16 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company info */}
        <div>
          <img src={logo} alt="Ideal Pack" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-blue-950/80 leading-relaxed max-w-70">
            Premium packaging, eco-friendly and hygiene solutions — all in one place.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 transition-all duration-300"
              >
                <BrandIcon className="w-4 h-4">{icon}</BrandIcon>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6">
            <p className="text-sm font-medium text-blue-950">Need help choosing a product?</p>
            <a
              href={CONTACT.whatsappPrefilledHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-400">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-blue-950/80">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className={underline}>
                  {label}
                  <span className={underlineBar} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product links */}
        <div>
          <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-400">Products</h3>
          <ul className="mt-4 space-y-3 text-sm text-blue-950/80">
            {productLinks.map((label) => (
              <li key={label}>
                <Link to="/products" className={underline}>
                  {label}
                  <span className={underlineBar} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact us */}
        <div>
          <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-400">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-blue-950/80">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 shrink-0 text-blue-400" strokeWidth={1.8} />
              <a href={CONTACT.phoneHref} className="hover:text-blue-950 transition-colors">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 shrink-0 text-blue-400" strokeWidth={1.8} />
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-950 transition-colors"
              >
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0 text-blue-400" strokeWidth={1.8} />
              <a href={CONTACT.emailInfoHref} className="hover:text-blue-950 transition-colors">
                {CONTACT.emailInfo}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0 text-blue-400" strokeWidth={1.8} />
              <a href={CONTACT.emailSalesHref} className="hover:text-blue-950 transition-colors">
                <span className="text-blue-950/50">Sales:</span> {CONTACT.emailSales}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" strokeWidth={1.8} />
              <a
                href={CONTACT.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-950 transition-colors"
              >
                {CONTACT.locationLine1}
                <br />
                {CONTACT.locationLine2}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-100 px-4 sm:px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-950/60">
        <span>&copy; {new Date().getFullYear()} Ideal Pack. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className={underline}>
            Privacy Policy
            <span className={underlineBar} />
          </a>
          <a href="#" className={underline}>
            Terms of Service
            <span className={underlineBar} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
