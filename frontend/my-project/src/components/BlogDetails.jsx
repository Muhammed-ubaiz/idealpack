import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { blogs, formatDate } from '../data/blogs'
import FillButton from './FillButton'
import BlogCta from './BlogCta'

function Section({ title, children }) {
  return (
    <>
      <h2 className="mt-12 flex items-center gap-3 text-2xl sm:text-[1.7rem] font-bold text-slate-900 tracking-tight">
        <span className="h-6 w-1.5 rounded-full bg-red-600" />
        {title}
      </h2>
      {children}
    </>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[1.05rem] leading-8 text-slate-600">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function BlogDetails() {
  const { slug } = useParams()
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return (
      <div className="bg-white px-4 py-24 text-center">
        <p className="text-xl font-bold text-slate-900">Guide Not Found</p>
        <p className="mt-2 text-sm text-slate-500">
          This guide doesn&apos;t exist or may have been moved.
        </p>
        <Link
          to="/blogs"
          className="mt-6 inline-block text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          &larr; Back to Blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <article className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* back link — aligned to the main content container's left edge */}
        <div className="max-w-[1180px] mx-auto">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>

        {/* header */}
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="h-3.5 w-1 rounded-full bg-red-600" />
            {blog.category}
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-[1.1]">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-slate-400">{formatDate(blog.date)}</p>
        </div>

        {/* hero image */}
        <div className="mt-10 max-w-4xl mx-auto overflow-hidden rounded-2xl border border-blue-400/40 bg-white">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* body */}
        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-[1.05rem] leading-8 text-slate-600">{blog.intro}</p>

          <Section title="Key Benefits">
            <BulletList items={blog.benefits} />
          </Section>

          <Section title="Recommended Uses">
            <BulletList items={blog.uses} />
          </Section>

          <Section title="Suitable Businesses">
            <BulletList items={blog.businesses} />
          </Section>

          <Section title="Why It's Practical">
            <p className="mt-5 text-[1.05rem] leading-8 text-slate-600">{blog.practical}</p>
          </Section>

          <div className="mt-7 rounded-xl border border-blue-400/40 border-l-4 border-l-red-600 bg-blue-50/60 p-5 sm:p-6 text-[1rem] leading-7 text-slate-700">
            <span className="mr-2 font-semibold text-red-600">Tip</span>
            {blog.tip}
          </div>

          <Section title="Related Packaging Options">
            <p className="mt-5 text-[1.05rem] leading-8 text-slate-600">{blog.relatedOptions}</p>
          </Section>

          <div className="mt-10">
            <FillButton href={blog.shopUrl} external variant="cta">
              Shop Now
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </FillButton>
          </div>
        </div>
      </article>

      {/* RELATED PRODUCTS */}
      {blog.relatedProducts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t-2 border-blue-100 bg-white">
          <div className="max-w-[1180px] mx-auto">
            <span className="flex h-1 w-16 overflow-hidden rounded-full">
              <span className="w-1/2 bg-blue-400" />
              <span className="w-1/2 bg-red-600" />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Related Products  
            </h2>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {blog.relatedProducts.map((product) => (
                <div
                  key={product.url}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-blue-400/40 bg-white transition-colors duration-300 hover:border-red-400"
                >
                  <div className="aspect-square overflow-hidden bg-white p-4 sm:p-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 pt-0">
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                      {product.name}
                    </h3>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      Shop Now
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BlogCta />
    </div>
  )
}

export default BlogDetails
