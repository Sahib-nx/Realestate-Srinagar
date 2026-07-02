import type { Metadata } from 'next'
import { areasData } from './AreaData'
import { SITE_URL, SITE_NAME } from '@/lib/site'

export function getAreaMetadata(slug: string): Metadata {
  const area = areasData[slug]
  if (!area) {
    return {
      title: `Area Not Found | ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${area.name} Real Estate | ${SITE_NAME}`
  const description = area.metaDescription || area.tagline
  const url = `${SITE_URL}/areas/${slug}`
  
  // Resolve absolute image URL for OG/Twitter preview
  const imageUrl = area.image.startsWith('http') 
    ? area.image 
    : `${SITE_URL}${area.image}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${area.name} Real Estate - Srinagar`,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
