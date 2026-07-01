'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PlainPost } from '@/lib/getPosts'

const CATEGORIES = ['All', 'Achievement', 'Company Update', 'Market Insight', 'Advice']

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

export default function BlogFilter({ posts }: { posts: PlainPost[] }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)
  const [hero, ...rest] = filtered

  return (
    <>
      {/* ── Category Filter ───────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-[#ECECEC] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide sm:gap-2 sm:py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`flex-shrink-0 rounded-full px-4 py-2 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-all duration-200 sm:text-[13px] ${
                  active === cat
                    ? 'bg-[#00523C] text-white'
                    : 'text-[#888888] hover:text-[#212121]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16">
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-['Newsreader'] text-2xl text-[#888888]">No posts yet in this category.</p>
          </div>
        )}

        {hero && (
          <>
            {/* ── Hero Post ───────────────────────────────────────────── */}
            <Link href={`/blog/${hero.slug}`} className="group mb-12 block sm:mb-16 lg:mb-20">
              <div className="grid gap-8 lg:grid-cols-[55%_45%] lg:gap-12">
                <div className="overflow-hidden rounded">
                  {hero.coverImage ? (
                    <img
                      src={hero.coverImage}
                      alt={hero.title}
                      loading="eager"
                      fetchPriority="high"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-[#F0F5F2] flex items-center justify-center">
                      <span className="font-['Newsreader'] text-5xl text-[#00523C] opacity-20">RS</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-white"
                      style={{ backgroundColor: categoryColors[hero.category] || '#00523C' }}
                    >
                      {hero.category}
                    </span>
                    <time
                      dateTime={hero.createdAt}
                      className="font-['Inter'] text-[12px] text-[#888888]"
                    >
                      {formatDate(hero.createdAt)}
                    </time>
                  </div>
                  <h2 className="mt-4 font-['Newsreader'] text-[32px] font-light leading-[1.15] text-[#212121] transition-colors group-hover:text-[#00523C] sm:text-[40px]">
                    {hero.title}
                  </h2>
                  <p className="mt-3 font-['Inter'] text-[15px] leading-relaxed text-[#888888] sm:text-base">
                    {hero.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-['Inter'] text-[13px] font-medium text-[#212121]">
                      {hero.author}
                    </span>
                    <span className="text-[#ECECEC]">·</span>
                    <span className="font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C]">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Divider */}
            {rest.length > 0 && <div className="mb-12 h-px bg-[#ECECEC] sm:mb-16" />}

            {/* ── Rest of Posts Grid ──────────────────────────────────── */}
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
              {rest.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group flex flex-col">
                  <div className="overflow-hidden rounded">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="aspect-[3/2] w-full bg-[#F0F5F2] flex items-center justify-center">
                        <span className="font-['Newsreader'] text-3xl text-[#00523C] opacity-20">RS</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.05em] text-white"
                      style={{ backgroundColor: categoryColors[post.category] || '#00523C' }}
                    >
                      {post.category}
                    </span>
                    <time
                      dateTime={post.createdAt}
                      className="font-['Inter'] text-[12px] text-[#888888]"
                    >
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  <h3 className="mt-3 font-['Newsreader'] text-[22px] font-light leading-[1.2] text-[#212121] transition-colors group-hover:text-[#00523C] sm:text-[26px]">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 font-['Inter'] text-[14px] leading-relaxed text-[#888888]">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C]">
                    Read More →
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}