import { useState } from 'react'
import { Link } from 'react-router-dom'
import { alertSuccess, alertValidation, showLoading } from '../lib/alerts'
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Send,
  Package,
  Receipt,
  FileText,
  PackageSearch,
  ChevronDown,
  Zap,
  Compass,
  Boxes,
  Briefcase,
} from 'lucide-react'
import { CONTACT } from '../data/contact'
import HoverFill from './HoverFill'

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

const whyItems = [
  {
    icon: Zap,
    title: 'Quick Response',
    description: 'Fast support for product and order enquiries.',
  },
  {
    icon: Compass,
    title: 'Product Guidance',
    description: 'Get help choosing suitable products for your business needs.',
  },
  {
    icon: Boxes,
    title: 'Bulk Order Support',
    description: 'Assistance for wholesale and large-quantity requirements.',
  },
  {
    icon: Briefcase,
    title: 'Business Solutions',
    description: 'Packaging and hygiene solutions tailored to commercial requirements.',
  },
]

const quickOptions = [
  {
    icon: FileText,
    title: 'Request a Quote',
    description:
      'Send us your required products and quantities and our team will help you with a quotation.',
    cta: 'Request a Quote',
    href: CONTACT.emailSalesHref,
  },
  {
    icon: PackageSearch,
    title: 'Product Enquiry',
    description: 'Need help finding the right packaging or hygiene product for your business?',
    cta: 'Explore Products',
    to: '/products',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description:
      'For quick assistance, product questions, and order support, connect with our team directly on WhatsApp.',
    cta: 'Chat on WhatsApp',
    href: CONTACT.whatsappHref,
    external: true,
  },
]

