import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { CONTACT } from '../data/contact'

/**
 * WhatsApp business number in international format — digits only,
 * no "+", spaces or dashes. Update this to the real store number.
 */
const WHATSAPP_NUMBER = '910000000000'

/**
 * ProductDetails
 *
 * Clean, data-driven product detail page. Renders only:
 *   - product name
 *   - product images (1 main + up to 5 clickable thumbnails)
 *   - category / sub-category
 *   - short description
 *   - action buttons (Enquire Now / WhatsApp / Shop Now)
 *
 * Data source (in priority order):
 *   1. `product` prop  -> use directly (reusable anywhere)
 *   2. route param `:slug` -> looked up in src/data/products.js
 *
 * Expected product shape:
 *   {
 *     name: string,
 *     image?: string,               // single image (fallback)
 *     images?: string[],            // gallery (main = images[0])
 *     categoryLabel?: string,       // e.g. "Kraft Packaging"
 *     category?: string,            // used only if categoryLabel missing
 *     subCategory?: string,         // optional, shown after " / "
 *     shortDescription: string,
 *     shopUrl?: string,             // Ideal Pack online store product link
 *     storeUrl?: string,            // fallback used if shopUrl is missing
 *   }
 */
function WhatsAppIcon({ className = 'w-4.5 h-4.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function ShoppingBagIcon({ className = 'w-4.5 h-4.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function ProductDetails({ product: productProp }) {
  const { slug } = useParams()
  const product = productProp || products.find((p) => p.slug === slug)

  const gallery = useMemo(() => {
    if (!product) return []
    const list =
      Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image]
    return list.filter(Boolean).slice(0, 5)
  }, [product])

  const [activeImage, setActiveImage] = useState(0)
  const [loadedSrc, setLoadedSrc] = useState(null)

  // Amazon-style magnifier state.
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [canZoom, setCanZoom] = useState(false)
  const zoomFrame = useRef(0)

  // Reset the gallery whenever a different product is shown.
  useEffect(() => {
    setActiveImage(0)
    setIsZoomed(false)
  }, [product?.slug, product?.name])

  // Enable the mouse-position zoom only on devices with a real hovering
  // pointer (desktop). Touch devices tap thumbnails instead.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setCanZoom(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  // Cancel any queued zoom frame on unmount.
  useEffect(() => () => cancelAnimationFrame(zoomFrame.current), [])

  if (!product) {
    return (
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-xl font-bold text-slate-900">Product Not Found</p>
        <p className="mt-2 text-sm text-slate-500">
          The product you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          &larr; Back to Products
        </Link>
      </div>
    )
  }

  const categoryText = [product.categoryLabel || product.category, product.subCategory]
    .filter(Boolean)
    .join('  /  ')

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in "${product.name}". Could you share more details?`,
  )}`

  // Per-product Ideal Pack online store link (falls back to storeUrl).
  const shopUrl = product.shopUrl || product.storeUrl

  // "Enquire Now" opens a sales email pre-filled with the product name.
  const enquiryHref = `${CONTACT.emailSalesHref}?subject=${encodeURIComponent(
    `Product enquiry: ${product.name}`,
  )}`

  const mainSrc = gallery[activeImage]

  // Track the cursor over the main image and drive transform-origin.
  // requestAnimationFrame keeps it smooth without flooding React with renders.
  const handleZoomMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - left) / width) * 100
    const y = ((event.clientY - top) / height) * 100
    cancelAnimationFrame(zoomFrame.current)
    zoomFrame.current = requestAnimationFrame(() => {
      setZoomPosition({
        x: Math.min(100, Math.max(0, x)),
        y: Math.min(100, Math.max(0, y)),
      })
    })
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* LEFT — image gallery */}
          <div className="lg:sticky lg:top-24">
            {/* Main image — Amazon-style mouse-position zoom on desktop */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative flex aspect-square items-center justify-center p-6 sm:p-10">
                <img
                  src={mainSrc}
                  alt={product.name}
                  onLoad={() => setLoadedSrc(mainSrc)}
                  onError={() => setLoadedSrc(mainSrc)}
                  onMouseEnter={canZoom ? () => setIsZoomed(true) : undefined}
                  onMouseMove={canZoom ? handleZoomMove : undefined}
                  onMouseLeave={canZoom ? () => setIsZoomed(false) : undefined}
                  style={{
                    transform: isZoomed ? 'scale(2.3)' : 'scale(1)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed
                      ? 'none'
                      : 'transform 250ms ease-out, opacity 200ms ease-out',
                    willChange: 'transform',
                  }}
                  className={`h-full w-full object-contain ${canZoom ? 'cursor-zoom-in' : ''} ${
                    loadedSrc === mainSrc ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>

            {/* Thumbnails — hover to change on desktop, tap on mobile/tablet */}
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2.5 sm:gap-3">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onMouseEnter={() => setActiveImage(index)}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-current={activeImage === index}
                    className={`flex aspect-square items-center justify-center rounded-xl border bg-white p-1.5 transition-all duration-200 hover:border-blue-400 sm:p-2 ${
                      activeImage === index
                        ? 'border-blue-500 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-blue-50/40'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — product info */}
          <div className="lg:pt-2">
            {categoryText && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500 sm:text-sm">
                {categoryText}
              </p>
            )}

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {product.shortDescription}
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={enquiryHref}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
              >
                Enquire Now
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1ebe5b] sm:w-auto"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
                WhatsApp
              </a>

              <a
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 sm:w-auto"
              >
                <ShoppingBagIcon className="w-4.5 h-4.5" />
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export { ProductDetails }
export default ProductDetails
