import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Rocket, Shield, Heart, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

const storySteps = [
  {
    number: '01',
    title: 'Our Beginning',
    description:
      'Ideal Pack started with a simple goal — to make reliable packaging and hygiene products easily available for businesses of every size. From everyday essentials to sustainable packaging solutions, we continue to focus on quality, convenience and dependable service that helps our customers operate with confidence.',
  },
  {
    number: '02',
    title: 'Our Approach',
    description:
      'We focus on practical solutions, consistent quality and dependable supply to support the everyday needs of our customers. By understanding each business requirement, we provide reliable packaging and hygiene solutions that improve convenience, efficiency and confidence in daily operations.',
  },
  {
    number: '03',
    title: 'Our Promise',
    description:
      'We are committed to providing quality products, sustainable choices and reliable service businesses can depend on. Our promise is to maintain consistent standards, build lasting partnerships and deliver practical solutions that support our customers’ growth and everyday success.',
  },
]

function Icon({ children, className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      {children}
    </svg>
  )
}

function Counter({ target, suffix = '', duration = 2000, start }) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    let frameId
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [start, target, duration])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

const strengthStats = [
  {
    target: 3000,
    suffix: '+',
    label: 'Products',
    description: 'Wide range of premium packaging solutions.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8-4 8 4-8 4-8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8l8 4 8-4V8" />
      </>
    ),
  },
  {
    target: 10000,
    suffix: '+',
    label: 'Happy Customers',
    description: 'Trusted by businesses across industries.',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <circle cx="17" cy="9" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 19a4.2 4.2 0 0 1 5-3.8" />
      </>
    ),
  },
  {
    value: 'Fast Delivery',
    label: '',
    description: 'On-time, every time, every order.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  },
  {
    value: 'Quality Assured',
    label: '',
    description: 'Certified & tested for your safety.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </>
    ),
  },
]