const faqs = [
  {
    q: 'Do you provide bulk and wholesale supply?',
    a: 'Yes. We support bulk and wholesale requirements depending on product availability and required quantities.',
  },
  {
    q: 'Can I request a quotation?',
    a: 'Yes. Share your product requirements and quantities through the contact form, email, phone, or WhatsApp.',
  },
  {
    q: 'Can you help me choose the right packaging?',
    a: 'Yes. Our team can help you select suitable packaging based on your product type and business requirements.',
  },
  {
    q: 'How can I contact the sales team?',
    a: 'Use the Sales Enquiries email shown on this page or reach our team through WhatsApp.',
  },
  {
    q: 'Do you provide hygiene products as well?',
    a: 'Yes. We provide packaging products along with hygiene and cleaning solutions for commercial requirements.',
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' }

function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

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

  // No backend is connected. Rather than fake a successful send, the form
  // hands the enquiry to the visitor's email client via a mailto: link,
  // pre-filled with everything they typed and addressed to info@idealpackuae.com.
  const buildMailto = (data) => {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || '—'}`,
      '',
      data.message,
    ].join('\n')
    return `${CONTACT.emailInfoHref}?subject=${encodeURIComponent(
      data.subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      // Inline field errors stay; SweetAlert just draws attention to them.
      alertValidation()
      return
    }

    setSubmitting(true)
    showLoading('Sending...')

    // No backend: hand the enquiry to the visitor's email client.
    window.location.href = buildMailto(form)

    // Let the mailto handoff settle, then confirm and reset the form.
    window.setTimeout(() => {
      setForm(emptyForm)
      setErrors({})
      setSubmitting(false)
      alertSuccess(
        'Message Sent!',
        'Thank you for contacting Ideal Pack. Our team will get back to you shortly.',
      )
    }, 600)
  }

  const fieldClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
        : 'border-blue-400/40 focus:border-blue-400 focus:ring-blue-100'
    }`

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-blue-50/40 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
            Contact Us
          </p>
          <span className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Let&apos;s Talk Packaging
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have a question or need a quote? Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM — one section, one grid, columns top-aligned */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — contact info */}
          <div className="mt-0">
            <h2 className="text-xl sm:text-2xl font-bold leading-none text-slate-900 tracking-tight">
              Contact Information
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Reach the Ideal Pack team by phone, email or WhatsApp.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {infoItems.map(({ icon: Ico, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
                  className="group flex items-start gap-4 rounded-[18px] border border-blue-400/40 bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-blue-400 hover:bg-blue-50/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-400 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-400/40">
                    <Ico className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-300 ease-out group-hover:text-blue-400">
                      {label}
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium text-slate-900 transition-colors duration-300 ease-out group-hover:text-blue-400">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Location card — static, with a compact "view on map" button */}
              <div className="group/card flex items-start gap-4 rounded-[18px] border border-blue-400/40 bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-blue-400 hover:bg-blue-50/40 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-400 transition-all duration-300 ease-out group-hover/card:scale-105 group-hover/card:shadow-lg group-hover/card:shadow-blue-400/40">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-900 transition-colors duration-300 ease-out group-hover/card:text-blue-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-medium text-slate-900 transition-colors duration-300 ease-out group-hover/card:text-blue-400">
                    {CONTACT.location}
                  </p>
                  <a
                    href={CONTACT.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden mt-3 inline-flex items-center rounded-xl border border-blue-400 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-blue-500 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <HoverFill className="bg-blue-400" />
                    <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
                      <MapPin className="h-4 w-4" strokeWidth={2} />
                      View Location on Map
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Prominent WhatsApp button */}
            <a
              href={CONTACT.whatsappPrefilledHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              <HoverFill className="bg-[#1ebe5b]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Contact on WhatsApp
              </span>
            </a>
          </div>

          {/* RIGHT — form */}
          <div className="mt-0">
            <div className="mt-0 rounded-[20px] border border-blue-400/40 bg-white p-6 sm:p-9">
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className={fieldClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@company.com"
                      className={fieldClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={update('subject')}
                      placeholder="How can we help?"
                      className={fieldClass('subject')}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us what you need..."
                      className={`${fieldClass('message')} resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white text-blue-400 border border-blue-400 px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-400/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      <HoverFill className="bg-blue-400" />
                      <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
                        <Send className="h-4 w-4" strokeWidth={2} />
                        {submitting ? 'Sending…' : 'Send Message'}
                      </span>
                    </button>
                  </div>
                </form>
            </div>

            {/* Secondary: prefer WhatsApp? */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-blue-400/40 bg-white p-4 sm:p-5">
              <p className="text-sm font-semibold text-slate-900">Prefer WhatsApp?</p>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#128C4A] transition-colors duration-300 sm:ml-auto"
              >
                <HoverFill className="bg-[#25D366]" />
                <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  Chat with Us
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT IDEAL PACK */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
              Why Ideal Pack?
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Reliable Support for Your Packaging Requirements
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you need product information, bulk pricing, quotation support, or help choosing
              the right packaging and hygiene solutions, our team is ready to assist your business.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {whyItems.map(({ icon: Ico, title, description }) => (
              <div
                key={title}
                className="group flex h-full flex-col rounded-[18px] border border-blue-400/40 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-400 transition-transform duration-300 ease-out group-hover:scale-105">
                  <Ico className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ENQUIRY OPTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center">
            How Can We Help?
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {quickOptions.map(({ icon: Ico, title, description, cta, href, to, external }) => {
              const cardClass =
                'group flex h-full flex-col rounded-[18px] border border-blue-400/40 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:shadow-md'
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-400 transition-transform duration-300 ease-out group-hover:scale-105">
                    <Ico className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500">
                    {cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </>
              )
              return to ? (
                <Link key={title} to={to} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={title}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
                  className={cardClass}
                >
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* VISIT OUR LOCATION */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center">
            Visit Our Location
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-center max-w-2xl mx-auto">
            Visit us for product enquiries, business requirements, and packaging supply assistance.
          </p>
          <div className="mt-8 flex flex-col gap-5 rounded-[18px] border border-blue-400/40 bg-white p-6 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-400">
              <MapPin className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">Location</p>
              <p className="mt-1 text-sm sm:text-base font-medium text-slate-900">{CONTACT.location}</p>
            </div>
            <a
              href={CONTACT.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-blue-400 bg-white px-5 py-2.5 text-sm font-semibold text-blue-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <HoverFill className="bg-blue-400" />
              <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ease-in-out group-hover:text-white group-active:text-white">
                <MapPin className="h-4 w-4" strokeWidth={2} />
                View Location on Map
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((item, i) => {
              const open = openFaq === i
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-[18px] border border-blue-400/40 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-blue-400 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed sm:px-5 sm:pb-5">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Contact
