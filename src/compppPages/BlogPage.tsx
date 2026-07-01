import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/getPosts'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import BlogFilter from '@/app/blog/BlogFilter'

// Revalidate this page every hour so new posts show up without a full redeploy,
// while still being served as static/cached HTML most of the time (good for SEO + speed).
export const revalidate = 3600

const TITLE = 'Real Estate Blog | Srinagar Market Insights & Advice'
const DESCRIPTION =
  "Achievements, market intelligence, and real estate advice from Srinagar's most trusted independent brokerage. Property buying guides, market trends, and company updates."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured data for search engines — describes this as a collection/list page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="bg-[#F8F8F8] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <span className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.08em] text-[#00523C]">
            Insights &amp; Updates
          </span>
          {/* Single h1 per page — real content in the initial HTML, not injected client-side */}
          <h1 className="mt-4 font-['Newsreader'] text-[42px] font-light leading-[1.1] text-[#212121] sm:text-6xl">
            From Our Desk
          </h1>
          <p className="mt-4 max-w-[520px] font-['Inter'] text-[15px] leading-relaxed text-[#888888] sm:text-base">
            {DESCRIPTION}
          </p>

          {/* Breadcrumb for SEO */}
          <nav aria-label="Breadcrumb" className="mt-6 sm:mt-8">
            <ol className="flex items-center gap-2 font-['Inter'] text-[11px] text-[#00523C] sm:text-[12px]">
              <li>
                <Link href="/" className="hover:text-white/70 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#00523C]">
                Blog
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Interactive filter + post grid (client component), pre-populated with server-fetched posts */}
      <BlogFilter posts={posts} />

      {/* ── CTA Strip ─────────────────────────────────────────────────── */}
      <section className="bg-[#00523C] py-12 sm:py-16">
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <h2 className="font-['Newsreader'] text-[28px] font-light text-white sm:text-4xl">
            Ready to Find Your Home in Srinagar?
          </h2>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all hover:bg-white/90"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}