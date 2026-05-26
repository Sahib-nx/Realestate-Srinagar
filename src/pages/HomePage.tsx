"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/SectionHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Neighborhood } from '../types'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

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
  // {
  //   number: '03',
  //   title: 'Market Intelligence',
  //   description:
  //     "Data-driven insights into Srinagar's most desirable neighborhoods. We provide comprehensive market analysis to inform your most important real estate decisions.",
  // },
]

const neighborhoods: Neighborhood[] = [
  { name: 'Tarrytown', avgPrice: '$2.1M', listings: 8, tagline: 'Historic elegance, lakefront living', image: '/assets/hood-tarrytown.jpg' },
  { name: 'Westlake', avgPrice: '$3.4M', listings: 5, tagline: 'Hill Country estates, top schools', image: '/assets/hood-westlake.jpg' },
  { name: 'Hyde Park', avgPrice: '$850K', listings: 15, tagline: 'Bungalow charm, walkable streets', image: '/assets/hood-hyde.jpg' },
  { name: 'Barton Creek', avgPrice: '$2.8M', listings: 6, tagline: 'Resort living, golf course views', image: '/assets/hood-barton.jpg' },
  { name: 'Clarksville', avgPrice: '$1.5M', listings: 10, tagline: 'Downtown adjacent, historic homes', image: '/assets/hood-clarksville.jpg' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const aboutRef = useScrollReveal<HTMLDivElement>({ childSelector: '.about-reveal' })
  const servicesGridRef = useScrollReveal<HTMLDivElement>({ childSelector: '.service-item' })
  const hoodRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.06, childSelector: '.hood-card' })
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20 })

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      )
    }
  }, [])

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/assets/hero-entrance.mp4" type="video/mp4" />
        </video>

        {/* Gradient: slightly stronger on mobile for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(33,33,33,0.45) 0%, rgba(33,33,33,0.1) 50%, transparent 100%)',
          }}
        />

        <div
          ref={heroContentRef}
          className="absolute bottom-12 left-0 w-full px-5 sm:bottom-20 sm:px-6"
          style={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-[1400px]">
            {/* Responsive headline: 36px mobile → 48px sm → 60px md+ */}
            <h1
              className="max-w-[90vw] font-['Newsreader'] text-[36px] font-light leading-[1.1] text-white sm:max-w-[540px] sm:text-5xl md:max-w-[600px] md:text-6xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              Where Srinagar Living Begins
            </h1>

            {/* Subtitle: hidden on very small screens to reduce clutter */}
            <p
              className="mt-3 hidden max-w-[480px] font-['Inter'] text-base text-white/90 sm:mt-4 sm:block sm:text-lg"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
            >
              Curated luxury homes, exceptional service, unmatched expertise.
            </p>

            {/* Show a short version on tiny screens */}
            <p
              className="mt-3 font-['Inter'] text-sm text-white/80 sm:hidden"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
            >
              Curated luxury homes &amp; unmatched expertise.
            </p>

            <a
              href="/about"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white sm:mt-8 sm:px-8 sm:py-3.5 sm:text-[13px]"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader
            title="Services"
            subtitle="Comprehensive real estate solutions for discerning clients"
            className="mb-10 sm:mb-16"
          />
          <div
            ref={servicesGridRef}
            className="grid gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
          >
            {services.map((service) => (
              <div key={service.number} className="service-item relative">
                <span className="font-['Newsreader'] text-[28px] font-light text-[#00523C] opacity-40 sm:text-[32px]">
                  {service.number}
                </span>
                <h3 className="mt-3 font-['Newsreader'] text-[26px] font-light text-[#212121] sm:mt-4 sm:text-[32px]">
                  {service.title}
                </h3>
                <p className="mt-2 font-['Inter'] text-[15px] leading-relaxed text-[#888888] sm:mt-3 sm:max-w-[360px] sm:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 sm:text-center">
            <Link
              href="/service"
              className="inline-block w-full rounded-full border border-[#00523C] px-7 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white text-center sm:w-auto"
            >
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
        <div ref={aboutRef} className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[55%_45%]">

            {/* Image — comes first on mobile (natural DOM order) */}
            <div className="about-reveal overflow-hidden rounded">
              <img
                src="/assets/austin-skyline.jpg"
                alt="Srinagar Skyline"
                className="aspect-[3/2] w-full object-cover sm:aspect-[4/3]"
              />
            </div>

            {/* Text block */}
            <div className="about-reveal">
              <span className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] sm:text-[13px]">
                ABOUT Realestate Srinagar
              </span>
              <h2 className="mt-4 font-['Newsreader'] text-[36px] font-light leading-[1.1] text-[#212121] sm:mt-6 sm:text-5xl">
                Srinagar&apos;s Independent Luxury Brokerage
              </h2>
              <p className="mt-4 font-['Inter'] text-[15px] leading-relaxed text-[#212121] sm:mt-6 sm:text-base">
                Since 2017, Realestate Srinagar has been redefining property marketing through innovation and digital reach.
                Recognized as one of the early real estate brands to bring digitalization to the Srinagar property market.
              </p>

              <div className="mt-4 sm:mt-5">
                <p className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.08em] text-[#00523C] sm:text-[12px]">
                  Locations We Serve
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                  {['Srinagar', 'Jammu', 'Delhi', 'Dholera', 'Dubai'].map((city) => (
                    <span
                      key={city}
                      className="font-['Inter'] text-[13px] text-[#212121] sm:text-[14px]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4 sm:mt-8 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">9+</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Years</p>
                </div>
                <div className="w-px self-stretch bg-[#ECECEC]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">100Cr+</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">In Sales</p>
                </div>
                <div className="w-px self-stretch bg-[#ECECEC]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">100%</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Satisfaction</p>
                </div>
              </div>

              <a
                href="/about"
                className="mt-6 inline-block font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] underline-offset-4 hover:underline sm:mt-8"
              >
                Our Story &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F8] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader
            title="Neighborhoods"
            subtitle="Explore Srinagar's most sought-after communities"
            className="mb-8 sm:mb-12"
          />

          <div ref={hoodRef} className="relative">
            <div
              className="flex gap-4 overflow-x-auto pb-4 sm:gap-6 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
              {neighborhoods.map((hood) => (
                <div
                  key={hood.name}
                  className="hood-card w-[272px] flex-shrink-0 overflow-hidden rounded bg-white transition-transform duration-200 hover:-translate-y-1 sm:w-[320px]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <img
                    src={hood.image}
                    alt={hood.name}
                    className="h-[180px] w-full object-cover sm:h-[200px]"
                  />
                  <div className="p-4 sm:p-5">
                    <h3 className="font-['Newsreader'] text-xl font-light text-[#212121] sm:text-2xl">
                      {hood.name}
                    </h3>
                    <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">
                      Avg. {hood.avgPrice} &middot; {hood.listings} listings
                    </p>
                    <p className="mt-1.5 font-['Inter'] text-[12px] text-[#00523C] sm:mt-2 sm:text-[13px]">
                      {hood.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>


            <div
              className="pointer-events-none absolute right-0 top-0 hidden h-full w-[60px] sm:block"
              style={{ background: 'linear-gradient(to right, transparent, #F8F8F8)' }}
            />
          </div>

          <p className="mt-4 text-right font-['Inter'] text-[12px] text-[#888888] sm:mt-6 sm:text-[13px]">
            Scroll to explore &rarr;
          </p>
        </div>
      </section>

      <section ref={ctaRef} className="bg-[#00523C] py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <h2
            className="font-['Newsreader'] text-[36px] font-light text-white sm:text-5xl"
            style={{ lineHeight: 1.1 }}
          >
            Stay Ahead of the Srinagar Market
          </h2>
          <p className="mt-3 font-['Inter'] text-[15px] text-white/80 sm:mt-4 sm:text-base">
            Monthly market reports, neighborhood insights, and exclusive listings delivered to your inbox.
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

          <p className="mt-5 font-['Inter'] text-[13px] text-white/60 sm:mt-6">
            Or schedule a consultation
          </p>
          <a
            href="/contact"
            className="mt-2 inline-block font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white underline-offset-4 hover:opacity-80"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}