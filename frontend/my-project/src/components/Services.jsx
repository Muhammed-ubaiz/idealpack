import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Utensils,
  Truck,
  Leaf,
  PencilRuler,
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
} from 'lucide-react'
import customImage from '../assets/ChatGPT Image Sep 4, 2026, 11_57_57 AM.png'
import FillButton from './FillButton'

const SHOP_URL = 'https://idealpackstore.com/'

const mainServices = [
  {
    no: '01',
    icon: Utensils,
    title: 'Food Packaging Solutions',
    description:
      'Practical packaging solutions for restaurants, cafés, cloud kitchens, catering companies and takeaway businesses.',
  },
  {
    no: '02',
    icon: Truck,
    title: 'Takeaway & Delivery Packaging',
    description:
      'Reliable packaging products designed to keep food protected, presentable and convenient during takeaway and delivery.',
  },
  {
    no: '03',
    icon: Leaf,
    title: 'Kraft Packaging Solutions',
    description:
      'A range of kraft paper packaging options for businesses looking for practical and environmentally conscious packaging choices.',
  },
  {
    no: '04',
    icon: PencilRuler,
    title: 'Custom Packaging Solutions',
    description:
      'Packaging solutions tailored to specific business requirements, product sizes, applications and branding needs.',
  },
  {
    no: '05',
    icon: Boxes,
    title: 'Bulk Supply',
    description:
      'Reliable bulk packaging supply for restaurants, retailers, hospitality businesses and other commercial operations.',
  },
  {
    no: '06',
    icon: SprayCan,
    title: 'Hygiene & Disposable Solutions',
    description:
      'Essential disposable and hygiene products that help businesses maintain clean and efficient day-to-day operations.',
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
          <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            Our Services
          </p>
          <span className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Packaging Solutions Built for Your Business
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            From reliable packaging supplies to customized solutions, we help businesses find
            practical, high-quality packaging products for their everyday operational needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <FillButton to="/products">
              Explore Products
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </FillButton>
            <FillButton to="/contact">Contact Us</FillButton>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            What We Offer
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Complete Packaging Solutions Under One Roof
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            We support businesses with dependable packaging products and tailored solutions designed
            for food service, retail, hospitality, catering and other commercial requirements.
          </p>
        </div>
      </section>

      {/* 3. MAIN SERVICES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mainServices.map(({ no, icon: Ico, title, description }) => (
            <div
              key={no}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-500 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white">
                  <Ico className="w-6 h-6" strokeWidth={1.8} />
                </span>
                <span className="text-sm font-semibold text-slate-300">{no}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{description}</p>
              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CUSTOM PACKAGING */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white border-y border-blue-100">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm aspect-[4/3]">
            <img
              src={customImage}
              alt="Ideal Pack packaging solutions"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
              Custom Solutions
            </p>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Packaging Tailored to Your Business
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every business has different packaging requirements. Our team can help you identify
              suitable packaging solutions based on your products, quantities and operational needs.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {customPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-500 shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <FillButton to="/contact">Enquire About Custom Packaging</FillButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES WE SERVE */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
              Industries
            </p>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Solutions for Different Business Needs
            </h2>
          </div>
          <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {industries.map(({ icon: Ico, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-500">
                  <Ico className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="text-sm font-medium text-slate-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white border-y border-blue-100">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-center">
            Why Choose Ideal Pack?
          </h2>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {whyChooseUs.map(({ icon: Ico, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-blue-200"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-500">
                  <Ico className="w-6 h-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto rounded-2xl border border-blue-100 bg-white px-6 sm:px-10 py-14 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight max-w-2xl mx-auto">
            Need a Packaging Solution for Your Business?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Talk to our team about your packaging requirements and find the right solution for your
            business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <FillButton to="/contact">Contact Us</FillButton>
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
