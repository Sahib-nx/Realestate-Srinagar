import type { Metadata } from 'next'
import ContactPageClient from '@/app/contact/Contactpageclient'
import {
  SITE_URL,
  SITE_NAME,
  BUSINESS_PHONE_PRIMARY,
  BUSINESS_EMAIL,
  SOCIAL_LINKS,
} from '@/lib/site'

// ─── Metadata (server-rendered, visible to crawlers on first load) ─────────
export const metadata: Metadata = {
  title: 'Contact Us | Realestate Srinagar — Call, Email or Visit Our Office',
  description:
    'Get in touch with Realestate Srinagar. Call +91 7889902696, email realestatessrinagar@gmail.com, or visit our office at Al Sitaar Complex, Hyderpora, Srinagar. Response within 24 hours.',
  keywords: [
    'contact Realestate Srinagar',
    'real estate agent Srinagar contact',
    'property dealer Hyderpora Srinagar',
    'real estate office Srinagar',
    'buy property Srinagar contact',
    'sell property Srinagar contact',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: "Contact Us | Let's Start a Conversation — Realestate Srinagar",
    description:
      "Whether you're buying, selling, or simply exploring, our team is here to guide you. Reach out by phone, email, or visit our Srinagar office.",
    images: [
      {
        url: `${SITE_URL}/assets/contact-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact Realestate Srinagar',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Us | Let's Start a Conversation — Realestate Srinagar",
    description:
      "Whether you're buying, selling, or simply exploring, our team is here to guide you.",
    images: [`${SITE_URL}/assets/contact-hero.jpg`],
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
// ContactPage wrapping a RealEstateAgent reference keeps this page tied to
// the same business entity declared on the homepage (via @id).
function getContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#webpage`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Realestate Srinagar',
    description:
      'Contact page for Realestate Srinagar — phone, email, office address, and inquiry form.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    breadcrumb: { '@id': `${SITE_URL}/contact/#breadcrumb` },
  }
}

function getBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/contact/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${SITE_URL}/contact`,
      },
    ],
  }
}

// Reuses the same @id as the homepage's RealEstateAgent so search engines
// treat this as the same business entity, just repeated with contact-page
// specific completeness (kept minimal here since the full entity already
// lives on '/').
function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    telephone: BUSINESS_PHONE_PRIMARY,
    email: BUSINESS_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Al Sitaar Complex, Hyderpora',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      postalCode: '190009',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    sameAs: SOCIAL_LINKS,
  }
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getContactPageJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessJsonLd()) }}
      />

      {/*
        All interactivity (form state, GSAP reveal animations) lives in the
        client component below. Static text content is duplicated as plain
        server-rendered markup is unnecessary here since ContactPageClient
        already renders everything on mount without an internal fetch — the
        only gap this file closes is metadata + JSON-LD, which client
        components cannot export.
      */}
      <ContactPageClient />
    </>
  )
}