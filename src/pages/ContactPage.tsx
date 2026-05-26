"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const contactMethods = [
  {
    number: '01',
    title: 'Call Us',
    description: 'Speak directly with one of our agents. Available Monday through Saturday, 9am to 7pm.',
    detail: '+91 94190 00000',
    href: 'tel:+919419000000',
  },
  {
    number: '02',
    title: 'Email',
    description: 'Send us your inquiry and expect a thoughtful response within one business day.',
    detail: 'hello@realestate-srinagar.com',
    href: 'mailto:hello@realestate-srinagar.com',
  },
  {
    number: '03',
    title: 'Visit Us',
    description: 'Our office is located in the heart of Srinagar. Walk-ins welcome during business hours.',
    detail: 'Residency Road, Srinagar, J&K 190001',
    href: 'https://maps.google.com',
  },
]

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  interest: string
  budget: string
  message: string
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  interest: '',
  budget: '',
  message: '',
}

// ── Status type ───────────────────────────────────────────────────────────────
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const methodsRef = useScrollReveal<HTMLDivElement>({ childSelector: '.method-item' })
  const formSectionRef = useScrollReveal<HTMLDivElement>({ childSelector: '.form-reveal' })
  const mapRef = useScrollReveal<HTMLDivElement>({ y: 20 })

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.3,
          stagger: 0.12,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      )
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // ── Real submit — calls /api/contact ──────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex h-[50vh] min-h-[380px] w-full items-end overflow-hidden bg-[#00523C] sm:h-[60vh] sm:min-h-[480px]"
        style={{
          backgroundImage: 'url(/assets/contact-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(33,33,33,0.72) 0%, rgba(33,33,33,0.18) 55%, transparent 100%)',
          }}
        />
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-10 sm:px-6 sm:pb-16"
        >
          <span
            className="block font-['Inter'] text-[11px] font-medium uppercase tracking-[0.1em] text-white/60 sm:text-[13px]"
            style={{ opacity: 0 }}
          >
            Realestate Srinagar
          </span>
          <h1
            className="mt-2 max-w-[90vw] font-['Newsreader'] text-[36px] font-light text-white sm:mt-3 sm:max-w-[560px] sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.25)', lineHeight: 1.08, opacity: 0 }}
          >
            Let&apos;s Start a Conversation
          </h1>
          <p
            className="mt-3 max-w-[85vw] font-['Inter'] text-[14px] leading-relaxed text-white/80 sm:mt-4 sm:max-w-[420px] sm:text-base"
            style={{ opacity: 0 }}
          >
            Whether you&apos;re buying, selling, or simply exploring, our team is here to guide you.
          </p>

          {/* Breadcrumb for SEO */}
          <nav aria-label="Breadcrumb" className="mt-6 sm:mt-8">
            <ol className="flex items-center gap-2 font-['Inter'] text-[11px] text-white/40 sm:text-[12px]">
              <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">Contact Us</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Contact Methods ───────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div
            ref={methodsRef}
            className="grid gap-10 border-t border-[#ECECEC] pt-12 sm:gap-12 sm:pt-16 md:grid-cols-3"
          >
            {contactMethods.map((method) => (
              <div key={method.number} className="method-item group">
                <span className="font-['Newsreader'] text-[28px] font-light text-[#00523C] opacity-40 sm:text-[32px]">
                  {method.number}
                </span>
                <h3 className="mt-3 font-['Newsreader'] text-[26px] font-light text-[#212121] sm:mt-4 sm:text-[32px]">
                  {method.title}
                </h3>
                <p className="mt-2 font-['Inter'] text-[14px] leading-relaxed text-[#888888] sm:mt-3 sm:max-w-[320px] sm:text-base">
                  {method.description}
                </p>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="mt-4 inline-block font-['Inter'] text-[13px] font-medium text-[#00523C] underline-offset-4 transition-all hover:underline sm:mt-5"
                >
                  {method.detail} &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Side Info ──────────────────────────── */}
      <section className="bg-[#F8F8F8] py-14 sm:py-20 lg:py-[120px]">
        <div ref={formSectionRef} className="mx-auto max-w-[1400px] px-5 sm:px-6">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-[42%_58%] lg:gap-16">

            {/* ── Left — Contextual info ──────────────────────── */}
            <div className="form-reveal">
              <span className="font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] sm:text-[13px]">
                Get In Touch
              </span>
              <h2 className="mt-4 font-['Newsreader'] text-[36px] font-light leading-[1.08] text-[#212121] sm:mt-6 sm:text-5xl">
                We&apos;d Love to Hear From You
              </h2>
              <p className="mt-4 font-['Inter'] text-[14px] leading-relaxed text-[#888888] sm:mt-6 sm:max-w-[380px] sm:text-base">
                Fill out the form and one of our advisors will reach out within 24 hours. We respect your time and your privacy.
              </p>

              {/* Stats strip — scrollable on mobile */}
              <div className="mt-8 flex gap-6 overflow-x-auto border-t border-[#ECECEC] pt-8 sm:mt-12 sm:gap-8 sm:pt-10">
                <div className="flex-shrink-0">
                  <p className="font-['Newsreader'] text-[32px] font-light text-[#00523C] sm:text-4xl">24h</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Response Time</p>
                </div>
                <div className="w-px flex-shrink-0 bg-[#ECECEC]" />
                <div className="flex-shrink-0">
                  <p className="font-['Newsreader'] text-[32px] font-light text-[#00523C] sm:text-4xl">14+</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Years Experience</p>
                </div>
                <div className="w-px flex-shrink-0 bg-[#ECECEC]" />
                <div className="flex-shrink-0">
                  <p className="font-['Newsreader'] text-[32px] font-light text-[#00523C] sm:text-4xl">100%</p>
                  <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">Confidential</p>
                </div>
              </div>

              {/* Agent card */}
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#ECECEC] bg-white p-5 sm:mt-12 sm:gap-5 sm:p-6">
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-full bg-[#00523C]/10 sm:h-14 sm:w-14"
                  style={{
                    backgroundImage: 'url(/assets/agent-avatar.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div>
                  <p className="font-['Inter'] text-[14px] font-medium text-[#212121] sm:text-[15px]">Sheheyar Khan</p>
                  <p className="mt-0.5 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">
                    Senior Advisor · Luxury Division
                  </p>
                  <a
                    href="tel:+919419000000"
                    className="mt-1.5 inline-block font-['Inter'] text-[12px] font-medium uppercase tracking-[0.04em] text-[#00523C] underline-offset-4 hover:underline sm:mt-2 sm:text-[13px]"
                  >
                    Call Directly &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right — Form ────────────────────────────────── */}
            <div className="form-reveal">
              {/* ── SUCCESS STATE ─────────────────────────────── */}
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#ECECEC] bg-white px-6 py-14 text-center sm:min-h-[480px] sm:px-10 sm:py-16">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00523C]/10 sm:h-16 sm:w-16">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00523C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-6 font-['Newsreader'] text-[32px] font-light text-[#212121] sm:mt-8 sm:text-4xl">
                    Message Sent!
                  </h3>
                  <p className="mt-3 max-w-[300px] font-['Inter'] text-[14px] leading-relaxed text-[#888888] sm:mt-4 sm:text-base">
                    Thank you, <strong className="text-[#212121]">{form.firstName}</strong>. Check your inbox, we have sent you a confirmation. One of our advisors will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm(initialForm) }}
                    className="mt-8 rounded-full border border-[#00523C] px-6 py-3 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white sm:px-7 sm:text-[13px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── FORM ──────────────────────────────────────── */
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-[#ECECEC] bg-white px-5 py-8 sm:px-10 sm:py-12"
                >
                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">
                      <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <p className="font-['Inter'] text-[13px] text-red-700">{errorMsg}</p>
                    </div>
                  )}

                  {/* Name row */}
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <FloatingInput
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                      required
                    />
                    <FloatingInput
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                      required
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
                    <FloatingInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                      required
                    />
                    <FloatingInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                    />
                  </div>

                  {/* Interest + Budget */}
                  <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
                    <FloatingSelect
                      label="I'm interested in"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                      options={[
                        'Buying a Property',
                        'Selling a Property',
                        'Market Valuation',
                        'Investment Advice',
                        'General Inquiry',
                      ]}
                    />
                    <FloatingSelect
                      label="Budget Range"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      focused={focused}
                      setFocused={setFocused}
                      options={[
                        'Under ₹50L',
                        '₹50L – ₹1Cr',
                        '₹1Cr – ₹2Cr',
                        '₹2Cr – ₹5Cr',
                        'Above ₹5Cr',
                      ]}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative mt-6 sm:mt-8">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                      className="peer w-full resize-none border-b-2 border-[#ECECEC] bg-transparent pb-3 pt-6 font-['Inter'] text-[15px] text-[#212121] outline-none transition-colors focus:border-[#00523C]"
                      placeholder=" "
                    />
                    <label
                      htmlFor="message"
                      className={`pointer-events-none absolute left-0 font-['Inter'] text-[13px] transition-all duration-200 ${focused === 'message' || form.message
                          ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]'
                          : 'top-6 text-[#888888]'
                        }`}
                    >
                      Your Message *
                    </label>
                  </div>

                  {/* Privacy note + Submit */}
                  <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-['Inter'] text-[12px] leading-relaxed text-[#888888]">
                      Your information is kept strictly confidential and never shared with third parties.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#00523C] px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-200 hover:bg-[#003D2C] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Office / Map Strip ────────────────────────────────── */}
      <section ref={mapRef} className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.560693442156!2d74.7796717!3d34.055138400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1910ef5238439%3A0x5cdc130bdc093bea!2sRealestate%20Srinagar!5e0!3m2!1sen!2sin!4v1779561485308!5m2!1sen!2sin"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block', filter: 'grayscale(25%) contrast(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="sm:h-[400px]"
            />
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="font-['Newsreader'] text-[20px] font-light text-[#212121] sm:text-2xl">
                Al Sitaar Complex, Hyderpora, Srinagar, J&K 190009
              </p>
              <p className="mt-1 font-['Inter'] text-[12px] text-[#888888] sm:text-[13px]">
                Mon – Sat &nbsp;·&nbsp; 9:00 AM – 7:00 PM
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-[#00523C] px-6 py-3 font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white sm:px-7 sm:text-[13px]"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-[#00523C] py-14 sm:py-20">
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <h2
            className="font-['Newsreader'] text-[36px] font-light text-white sm:text-5xl"
            style={{ lineHeight: 1.1 }}
          >
            Your Dream Home Awaits
          </h2>
          <p className="mt-3 font-['Inter'] text-[14px] text-white/80 sm:mt-4 sm:text-base">
            Exclusive listings, personal service, and deep local expertise, all in one place.
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a
              href="/properties"
              className="rounded-full bg-white px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-white/90"
            >
              Browse Properties
            </a>
            <a
              href="/about"
              className="rounded-full border border-white/40 px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-200 hover:border-white"
            >
              Meet the Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Reusable floating-label input ──────────────────────────────── */
type FloatingInputProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  focused: string | null
  setFocused: (name: string | null) => void
  required?: boolean
}

function FloatingInput({ label, name, type = 'text', value, onChange, focused, setFocused, required }: FloatingInputProps) {
  const active = focused === name || value.length > 0
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        required={required}
        placeholder=" "
        className="peer w-full border-b-2 border-[#ECECEC] bg-transparent pb-3 pt-6 font-['Inter'] text-[15px] text-[#212121] outline-none transition-colors focus:border-[#00523C]"
      />
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-['Inter'] transition-all duration-200 ${active ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]' : 'top-6 text-[13px] text-[#888888]'
          }`}
      >
        {label}{required ? ' *' : ''}
      </label>
    </div>
  )
}

/* ─── Reusable floating-label select ─────────────────────────────── */
type FloatingSelectProps = {
  label: string
  name: string
  value: string
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  focused: string | null
  setFocused: (name: string | null) => void
}

function FloatingSelect({ label, name, value, options, onChange, focused, setFocused }: FloatingSelectProps) {
  const active = focused === name || value.length > 0
  return (
    <div className="relative">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        className="peer w-full appearance-none border-b-2 border-[#ECECEC] bg-transparent pb-3 pt-6 font-['Inter'] text-[15px] text-[#212121] outline-none transition-colors focus:border-[#00523C]"
      >
        <option value="" disabled />
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-['Inter'] transition-all duration-200 ${active ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]' : 'top-6 text-[13px] text-[#888888]'
          }`}
      >
        {label}
      </label>
      <svg className="pointer-events-none absolute bottom-4 right-1 text-[#888888]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}