const industries = [
  {
    label: 'Restaurants & Cafes',
    description: 'Reliable takeaway and food packaging solutions for everyday service.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v7a2 2 0 0 0 2 2v9M6 3v7M9 3v7M6 8h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3s-2 2-2 5 2 4 2 4v9" />
      </>
    ),
  },
  {
    label: 'Hotels',
    description: 'Premium packaging and hygiene supplies for hospitality operations.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V6a1 1 0 0 1 1-1h6v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 21V10h8a1 1 0 0 1 1 1v10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9h.01M7.5 13h.01M15 14h.01M15 17h.01" />
      </>
    ),
  },
  {
    label: 'Catering Companies',
    description: 'Practical bulk packaging solutions for events and food service.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 17a7 7 0 0 1 14 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10V5M9.5 5h5" />
      </>
    ),
  },
  {
    label: 'Bakeries',
    description: 'Packaging designed for cakes, pastries and bakery products.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12a7 7 0 0 1 14 0c0 1-1 1-1 1H6s-1 0-1-1Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h16l-1.5 8h-13L4 13Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5c0-1.5 1-2 1-3M13 7.5c0-1.5 1-2 1-3" />
      </>
    ),
  },
  {
    label: 'Supermarkets',
    description: 'Versatile food packaging and disposable products for retail needs.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l1.6 10.6a2 2 0 0 0 2 1.7h8a2 2 0 0 0 2-1.6L20 8H6" />
        <circle cx="9.5" cy="20" r="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="20" r="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Food Delivery Businesses',
    description: 'Secure packaging solutions designed for safe and convenient delivery.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h9v8H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11h4l3 2.5V16h-7z" />
        <circle cx="6.5" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

const testimonials = [
  {
    quote:
      'Ideal Pack has been our go-to packaging supplier for over a year now. Orders arrive on time, every time, and the quality is always consistent.',
    name: 'Restaurant Owner',
    role: 'Food & Beverage Business',
  },
  {
    quote:
      'Switching to their eco-friendly range was easy and the team helped us find the right products for our budget without compromising on quality.',
    name: 'Procurement Manager',
    role: 'Hotel Chain',
  },
  {
    quote:
      'Reliable supply, fair pricing and genuinely helpful support whenever we need something urgently. Exactly what a growing business needs.',
    name: 'Store Manager',
    role: 'Retail Business',
  },
]

const focusAreas = [
  {
    number: '01',
    title: 'Our Vision',
    icon: Eye,
    description:
      'To be the most trusted packaging and hygiene partner for businesses everywhere — known for quality, sustainability and dependable service at every scale.',
  },
  {
    number: '02',
    title: 'Our Mission',
    icon: Rocket,
    description:
      'To deliver reliable, high-quality packaging and hygiene solutions that support restaurants, cafés, retailers and businesses with practical, efficient and dependable products.',
  },
  {
    number: '03',
    title: 'Our Strength',
    icon: Shield,
    description:
      'A diverse product range, dependable supply, practical packaging solutions and a customer-focused approach that helps businesses operate more efficiently.',
  },
  {
    number: '04',
    title: 'Our Values',
    icon: Heart,
    description:
      'Quality, reliability, customer care, integrity and responsible business practices guide everything we do.',
  },
]

// Desktop-only horizontal offsets so the content card slides under the active
// step (420px card inside a max-w-4xl / 896px row) and its pointer stays aimed
// at that step.
const CARD_LEFT = ['0%', '15%', '40%', '55%']
const PTR_LEFT = ['28%', '50%', '50%', '72%']

function FocusCard({ item, activeKey, pointerLeft }) {
  return (
    <div className="relative rounded-2xl border border-blue-400/40 border-t-4 border-t-red-600 bg-white p-6 sm:p-7 shadow-sm shadow-blue-950/5">
      <span
        className="pointer-events-none absolute -top-2 h-4 w-4 rotate-45 rounded-[3px] border-l border-t border-blue-100 bg-white"
        style={{ left: pointerLeft, marginLeft: '-8px' }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.title}</h3>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function AboutUs() {
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)
  const [activeFocus, setActiveFocus] = useState(0)
  const [activeStory, setActiveStory] = useState(0)
  const [openIndustry, setOpenIndustry] = useState(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white">
      {/* SECTION 1 — ABOUT HERO */}
<section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50/30 to-white flex items-center justify-center px-4 sm:px-6 py-14 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px]">        <span className="pointer-events-none absolute -top-14 -left-14 w-56 h-56 rounded-full bg-blue-200/30 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-16 -right-8 w-64 h-64 rounded-full  blur-3xl" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            About Us
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Packaging Solutions Built Around Your Business
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Ideal Pack brings together premium packaging, eco-friendly materials and hygiene
            solutions under one roof — helping businesses operate reliably, sustainably and with
            confidence.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
            >
              Our Story
            </motion.p>
            <motion.span variants={fadeUp} className="mt-4 flex h-1 w-16 overflow-hidden rounded-full">
              <span className="w-1/2 bg-blue-400" />
              <span className="w-1/2 bg-red-600" />
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
            >
              Built on Quality. Driven by Reliability.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Ideal Pack was built to make quality packaging and hygiene supply simple, dependable
              and accessible for businesses of every size.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col">
            {storySteps.map((step, index) => {
              const isOpen = activeStory === index
              return (
                <div key={step.number} className="border-b border-blue-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActiveStory(isOpen ? null : index)}
                    className="w-full flex items-center gap-4 py-4 text-left"
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-red-600">{step.number}</span>
                    <span className="w-6 h-1 rounded-full bg-red-600 shrink-0" />
                    <span className="flex-1 text-sm sm:text-base font-semibold text-slate-900">
                      {step.title}
                    </span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-600 text-red-600 text-sm shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pb-4 pl-14 pr-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3 — OUR STRENGTH TODAY */}
      <section ref={statsRef} className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Our Strength
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Our Strength Today
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 justify-items-center"
        >
          {strengthStats.map((stat, index) => (
            <motion.div key={stat.label || stat.value} variants={fadeUp}>
              <motion.div
                animate={{ y: index % 2 === 0 ? [0, -15, 0] : [0, 15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                }}
              >
                <div className="group flex flex-col items-center justify-center text-center gap-2 w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] lg:w-[270px] lg:h-[270px] rounded-full mx-auto bg-white border border-blue-100 shadow-lg shadow-blue-950/15 hover:scale-103 hover:border-red-400 hover:shadow-xl hover:shadow-blue-950/25 transition-all duration-300">
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 text-red-600 shrink-0">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7">{stat.icon}</Icon>
                  </span>
                  <div className="mt-1 px-6">
                    <p className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                      {stat.target != null ? (
                        <Counter target={stat.target} suffix={stat.suffix} start={statsInView} />
                      ) : (
                        stat.value
                      )}
                    </p>
                    {stat.label && <p className="mt-1 text-xs sm:text-sm text-slate-500">{stat.label}</p>}
                    {stat.description && (
                      <p className="mt-1.5 text-[10px] sm:text-xs text-slate-400 leading-snug">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4 — INDUSTRIES WE SERVE */}
      <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Who We Serve
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Industries We Serve
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Packaging and hygiene solutions tailored for businesses across different industries.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4 sm:gap-5 max-w-5xl mx-auto"
          style={{ gridAutoRows: 'auto' }}
        >
          {industries.map((ind, index) => {
            const isOpen = openIndustry === index
            return (
              <motion.div
                key={ind.label}
                variants={fadeUp}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`${ind.label} — show details`}
                onClick={() => setOpenIndustry(isOpen ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpenIndustry(isOpen ? null : index)
                  }
                }}
                className={`group relative self-start cursor-pointer rounded-[18px] border px-4 py-3.5 sm:px-5 sm:py-4 shadow-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 md:cursor-default md:bg-white md:border-blue-400/40 md:shadow-sm md:hover:z-20 md:hover:bg-gradient-to-br md:hover:from-red-50 md:hover:to-red-100/60 md:hover:border-red-400 md:hover:shadow-lg md:hover:shadow-red-600/15 ${
                  isOpen
                    ? 'bg-gradient-to-br from-red-50 to-red-100/60 border-red-400 shadow-lg shadow-red-600/15'
                    : 'bg-white border-blue-400/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors duration-300 md:bg-blue-50 md:text-blue-400 md:group-hover:bg-red-600 md:group-hover:text-white ${
                      isOpen ? 'bg-red-600 text-white' : 'bg-blue-50 text-blue-400'
                    }`}
                  >
                    <Icon className="w-5 h-5">{ind.icon}</Icon>
                  </span>
                  <span className="flex-1 text-sm sm:text-base font-semibold text-slate-900 transition-transform duration-300 md:group-hover:-translate-y-0.5">
                    {ind.label}
                  </span>
                  <span className="hidden md:inline-flex text-red-400 group-hover:text-red-600 shrink-0 transition-all duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                  <span
                    className={`md:hidden flex items-center justify-center text-red-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </Icon>
                  </span>
                </div>

                {/* In-flow content: mobile driven by tap state, desktop driven by hover — card grows naturally, pushing the row below down */}
                <div
                  className={`overflow-hidden pl-[52px] transition-all duration-300 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-20 md:group-hover:opacity-100 md:group-hover:mt-2 ${
                    isOpen ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs text-slate-500 leading-snug pb-0.5">{ind.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* SECTION 5 — OUR FOUNDATION (VISION / MISSION / STRENGTH / VALUES) */}
      <section className="px-4 sm:px-6 md:px-16 py-14 sm:py-16 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Our Foundation
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            What Drives Ideal Pack
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            Our foundation, purpose, capabilities and values guide everything we do.
          </motion.p>
        </motion.div>

        {/* DESKTOP — horizontal 01 → 02 → 03 → 04 with a card that slides
            under the hovered step. Hover changes the step; it is never reset. */}
        <div className="hidden lg:block mt-12 max-w-4xl mx-auto">
          <div className="flex items-start justify-between">
            {focusAreas.map((step, index) => {
              const StepIcon = step.icon
              const active = activeFocus === index
              return (
                <Fragment key={step.title}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveFocus(index)}
                    onFocus={() => setActiveFocus(index)}
                    onClick={() => setActiveFocus(index)}
                    aria-pressed={active}
                    className="flex w-32 shrink-0 flex-col items-center gap-2 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                        active
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                          : 'border-2 border-blue-400/50 bg-white text-blue-400'
                      }`}
                    >
                      <StepIcon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <span
                      className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                        active ? 'text-red-600' : 'text-slate-400'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        active ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {index < focusAreas.length - 1 && (
                    <div className="flex flex-1 items-center px-2 pt-6">
                      <span className="h-px flex-1 bg-blue-400/40" />
                      <ChevronRight className="-ml-1 h-4 w-4 text-blue-400" strokeWidth={2.2} />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

          <div className="relative mt-8 min-h-[220px]">
            <div
              className="absolute w-[420px] transition-[left] duration-300 ease-out"
              style={{ left: CARD_LEFT[activeFocus] }}
            >
              <FocusCard
                item={focusAreas[activeFocus]}
                activeKey={activeFocus}
                pointerLeft={PTR_LEFT[activeFocus]}
              />
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET — stacked steps, card shown directly under the
            tapped step. Only one card is ever visible. */}
        <div className="lg:hidden mt-10 max-w-md mx-auto flex flex-col gap-3">
          {focusAreas.map((step, index) => {
            const StepIcon = step.icon
            const active = activeFocus === index
            return (
              <div key={step.title}>
                <button
                  type="button"
                  onClick={() => setActiveFocus(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    active ? 'border-red-400 bg-red-50/60' : 'border-blue-400/40 bg-white'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      active
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'border-2 border-blue-400/50 bg-white text-blue-400'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={`text-[11px] font-bold tracking-wide ${
                        active ? 'text-red-600' : 'text-slate-400'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        active ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </span>
                </button>

                {active && (
                  <div className="mt-3">
                    <FocusCard item={step} activeKey={activeFocus} pointerLeft="1.75rem" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Testimonials
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name + t.role}
              variants={fadeUp}
              className="flex flex-col rounded-[24px] bg-white border border-blue-400/40 border-t-4 border-t-red-600 shadow-md shadow-blue-950/5 p-6 sm:p-7"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 text-lg font-serif shrink-0">
                &ldquo;
              </span>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{t.quote}</p>
              <div className="mt-5 pt-4 border-t border-blue-100">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 7 — BUSINESS CTA */}
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Let&apos;s Work Together
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Packaging Solutions for Every Business
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Discover reliable packaging and hygiene solutions designed for your everyday business
            needs.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/products"
              className="group relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-md font-semibold text-red-600 bg-white border border-red-600 shadow-lg shadow-red-600/25 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 origin-left transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white group-active:text-white">Explore Products</span>
            </Link>
            <Link
              to="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-md font-semibold text-blue-500 bg-white border border-blue-400 hover:-translate-y-0.5 hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <span className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 origin-left transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Contact Us</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutUs
