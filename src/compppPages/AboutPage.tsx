import type { Metadata } from 'next';
import AboutContent from "@/app/about/AboutContent";

const SITE_URL = 'https://realestate-srinagar.com'
const PAGE_URL = `${SITE_URL}/about`
const OG_IMAGE = `${SITE_URL}/assets/about-office.jpg`

// ─────────────────────────────────────────────────────────────────────
// METADATA — this is the #1 lever for SEO. A client component can never
// export this, which is why the animated page needed to move one level
// down into AboutContent.tsx and be wrapped by this server component.
// ─────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'About Us | Realestate Srinagar — Independent Luxury Real Estate Since 2017',
  description:
    'Founded in 2017, Realestate Srinagar is an independent, fiduciary-first real estate brokerage serving Srinagar, Jammu, Delhi, Dholera, and Dubai. 500+ transactions, ₹100Cr+ in sales, 100% client satisfaction.',
  keywords: [
    'real estate Srinagar',
    'luxury property Srinagar',
    'real estate agents Kashmir',
    'independent real estate broker Srinagar',
    'property dealers Srinagar',
    'buy property Srinagar',
    'sell property Srinagar',
    'Realestate Srinagar team',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'About Realestate Srinagar | Independent Fiduciary Real Estate',
    description:
      'An independent brokerage built on fiduciary duty, deep local market knowledge, and white-glove service. Serving Srinagar, Jammu, Delhi, Dholera, and Dubai since 2017.',
    url: PAGE_URL,
    siteName: 'Realestate Srinagar',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Realestate Srinagar office',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Realestate Srinagar | Independent Fiduciary Real Estate',
    description:
      'Independent, fiduciary-first real estate representation in Srinagar since 2017. 500+ transactions, ₹100Cr+ in sales.',
    images: [OG_IMAGE],
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

// ─────────────────────────────────────────────────────────────────────
// JSON-LD structured data — RealEstateAgent + BreadcrumbList.
// This is what lets Google show rich results (address, phone, rating
// stars) directly in search, instead of a plain blue link.
// ─────────────────────────────────────────────────────────────────────
function StructuredData() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Realestate Srinagar',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/LOGO1.png`,
    image: OG_IMAGE,
    description:
      'Independent, fiduciary-first real estate brokerage serving Srinagar, Jammu, Delhi, Dholera, and Dubai since 2017.',
    foundingDate: '2017',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Residency Road',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      postalCode: '190001',
      addressCountry: 'IN',
    },
    telephone: '+91-94190-00000',
    email: 'hello@realestate-srinagar.com',
    areaServed: [
      { '@type': 'City', name: 'Srinagar' },
      { '@type': 'City', name: 'Jammu' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Dholera' },
      { '@type': 'City', name: 'Dubai' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    founder: {
      '@type': 'Person',
      name: 'Shaheryar Khan',
      jobTitle: 'Founder and Chairman',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '3',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: PAGE_URL },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

export default function AboutPage() {
  return (
    <>
      <StructuredData />
      <AboutContent />
    </>
  )
}