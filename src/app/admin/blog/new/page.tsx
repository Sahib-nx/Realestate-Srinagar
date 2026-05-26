'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'

const CATEGORIES = ['Achievement', 'Company Update', 'Market Insight', 'Advice']

// ── Toolbar button type ──────────────────────────────────────────────────────
type ToolbarItem =
  | { type: 'block'; label: string; icon: string; tag: string; wrap?: false }
  | { type: 'inline'; label: string; icon: string; open: string; close: string }
  | { type: 'list'; label: string; icon: string; listTag: string; itemTag: string }
  | { type: 'divider' }

const TOOLBAR: ToolbarItem[] = [
  { type: 'block',  label: 'Heading',     icon: 'H2',  tag: 'h2' },
  { type: 'block',  label: 'Paragraph',   icon: '¶',   tag: 'p' },
  { type: 'block',  label: 'Quote',       icon: '❝',   tag: 'blockquote' },
  { type: 'divider' },
  { type: 'inline', label: 'Bold',        icon: 'B',   open: '<strong>', close: '</strong>' },
  { type: 'inline', label: 'Italic',      icon: 'I',   open: '<em>',     close: '</em>' },
  { type: 'divider' },
  { type: 'list',   label: 'Bullet list', icon: '≡',   listTag: 'ul', itemTag: 'li' },
]

