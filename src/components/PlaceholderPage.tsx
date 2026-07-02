import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { 
  Sparkles, 
  Map, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  Heart, 
  AlertTriangle 
} from 'lucide-react'
import { placeholderRoutes } from '@/lib/placeholderData'
import SectionHeader from './SectionHeader'

const iconMap = {
  Sparkles,
  Map,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  Scale,
  Heart,
  AlertTriangle,
}

interface PlaceholderPageProps {
  pageKey: string
}

export default function PlaceholderPage({ pageKey }: PlaceholderPageProps) {
  const data = placeholderRoutes[pageKey]
  if (!data) notFound()

  const IconComponent = iconMap[data.iconName] || Sparkles

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden sm:h-[55vh]">
        <Image
          src="/assets/about-office.jpg"
          alt={`${data.title} - Realestate Srinagar`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(33,33,33,0.75) 0%, rgba(33,33,33,0.2) 60%, transparent 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-5 text-center sm:px-6">
          <nav aria-label="Breadcrumb" className="font-['Inter'] text-[11px] uppercase tracking-[0.1em] text-white/70 sm:text-[12px]">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="text-white/80 transition-opacity hover:opacity-100">
                  Home
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li aria-current="page" className="text-white">{data.title}</li>
            </ol>
          </nav>

          <h1
            className="mt-3 font-['Newsreader'] text-4xl font-light text-white sm:mt-4 sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            {data.title}
          </h1>

          <p
            className="mx-auto mt-3 max-w-[80vw] font-['Inter'] text-sm leading-relaxed text-white/80 sm:mt-4 sm:max-w-[520px] sm:text-base"
          >
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* ── Content Section ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
            
            {/* Left Column: Progress Notice & Description */}
            <div className="space-y-8">
              <div className="rounded bg-[#F8F8F8] border border-[#ECECEC] p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#00523C]/10 text-[#00523C]">
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#00523C] bg-[#00523C]/10 rounded-full mb-1">
                      {data.badge}
                    </span>
                    <h2 className="font-['Newsreader'] text-2xl font-light text-[#212121] sm:text-3xl">
                      Page in Progress
                    </h2>
                  </div>
                </div>

                <p className="font-['Inter'] text-[15px] leading-[1.8] text-[#555555] sm:text-base">
                  {data.description}
                </p>

                <p className="mt-4 font-['Inter'] text-[15px] leading-[1.8] text-[#555555] sm:text-base">
                  We&apos;re actively developing this page to provide accurate, valuable, and up-to-date information. It will be published soon as we continue improving our website and services.
                </p>

                <div className="mt-8 border-t border-[#ECECEC] pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-['Inter'] text-[13px] text-[#888888]">
                    Need immediate assistance?
                  </span>
                  <Link
                    href="/contact"
                    className="inline-block rounded-full bg-[#00523C] px-6 py-2.5 text-center font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#00523C]/95"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar (What to Expect) */}
            <div className="space-y-8 lg:border-l lg:border-[#ECECEC] lg:pl-12">
              <div>
                <SectionHeader 
                  title="What to Expect" 
                  subtitle="Once published, this section will detail:"
                  className="mb-6"
                />
                
                <ul className="space-y-4" aria-label={`Features of ${data.title}`}>
                  {data.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00523C]"
                      />
                      <span className="font-['Inter'] text-[14px] font-medium text-[#212121] sm:text-[15px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded border border-[#ECECEC] p-6">
                <h4 className="font-['Newsreader'] text-lg font-light text-[#00523C] mb-2">
                  Realestate Srinagar
                </h4>
                <p className="font-['Inter'] text-[13px] leading-relaxed text-[#666666]">
                  Established in 2017 as Srinagar&apos;s pioneering digitized brokerage, we offer luxury sales, buyer representation, and professional construction management across multiple regional hubs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
