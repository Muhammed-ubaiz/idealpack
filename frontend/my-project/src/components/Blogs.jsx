import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogs, formatDate } from '../data/blogs'
import BlogCta from './BlogCta'

const featured = blogs.find((b) => b.featured) || blogs[0]
const rest = blogs.filter((b) => b !== featured)

function Blogs() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase">
            Ideal Pack Journal
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05]">
            Product Guides &amp; Packaging Stories
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Practical guides to Ideal Pack products and packaging categories — what they are, where
            they work best and which businesses they suit.
          </p>
        </div>
      </section>

      {/* FEATURED GUIDE */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-[1180px] mx-auto">
          <Link
            to={`/blogs/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-3 overflow-hidden rounded-2xl bg-white">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-2">
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">
                {featured.category}
              </p>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-[2.1rem] font-bold text-slate-900 tracking-tight leading-tight transition-colors group-hover:text-blue-600">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {featured.excerpt}
              </p>
              <p className="mt-5 text-xs text-slate-400">{formatDate(featured.date)}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                Read Guide
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ALL GUIDES */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-slate-100">
        <div className="max-w-[1180px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Product Guides
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {rest.map((post) => (
              <Link key={post.id} to={`/blogs/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl bg-white">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-blue-600 text-[11px] font-semibold tracking-[0.16em] uppercase">
                  {post.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug transition-colors group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">{formatDate(post.date)}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <BlogCta />
    </div>
  )
}

export default Blogs
