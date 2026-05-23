"use client"


import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../components/SectionHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { TeamMember, Testimonial } from '../types'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    number: '01',
    title: 'Fiduciary First',
    description:
      'We are legally and ethically bound to act in your best interest at all times. No dual agency. No conflicting loyalties. Just unwavering advocacy for your goals.',
  },
  {
    number: '02',
    title: 'Market Mastery',
    description:
      "Srinagar's luxury market requires deep local knowledge. We know every neighborhood, every street, and every comp — because we've sold on most of them.",
  },
  {
    number: '03',
    title: 'White-Glove Service',
    description:
      'From private showings to contract negotiation to closing coordination, we handle every detail. Your time is valuable. We protect it.',
  },
  {
    number: '04',
    title: 'Independent Counsel',
    description:
      'As an independent brokerage, we have no corporate quotas, no franchise fees, and no pressure to push in-house inventory. Our advice is always unbiased.',
  },
]

const team: TeamMember[] = [
  { name: 'Sarah Chen', title: 'Principal Broker', experience: '18 years in Srinagar real estate', image: '/assets/property-stratford.jpg' },
  { name: 'Marcus Williams', title: 'Luxury Specialist', experience: '14 years, $200M+ in sales', image: '/assets/property-westlake.jpg' },
  { name: 'Elena Rodriguez', title: 'Buyer Advocate', experience: '10 years, former attorney', image: '/assets/property-hyde.jpg' },
  { name: 'David Park', title: 'Market Analyst', experience: '8 years, data-driven strategist', image: '/assets/property-barton.jpg' },
]

const testimonials: Testimonial[] = [
  {
    quote: "Sarah's knowledge of Tarrytown is unmatched. She found us our dream home off-market before it ever hit the MLS. Her negotiation saved us $200,000 below asking. We will never use another agent.",
    client: 'Jennifer & Michael Hartwell',
    property: 'Purchased in Tarrytown, 2025',
  },
  {
    quote: 'As a first-time luxury buyer, I needed guidance I could trust. Realestate Srinagar provided exactly that — patient, thorough, and always looking out for my interests. Worth every penny of their commission.',
    client: 'Robert Chen',
    property: 'Purchased in Westlake, 2024',
  },
  {
    quote: "We interviewed five agents to sell our Clarksville home. Realestate Srinagar's market analysis was the most detailed, and their pricing strategy delivered three offers above asking in the first week.",
    client: 'Amanda Foster',
    property: 'Sold in Clarksville, 2025',
  },
]

const neighborhoodBars = [
  { name: 'Tarrytown', transactions: 47, width: 100 },
  { name: 'Westlake', transactions: 38, width: 81 },
  { name: 'Clarksville', transactions: 29, width: 62 },
  { name: 'Barton Creek', transactions: 22, width: 47 },
  { name: 'Hyde Park', transactions: 18, width: 38 },
  { name: 'Downtown', transactions: 15, width: 32 },
  { name: 'Zilker', transactions: 12, width: 26 },
]

