'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Post = {
  _id: string
  title: string
  category: string
  published: boolean
  author: string
  createdAt: string
}

function useAdminAuth() {
  const [secret, setSecret] = useState<string>('')
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('adminSecret')
    if (stored) {
      // setState only inside the .then() callback — never synchronously
      fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: stored }),
      }).then((r) => {
        if (r.ok) { setSecret(stored); setAuthed(true) }
        else sessionStorage.removeItem('adminSecret')
        setChecking(false)   // ← inside async callback, not sync effect body
      })
    } else {

      setTimeout(() => setChecking(false), 0)
    }
  }, [])

  function login(s: string) {
    sessionStorage.setItem('adminSecret', s)
    setSecret(s)
    setAuthed(true)
  }

  function logout() {
    sessionStorage.removeItem('adminSecret')
    setSecret('')
    setAuthed(false)
  }

  return { secret, authed, checking, login, logout }
}

export default function AdminBlogPage() {
  const { secret, authed, checking, login, logout } = useAdminAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [inputSecret, setInputSecret] = useState('')
  const [loginError, setLoginError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const loadPosts = useCallback(async (s: string) => {
    setLoading(true)
    const res = await fetch('/api/blog?admin=true', {
      headers: { 'x-admin-secret': s },
    })
    const text = await res.text()
    try {
      const data = text ? JSON.parse(text) : []
      setPosts(Array.isArray(data) ? data : [])
    } catch { setPosts([]) }
    setLoading(false)
  }, [])

  async function handleLogin() {
    if (!inputSecret.trim()) { setLoginError('Please enter the secret key.'); return }
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: inputSecret }),
    })
    const text = await res.text()
    const data = text ? (() => { try { return JSON.parse(text) } catch { return {} } })() : {}
    if (res.ok) { login(inputSecret); loadPosts(inputSecret) }
    else setLoginError(data.error || 'Something went wrong, try again later!')
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    })
    if (res.ok) setPosts((prev) => prev.filter((p) => p._id !== id))
    else alert('Delete failed. Please try again.')
    setDeleting(false)
    setDeleteId(null)
  }

  async function togglePublish(post: Post) {
    setTogglingId(post._id)
    const res = await fetch(`/api/blog/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ published: !post.published }),
    })
    if (res.ok) {
      const text = await res.text()
      const updated = text ? (() => { try { return JSON.parse(text) } catch { return post } })() : post
      setPosts((prev) => prev.map((p) => p._id === post._id ? { ...p, published: updated.published } : p))
    } else {
      alert('Failed to update status. Please try again.')
    }
    setTogglingId(null)
  }

  useEffect(() => {
    if (authed && secret) { loadPosts(secret) }
  }, [authed, secret, loadPosts])

  // Spinner while verifying stored session
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
      </div>
    )
  }

  // ── Login Screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] px-5">
        <div className="w-full max-w-[380px] rounded bg-white p-8 shadow-sm">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src="/assets/LogoHouse1.png"
              alt="Realestate Srinagar"
              width={28}
              height={28}
              className="h-6 w-6 object-contain mb-1 sm:h-7 sm:w-7 sm:mb-1"
              priority
            />
            {/* Short name on mobile, full name on sm+ */}
            <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#00523C] sm:text-[13px]">
              <span className="sm:inline">Realestate Srinagar</span>
            </span>
          </Link>
          <h1 className="mt-2 font-['Newsreader'] text-[32px] font-light text-[#212121]">Admin Login</h1>
          <div className="mt-6">
            <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#888888]">
              Admin Secret
            </label>
            <input
              type="password"
              value={inputSecret}
              onChange={(e) => { setInputSecret(e.target.value); setLoginError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your secret key"
              className="mt-2 w-full border-b-2 border-[#ECECEC] pb-2 font-['Inter'] text-[15px] text-[#212121] outline-none focus:border-[#00523C]"
            />
            {loginError && (
              <p className="mt-2 font-['Inter'] text-[12px] text-red-500">{loginError}</p>
            )}
            <button
              onClick={handleLogin}
              className="mt-6 w-full rounded-full bg-[#00523C] py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all hover:bg-[#003d2d]"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F8F8] py-14">

      {/* ── Top nav ── */}
      <div className="sticky top-0 z-10 border-b border-[#ECECEC] bg-white px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#888888] sm:text-[11px]">
              Realestate Srinagar
            </p>
            <h1 className="font-['Newsreader'] text-[20px] font-light text-[#212121] sm:text-[26px]">
              Blog Admin
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/admin/blog/new"
              className="rounded-full bg-[#00523C] px-3 py-2 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d] sm:px-5 sm:py-2.5 sm:text-[12px]"
            >
              <span className="sm:hidden">+ New</span>
              <span className="hidden sm:inline">+ New Post</span>
            </Link>
            <button
              onClick={logout}
              className="font-['Inter'] text-[11px] text-[#888888] hover:text-[#212121] sm:text-[12px]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-['Newsreader'] text-2xl text-[#888888]">No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-block font-['Inter'] text-[13px] uppercase tracking-[0.05em] text-[#00523C] underline-offset-4 hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <>
            {/* ── Desktop table (md+) ── */}
            <div className="hidden overflow-hidden rounded bg-white shadow-sm md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ECECEC]">
                    {['Title', 'Category', 'Status', 'Date', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post._id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
                      <td className="max-w-[280px] px-5 py-4">
                        <p className="truncate font-['Inter'] text-[14px] font-medium text-[#212121]">
                          {post.title}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-['Inter'] text-[12px] text-[#888888]">{post.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => togglePublish(post)}
                          disabled={togglingId === post._id}
                          title={post.published ? 'Click to unpublish' : 'Click to publish'}
                          className={`rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] transition-opacity disabled:opacity-50 ${post.published ? 'bg-[#E8F5E9] text-[#00523C]' : 'bg-[#FFF3E0] text-[#7C4A00]'
                            }`}
                        >
                          {togglingId === post._id ? '…' : post.published ? '✓ Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-['Inter'] text-[12px] text-[#888888]">
                          {new Date(post.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/blog/edit/${post._id}`}
                            className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteId(post._id)}
                            className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-red-400 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile cards (< md) ── */}
            <div className="space-y-3 md:hidden">
              {posts.map((post) => (
                <div key={post._id} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1 font-['Inter'] text-[14px] font-medium leading-snug text-[#212121]">
                      {post.title}
                    </p>
                    <button
                      onClick={() => togglePublish(post)}
                      disabled={togglingId === post._id}
                      className={`shrink-0 rounded-full px-2.5 py-1 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.05em] transition-opacity disabled:opacity-50 ${post.published ? 'bg-[#E8F5E9] text-[#00523C]' : 'bg-[#FFF3E0] text-[#7C4A00]'
                        }`}
                    >
                      {togglingId === post._id ? '…' : post.published ? '✓ Published' : 'Draft'}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-['Inter'] text-[11px] text-[#AAAAAA]">{post.category}</span>
                    <span className="text-[#DDDDDD]">·</span>
                    <span className="font-['Inter'] text-[11px] text-[#AAAAAA]">
                      {new Date(post.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2 border-t border-[#F4F4F4] pt-3">
                    <Link
                      href={`/admin/blog/edit/${post._id}`}
                      className="flex-1 rounded-full border border-[#00523C] py-2 text-center font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C]"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(post._id)}
                      className="flex-1 rounded-full border border-red-200 py-2 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Delete confirm modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-0 sm:items-center sm:px-5">
          <div className="w-full rounded-t-2xl bg-white p-6 shadow-xl sm:max-w-[380px] sm:rounded-2xl sm:p-7">
            <h2 className="font-['Newsreader'] text-[24px] font-light text-[#212121]">Delete Post?</h2>
            <p className="mt-2 font-['Inter'] text-[14px] text-[#888888]">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 rounded-full bg-red-500 py-3 font-['Inter'] text-[13px] font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 rounded-full border border-[#ECECEC] py-3 font-['Inter'] text-[13px] font-medium text-[#212121] hover:bg-[#F8F8F8]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}