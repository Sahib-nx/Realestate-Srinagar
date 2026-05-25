'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Achievement', 'Company Update', 'Market Insight', 'Advice']

export default function NewPostPage() {
  const router = useRouter()
  const secret = typeof window !== 'undefined' ? sessionStorage.getItem('adminSecret') || '' : ''

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Company Update',
    coverImage: '',
    author: 'Realestate Srinagar',
    published: false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
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
  }, [router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(publish: boolean) {
    if (!form.title || !form.excerpt || !form.content) {
      setError('Title, excerpt, and content are required.')
      return
    }
    setSaving(true)
    setError('')

    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': secret,
      },
      body: JSON.stringify({ ...form, published: publish }),
    })

    if (res.ok) {
      router.push('/admin/blog')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong.')
      setSaving(false)
    }
  }


  if (!verified) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="border-b border-[#ECECEC] bg-white px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[900px] items-center justify-between">
          <div>
            <Link href="/admin/blog" className="font-['Inter'] text-[12px] text-[#888888] hover:text-[#212121]">
              ← Back to Dashboard
            </Link>
            <h1 className="mt-1 font-['Newsreader'] text-[28px] font-light text-[#212121]">New Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="rounded-full border border-[#ECECEC] bg-white px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#212121] hover:bg-[#F0F0F0] disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="rounded-full bg-[#00523C] px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-[900px] px-5 py-8 sm:px-6">
        {error && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-[13px] text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post title…"
              className="mt-2 w-full border-b-2 border-[#ECECEC] bg-transparent pb-2 font-['Newsreader'] text-[28px] font-light text-[#212121] outline-none transition-colors placeholder:text-[#CCCCCC] focus:border-[#00523C]"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Excerpt * <span className="font-normal normal-case">(max 300 chars — shown on blog listing)</span>
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              maxLength={300}
              placeholder="A short description of the post…"
              className="mt-2 w-full resize-none rounded border border-[#ECECEC] bg-white p-3 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
            />
            <p className="mt-1 font-['Inter'] text-[11px] text-[#888888]">{form.excerpt.length}/300</p>
          </div>

          {/* Content */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Content * <span className="font-normal normal-case">(HTML supported: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;blockquote&gt;)</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={18}
              placeholder="<p>Write your post content here...</p>"
              className="mt-2 w-full resize-y rounded border border-[#ECECEC] bg-white p-4 font-mono text-[13px] leading-relaxed text-[#212121] outline-none focus:border-[#00523C]"
            />
          </div>

          {/* Row: Category + Author */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-[#ECECEC] bg-white px-3 py-2.5 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
                Author
              </label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-[#ECECEC] bg-white px-3 py-2.5 font-['Inter'] text-[14px] text-[#212121] outline-none focus:border-[#00523C]"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Cover Image URL <span className="font-normal normal-case">(optional — paste a full URL or /assets/... path)</span>
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

        {/* Bottom action row */}
        <div className="mt-8 flex gap-3 border-t border-[#ECECEC] pt-6">
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="rounded-full border border-[#ECECEC] bg-white px-6 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#212121] hover:bg-[#F0F0F0] disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="rounded-full bg-[#00523C] px-6 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  )
}