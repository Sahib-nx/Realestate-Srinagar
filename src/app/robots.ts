import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Served at /robots.txt automatically. If you already have one, merge the
// rules below into it instead of keeping two.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}