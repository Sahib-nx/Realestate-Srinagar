"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  number: string
  title: string
  tag: string
  description: string
  highlights: string[]
}

interface ServicePageClientProps {
  services: ServiceItem[]
}

export default function ServicePageClient({ services }: ServicePageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const servicesRef = useScrollReveal<HTMLDivElement>({ childSelector: '.svc-row', y: 36, stagger: 0.08 })
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20 })

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      )
    }
  }, [])

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        aria-label="Services hero"
        className="relative flex h-[60vh] min-h-[440px] w-full items-end overflow-hidden sm:h-[70vh] sm:min-h-[520px]"
      >
        {/* Background: dark green with subtle grain texture via SVG */}
        <div className="absolute inset-0 bg-[#00523C]" />
        {/* Decorative geometric accent */}
        <div
          className="absolute right-0 top-0 h-full w-[45%] opacity-[0.07]"
          style={{
            background:
              'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-[1px] w-full bg-white opacity-10"
        />

        {/* Faint large number watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-['Newsreader'] text-[200px] font-light leading-none text-white opacity-[0.04] sm:right-12 sm:text-[280px] lg:text-[340px]"
        >
          07
        </span>

        <div
          ref={heroContentRef}
          className="relative z-10 w-full px-5 pb-12 sm:px-6 sm:pb-16 lg:pb-20"
          style={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-[1400px]">
            <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.12em] text-white/60 sm:text-[12px]">
              Realestate Srinagar
            </span>
            <h1 className="mt-3 font-['Newsreader'] text-[40px] font-light leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
              Comprehensive Real Estate<br className="hidden sm:block" /> &amp; Development Solutions
            </h1>
            <p className="mt-4 max-w-[580px] font-['Inter'] text-[14px] leading-relaxed text-white/70 sm:mt-5 sm:text-[15px]">
              At Realestate Srinagar, our commitment extends beyond traditional buying and selling, we offer an end-to-end suite of solutions designed to support every aspect of your property and development journey.
            </p>

            {/* Breadcrumb for SEO */}
            <nav aria-label="Breadcrumb" className="mt-6 sm:mt-8">
              <ol className="flex items-center gap-2 font-['Inter'] text-[11px] text-white/40 sm:text-[12px]">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/70">Services</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Service count strip ───────────────────────────────────────── */}
      <div className="border-b border-[#ECECEC] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="flex items-center gap-6 overflow-x-auto py-4 sm:gap-10 sm:py-5">
            {services.map((s) => (
              <a
                key={s.number}
                href={`#service-${s.number}`}
                className="group flex flex-shrink-0 items-center gap-2.5 font-['Inter'] text-[12px] text-[#888888] transition-colors hover:text-[#00523C] sm:text-[13px]"
              >
                <span className="font-['Newsreader'] text-[15px] text-[#00523C] opacity-60 group-hover:opacity-100 sm:text-base">
                  {s.number}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services list ────────────────────────────────────────────── */}
      <section
        aria-label="All services"
        className="bg-white py-16 sm:py-20 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div ref={servicesRef} className="space-y-0">
            {services.map((service, i) => (
              <article
                id={`service-${service.number}`}
                key={service.number}
                className="svc-row group scroll-mt-20"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Top border */}
                <div className="h-px bg-[#ECECEC]" />

                <div className="grid py-10 sm:py-14 lg:grid-cols-[200px_1fr_320px] lg:gap-12 lg:py-16">
                  {/* Number + tag */}
                  <div className="mb-5 flex items-start gap-4 lg:mb-0 lg:block">
                    <span
                      aria-hidden="true"
                      className="font-['Newsreader'] text-[36px] font-light leading-none text-[#00523C] opacity-30 transition-opacity duration-300 group-hover:opacity-60 sm:text-[42px]"
                    >
                      {service.number}
                    </span>
                    <span className="mt-1 inline-block rounded-full border border-[#00523C]/20 px-3 py-1 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.08em] text-[#00523C] lg:mt-4 lg:ml-0">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h2
                      className="font-['Newsreader'] text-[28px] font-light text-[#212121] sm:text-[34px] lg:text-[38px]"
                      itemProp="name"
                    >
                      {service.title}
                    </h2>
                    <p
                      className="mt-3 max-w-[560px] font-['Inter'] text-[14px] leading-[1.7] text-[#666666] sm:mt-4 sm:text-[15px]"
                      itemProp="description"
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 lg:mt-0">
                    <p className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.1em] text-[#888888] sm:text-[11px]">
                      What's included
                    </p>
                    <ul className="mt-3 space-y-2.5" aria-label={`${service.title} highlights`}>
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 font-['Inter'] text-[13px] text-[#212121] sm:text-[14px]">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00523C] opacity-60"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom border for last item */}
                {i === services.length - 1 && <div className="h-px bg-[#ECECEC]" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────────────── */}
      <section
        aria-label="Company stats"
        className="border-y border-[#ECECEC] bg-[#F8F8F8] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
            {[
              { value: '9+', label: 'Years of expertise' },
              { value: '7', label: 'Specialized services' },
              { value: '100Cr+', label: 'Transactions closed' },
              { value: '5', label: 'Markets served' },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-['Newsreader'] text-[36px] font-light text-[#00523C] sm:text-[44px]">
                  {stat.value}
                </p>
                <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        aria-label="Contact call to action"
        className="bg-[#00523C] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.1em] text-white/50 sm:text-[12px]">
            Ready to elevate your real estate portfolio?
          </span>
          <h2
            className="mt-4 font-['Newsreader'] text-[36px] font-light text-white sm:mt-5 sm:text-5xl"
            style={{ lineHeight: 1.1 }}
          >
            Connect With Our Advisory Team
          </h2>
          <p className="mt-3 font-['Inter'] text-[14px] text-white/70 sm:mt-4 sm:text-[15px]">
            Discuss your specific requirements with our specialists. Whether you are buying, building, investing, or leasing — we are here for every step.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="w-full rounded-full bg-white px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all hover:bg-white/90 sm:w-auto text-center"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="w-full rounded-full border border-white/40 px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto text-center"
            >
              Our Story
            </Link>
          </div>

          <p className="mt-6 font-['Inter'] text-[12px] text-white/40 sm:mt-8 sm:text-[13px]">
            Srinagar · Jammu · Delhi · Dholera · Dubai
          </p>
        </div>
      </section>
    </main>
  )
}
