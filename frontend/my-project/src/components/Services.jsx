import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Utensils,
  Truck,
  Leaf,
  Boxes,
  SprayCan,
  Coffee,
  ChefHat,
  Hotel,
  CookingPot,
  Croissant,
  Bike,
  Store,
  BadgeCheck,
  LayoutGrid,
  Warehouse,
  Headset,
  Package,
  MessageCircle,
} from 'lucide-react'
import customImage from '../assets/ChatGPT Image Sep 4, 2026, 11_57_57 AM.png'
import FillButton from './FillButton'

const SHOP_URL = 'https://idealpackstore.com/'

const mainServices = [
  {
    number: '01',
    icon: Package,
    title: 'Packaging Products Supply',
    description:
      'Access a complete range of food containers, kraft packaging, foil containers, takeaway packaging, disposable products, cups, bags, wraps, and other everyday packaging essentials for commercial use.',
    points: [
      'Food & takeaway packaging',
      'Kraft & paper products',
      'Foil & disposable containers',
      'Cups, bags and wrapping materials',
    ],
    link: '/products',
  },
  {
    number: '02',
    icon: SprayCan,
    title: 'Hygiene & Cleaning Solutions',
    description:
      'Keep your workplace clean, safe, and professional with reliable hygiene products designed for restaurants, hotels, offices, retail spaces, and other commercial environments.',
    points: [
      'Tissues & paper products',
      'Cleaning supplies',
      'Hand hygiene products',
      'Commercial hygiene essentials',
    ],
    link: '/products',
  },
  {
    number: '03',
    icon: Boxes,
    title: 'Custom Packaging Solutions',
    description:
      'Create packaging that better fits your products and business requirements with customized packaging options, product selection support, and branding-focused solutions.',
    points: [
      'Custom sizes and requirements',
      'Packaging consultation',
      'Branding support',
      'Business-specific solutions',
    ],
    link: '/contact',
  },
  {
    number: '04',
    icon: Warehouse,
    title: 'Bulk & Wholesale Supply',
    description:
      'Get dependable bulk and wholesale supply for businesses that require consistent stock, larger quantities, and competitive commercial purchasing options.',
    points: [
      'Bulk quantity support',
      'Wholesale orders',
      'Regular business supply',
      'Scalable product availability',
    ],
    link: '/contact',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Delivery & Order Support',
    description:
      'We make business purchasing easier with organized order handling, responsive support, and efficient delivery coordination for your packaging and hygiene requirements.',
    points: [
      'Fast order processing',
      'Delivery coordination',
      'Repeat order support',
      'Business account assistance',
    ],
    link: '/contact',
  },
  {
    number: '06',
    icon: Headset,
    title: 'Product Consultation & Support',
    description:
      'Not sure which product is right for your business? Our team can guide you through product options and help you select suitable packaging and hygiene solutions.',
    points: [
      'Product selection guidance',
      'Requirement-based recommendations',
      'Business consultation',
      'After-sales assistance',
    ],
    link: '/contact',
  },
]

const customPoints = [
  'Product-specific packaging',
  'Bulk order solutions',
  'Custom branding support',
]

const industries = [
  { icon: Utensils, label: 'Restaurants' },
  { icon: Coffee, label: 'Cafés & Coffee Shops' },
  { icon: ChefHat, label: 'Catering Companies' },
  { icon: Hotel, label: 'Hotels & Hospitality' },
  { icon: CookingPot, label: 'Cloud Kitchens' },
  { icon: Croissant, label: 'Bakeries' },
  { icon: Bike, label: 'Food Delivery Businesses' },
  { icon: Store, label: 'Retail Businesses' },
]

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: 'Quality Products',
    description: 'Reliable packaging products suitable for professional business use.',
  },
  {
    icon: LayoutGrid,
    title: 'Wide Product Range',
    description:
      'Multiple packaging categories for different food service and commercial requirements.',
  },
  {
    icon: Warehouse,
    title: 'Bulk Supply Support',
    description:
      'Solutions suitable for businesses requiring regular or high-volume packaging supplies.',
  },
  {
    icon: Headset,
    title: 'Dedicated Assistance',
    description: 'Our team helps businesses identify suitable products based on their requirements.',
  },
]

function Services() {
  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-blue-50/40 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            Our Services
          </p>
          <span className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Packaging Solutions Built for Your Business
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            From reliable packaging supplies to customized solutions, we help businesses find
            practical, high-quality packaging products for their everyday operational needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <FillButton to="/products" variant="cta">
              Explore Products
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </FillButton>
            <FillButton to="/contact">Contact Us</FillButton>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            Our Services
          </p>
          <span className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Reliable Packaging &amp; Hygiene Solutions for Every Business
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            From everyday packaging supplies to customized business solutions, we support
            restaurants, hotels, catering companies, retailers, offices, and commercial businesses
            with dependable products, expert guidance, and efficient service.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you need bulk quantities, specialized packaging, or ongoing supply support, our
            team helps you choose the right solutions for your operational needs.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mainServices.map(({ icon: Ico, number, title, description, points, link }) => (
            <div
              key={number}
              className="group flex h-full flex-col rounded-[22px] border border-blue-100 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 ease-out group-hover:scale-105">
                  <Ico className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-bold tracking-[0.2em] text-blue-400">{number}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 w-4 h-4 shrink-0 text-blue-500" strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={link}
                className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        
      </section>

      {/* 3. CUSTOM PACKAGING */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="overflow-hidden rounded-2xl border border-blue-400/40 shadow-sm aspect-[4/3]">
            <img
              src={customImage}
              alt="Ideal Pack packaging solutions"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
              Custom Solutions
            </p>
            <span className="mt-4 flex h-1 w-16 overflow-hidden rounded-full">
              <span className="w-1/2 bg-blue-400" />
              <span className="w-1/2 bg-red-600" />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Packaging Tailored to Your Business
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every business has different packaging requirements. Our team can help you identify
              suitable packaging solutions based on your products, quantities and operational needs.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {customPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <FillButton to="/contact" variant="cta">Enquire About Custom Packaging</FillButton>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
              Industries
            </p>
            <span className="mx-auto mt-4 flex h-1 w-16 overflow-hidden rounded-full">
              <span className="w-1/2 bg-blue-400" />
              <span className="w-1/2 bg-red-600" />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Solutions for Different Business Needs
            </h2>
          </div>
          <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {industries.map(({ icon: Ico, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-xl border border-blue-400/40 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:shadow-sm"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-400">
                  <Ico className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="text-sm font-medium text-slate-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <span className="mx-auto flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-center">
            Why Choose Ideal Pack?
          </h2>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {whyChooseUs.map(({ icon: Ico, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-blue-400/40 bg-white p-6 transition-colors duration-300 hover:border-red-400"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-400">
                  <Ico className="w-6 h-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto rounded-2xl border border-white bg-white px-6 sm:px-10 py-14 sm:py-16 text-center">
          <span className="mx-auto flex h-1 w-16 overflow-hidden rounded-full">
            <span className="w-1/2 bg-blue-400" />
            <span className="w-1/2 bg-red-600" />
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight max-w-2xl mx-auto">
            Need a Packaging Solution for Your Business?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Talk to our team about your packaging requirements and find the right solution for your
            business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <FillButton to="/contact" variant="cta">Contact Us</FillButton>
            <FillButton href={SHOP_URL} external>
              Visit Online Store
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </FillButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services