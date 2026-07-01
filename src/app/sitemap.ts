import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/getPosts'
import { SITE_URL } from '@/lib/site'

// Served at /sitemap.xml automatically by Next.js.
// NOTE: if you already have a sitemap.ts / sitemap.xml for the rest of the site
// (home, listings, contact, etc.), merge the static routes below into that file
// instead of having two competing sitemaps — submit only one to Search Console.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}