export default function AboutPage() {
  // ── Refs ──────────────────────────────────────────────────────────
  const heroImageRef = useRef<HTMLImageElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  // ── Scroll reveals ────────────────────────────────────────────────
  const storyRef = useScrollReveal<HTMLDivElement>({ childSelector: '.story-reveal' })
  const valuesGridRef = useScrollReveal<HTMLDivElement>({ childSelector: '.value-card' })
  const teamGridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.08, childSelector: '.team-card' })
  const testimonialsRef = useScrollReveal<HTMLDivElement>({ childSelector: '.testimonial-card' })
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20 })

  // ── Hero entrance animation ───────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.16, 1, 0.3, 1)' } })

    if (heroImageRef.current) {
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.4 },
        0
      )
    }

    if (heroContentRef.current) {
      tl.fromTo(
        heroContentRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
        0.25
      )
    }
  }, [])

  // ── Market bars animation ─────────────────────────────────────────
  useEffect(() => {
    if (!barsRef.current) return
    const bars = barsRef.current.querySelectorAll('.market-bar')
    gsap.fromTo(
      bars,
      { width: 0 },
      {
        width: (i: number) => `${neighborhoodBars[i]?.width || 0}%`,
        duration: 0.8,
        stagger: 0.08,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: barsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <div>
      <section className="relative flex h-[50vh] min-h-[340px] items-center justify-center overflow-hidden sm:h-[55vh]">
        <img
          ref={heroImageRef}
          src="/assets/about-office.jpg"
          alt="Realestate Srinagar Office"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(33,33,33,0.6) 0%, rgba(33,33,33,0.18) 60%, transparent 100%)',
          }}
        />

        
        <div ref={heroContentRef} className="relative z-10 flex flex-col items-center px-5 text-center sm:px-6">
          {/* Breadcrumb */}
          <p
            className="font-['Inter'] text-[12px] text-white/70 sm:text-[13px]"
            style={{ opacity: 0 }}
          >
            <Link href="/" className="text-white/90 transition-opacity hover:opacity-70">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <span>About</span>
          </p>

          {/* Headline */}
          <h1
            className="mt-3 font-['Newsreader'] text-5xl font-light text-white sm:mt-4 sm:text-6xl md:text-7xl"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)', opacity: 0 }}
          >
            About
          </h1>

          {/* Tagline */}
          <p
            className="mx-auto mt-3 max-w-[85vw] font-['Inter'] text-[14px] leading-relaxed text-white/80 sm:mt-4 sm:max-w-[500px] sm:text-base"
            style={{ opacity: 0 }}
          >
            Independent. Full service. Fiduciary real estate representation.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
        <div ref={storyRef} className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="grid items-center gap-8 sm:gap-12 md:grid-cols-2">

            <div className="story-reveal overflow-hidden rounded">
              <img
                src="/assets/about-office.jpg"
                alt="Realestate Srinagar Office"
                className="aspect-[4/3] w-full object-cover sm:aspect-[3/4]"
              />
            </div>

            <div className="story-reveal md:pl-8 lg:pl-12">
              <span className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] sm:text-[13px]">
                OUR STORY
              </span>
              <h2 className="mt-3 font-['Newsreader'] text-[28px] font-light text-[#212121] sm:mt-4 sm:text-[32px]">
                Founded on Independence
              </h2>
              <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#212121] sm:mt-6 sm:text-base">
                Realestate Srinagar Real Estate was founded in 2014 with a clear purpose: to provide
                Srinagar&apos;s most discerning clients with independent, fiduciary-focused real estate
                representation. In a market increasingly dominated by franchise brokerages with competing
                interests, we chose a different path.
              </p>
              <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#212121] sm:text-base">
                Our founders believed that real estate clients deserve the same standard of care that
                legal and financial clients receive — undivided loyalty, complete transparency, and
                advice guided exclusively by the client&apos;s best interests.
              </p>
              <p className="mt-4 font-['Inter'] text-[15px] leading-[1.7] text-[#212121] sm:text-base">
                Over the past fourteen years, we have grown from a boutique two-agent practice to one
                of Srinagar&apos;s most respected independent brokerages, with over $500 million in sales
                and a client satisfaction record that speaks for itself.
              </p>

              {/* Stats — same pattern as HomePage, same mobile treatment */}
              <div className="mt-8 flex items-start gap-4 sm:mt-10 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">2014</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Founded</p>
                </div>
                <div className="w-px self-stretch bg-[#ECECEC]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">$500M+</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Total Sales</p>
                </div>
                <div className="w-px self-stretch bg-[#ECECEC]" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Newsreader'] text-3xl font-light text-[#00523C] sm:text-4xl">100%</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F8] py-16 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader title="What We Stand For" centered className="mb-10 sm:mb-16" />
          <div ref={valuesGridRef} className="grid gap-4 sm:gap-6 md:grid-cols-2 sm:gap-8">
            {values.map((v) => (
              <div
                key={v.number}
                className="value-card rounded bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-10"
              >
                <span className="font-['Newsreader'] text-[28px] font-light text-[#00523C] opacity-30 sm:text-[32px]">
                  {v.number}
                </span>
                <h3 className="mt-3 font-['Newsreader'] text-[26px] font-light text-[#212121] sm:mt-4 sm:text-[32px]">
                  {v.title}
                </h3>
                <p className="mt-2 font-['Inter'] text-[15px] leading-relaxed text-[#888888] sm:mt-3 sm:text-base">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader
            title="Our Team"
            subtitle="Meet the professionals behind Realestate Srinagar"
            className="mb-10 sm:mb-16"
          />
          <div
            ref={teamGridRef}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {team.map((member) => (
              <div key={member.name} className="team-card group cursor-pointer">
                <div className="overflow-hidden rounded">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-['Newsreader'] text-[20px] font-light text-[#212121] sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 font-['Inter'] text-[12px] text-[#00523C] sm:mt-1 sm:text-[13px]">
                    {member.title}
                  </p>
                  <p className="mt-0.5 font-['Inter'] text-[12px] text-[#888888] sm:mt-1 sm:text-[13px]">
                    {member.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F8] py-16 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader title="Client Words" className="mb-10 sm:mb-16" />
          <div ref={testimonialsRef} className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.client}
                className="testimonial-card rounded bg-white p-6 sm:p-8"
              >
                <span
                  className="font-['Newsreader'] text-5xl font-light leading-[0.5] text-[#00523C] opacity-15 sm:text-6xl"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-4 font-['Inter'] text-[15px] italic leading-relaxed text-[#212121] sm:text-base">
                  {t.quote}
                </p>
                <div className="mx-0 my-4 h-px w-10 bg-[#ECECEC] sm:my-5" />
                <p className="font-['Newsreader'] text-lg font-light text-[#212121]">{t.client}</p>
                <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">{t.property}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <SectionHeader
            title="Where We Work"
            subtitle="Representing buyers and sellers across Srinagar's finest neighborhoods"
            className="mb-10 sm:mb-16"
          />

          <div ref={barsRef} className="space-y-4 sm:space-y-5">
            {neighborhoodBars.map((bar) => (
              <div key={bar.name} className="flex items-center gap-3 sm:gap-4">
                <span className="min-w-[90px] font-['Inter'] text-[14px] text-[#212121] sm:min-w-[120px] sm:text-base">
                  {bar.name}
                </span>
                <div className="flex-1">
                  <div
                    className="market-bar h-1.5 rounded-full bg-[#00523C] sm:h-2"
                    style={{ width: 0 }}
                  />
                </div>
                <span className="min-w-[32px] text-right font-['Inter'] text-[12px] text-[#888888] sm:min-w-[40px] sm:text-[13px]">
                  {bar.transactions}
                </span>
              </div>
            ))}
          </div>

          {/* Summary numbers */}
          <div className="mt-10 text-center sm:mt-12">
            <p className="font-['Newsreader'] text-[36px] font-light text-[#00523C] sm:text-5xl">
              181 Transactions
            </p>
            <p className="mt-1 font-['Newsreader'] text-[24px] font-light text-[#212121] sm:mt-2 sm:text-[32px]">
              $513,000,000 in Sales
            </p>
          </div>
        </div>
      </section>


      <section ref={ctaRef} className="bg-[#00523C] py-16 sm:py-20">
        <div className="mx-auto max-w-[700px] px-5 text-center sm:px-6">
          <h2
            className="font-['Newsreader'] text-[36px] font-light text-white sm:text-5xl"
            style={{ lineHeight: 1.1 }}
          >
            Let's Discuss Your Next Move
          </h2>

          {/* Contact method icons — stack on mobile, row on md */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-3 md:gap-12">

            <div className="text-center">
              <PhoneIcon />
              <p className="mt-2 font-['Newsreader'] text-lg font-light text-white sm:text-xl">
                +91 94190 00000
              </p>
              <p className="mt-1 font-['Inter'] text-[12px] text-white/70 sm:text-[13px]">
                Mon–Sat, 9am–7pm IST
              </p>
            </div>

            {/* Divider — only on desktop */}
            <div className="hidden items-center justify-center md:flex">
              <div className="h-full w-px bg-white/20" />
            </div>

            {/* Mobile divider between items */}
            <div className="h-px w-16 mx-auto bg-white/20 md:hidden" />

            <div className="text-center">
              <MailIcon />
              <p className="mt-2 font-['Newsreader'] text-lg font-light text-white sm:text-xl">
                hello@realestate-srinagar.com
              </p>
              <p className="mt-1 font-['Inter'] text-[12px] text-white/70 sm:text-[13px]">
                We respond within 24 hours
              </p>
            </div>

            <div className="h-px w-16 mx-auto bg-white/20 md:hidden" />

            <div className="text-center">
              <LocationIcon />
              <p className="mt-2 font-['Newsreader'] text-lg font-light text-white sm:text-xl">
                Residency Road, Srinagar
              </p>
              <p className="mt-1 font-['Inter'] text-[12px] text-white/70 sm:text-[13px]">
                J&K 190001, India
              </p>
            </div>
          </div>

          <button className="mt-8 w-full rounded-full bg-white px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all hover:bg-white/90 active:scale-[0.98] sm:mt-10 sm:w-auto">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  )
}

/* ── Shared SVG icon components ────────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}