import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from './site'

export interface PlaceholderDetails {
  title: string
  subtitle: string
  description: string
  badge: 'Coming Soon' | 'Under Development' | 'In Progress'
  features: string[]
  seoTitle: string
  seoDescription: string
  iconName: 'Sparkles' | 'Map' | 'TrendingUp' | 'BookOpen' | 'ShieldCheck' | 'Scale' | 'Heart' | 'AlertTriangle'
  path: string
}

export const placeholderRoutes: Record<string, PlaceholderDetails> = {
  insightss: {
    title: 'Real Estate Insights',
    subtitle: 'Discover real estate insights, market trends, investment tips, and expert articles.',
    description: "We are actively developing our insights center to bring you deep-dives into property investments, market forecasts, and local economic trends in Srinagar, Jammu, Delhi, and Dubai.",
    badge: 'Coming Soon',
    features: [
      'Local market insights & historical transaction updates',
      'Expert recommendations for primary & secondary homebuyers',
      'Property investment trends & yield forecasting models',
      'Buyer and seller resources for tax and legal compliance'
    ],
    seoTitle: 'Insights',
    seoDescription: 'Discover real estate insights, market trends, investment tips, and expert articles.',
    iconName: 'Sparkles',
    path: '/insightss'
  },
  'neighborhood-guides': {
    title: 'Neighborhood Guides',
    subtitle: 'Explore detailed neighborhood information, local amenities, lifestyle, and community insights.',
    description: "Our team is curating comprehensive neighborhood guides for Srinagar, Jammu, Delhi, Dholera, and Dubai, detailing local amenities, schools, transport connectivity, and lifestyle nuances.",
    badge: 'Under Development',
    features: [
      'Demographics, culture, and lifestyle profiles',
      'Nearby schooling, healthcare, and retail landmarks',
      'Transportation routes and walkability scores',
      'Historical pricing trends per square foot'
    ],
    seoTitle: 'Neighborhood Guides',
    seoDescription: 'Explore detailed neighborhood information, local amenities, lifestyle, and community insights.',
    iconName: 'Map',
    path: '/neighborhood-guides'
  },
  'market-reports': {
    title: 'Market Reports',
    subtitle: 'Stay informed with the latest property market trends, pricing analysis, and regional reports.',
    description: "Get quarterly market reports and pricing analyses prepared by our research desk. We will provide data-driven insight into Srinagar and regional real estate sectors.",
    badge: 'Coming Soon',
    features: [
      'Quarterly average transaction price shifts',
      'Supply and demand index values across luxury sectors',
      'Regional commercial vs. residential growth tables',
      'Independent advisory assessments on market timing'
    ],
    seoTitle: 'Market Reports',
    seoDescription: 'Stay informed with the latest property market trends, pricing analysis, and regional reports.',
    iconName: 'TrendingUp',
    path: '/market-reports'
  },
  'buyer-guide': {
    title: "Buyer's Guide",
    subtitle: 'Learn everything you need to know before purchasing your next property.',
    description: "We are building a comprehensive luxury buyer guide to help you navigate property acquisition, legal compliance, tax implications, and financing in Srinagar and beyond.",
    badge: 'In Progress',
    features: [
      'Detailed transaction flow from offer to registry',
      'Due diligence guidelines and document checklists',
      'Tax registration, stamp duty, and legal parameters',
      'Fiduciary representation benefits overview'
    ],
    seoTitle: "Buyer's Guide",
    seoDescription: 'Learn everything you need to know before purchasing your next property.',
    iconName: 'BookOpen',
    path: '/buyer-guide'
  },
  'seller-guide': {
    title: "Seller's Guide",
    subtitle: 'Helpful resources and expert advice to prepare, price, and sell your property successfully.',
    description: "Our selling advisory team is structuring a seller playbook covering professional staging, valuation methodologies, global digital marketing, and transaction closing.",
    badge: 'In Progress',
    features: [
      'Home staging and professional videography advice',
      'Pricing strategies utilizing CMA (Comparative Market Analysis)',
      'Digital syndication and international buyer outreach',
      'Contract templates and negotiations checklists'
    ],
    seoTitle: "Seller's Guide",
    seoDescription: 'Helpful resources and expert advice to prepare, price, and sell your property successfully.',
    iconName: 'BookOpen',
    path: '/seller-guide'
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Learn how we collect, use, and protect your information.',
    description: "We take data protection and your privacy seriously. Our updated privacy terms outlining how we securely manage your listings, inquiries, and customer data are being finalized.",
    badge: 'Under Development',
    features: [
      'Transparency on collected name, phone, and email records',
      'Secure listings data storage and transfer policies',
      'Opt-out controls for newsletters and notifications',
      'Third-party sharing limitations and security protocols'
    ],
    seoTitle: 'Privacy Policy',
    seoDescription: 'Learn how we collect, use, and protect your information.',
    iconName: 'ShieldCheck',
    path: '/privacy-policy'
  },
  'terms-of-service': {
    title: 'Terms of Service',
    subtitle: 'Review the terms and conditions governing the use of our website and services.',
    description: "Our updated terms of service defining user agreements, property search compliance, and listing service terms are currently being prepared with legal counsel.",
    badge: 'Under Development',
    features: [
      'Website content ownership and fair use criteria',
      'Limitations of liability on public listing projections',
      'User-submitted listings and comments regulations',
      'Brokerage licensing boundaries and state declarations'
    ],
    seoTitle: 'Terms of Service',
    seoDescription: 'Review the terms and conditions governing the use of our website and services.',
    iconName: 'Scale',
    path: '/terms-of-service'
  },
  'fair-housing': {
    title: 'Fair Housing Statement',
    subtitle: 'Read about our commitment to equal housing opportunities and professional real estate practices.',
    description: "Equal housing opportunity is a core pillar of our brokerage. Our formal statement of commitment to inclusive housing, non-discriminatory service, and ethical code will be posted here.",
    badge: 'In Progress',
    features: [
      'Brokerage non-discrimination pledges',
      'Equal access advisory and representation mandates',
      'Brokerage ethical guidelines and compliance audits',
      'Fair marketing and public listing review policies'
    ],
    seoTitle: 'Fair Housing',
    seoDescription: 'Read about our commitment to equal housing opportunities and professional real estate practices.',
    iconName: 'Heart',
    path: '/fair-housing'
  },
  disclaimers: {
    title: 'Legal Disclaimers',
    subtitle: 'Important notices regarding property information, website content, and liability.',
    description: "Important legal disclaimers regarding property details, transaction advisories, projected investment yields, and third-party content limits are being prepared.",
    badge: 'Under Development',
    features: [
      'Verification mandates for listed plot and building details',
      'Liability boundaries for real estate investment projections',
      'Third-party vendor mapping and content boundaries',
      'Regulatory compliance registration details'
    ],
    seoTitle: 'Disclaimers',
    seoDescription: 'Important notices regarding property information, website content, and liability.',
    iconName: 'AlertTriangle',
    path: '/disclaimers'
  }
}

export function getPlaceholderMetadata(key: string): Metadata {
  const details = placeholderRoutes[key]
  if (!details) {
    return {
      title: `Page Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false }
    }
  }

  const fullTitle = `${details.seoTitle} | ${SITE_NAME}`
  const pageUrl = `${SITE_URL}${details.path}`

  return {
    title: fullTitle,
    description: details.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description: details.seoDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/assets/hero-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${details.title} - ${SITE_NAME}`,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: details.seoDescription,
      images: [`${SITE_URL}/assets/hero-og-image.jpg`],
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
