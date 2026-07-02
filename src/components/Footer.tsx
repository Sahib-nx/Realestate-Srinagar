import Link from 'next/link'
import Image from 'next/image'
import { areasData } from '@/app/areas/AreaData'

const footerColumns = [
  {
    header: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    header: 'Resources',
    links: [
      { label: 'Insights', href: '/insightss' },
      { label: 'Neighborhood Guides', href: '/neighborhood-guides' },
      { label: 'Market Reports', href: '/market-reports' },
      { label: 'Buyer Guide', href: '/buyer-guide' },
      { label: 'Seller Guide', href: '/seller-guide' },
    ],
  },
  {
    header: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Fair Housing', href: '/fair-housing' },
      { label: 'Disclaimers', href: '/disclaimers' },
    ],
  },
  {
    header: 'Connect',
    links: [
    ],
  },
]

// Lightweight inline social icons — no extra deps required, inherit color via currentColor.
const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/realestate_srinagar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[15px] w-[15px]">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/realestate-srinagar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[15px] w-[15px]">
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.2" cy="8" r="1.15" fill="currentColor" />
        <path d="M7.2 11v6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11.6 17.2V11m0 0c0-1.4 1-2.4 2.4-2.4s2.4 1 2.4 2.4v6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/realestae.srinagar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[15px] w-[15px]">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M13.6 21.4v-7.2h2.2l.35-2.7h-2.55V9.7c0-.78.22-1.32 1.34-1.32h1.43V6c-.25-.03-1.1-.11-2.09-.11-2.07 0-3.49 1.26-3.49 3.58v2.0H8.6v2.7h2.2v7.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@realestatesrinagar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[15px] w-[15px]">
        <rect x="2" y="5.5" width="20" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.3 9.3v5.4l4.8-2.7-4.8-2.7Z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="h-1 w-full bg-[#00523C]" />

      <div className="mx-auto max-w-[1400px] px-6 py-20 pb-10">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/assets/LogoHouse1.png"
            alt="Realestate Srinagar"
            width={28}
            height={28}
            className="h-6 w-6 object-contain mb-1 sm:h-7 sm:w-7 sm:mb-1"
            priority
          />
          {/* Short name on mobile, full name on sm+ */}
          <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#00523C] sm:text-[13px]">
            {/* <span className="sm:hidden">Realestate Srinagar</span> */}
            <span className="sm:inline">Realestate Srinagar</span>
          </span>
        </Link>

        <h2 className="mt-6 font-['Newsreader'] text-5xl font-light text-[#212121]">
          Luxury. Simplified.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.header}>
              <h3 className="mb-4 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C]">
                {col.header}
              </h3>

              <ul className="space-y-3">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith('http')

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="font-['Inter'] text-base text-[#212121] transition-colors duration-200 hover:text-[#00523C]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Social links (icon + label) under Connect. Each is its own row like the other columns, so it reads and taps consistently at any width. */}
              {col.header === 'Connect' && (
                <ul className="mt-3 space-y-3">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 font-['Inter'] text-base text-[#212121] transition-colors duration-200 hover:text-[#00523C]"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#ECECEC] text-[#212121] transition-colors duration-200 group-hover:border-[#00523C] group-hover:text-[#00523C]">
                          {social.icon}
                        </span>
                        <span>{social.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Areas We Serve Section */}
        <div className="mt-16 border-t border-[#ECECEC] pt-10">
          <h3 className="mb-4 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C]">
            Areas We Serve
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-['Inter'] text-sm text-[#212121]">
            {Object.values(areasData).map((area, idx) => (
              <span key={area.slug} className="flex items-center">
                <Link
                  href={`/areas/${area.slug}`}
                  className="transition-colors duration-200 hover:text-[#00523C]"
                >
                  {area.name}
                </Link>
                {idx < Object.keys(areasData).length - 1 && (
                  <span className="ml-4 text-[#ECECEC] select-none" aria-hidden="true">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#ECECEC] pt-8 md:flex-row">
          <p className="font-['Inter'] text-[13px] text-[#888888]">
            Independent. Full service. Fiduciary real estate representation.
          </p>

          <p className="font-['Inter'] text-[13px] text-[#888888]">
            Copyright 2026 Realestate Srinagar Real Estate
          </p>
        </div>
      </div>
    </footer>
  )
}