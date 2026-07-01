import type { Metadata } from 'next'
import HomeAnimations from '@/app/HomeAnimations'
import {
  SITE_URL,
  SITE_NAME,
  BUSINESS_PHONE_PRIMARY,
  BUSINESS_PHONE_SECONDARY,
  BUSINESS_EMAIL,
  SOCIAL_LINKS,
  CITIES_SERVED,
} from '../lib/site'

// ─── Metadata (server-rendered, visible to crawlers on first load) ─────────
export const metadata: Metadata = {
  title: 'Realestate Srinagar | Real Estate Agency in Srinagar, Jammu, Delhi & Dubai',
  description:
    'Realestate Srinagar is a trusted real estate agency helping you buy, sell, and invest in properties across Srinagar, Jammu, Delhi, Dholera, and Dubai. 9+ years of local expertise, 100Cr+ in sales, 100% client satisfaction.',
  keywords: [
    'real estate Srinagar',
    'real estate agency Srinagar',
    'property dealer Srinagar',
    'buy property Srinagar',
    'sell property Srinagar',
    'real estate Jammu',
    'real estate Delhi',
    'real estate Dholera',
    'real estate Dubai',
    'Kashmir real estate',
    'property investment Srinagar',
    'construction company Srinagar',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Realestate Srinagar | Local Expertise, Global Reach',
    description:
      'Curated luxury homes, strategic investments, and unmatched real estate expertise across Srinagar, Jammu, Delhi, Dholera, Dubai, and beyond.',
    images: [
      {
        url: `${SITE_URL}/assets/hero-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Realestate Srinagar — Local Expertise, Global Reach',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realestate Srinagar | Local Expertise, Global Reach',
    description:
      'Curated luxury homes, strategic investments, and unmatched real estate expertise across Srinagar, Jammu, Delhi, Dholera, Dubai, and beyond.',
    images: [`${SITE_URL}/assets/hero-og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ─── JSON-LD structured data ────────────────────────────────────────────────
// RealEstateAgent extends LocalBusiness — the most accurate schema type for
// this business (as opposed to generic Organization).
function getJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    image: `${SITE_URL}/assets/hero-og-image.jpg`,
    description:
      'Independent luxury real estate brokerage serving Srinagar, Jammu, Delhi, Dholera, and Dubai since 2017. Buyer representation, seller advisory, and construction & development services.',
    foundingDate: '2017',
    telephone: [BUSINESS_PHONE_PRIMARY, BUSINESS_PHONE_SECONDARY],
    email: BUSINESS_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'IN',
    },
    areaServed: CITIES_SERVED.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    sameAs: SOCIAL_LINKS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE_PRIMARY,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'ur', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE_SECONDARY,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'ur', 'hi'],
      },
    ],
  }
}

function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

// ─── Static content, rendered server-side (crawlable, no client fetch) ─────
const services = [
  {
    number: '01',
    title: 'Buyer Representation',
    description:
      'Dedicated advocacy through every step of your home purchase. From off-market opportunities to closing, we ensure your interests are protected and your goals are met.',
  },
  {
    number: '02',
    title: 'Seller Advisory',
    description:
      "Strategic positioning, professional staging coordination, and targeted marketing to maximize your property's value and minimize time on market.",
  },
  {
    number: '03',
    title: 'Construction & Development',
    description:
      "Turn your vision into reality with our dedicated construction services. We manage residential and commercial projects from the ground up. By combining modern engineering standards with an appreciation for local aesthetics, we ensure structural integrity, timely delivery, and exceptional design.",
  },
]

const neighborhoods = [
  { name: 'Tarrytown', avgPrice: '$2.1M', listings: 8, tagline: 'Historic elegance, lakefront living', image: '/assets/hood-tarrytown.jpg' },
  { name: 'Westlake', avgPrice: '$3.4M', listings: 5, tagline: 'Hill Country estates, top schools', image: '/assets/hood-westlake.jpg' },
  { name: 'Hyde Park', avgPrice: '$850K', listings: 15, tagline: 'Bungalow charm, walkable streets', image: '/assets/hood-hyde.jpg' },
  { name: 'Barton Creek', avgPrice: '$2.8M', listings: 6, tagline: 'Resort living, golf course views', image: '/assets/hood-barton.jpg' },
  { name: 'Clarksville', avgPrice: '$1.5M', listings: 10, tagline: 'Downtown adjacent, historic homes', image: '/assets/hood-clarksville.jpg' },
]

export default function HomePage() {
  const jsonLd = getJsonLd()
  const websiteJsonLd = getWebsiteJsonLd()

  return (
    <>
      {/* JSON-LD is rendered server-side, always present in the initial HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/*
        HomeAnimations is a client component that receives the same static
        data as props and owns all GSAP/scroll-reveal behavior. It renders
        the exact same markup/classes as before — visuals are unchanged.
        Passing data as props (rather than importing it inside the client
        component) keeps this page.tsx the single server-rendered source of
        truth for content, which is what crawlers and link-preview bots read.
      */}
      <HomeAnimations services={services} neighborhoods={neighborhoods} />
    </>
  )
}