export default function NewPostPage() {
  const router = useRouter()
  const topRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // ── Toolbar action ───────────────────────────────────────────────────────
  // Wraps selected text (or inserts a template) and puts focus back in textarea
  const applyToolbar = useCallback((item: ToolbarItem) => {
    if (item.type === 'divider') return
    const ta = textareaRef.current
    if (!ta) return

    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const selected = ta.value.slice(start, end)
    const before = ta.value.slice(0, start)
    const after  = ta.value.slice(end)

    let inserted = ''
    let cursorOffset = 0 // where to place cursor after insert

    if (item.type === 'block') {
      // Wrap selection or placeholder in a block tag on its own line
      const text = selected || 'Your text here'
      inserted = `<${item.tag}>${text}</${item.tag}>`
      cursorOffset = item.tag.length + 2 // after opening tag
    } else if (item.type === 'inline') {
      const text = selected || 'text'
      inserted = `${item.open}${text}${item.close}`
      cursorOffset = item.open.length
    } else if (item.type === 'list') {
      // Build a <ul> with the selected lines as <li>s, or a default template
      if (selected) {
        const items = selected.split('\n').filter(Boolean)
        const liItems = items.map((t) => `  <${item.itemTag}>${t.trim()}</${item.itemTag}>`).join('\n')
        inserted = `<${item.listTag}>\n${liItems}\n</${item.listTag}>`
      } else {
        inserted = `<${item.listTag}>\n  <${item.itemTag}>First item</${item.itemTag}>\n  <${item.itemTag}>Second item</${item.itemTag}>\n</${item.listTag}>`
      }
      cursorOffset = item.listTag.length + 2
    }

    // Prefix with newline if needed
    const needsNewlineBefore = before.length > 0 && !before.endsWith('\n')
    const prefix = needsNewlineBefore ? '\n' : ''

    const newValue = before + prefix + inserted + after
    setForm((prev) => ({ ...prev, content: newValue }))

    // Restore focus and set cursor position
    requestAnimationFrame(() => {
      ta.focus()
      const newCursor = before.length + prefix.length + cursorOffset + (selected ? selected.length : (item.type === 'block' ? 'Your text here'.length : item.type === 'inline' ? 'text'.length : 0))
      ta.setSelectionRange(newCursor, newCursor)
    })
  }, [])

  async function handleSubmit(publish: boolean) {
    if (!form.title || !form.excerpt || !form.content) {
      setError('Title, excerpt, and content are required.')
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setSaving(true)
    setError('')
    const secret = sessionStorage.getItem('adminSecret') || ''
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ ...form, published: publish }),
    })
    const text = await res.text()
    const data = text ? (() => { try { return JSON.parse(text) } catch { return {} } })() : {}
    if (res.ok) {
      router.push('/admin/blog')
    } else {
      setError(data.error || `Server error (${res.status}) — please try again.`)
      setSaving(false)
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!verified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] py-14">

      {/* ── Sticky header ───────────────────────────────────────────────── */}
      <div ref={topRef} className="sticky top-0 z-10 border-b border-[#ECECEC] bg-white px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-[900px] items-center justify-between gap-3">
          <div className="min-w-0">
            <Link href="/admin/blog" className="font-['Inter'] text-[11px] text-[#888888] hover:text-[#212121]">
              ← Dashboard
            </Link>
            <h1 className="font-['Newsreader'] text-[22px] font-light text-[#212121] sm:text-[28px]">
              New Post
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="rounded-full border border-[#ECECEC] bg-white px-3 py-2 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#212121] hover:bg-[#F0F0F0] disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-[12px]"
            >
              Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="rounded-full bg-[#00523C] px-3 py-2 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-[12px]"
            >
              {saving ? 'Saving…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[900px] px-4 py-6 sm:px-6 sm:py-8">
        {error && (
          <div className="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-[13px] text-red-600">
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
              className="mt-2 w-full border-b-2 border-[#ECECEC] bg-transparent pb-2 font-['Newsreader'] text-[22px] font-light text-[#212121] outline-none transition-colors placeholder:text-[#CCCCCC] focus:border-[#00523C] sm:text-[28px]"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Excerpt * <span className="font-normal normal-case">(max 300 chars — shown on listing)</span>
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

          {/* ── Rich-ish Content Editor ────────────────────────────────── */}
          <div>
            <label className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Content *
            </label>

            {/* Toolbar */}
            <div className="mt-2 flex flex-wrap gap-1 rounded-t border border-b-0 border-[#ECECEC] bg-[#FAFAFA] p-2">
              {TOOLBAR.map((item, idx) => {
                if (item.type === 'divider') {
                  return <div key={idx} className="mx-1 w-px self-stretch bg-[#E0E0E0]" />
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    title={item.label}
                    onClick={() => applyToolbar(item)}
                    className={`flex h-8 min-w-[2rem] items-center justify-center rounded px-2 font-['Inter'] text-[12px] transition-colors hover:bg-[#E8F5E9] hover:text-[#00523C] active:bg-[#D0EBD8] ${
                      item.type === 'inline' && item.open === '<strong>'
                        ? 'font-bold text-[#212121]'
                        : item.type === 'inline' && item.open === '<em>'
                        ? 'italic text-[#212121]'
                        : 'text-[#444444]'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-1 hidden text-[11px] text-[#888888] sm:inline">
                      {item.label}
                    </span>
                  </button>
                )
              })}

              {/* Help tip */}
              <div className="ml-auto flex items-center">
                <span className="font-['Inter'] text-[10px] text-[#BBBBBB] sm:text-[11px]">
                  Select text then click a button to wrap it
                </span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={18}
              placeholder={'<p>Start writing your post here…</p>\n\nTip: Select text above and click a toolbar button to format it.'}
              className="w-full resize-y rounded-b border border-[#ECECEC] bg-white p-4 font-mono text-[13px] leading-relaxed text-[#212121] outline-none focus:border-[#00523C]"
            />

            {/* Quick-insert templates */}
            <div className="mt-2">
              <p className="font-['Inter'] text-[10px] uppercase tracking-[0.05em] text-[#AAAAAA] sm:text-[11px]">
                Quick insert
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {[
                  { label: '+ Heading',    snippet: '\n<h2>Section heading</h2>\n' },
                  { label: '+ Paragraph',  snippet: '\n<p>Write something here.</p>\n' },
                  { label: '+ Quote',      snippet: '\n<blockquote>Inspiring quote here.</blockquote>\n' },
                  { label: '+ List',       snippet: '\n<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>\n' },
                ].map(({ label, snippet }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, content: prev.content + snippet }))
                      requestAnimationFrame(() => {
                        const ta = textareaRef.current
                        if (ta) { ta.focus(); ta.scrollTop = ta.scrollHeight }
                      })
                    }}
                    className="rounded-full border border-[#ECECEC] bg-white px-3 py-1 font-['Inter'] text-[11px] text-[#555555] hover:border-[#00523C] hover:text-[#00523C]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category + Author */}
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
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
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

          {/* Cover Image */}
          <div>
            <label className="mb-2 block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
              Cover Image <span className="font-normal normal-case">(optional)</span>
            </label>
            <ImageUpload
              currentUrl={form.coverImage}
              onUpload={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
              onClear={() => setForm((prev) => ({ ...prev, coverImage: '' }))}
            />
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex gap-3 border-t border-[#ECECEC] pt-6">
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="flex-1 rounded-full border border-[#ECECEC] bg-white py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#212121] hover:bg-[#F0F0F0] disabled:opacity-50 sm:flex-none sm:px-6"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="flex-1 rounded-full bg-[#00523C] py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] disabled:opacity-50 sm:flex-none sm:px-6"
          >
            {saving ? 'Saving…' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  )
}