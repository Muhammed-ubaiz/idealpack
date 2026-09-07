import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import heroVideo from '../assets/hero section.mp4'
import productsImage from '../assets/ChatGPT Image Sep 1, 2026, 03_43_39 PM.png'
import kraftPackagingImage from '../assets/ChatGPT Image Sep 2, 2026, 03_31_56 PM.png'
import foilContainersImage from '../assets/ChatGPT Image Sep 2, 2026, 03_36_23 PM.png'
import foodContainersImage from '../assets/ChatGPT Image Sep 2, 2026, 03_37_49 PM.png'
import tissuesNapkinsImage from '../assets/ChatGPT Image Sep 2, 2026, 03_39_33 PM.png'
import clingFilmBagsImage from '../assets/ChatGPT Image Sep 2, 2026, 03_40_25 PM.png'
import hygieneSolutionsImage from '../assets/ChatGPT Image Sep 2, 2026, 03_41_59 PM.png'

const heroFeatures = [
  {
    label: 'Premium Quality',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    label: 'Eco-Friendly',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 4 7 4 11c0 5 4 9 8 10 4-1 8-5 8-10 0-4-3-8-8-8Z" />
    ),
  },
  {
    label: 'Hygiene Solutions',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z"
      />
    ),
  },
]

const bottomFeatures = [
  {
    label: 'Eco-Friendly Solutions',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 4 7 4 11c0 5 4 9 8 10 4-1 8-5 8-10 0-4-3-8-8-8Z" />
    ),
  },
  {
    label: 'Food Safe & Hygienic',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />,
  },
  {
    label: 'Wide Range of Products',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 12a7 7 0 0 1-.1 1.2l2 1.6-2 3.4-2.3-1a7 7 0 0 1-2 1.2L14 21h-4l-.6-2.6a7 7 0 0 1-2-1.2l-2.3 1-2-3.4 2-1.6A7 7 0 0 1 5 12a7 7 0 0 1 .1-1.2l-2-1.6 2-3.4 2.3 1a7 7 0 0 1 2-1.2L10 3h4l.6 2.6a7 7 0 0 1 2 1.2l2.3-1 2 3.4-2 1.6c.07.4.1.8.1 1.2Z"
        />
      </>
    ),
  },
  {
    label: 'Timely Delivery Assurance',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v9H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Dedicated Support',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 13a8 8 0 0 1 16 0M4 13v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1Zm16 0v4a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 1 1Z"
      />
    ),
  },
]

const productCategories = [
  { label: 'Kraft Packaging', image: kraftPackagingImage, position: 'center' },
  { label: 'Foil Containers', image: foilContainersImage, position: 'center' },
  { label: 'Food Containers', image: foodContainersImage, position: 'center' },
  { label: 'Tissues & Napkins', image: tissuesNapkinsImage, position: 'center' },
  { label: 'Cling Film & Bags', image: clingFilmBagsImage, position: 'center' },
  { label: 'Hygiene Solutions', image: hygieneSolutionsImage, position: 'center' },
]

const industries = [
  {
    label: 'Restaurants & Cafes',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v7a2 2 0 0 0 2 2v9M6 3v7M9 3v7M6 8h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3s-2 2-2 5 2 4 2 4v9" />
      </>
    ),
  },
  {
    label: 'Hotels',
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

const services = [
  {
    title: 'Bulk Supply',
    description:
      'Large-volume packaging and hygiene supplies delivered consistently, so your business never runs short.',
    span: 'lg:col-span-2',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8-4 8 4-8 4-8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8l8 4 8-4V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8" />
      </>
    ),
  },
  {
    title: 'Custom Packaging Solutions',
    description: 'Tailored sizes, branding and materials designed around your product and business needs.',
    span: '',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8-4 8 4-8 4-8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8l8 4 8-4V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 12.5l6-6 2 2-6 6h-2v-2Z" />
      </>
    ),
  },
  {
    title: 'Fast & Reliable Delivery',
    description: 'Timely dispatch and dependable logistics that keep your operations running smoothly.',
    span: '',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v9H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="18" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Business Support',
    description: 'Dedicated account support to help you choose the right products and scale with confidence.',
    span: 'lg:col-span-2',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 13a8 8 0 0 1 16 0M4 13v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1Zm16 0v4a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 1 1Z"
      />
    ),
  },
]

