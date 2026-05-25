'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type Post = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  coverImage: string
  createdAt: string
}

const categoryColors: Record<string, string> = {
  Achievement: '#00523C',
  'Company Update': '#2C5F8A',
  'Market Insight': '#7C4A00',
  Advice: '#5A2D82',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data: Post[]) => {
        const found = data.find((p) => p.slug === slug)
        if (found) setPost(found)
        else setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00523C] border-t-transparent" />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-['Newsreader'] text-3xl text-[#212121]">Post not found</p>
        <Link href="/blog" className="font-['Inter'] text-[13px] uppercase tracking-[0.05em] text-[#00523C] underline-offset-4 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {post.coverImage && (
        <div className="h-[45vh] w-full overflow-hidden sm:h-[55vh]">
          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      <article className="mx-auto max-w-[780px] px-5 py-12 sm:px-6 sm:py-16">
        <Link href="/blog" className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#888888] hover:text-[#00523C]">
          ← All Posts
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-block rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-white"
            style={{ backgroundColor: categoryColors[post.category] || '#00523C' }}
          >
            {post.category}
          </span>
          <span className="font-['Inter'] text-[13px] text-[#888888]">{formatDate(post.createdAt)}</span>
          <span className="font-['Inter'] text-[13px] text-[#888888]">by {post.author}</span>
        </div>

        <h1 className="mt-5 font-['Newsreader'] text-[36px] font-light leading-[1.15] text-[#212121] sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 font-['Inter'] text-[16px] font-medium leading-relaxed text-[#00523C] sm:text-lg">
          {post.excerpt}
        </p>

        <div className="my-8 h-px bg-[#ECECEC]" />

        <div
          className="prose-custom font-['Inter'] text-[16px] leading-[1.85] text-[#444444]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <style jsx global>{`
        .prose-custom h2 {
          font-family: 'Newsreader', serif;
          font-size: 28px;
          font-weight: 300;
          color: #212121;
          margin: 2rem 0 0.75rem;
        }
        .prose-custom h3 {
          font-family: 'Newsreader', serif;
          font-size: 22px;
          font-weight: 300;
          color: #212121;
          margin: 1.5rem 0 0.5rem;
        }
        .prose-custom p { margin-bottom: 1.25rem; }
        .prose-custom ul, .prose-custom ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose-custom li { margin-bottom: 0.4rem; }
        .prose-custom a { color: #00523C; text-decoration: underline; text-underline-offset: 3px; }
        .prose-custom strong { color: #212121; font-weight: 600; }
        .prose-custom blockquote {
          border-left: 3px solid #00523C;
          padding-left: 1.25rem;
          color: #666;
          font-style: italic;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  )
}