import { ArrowUpRight } from 'lucide-react'
import FillButton from './FillButton'

const STORE_URL = 'https://idealpackstore.com/'

/** Shared final CTA used on the Blogs listing and Blog details pages. */
export default function BlogCta() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-[1180px] mx-auto rounded-2xl border border-blue-100 bg-white px-6 sm:px-10 py-14 sm:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight max-w-2xl mx-auto">
          Looking for the Right Packaging Product?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
          Explore our product range or browse the full catalogue on the Ideal Pack online store.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <FillButton to="/products">Explore Products</FillButton>
          <FillButton href={STORE_URL} external>
            Visit Online Store
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </FillButton>
        </div>
      </div>
    </section>
  )
}