const trustStats = [
  {
    target: 100,
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
    target: 500,
    suffix: '+',
    label: 'Happy Clients',
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

function Home() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()

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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 55, damping: 20, mass: 0.6 }
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const rawBgY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const rawContentY = useTransform(scrollYProgress, [0, 1], [0, -12])

  const bgScale = useSpring(rawScale, springConfig)
  const bgY = useSpring(rawBgY, springConfig)
  const contentY = useSpring(rawContentY, springConfig)

  return (
    <section className="bg-white">
      <div ref={heroRef} className="relative overflow-hidden min-h-[85vh] md:min-h-screen">
        <motion.video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={prefersReducedMotion ? undefined : { scale: bgScale, y: bgY }}
        />
        <div className="absolute inset-0 bg-blue-950/55" />

        <motion.div
          className="relative z-10 flex min-h-[85vh] md:min-h-screen items-center justify-center px-4 sm:px-6 text-center"
          style={prefersReducedMotion ? undefined : { y: contentY }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full max-w-187"
          >
            <motion.p
              variants={fadeUp}
              className="text-blue-400 text-xs sm:text-sm md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase"
            >
              Complete Packaging Range
            </motion.p>

            <motion.span
              variants={fadeUp}
              className="mx-auto mt-4 block w-14 h-px bg-white/80"
            />

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-white"
            >
              PACKAGING &amp; HYGIENE <span className="text-blue-400">SOLUTIONS</span>
              <br />
              FOR EVERY NEED
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-200/90 max-w-100 sm:max-w-140 mx-auto leading-relaxed"
            >
              Premium packaging, eco-friendly and hygiene solutions — all in one place.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4"
            >
              {heroFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-400 shrink-0">{f.icon}</Icon>
                  <span className="text-xs sm:text-sm text-white/90 font-medium">{f.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <button className="group relative overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-md font-semibold text-white bg-transparent border border-white/40 hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10">Explore Products &rarr;</span>
              </button>
              <button className="group relative overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-md font-semibold text-white bg-white/5 backdrop-blur-sm border border-white/40 hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10">Contact Us &rarr;</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-16 py-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mt-6 relative"
        >
          {bottomFeatures.map((f) => (
            <motion.div
              key={f.label}
              variants={fadeUp}
              className="group relative flex flex-col items-center text-center gap-3 overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 px-4 py-6 shadow-md shadow-blue-950/5 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300"
            >
              <span className="pointer-events-none absolute -top-6 -right-6 w-16 h-16 rounded-full bg-blue-200/40 blur-2xl" />

              <span className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7">{f.icon}</Icon>
              </span>
              <span className="relative text-xs sm:text-sm font-semibold text-blue-950">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-16 py-12 sm:py-14 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[850px] mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            About Us
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight"
          >
            Your Trusted Packaging Partner
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Ideal Pack provides reliable packaging, eco-friendly materials and hygiene solutions for
            businesses of every size, with a strong focus on quality, sustainability and everyday
            convenience.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-950 font-medium"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              100+ Products
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Eco-Friendly
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              500+ Happy Clients
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5">
            <Link
              to="/about"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-600 transition-colors"
            >
              Learn More
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Our Product Categories
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950 tracking-tight leading-snug"
          >
            Explore Our Products
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {productCategories.map((c) => (
            <motion.div
              key={c.label}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-blue-950/10 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`h-[180px] sm:h-[200px] md:h-auto md:aspect-[4/3] shrink-0 overflow-hidden ${
                  c.image ? 'bg-white' : ''
                }`}
              >
                <img
                  src={c.image || productsImage}
                  alt={c.label}
                  className={`w-full h-full transition-transform duration-500 ${
                    c.image
                      ? 'object-contain p-4 scale-100 group-hover:scale-105'
                      : 'object-cover scale-125 group-hover:scale-135'
                  }`}
                  style={{ objectPosition: c.position }}
                />
              </div>
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/10 to-transparent" />

              <div className="relative flex-1 p-4 sm:p-5 md:absolute md:inset-x-0 md:bottom-0 md:flex-none">
                <h3 className="font-semibold text-base text-slate-900 md:text-white">{c.label}</h3>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 md:text-blue-300 md:hover:text-white transition-colors"
                >
                  View Products
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div ref={statsRef} className="px-4 sm:px-6 md:px-16 py-20 sm:py-24 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 justify-items-center"
        >
          {trustStats.map((stat, index) => (
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
                <div className="group flex flex-col items-center justify-center text-center gap-2 w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] lg:w-[270px] lg:h-[270px] rounded-full mx-auto bg-gradient-to-br from-white to-blue-50/70 border border-blue-200 shadow-lg shadow-blue-400/10 hover:scale-103 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/30 transition-all duration-300">
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 text-blue-400 shrink-0">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7">{stat.icon}</Icon>
                  </span>
                  <div className="mt-1 px-6">
                    <p className="text-lg sm:text-xl font-bold text-blue-950 leading-tight">
                      {stat.target != null ? (
                        <Counter target={stat.target} suffix={stat.suffix} start={statsInView} />
                      ) : (
                        stat.value
                      )}
                    </p>
                    {stat.label && (
                      <p className="mt-1 text-xs sm:text-sm text-slate-500">{stat.label}</p>
                    )}
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
      </div>

      <div className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Who We Serve
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight"
          >
            Industries We Serve
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {industries.map((ind) => (
            <motion.div
              key={ind.label}
              variants={fadeUp}
              className="group relative flex flex-col items-center text-center gap-3 overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 px-6 py-7 shadow-md shadow-blue-950/5 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300"
            >
              <span className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-200/40 blur-2xl" />

              <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7">{ind.icon}</Icon>
              </span>
              <span className="relative text-sm sm:text-base font-semibold text-blue-950">{ind.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Our Services
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight"
          >
            Packaging Solutions Built for Your Business
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            From bulk orders to custom branding, reliable delivery and dedicated support — everything
            your business needs, in one place.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-6 sm:p-8 shadow-md shadow-blue-950/5 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300 ${s.span}`}
            >
              <span className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-200/30 blur-3xl" />
              <span className="pointer-events-none absolute -top-8 -left-8 w-20 h-20 rounded-full bg-blue-100/40 blur-2xl" />

              <span className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors duration-300">
                <Icon className="w-7 h-7">{s.icon}</Icon>
              </span>

              <h3 className="relative mt-5 text-lg sm:text-xl font-bold text-blue-950">{s.title}</h3>
              <p className="relative mt-2 text-sm text-slate-600 leading-relaxed max-w-100">
                {s.description}
              </p>

              <a
                href="#"
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-600 transition-colors"
              >
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="px-4 sm:px-6 md:px-16 py-12 sm:py-16 bg-white text-center"
      >
        <a
          href="https://idealpackstore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-blue-950 bg-white border border-blue-950/15 overflow-hidden hover:-translate-y-0.5 hover:text-white transition-all duration-300 shadow-md shadow-blue-950/10"
        >
          <span className="absolute inset-0 bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          <span className="relative z-10 inline-flex items-center gap-2">
            <Icon className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8V6a3 3 0 0 1 6 0v2" />
            </Icon>
            Shop Online
            <span className="transition-transform duration-300 group-hover:translate-x-1">&#8599;</span>
          </span>
        </a>
      </motion.div>
    </section>
  )
}

export default Home
