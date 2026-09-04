import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, ExternalLink, Send, Package, Receipt } from 'lucide-react'
import { CONTACT } from '../data/contact'

const infoItems = [
  { icon: Phone, label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.whatsappDisplay,
    href: CONTACT.whatsappHref,
    external: true,
  },
  { icon: Mail, label: 'General Enquiries', value: CONTACT.emailInfo, href: CONTACT.emailInfoHref },
  { icon: Package, label: 'Sales Enquiries', value: CONTACT.emailSales, href: CONTACT.emailSalesHref },
  {
    icon: Receipt,
    label: 'Accounts & Billing',
    value: CONTACT.emailAccounts,
    href: CONTACT.emailAccountsHref,
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' }

function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Please enter a subject.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setForm(emptyForm)
    }
  }

  const fieldClass = (field) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
        : 'border-slate-200 focus:border-blue-400 focus:ring-blue-400/20'
    }`

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-blue-50/40 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
            Contact Us
          </p>
          <span className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Let&apos;s Talk Packaging
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have a question or need a quote? Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* LEFT — contact info */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Contact Information
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Reach the Ideal Pack team by phone, email or WhatsApp.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {infoItems.map(({ icon: Ico, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-blue-200"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Ico className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {label}
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Location card — static, with a compact "view on map" button */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Location
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-medium text-slate-900">
                    {CONTACT.location}
                  </p>
                  <a
                    href={CONTACT.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <MapPin className="h-4 w-4" strokeWidth={2} />
                    View Location on Map
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>

            {/* Prominent WhatsApp button */}
            <a
              href={CONTACT.whatsappPrefilledHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Contact on WhatsApp
            </a>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              {sent ? (
                <div className="py-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Send className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">Message sent</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Thanks for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className={fieldClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@company.com"
                      className={fieldClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+971 00 000 0000"
                      className={fieldClass('phone')}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Subject <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={update('subject')}
                      placeholder="How can we help?"
                      className={fieldClass('subject')}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Message <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us what you need..."
                      className={`${fieldClass('message')} resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600"
                    >
                      <Send className="h-4 w-4" strokeWidth={2} />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Secondary: prefer WhatsApp? */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">Prefer WhatsApp?</p>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#128C4A] transition-colors duration-300 hover:bg-[#25D366] hover:text-white sm:ml-auto"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Chat with Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
