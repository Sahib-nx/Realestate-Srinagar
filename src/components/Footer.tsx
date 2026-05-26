import Link from 'next/link'
import Image from 'next/image'

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
      { label: 'Insights', href: '/insights' },
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
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Fair Housing', href: '/fair-housing' },
      { label: 'Disclaimers', href: '/disclaimers' },
    ],
  },
  {
    header: 'Connect',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Client Portal', href: '/client-portal' },
    ],
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
            </div>
          ))}
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