import type { Metadata } from 'next'
import ServicePageClient from '@/app/service/ServicePageClient'
import { SITE_URL, SITE_NAME } from '@/lib/site'

// ─── Metadata (server-rendered, visible to crawlers on first load) ─────────
export const metadata: Metadata = {
  title: 'Our Services | Realestate Srinagar – Luxury Real Estate & Development',
  description:
    'Explore comprehensive real estate services by Realestate Srinagar: buyer representation, seller advisory, market intelligence, leasing, construction, material supply, and strategic investments in Srinagar, Jammu, Delhi & Dubai.',
  keywords: [
    'real estate services Srinagar',
    'property buyer representation Srinagar',
    'seller advisory Srinagar',
    'construction company Srinagar',
    'leasing agent Srinagar',
    'property investment Srinagar',
  ],
  alternates: {
    canonical: `${SITE_URL}/service`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/service`,
    siteName: SITE_NAME,
    title: 'Our Services | Realestate Srinagar – Luxury Real Estate & Development',
    description:
      'Explore comprehensive real estate services by Realestate Srinagar: buyer representation, seller advisory, market intelligence, leasing, construction, material supply, and strategic investments.',
    images: [
      {
        url: `${SITE_URL}/assets/hero-properties.jpg`,
        width: 1200,
        height: 630,
        alt: 'Our Services — Realestate Srinagar',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Realestate Srinagar – Luxury Real Estate & Development',
    description:
      'Explore comprehensive real estate services by Realestate Srinagar: buyer representation, seller advisory, market intelligence, leasing, construction, material supply, and strategic investments.',
    images: [`${SITE_URL}/assets/hero-properties.jpg`],
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

/* ─── SEO structured data ────────────────────────────────────────────── */
function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Full-service independent real estate brokerage in Srinagar offering buyer representation, seller advisory, market intelligence, leasing, construction, material supply, and investment strategy.",
    "areaServed": ["Srinagar", "Jammu", "Delhi", "Dholera", "Dubai"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buyer Representation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seller Advisory" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Market Intelligence" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Leasing & Rental Advisory" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction & Development" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Material Supply" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strategic Property Investments" } },
      ]
    }
  }
}

function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/service/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${SITE_URL}/service`
      }
    ]
  }
}

const services = [
  {
    number: '01',
    title: 'Buyer Representation',
    tag: 'For Buyers',
    description:
      'Dedicated advocacy through every step of your home purchase. From off-market opportunities to closing, we ensure your interests are protected and your goals are met.',
    highlights: ['Off-market access', 'Offer negotiation', 'Due diligence support'],
  },
  {
    number: '02',
    title: 'Seller Advisory',
    tag: 'For Sellers',
    description:
      "Strategic positioning, professional staging coordination, and targeted marketing to maximize your property's value and minimize time on market.",
    highlights: ['Pricing strategy', 'Staging coordination', 'Targeted marketing'],
  },
  {
    number: '03',
    title: 'Market Intelligence',
    tag: 'Data & Research',
    description:
      "Data-driven insights into Srinagar's most desirable neighborhoods. We provide comprehensive market analysis to inform your most important real estate decisions.",
    highlights: ['Neighborhood reports', 'Price trend analysis', 'Investment benchmarking'],
  },
  {
    number: '04',
    title: 'Leasing & Rental Advisory',
    tag: 'Commercial & Residential',
    description:
      'Whether you are seeking a premium commercial space to elevate your business or a luxury residence to call home, our leasing advisory ensures a seamless match. We handle rigorous tenant screening, property marketing, and complex lease negotiations to protect your assets and maximize your rental yields.',
    highlights: ['Tenant screening', 'Lease negotiation', 'Yield maximization'],
  },
  {
    number: '05',
    title: 'Construction & Development',
    tag: 'Build & Develop',
    description:
      'Turn your vision into reality with our dedicated construction services. We manage residential and commercial projects from the ground up. By combining modern engineering standards with an appreciation for local aesthetics, we ensure structural integrity, timely delivery, and exceptional design.',
    highlights: ['Ground-up builds', 'Project management', 'Local design expertise'],
  },
  {
    number: '06',
    title: 'Premium Material Supply',
    tag: 'For Builders & Developers',
    description:
      'Quality construction begins with superior components. We provide a reliable supply chain of high-grade construction materials to builders, contractors, and private developers across the region, ensuring your projects are built using only the best resources available.',
    highlights: ['High-grade materials', 'Regional supply chain', 'Builder partnerships'],
  },
  {
    number: '07',
    title: 'Strategic Property Investments',
    tag: 'Wealth Growth',
    description:
      'Navigate the real estate market with uncompromising confidence. From high-yield commercial assets to prime residential plots and emerging regional developments, we provide data-backed investment strategies tailored to protect your capital and accelerate your wealth growth.',
    highlights: ['Commercial assets', 'Residential plots', 'Portfolio strategy'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema()) }}
      />
      <ServicePageClient services={services} />
    </>
  )
}