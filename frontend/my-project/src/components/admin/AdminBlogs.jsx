import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { ExternalLink, Eye, ImagePlus, LogOut, Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react'
import { auth } from '../../config/firebase'
import { products } from '../../data/products'
import {
  addBlog,
  deleteBlog,
  formatDate,
  imageFileToDataUrl,
  slugify,
  subscribeBlogs,
  updateBlog,
} from '../../lib/blogStore'
import {
  alertError,
  alertSuccess,
  alertValidation,
  closeAlert,
  confirmAction,
  showLoading,
} from '../../lib/alerts'
import useAdminAuth from './useAdminAuth'
import logo from '../../assets/ChatGPT Image Sep 2, 2026, 10_50_55 AM.png'

const STORE = 'https://idealpackstore.com'
const MAX_RELATED = 4

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = () => ({
  title: '',
  category: '',
  date: today(),
  excerpt: '',
  intro: '',
  benefits: '',
  uses: '',
  businesses: '',
  practical: '',
  tip: '',
  relatedOptions: '',
  shopUrl: '',
  featured: false,
})

/** Form values for an existing post (lists become one item per line). */
const formFromPost = (post) => ({
  title: post.title || '',
  category: post.category || '',
  date: post.date || today(),
  excerpt: post.excerpt || '',
  intro: post.intro || '',
  benefits: (post.benefits || []).join('\n'),
  uses: (post.uses || []).join('\n'),
  businesses: (post.businesses || []).join('\n'),
  practical: post.practical || '',
  tip: post.tip || '',
  relatedOptions: post.relatedOptions || '',
  shopUrl: post.shopUrl === STORE ? '' : post.shopUrl || '',
  featured: Boolean(post.featured),
})

/** One item per non-empty line. */
const lines = (text) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

function Field({ label, hint, required, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-red-600"> *</span>}
      {hint && <span className="ml-1.5 text-xs font-normal text-slate-400">{hint}</span>}
      {children}
    </label>
  )
}

function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

function AdminBlogs() {
  const user = useAdminAuth()
  const [form, setForm] = useState(emptyForm)
  const [image, setImage] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [related, setRelated] = useState([])
  const [productQuery, setProductQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  // The post being edited, or null when the form creates a new post.
  const [editing, setEditing] = useState(null)

  const categories = useMemo(
    () => [...new Set(posts.map((b) => b.category).filter(Boolean))].sort(),
    [posts],
  )

  const productMatches = useMemo(() => {
    const q = productQuery.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) => p.name.toLowerCase().includes(q) && !related.some((r) => r.url === p.storeUrl))
      .slice(0, 6)
  }, [productQuery, related])

  // Live list: adds and deletes show up immediately, newest first.
  useEffect(() => {
    if (!user) return undefined
    return subscribeBlogs(
      (list) => {
        setPosts(list)
        setLoadingPosts(false)
      },
      (err) => {
        setLoadingPosts(false)
        alertError('Could Not Load Posts', err.message)
      },
    )
  }, [user])

  if (user === undefined) {
    return <div className="min-h-screen bg-slate-50 py-24 text-center text-sm text-slate-500">Loading…</div>
  }
  if (!user) return <Navigate to="/admin" replace />

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function handleImageFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alertValidation('Invalid File', 'Please choose an image file (JPG, PNG or WebP).')
      return
    }
    try {
      setImage(await imageFileToDataUrl(file))
    } catch (err) {
      alertError('Image Error', err.message)
    }
  }

  function resetForm() {
    setEditing(null)
    setForm(emptyForm())
    setImage('')
    setImageUrlInput('')
    setRelated([])
    setProductQuery('')
  }

  function startEdit(post) {
    setEditing(post)
    setForm(formFromPost(post))
    setImage(post.image || '')
    setImageUrlInput('')
    setRelated(post.relatedProducts || [])
    setProductQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addRelated(p) {
    if (related.length >= MAX_RELATED) return
    setRelated((r) => [...r, { name: p.name, image: p.image, url: p.storeUrl }])
    setProductQuery('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const title = form.title.trim()
    // Keep the original URL when editing so existing links keep working.
    const slug = editing ? editing.slug : slugify(title)
    if (!title || !form.category.trim() || !form.excerpt.trim() || !form.intro.trim() || !image) {
      alertValidation(
        'Please Check Your Details',
        'Title, category, cover image, short summary and introduction are required.',
      )
      return
    }
    if (!slug) {
      alertValidation('Invalid Title', 'The title must contain letters or numbers.')
      return
    }
    if (!editing && posts.some((b) => b.slug === slug)) {
      alertValidation('Duplicate Title', 'A blog with this title already exists. Please use a different title.')
      return
    }

    const blog = {
      slug,
      title,
      category: form.category.trim(),
      date: form.date || today(),
      image,
      shopUrl: form.shopUrl.trim() || STORE,
      featured: form.featured,
      excerpt: form.excerpt.trim(),
      intro: form.intro.trim(),
      benefits: lines(form.benefits),
      uses: lines(form.uses),
      businesses: lines(form.businesses),
      practical: form.practical.trim(),
      tip: form.tip.trim(),
      relatedOptions: form.relatedOptions.trim(),
      relatedProducts: related,
    }

    showLoading(editing ? 'Saving…' : 'Publishing…')
    try {
      if (editing) {
        await updateBlog(editing.id, blog)
      } else {
        await addBlog(blog)
      }
      resetForm()
      closeAlert()
      await alertSuccess(
        editing ? 'Blog Updated!' : 'Blog Published!',
        `"${title}" is now live on the Blogs page.`,
      )
    } catch (err) {
      closeAlert()
      alertError(
        editing ? 'Could Not Save' : 'Could Not Publish',
        err.code === 'permission-denied'
          ? 'This account is not allowed to change blogs. Check the Firestore security rules.'
          : err.message,
      )
    }
  }

  async function handleDelete(post) {
    const ok = await confirmAction({
      title: 'Delete this blog?',
      text: `"${post.title}" will be removed from the website.`,
      confirmButtonText: 'Yes, Delete',
    })
    if (!ok) return
    try {
      await deleteBlog(post.id)
      if (editing?.id === post.id) resetForm()
    } catch (err) {
      alertError('Could Not Delete', err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ideal Pack" className="h-8 w-auto" />
            <span className="hidden sm:inline text-sm font-semibold text-slate-500">Admin</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/blogs"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View Blogs</span>
            </Link>
            <span className="hidden md:inline text-xs text-slate-400">{user.email}</span>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-red-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {editing ? 'Edit Blog' : 'Add New Blog'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {editing ? (
                <>
                  Editing <span className="font-medium text-slate-700">&ldquo;{editing.title}&rdquo;</span>.{' '}
                </>
              ) : null}
              Fields marked <span className="text-red-600">*</span> are required.
            </p>
          </div>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-red-600 hover:text-red-600"
            >
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3" noValidate>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Basic Details">
              <Field label="Title" required>
                <input value={form.title} onChange={set('title')} className={inputClass} />
              </Field>
              {form.title && (
                <p className="-mt-2 text-xs text-slate-400 break-all">URL: /blogs/{editing ? editing.slug : slugify(form.title)}</p>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Category" required>
                  <input
                    value={form.category}
                    onChange={set('category')}
                    list="blog-categories"
                    className={inputClass}
                    placeholder="e.g. Kraft Products"
                  />
                  <datalist id="blog-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field label="Date">
                  <input type="date" value={form.date} onChange={set('date')} className={inputClass} />
                </Field>
              </div>
              <Field label="Short Summary" hint="shown on the blog list" required>
                <textarea rows={2} value={form.excerpt} onChange={set('excerpt')} className={inputClass} />
              </Field>
            </Card>

            <Card title="Article Content">
              <Field label="Introduction" required>
                <textarea rows={5} value={form.intro} onChange={set('intro')} className={inputClass} />
              </Field>
              <Field label="Key Benefits" hint="one per line">
                <textarea rows={4} value={form.benefits} onChange={set('benefits')} className={inputClass} />
              </Field>
              <Field label="Recommended Uses" hint="one per line">
                <textarea rows={4} value={form.uses} onChange={set('uses')} className={inputClass} />
              </Field>
              <Field label="Suitable Businesses" hint="one per line">
                <textarea rows={4} value={form.businesses} onChange={set('businesses')} className={inputClass} />
              </Field>
              <Field label="Why It's Practical">
                <textarea rows={3} value={form.practical} onChange={set('practical')} className={inputClass} />
              </Field>
              <Field label="Tip">
                <textarea rows={2} value={form.tip} onChange={set('tip')} className={inputClass} />
              </Field>
              <Field label="Related Packaging Options">
                <textarea
                  rows={3}
                  value={form.relatedOptions}
                  onChange={set('relatedOptions')}
                  className={inputClass}
                />
              </Field>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Cover Image *">
              {image ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200">
                  <img src={image} alt="Cover preview" className="aspect-[4/3] w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-slate-700 shadow hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-500">
                  <ImagePlus className="h-7 w-7" />
                  Upload image
                  <input type="file" accept="image/*" onChange={handleImageFile} className="sr-only" />
                </label>
              )}
              {!image && (
                <div className="flex gap-2">
                  <input
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="…or paste an image URL"
                    className={`${inputClass} mt-0`}
                  />
                  <button
                    type="button"
                    onClick={() => imageUrlInput.trim() && setImage(imageUrlInput.trim())}
                    className="shrink-0 rounded-xl border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:border-blue-400"
                  >
                    Use
                  </button>
                </div>
              )}
            </Card>

            <Card title="Shop & Visibility">
              <Field label="Shop Now Link" hint="optional">
                <input
                  type="url"
                  value={form.shopUrl}
                  onChange={set('shopUrl')}
                  className={inputClass}
                  placeholder={STORE}
                />
              </Field>
              <label className="flex items-center gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={set('featured')}
                  className="h-4 w-4 accent-red-600"
                />
                Show as featured blog
              </label>
            </Card>

            <Card title={`Related Products (${related.length}/${MAX_RELATED})`}>
              {related.map((r) => (
                <div key={r.url} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                  <img src={r.image} alt="" className="h-10 w-10 shrink-0 rounded-lg object-contain" />
                  <span className="flex-1 text-xs font-medium text-slate-700">{r.name}</span>
                  <button
                    type="button"
                    onClick={() => setRelated((list) => list.filter((x) => x.url !== r.url))}
                    aria-label={`Remove ${r.name}`}
                    className="p-1 text-slate-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {related.length < MAX_RELATED && (
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                      placeholder="Search products…"
                      className={`${inputClass} mt-0 pl-9`}
                    />
                  </div>
                  {productMatches.length > 0 && (
                    <ul className="mt-2 overflow-hidden rounded-xl border border-slate-200">
                      {productMatches.map((p) => (
                        <li key={p.slug}>
                          <button
                            type="button"
                            onClick={() => addRelated(p)}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50"
                          >
                            <img src={p.image} alt="" className="h-8 w-8 shrink-0 object-contain" />
                            {p.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Card>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              {editing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {editing ? 'Save Changes' : 'Publish Blog'}
            </button>
          </div>
        </form>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">
            All Blogs{!loadingPosts && <span className="ml-2 text-slate-400">({posts.length})</span>}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Newest first. Changes appear on the website instantly.</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {loadingPosts ? (
              <p className="p-6 text-sm text-slate-500">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">No blogs yet. Publish your first one above.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className={`flex items-center gap-3 sm:gap-4 p-4 ${editing?.id === post.id ? 'bg-blue-50/60' : ''}`}
                  >
                    <img src={post.image} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/blogs/${post.slug}`}
                        target="_blank"
                        className="block truncate text-sm font-semibold text-slate-900 hover:text-red-600"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {post.category} · {formatDate(post.date)}
                        {post.featured && <span className="ml-2 font-semibold text-red-600">Featured</span>}
                      </p>
                    </div>
                    <Link
                      to={`/blogs/${post.slug}`}
                      target="_blank"
                      aria-label={`View ${post.title}`}
                      title="View"
                      className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-500"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => startEdit(post)}
                      aria-label={`Edit ${post.title}`}
                      title="Edit"
                      className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-500"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      title="Delete"
                      aria-label={`Delete ${post.title}`}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminBlogs
