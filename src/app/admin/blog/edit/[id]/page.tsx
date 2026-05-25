'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['Achievement', 'Company Update', 'Market Insight', 'Advice']

export default function EditPostPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Company Update',
    coverImage: '',
    author: 'Realestate Srinagar',
    published: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('adminSecret')
    if (!stored) { router.push('/admin/blog'); return }

    fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: stored }),
    }).then((r) => {
      if (r.ok) setVerified(true)
      else router.push('/admin/blog')
    })
  }, [])


  useEffect(() => {
    if (!verified) return
    const secret = sessionStorage.getItem('adminSecret') || ''
    fetch(`/api/blog/${id}`, {
      headers: { 'x-admin-secret': secret },
    })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          category: data.category || 'Company Update',
          coverImage: data.coverImage || '',
          author: data.author || 'Realestate Srinagar',
          published: data.published || false,
        })
        setLoading(false)
      })
  }, [id, verified])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function handleSave(publish?: boolean) {
    const secret = sessionStorage.getItem('adminSecret') || ''

    if (!form.title || !form.excerpt || !form.content) {
      scrollToTop()
      setError('Title, excerpt, and content are required.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess(false)

    const body =
      publish !== undefined
        ? { ...form, published: publish }
        : form

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok) {
        scrollToTop()

        setSuccess(true)

        if (publish !== undefined) {
          setForm((prev) => ({
            ...prev,
            published: publish,
          }))
        }

        setTimeout(() => {
          router.push('/admin/blog')
        }, 1000)
      } else {
        scrollToTop()
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      scrollToTop()
      setError('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  if (!verified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="border-b border-[#ECECEC] bg-white px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[900px] items-center justify-between">
          <div>
            <Link href="/admin/blog" className="font-['Inter'] text-[12px] text-[#888888] hover:text-[#212121]">
              ← Back to Dashboard
            </Link>
            <h1 className="mt-1 font-['Newsreader'] text-[28px] font-light text-[#212121]">Edit Post</h1>
          </div>
          <div className="flex items-center gap-3">
            {!form.published ? (
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="rounded-full bg-[#00523C] px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] disabled:opacity-50"
              >
                Publish
              </button>
            ) : (
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="rounded-full border border-[#ECECEC] bg-white px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#7C4A00] hover:bg-[#FFF3E0] disabled:opacity-50"
              >
                Unpublish
              </button>
            )}
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="rounded-full bg-[#212121] px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#333] disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-[900px] px-5 py-8 sm:px-6">
        {error && (
          <div className="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-[13px] text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 rounded border border-green-200 bg-green-50 px-4 py-3 font-['Inter'] text-[13px] text-[#00523C]">
            ✓ Changes saved successfully.
          </div>
        )}

        <div className="space-y-6">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] ${form.published ? 'bg-[#E8F5E9] text-[#00523C]' : 'bg-[#FFF3E0] text-[#7C4A00]'}`}>
              {form.published ? 'Published' : 'Draft'}
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-2 w-full border-b-2 border-[#ECECEC] bg-transparent pb-2 font-['Newsreader'] text-[28px] font-light text-[#212121] outline-none transition-colors focus:border-[#00523C]"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Excerpt * <span className="font-normal normal-case">(max 300 chars)</span>
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              maxLength={300}
              className="mt-2 w-full resize-none rounded border border-[#ECECEC] bg-white p-3 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
            />
            <p className="mt-1 font-['Inter'] text-[11px] text-[#888888]">{form.excerpt.length}/300</p>
          </div>

          {/* Content */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Content * <span className="font-normal normal-case">(HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;blockquote&gt;)</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={18}
              className="mt-2 w-full resize-y rounded border border-[#ECECEC] bg-white p-4 font-mono text-[13px] leading-relaxed text-[#212121] outline-none focus:border-[#00523C]"
            />
          </div>

          {/* Category + Author */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-[#ECECEC] bg-white px-3 py-2.5 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-[#ECECEC] bg-white px-3 py-2.5 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Cover Image URL <span className="font-normal normal-case">(optional)</span>
            </label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://... or /assets/photo.jpg"
              className="mt-2 w-full rounded border border-[#ECECEC] bg-white px-3 py-2.5 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
            />
            {form.coverImage && (
              <img src={form.coverImage} alt="preview" className="mt-3 h-32 w-full rounded object-cover" />
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3 border-t border-[#ECECEC] pt-6">
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="rounded-full bg-[#212121] px-6 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#333] disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link
            href="/admin/blog"
            className="rounded-full border border-[#ECECEC] px-6 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#888888] hover:bg-[#F8F8F8]"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}