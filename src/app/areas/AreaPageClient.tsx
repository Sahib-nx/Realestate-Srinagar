"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { AreaData } from './AreaData'

gsap.registerPlugin(ScrollTrigger)

interface AreaPageClientProps {
  data: AreaData
}

export default function AreaPageClient({ data }: AreaPageClientProps) {
  const heroImageRef = useRef<HTMLImageElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  const sectionRef = useScrollReveal<HTMLDivElement>({ childSelector: '.reveal-item', y: 30, stagger: 0.1 })
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20 })

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.16, 1, 0.3, 1)' } })

    if (heroImageRef.current) {
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.08, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 },
        0
      )
    }

    if (heroContentRef.current) {
      tl.fromTo(
        heroContentRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
        0.2
      )
    }
  }, [data.slug])

  // JSON-LD structured data for local SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${data.name}, Srinagar`,
    "description": data.metaDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": "Jammu and Kashmir",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "address": `${data.name}, Srinagar, J&K, India`
      }
    }
  }

  return (
    <>
      {/* Dynamic Area Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="bg-white min-h-screen">
        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden sm:h-[60vh]">
          {data.image && (
            <Image
              ref={heroImageRef}
              src={data.image}
              alt={`${data.name} Real Estate - Srinagar`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ opacity: 0 }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(33,33,33,0.7) 0%, rgba(33,33,33,0.2) 60%, transparent 100%)',
            }}
          />

          <div ref={heroContentRef} className="relative z-10 flex flex-col items-center px-5 text-center sm:px-6">
            <nav aria-label="Breadcrumb" className="font-['Inter'] text-[11px] uppercase tracking-[0.1em] text-white/70 sm:text-[12px]">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="text-white/80 transition-opacity hover:opacity-100">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">/</li>
                <li>
                  <span className="text-white/40">Areas</span>
                </li>
                <li className="text-white/40">/</li>
                <li aria-current="page" className="text-white">{data.name}</li>
              </ol>
            </nav>

            <h1
              className="mt-3 font-['Newsreader'] text-4xl font-light text-white sm:mt-4 sm:text-5xl md:text-6xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)', opacity: 0 }}
            >
              Real Estate in {data.name}
            </h1>

            <p
              className="mx-auto mt-3 max-w-[80vw] font-['Inter'] text-sm leading-relaxed text-white/80 sm:mt-4 sm:max-w-[480px] sm:text-base"
              style={{ opacity: 0 }}
            >
              {data.tagline}
            </p>
          </div>
        </section>

        {/* ── Details Section ─────────────────────────────────────────────── */}
        <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
              
              {/* Left Column: Details */}
              <div className="space-y-12 sm:space-y-16">
                
                {/* Lifestyle */}
                <div className="reveal-item">
                  <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.08em] text-[#00523C] sm:text-[12px]">
                    Neighborhood Lifestyle & Culture
                  </span>
                  <h2 className="mt-3 font-['Newsreader'] text-[28px] font-light text-[#212121] sm:text-[34px]">
                    Living in {data.name}
                  </h2>
                  <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#555555] sm:text-base">
                    {data.lifestyle}
                  </p>
                </div>

                {/* Investment Opportunities */}
                <div className="reveal-item border-t border-[#ECECEC] pt-10 sm:pt-12">
                  <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.08em] text-[#00523C] sm:text-[12px]">
                    Investment Case
                  </span>
                  <h2 className="mt-3 font-['Newsreader'] text-[28px] font-light text-[#212121] sm:text-[34px]">
                    Investment Opportunities & ROI
                  </h2>
                  <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#555555] sm:text-base">
                    {data.investment}
                  </p>
                </div>

                {/* Market Trends */}
                <div className="reveal-item border-t border-[#ECECEC] pt-10 sm:pt-12">
                  <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.08em] text-[#00523C] sm:text-[12px]">
                    Market Analysis
                  </span>
                  <h2 className="mt-3 font-['Newsreader'] text-[28px] font-light text-[#212121] sm:text-[34px]">
                    Current Market Trends
                  </h2>
                  <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#555555] sm:text-base">
                    {data.trends}
                  </p>
                </div>

              </div>

              {/* Right Column: Sidebar (Places of Interest) */}
              <div className="reveal-item space-y-8 lg:border-l lg:border-[#ECECEC] lg:pl-12">
                <div>
                  <h3 className="font-['Newsreader'] text-[22px] font-light text-[#212121] sm:text-[24px]">
                    Points of Interest
                  </h3>
                  <p className="mt-1.5 font-['Inter'] text-[13px] text-[#888888]">
                    Key landmarks, schools, and nearby locations around {data.name}:
                  </p>
                  
                  <ul className="mt-6 space-y-4" aria-label={`Landmarks around ${data.name}`}>
                    {data.places.map((place) => (
                      <li key={place} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00523C]"
                        />
                        <span className="font-['Inter'] text-[14px] font-medium text-[#212121] sm:text-[15px]">
                          {place}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded bg-[#F8F8F8] p-6">
                  <h4 className="font-['Newsreader'] text-lg font-light text-[#00523C]">
                    Thinking of buying or selling here?
                  </h4>
                  <p className="mt-2 font-['Inter'] text-[13px] leading-relaxed text-[#666666]">
                    Realestate Srinagar has been active in {data.name} since 2017. Leverage our local expertise to secure off-market listings or list your property at maximum market valuation.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block w-full rounded-full bg-[#00523C] py-2.5 text-center font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#00523C]/95"
                  >
                    Consult an Advisor
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Call to Action ─────────────────────────────────────────────── */}
        <section ref={ctaRef} className="bg-[#00523C] py-16 sm:py-20">
          <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
            <h2 className="font-['Newsreader'] text-[32px] font-light text-white sm:text-4xl lg:text-5xl" style={{ lineHeight: 1.15 }}>
              Receive Exclusive Listings in {data.name}
            </h2>
            <p className="mt-3 font-['Inter'] text-[14px] text-white/80 sm:mt-4 sm:text-base">
              Get off-market property alerts, monthly market analysis, and premium listings in {data.name} delivered directly to your inbox.
            </p>

            <div className="mx-auto mt-6 flex max-w-[480px] flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border-b-2 border-white/40 bg-transparent pb-3 pt-1 font-['Inter'] text-base text-white outline-none transition-colors placeholder:text-white/50 focus:border-white sm:flex-1"
              />
              <button className="w-full rounded-full bg-white px-7 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all hover:bg-white/90 sm:w-auto">
                Subscribe
              </button>
            </div>
            
            <p className="mt-6 font-['Inter'] text-[12px] text-white/50">
              Or call our desk directly at <a href="tel:+919419000000" className="text-white hover:underline">+91 94190 00000</a>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
