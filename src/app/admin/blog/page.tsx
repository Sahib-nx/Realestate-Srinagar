'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

  useEffect(() => {
    const stored = sessionStorage.getItem('adminSecret')
    // Re-verify on every page load — don't just trust what's stored
    if (stored) {
      fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: stored }),
      }).then((r) => {
        if (r.ok) {
          setSecret(stored)
          setAuthed(true)
        } else {
          sessionStorage.removeItem('adminSecret')
        }
      })
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

  return { secret, authed, login, logout }
}

export default function AdminBlogPage() {
  const { secret, authed, login, logout } = useAdminAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [inputSecret, setInputSecret] = useState('')
  const [loginError, setLoginError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadPosts(s: string) {
    setLoading(true)
    const res = await fetch('/api/blog?admin=true', {
      headers: { 'x-admin-secret': s },
    })
    const data = await res.json()
    setPosts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleLogin() {
    if (!inputSecret.trim()) {
      setLoginError('Please enter the secret key.')
      return
    }

    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: inputSecret }),
    })

    const data = await res.json()

    if (res.ok) {
      login(inputSecret)
      loadPosts(inputSecret)
    } else {
      setLoginError(data.error || "Something Went Wrong, Try Again Later!")
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    })
    setPosts((prev) => prev.filter((p) => p._id !== id))
    setDeleteId(null)
  }

  async function togglePublish(post: Post) {
    await fetch(`/api/blog/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ published: !post.published }),
    })
    setPosts((prev) => prev.map((p) => p._id === post._id ? { ...p, published: !p.published } : p))
  }

  useEffect(() => {
    if (authed && secret) loadPosts(secret)
  }, [authed])

  // ── Login Screen ───────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] px-5">
        <div className="w-full max-w-[380px] rounded bg-white p-8 shadow-sm">
          <p className="font-['Newsreader'] text-[13px] uppercase tracking-[0.08em] text-[#00523C]">
            Realestate Srinagar
          </p>
          <h1 className="mt-2 font-['Newsreader'] text-[32px] font-light text-[#212121]">Admin Login</h1>
          <div className="mt-6">
            <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#888888]">
              Admin Secret
            </label>
            <input
              type="password"
              value={inputSecret}
              onChange={(e) => setInputSecret(e.target.value)}
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

  // ── Dashboard ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F8F8] py-14">
      {/* Header */}
      <div className="border-b border-[#ECECEC] bg-white px-5 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <p className="font-['Inter'] text-[11px] uppercase tracking-[0.08em] text-[#888888]">
              Realestate Srinagar
            </p>
            <h1 className="font-['Newsreader'] text-[26px] font-light text-[#212121]">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog/new"
              className="rounded-full bg-[#00523C] px-5 py-2.5 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-white hover:bg-[#003d2d]"
            >
              + New Post
            </Link>
            <button
              onClick={logout}
              className="font-['Inter'] text-[12px] text-[#888888] hover:text-[#212121]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-6">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-['Newsreader'] text-2xl text-[#888888]">No posts yet.</p>
            <Link href="/admin/blog/new" className="mt-4 inline-block font-['Inter'] text-[13px] uppercase tracking-[0.05em] text-[#00523C] underline-offset-4 hover:underline">
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECECEC]">
                  {['Title', 'Category', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-[#888888]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post._id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
                    <td className="max-w-[280px] px-5 py-4">
                      <p className="truncate font-['Inter'] text-[14px] font-medium text-[#212121]">{post.title}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-['Inter'] text-[12px] text-[#888888]">{post.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] ${post.published
                            ? 'bg-[#E8F5E9] text-[#00523C]'
                            : 'bg-[#FFF3E0] text-[#7C4A00]'
                          }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
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
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-[380px] rounded bg-white p-7 shadow-xl">
            <h2 className="font-['Newsreader'] text-[24px] font-light text-[#212121]">Delete Post?</h2>
            <p className="mt-2 font-['Inter'] text-[14px] text-[#888888]">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-full bg-red-500 py-2.5 font-['Inter'] text-[13px] font-medium text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-full border border-[#ECECEC] py-2.5 font-['Inter'] text-[13px] font-medium text-[#212121] hover:bg-[#F8F8F8]"
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