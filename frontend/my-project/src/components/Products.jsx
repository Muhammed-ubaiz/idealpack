import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, BadgeCheck, Briefcase, ArrowRight } from 'lucide-react'
import { categories, products } from '../data/products'

// URL-safe category slugs the ?category= query param is validated against.
const validCategoryIds = categories.map((category) => category.id)

/** Resolve the active category from the URL, falling back to 'all'. */
const readCategoryParam = (params) => {
  const value = params.get('category')
  return value && validCategoryIds.includes(value) ? value : 'all'
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const featureItems = [
  {
    title: 'Food Safe',
    description: 'Materials that meet food-contact safety standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliable Quality',
    description: 'Consistent quality checked before every dispatch.',
    icon: BadgeCheck,
  },
  {
    title: 'Business Ready',
    description: 'Built for daily use across restaurants, hotels and retail.',
    icon: Briefcase,
  },
]

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  // The URL (?category=slug) is the single source of truth for the active
  // category, so deep links, refreshes and Back/Forward all resolve correctly.
  const activeCategory = readCategoryParam(searchParams)

  const [searchQuery, setSearchQuery] = useState('')
  const gridRef = useRef(null)

  // Single entry point for changing the category: writes the slug to the URL
  // (or clears it for "all"), which re-renders and updates the highlighted tab.
  const selectCategory = (categoryId) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (categoryId && categoryId !== 'all') {
          next.set('category', categoryId)
        } else {
          next.delete('category')
        }
        return next
      },
      { replace: false },
    )
  }

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [searchQuery, activeCategory])

  const goToCategory = (categoryId) => {
    selectCategory(categoryId)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // One tab pill. `isClone` marks the duplicated set used only for the
  // mobile marquee loop — hidden from `sm` up and from assistive tech.
  const renderCategoryTab = (cat, isClone) => {
    const isActive = activeCategory === cat.id
    return (
      <button
        key={isClone ? `${cat.id}-clone` : cat.id}
        type="button"
        aria-hidden={isClone || undefined}
        tabIndex={isClone ? -1 : undefined}
        onClick={() => selectCategory(cat.id)}
        className={`${
          isClone ? 'sm:hidden ' : ''
        }shrink-0 whitespace-nowrap mr-2 sm:mr-0 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          isActive
            ? 'bg-blue-400 text-white shadow-md shadow-blue-400/30'
            : 'bg-white text-blue-950 border border-blue-100 hover:border-blue-300'
        }`}
      >
        {cat.label}
      </button>
    )
  }

  return (
    <div className="bg-white">
      {/* 1. PRODUCT HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-50/30 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-14 min-h-[380px] sm:min-h-[420px] lg:min-h-[480px]">
        <span className="pointer-events-none absolute -top-14 -left-14 w-56 h-56 rounded-full bg-blue-200/30 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-16 -right-8 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative max-w-2xl mx-auto text-center w-full"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Our Products
          </motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-4 block w-14 h-px bg-blue-400" />
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 tracking-tight leading-[1.15]"
          >
            Packaging Solutions for Every Need
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore our wide range of reliable packaging, disposable and hygiene solutions
            designed for food service, retail and everyday business needs.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 relative max-w-[650px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-blue-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl bg-white border border-blue-100 shadow-md shadow-blue-950/5 pl-11 pr-4 py-3.5 text-sm text-blue-950 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. CATEGORY FILTER */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white border-b border-blue-50">
        {/* Mobile: single-row auto-sliding marquee (track holds the list twice).
            sm and up: the marquee is inert and this is the existing wrapped,
            centered layout. */}
        <div className="no-scrollbar overflow-x-auto sm:overflow-visible">
          <div className="category-marquee flex w-max sm:w-auto sm:max-w-[1280px] sm:mx-auto sm:flex-wrap sm:justify-center sm:gap-2.5">
            {categories.map((cat) => renderCategoryTab(cat, false))}
            {categories.map((cat) => renderCategoryTab(cat, true))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section ref={gridRef} className="px-3 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight"
            >
              Explore Our Products
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Practical and reliable packaging solutions for businesses of every size.
            </motion.p>
          </motion.div>

          {filteredProducts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeUp} className="h-full">
                  <Link
                    to={`/products/${product.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
                  >
                    <div className="flex h-[150px] sm:h-64 items-center justify-center bg-white p-3 sm:p-8">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 border-t border-slate-100 p-3 sm:p-6">
                      <span className="text-xs sm:text-sm font-medium text-blue-500 uppercase tracking-wide">
                        {product.categoryLabel}
                      </span>
                      <h3 className="mt-1.5 sm:mt-2 text-sm sm:text-lg font-semibold text-slate-900 line-clamp-2 min-h-[40px] sm:min-h-0">
                        {product.name}
                      </h3>
                      <span className="mt-auto pt-3 sm:pt-6 inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-blue-500 group-hover:text-blue-600 transition-colors">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-base sm:text-lg font-semibold text-blue-950">No products found</p>
              <p className="mt-2 text-sm text-slate-500">Try changing your search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* 7. FEATURED PRODUCT STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16 bg-blue-50/40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
            >
              Packaging Made Practical
            </motion.p>
            <motion.span variants={fadeUp} className="mt-4 block w-14 h-px bg-blue-400" />
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-blue-950 tracking-tight leading-tight"
            >
              Reliable Solutions for Everyday Business Needs
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              From food packaging to hygiene essentials, our product range is selected to support
              reliable day-to-day business operations.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featureItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-3 rounded-2xl bg-white border border-blue-100 p-5"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-50 text-blue-400">
                  <item.icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <h3 className="text-sm font-bold text-blue-950">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-snug">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 8. PRODUCT CATEGORIES VISUAL SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight"
          >
            Shop by Category
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-10 sm:mt-12 max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {categories
            .filter((c) => c.id !== 'all')
            .map((cat) => (
              <motion.button
                key={cat.id}
                type="button"
                variants={fadeUp}
                onClick={() => goToCategory(cat.id)}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-blue-950/10 hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-contain p-4 scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{cat.label}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-300 group-hover:text-white transition-colors">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
        </motion.div>
      </section>

      {/* 9. BUSINESS CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-[1280px] mx-auto rounded-[24px] border border-blue-100 bg-white px-6 sm:px-10 py-14 sm:py-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-blue-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Need Assistance?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 tracking-tight max-w-2xl mx-auto"
          >
            Need Help Choosing the Right Product?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto"
          >
            Our team can help you find the right packaging and hygiene solutions for your
            business requirements.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/contact"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold bg-white text-blue-600 border border-blue-200"
            >
              <span className="absolute inset-0 bg-blue-500 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Contact Us
              </span>
            </Link>
            <a
              href="https://idealpackstore.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold bg-white text-blue-600 border border-blue-200"
            >
              <span className="absolute inset-0 bg-blue-500 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 inline-flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                Visit Online Store
                <span className="transition-transform duration-300 group-hover:translate-x-1">&#8599;</span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Products
