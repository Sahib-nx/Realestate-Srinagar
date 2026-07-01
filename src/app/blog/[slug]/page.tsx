import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug } from '@/lib/getPosts'
import { SITE_URL, SITE_NAME } from '@/lib/site'

export const revalidate = 3600

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

// Strips HTML tags for use in <meta> descriptions / JSON-LD (never render this raw).
function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLen ? text.slice(0, maxLen - 1).trimEnd() + '…' : text
}

// Pre-render every known post at build time (SSG) — fastest + best for SEO.
// New posts published after deploy still work via `revalidate` (ISR) above.
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const description = post.excerpt || stripHtml(post.content)
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_IN',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: post.coverImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    // Renders the app/not-found.tsx page (or a default) with a proper 404 status,
    // instead of client-side "Post not found" text that search engines can't read as a real 404.
    notFound()
  }

  const url = `${SITE_URL}/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || stripHtml(post.content),
    image: post.coverImage || undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.category,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {post.coverImage && (
        <div className="h-[45vh] w-full overflow-hidden sm:h-[55vh]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      )}

      <article className="mx-auto max-w-[780px] px-5 py-12 sm:px-6 sm:py-16">
        {/* Breadcrumb — visible + matches BreadcrumbList JSON-LD above */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-['Inter'] text-[12px] text-[#888888]">
            <li>
              <Link href="/" className="hover:text-[#00523C]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-[#00523C]">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#00523C]">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-block rounded-full px-3 py-1 font-['Inter'] text-[11px] font-medium uppercase tracking-[0.05em] text-white"
            style={{ backgroundColor: categoryColors[post.category] || '#00523C' }}
          >
            {post.category}
          </span>
          <time dateTime={post.createdAt} className="font-['Inter'] text-[13px] text-[#888888]">
            {formatDate(post.createdAt)}
          </time>
          <span className="font-['Inter'] text-[13px] text-[#888888]">by {post.author}</span>
        </div>

        {/* Single h1 per page, matches JSON-LD headline */}
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

        <div className="mt-12 border-t border-[#ECECEC] pt-8">
          <Link
            href="/blog"
            className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#888888] hover:text-[#00523C]"
          >
            ← All Posts
          </Link>
        </div>
      </article>

      <style
        // Using a plain <style> tag (not styled-jsx) since this is a Server Component;
        // styled-jsx's `<style jsx global>` requires a Client Component.
        dangerouslySetInnerHTML={{
          __html: `
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
          `,
        }}
      />
    </div>
  )
}