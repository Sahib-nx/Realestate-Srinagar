"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

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

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
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

const handleSubmit = (e: React.SubmitEvent) => {
  e.preventDefault()
  setSubmitted(true)
}

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex h-[60vh] min-h-[480px] w-full items-end overflow-hidden bg-[#00523C]"
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
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16"
        >
          <span
            className="block font-['Inter'] text-[13px] font-medium uppercase tracking-[0.1em] text-white/60"
            style={{ opacity: 0 }}
          >
            Realestate Srinagar
          </span>
          <h1
            className="mt-3 max-w-[560px] font-['Newsreader'] text-5xl font-light text-white md:text-6xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.25)', lineHeight: 1.08, opacity: 0 }}
          >
            Let&apos;s Start a Conversation
          </h1>
          <p
            className="mt-4 max-w-[420px] font-['Inter'] text-base leading-relaxed text-white/80"
            style={{ opacity: 0 }}
          >
            Whether you&apos;re buying, selling, or simply exploring, our team is here to guide you.
          </p>
        </div>
      </section>

      {/* ── Contact Methods ───────────────────────────────────── */}
      <section className="bg-white py-[120px]">
        <div className="mx-auto max-w-[1400px] px-6">
          <div ref={methodsRef} className="grid gap-12 border-t border-[#ECECEC] pt-16 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div key={method.number} className="method-item group">
                <span className="font-['Newsreader'] text-[32px] font-light text-[#00523C] opacity-40">
                  {method.number}
                </span>
                <h3 className="mt-4 font-['Newsreader'] text-[32px] font-light text-[#212121]">
                  {method.title}
                </h3>
                <p className="mt-3 max-w-[320px] font-['Inter'] text-base leading-relaxed text-[#888888]">
                  {method.description}
                </p>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="mt-5 inline-block font-['Inter'] text-[13px] font-medium text-[#00523C] underline-offset-4 transition-all hover:underline"
                >
                  {method.detail} &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Side Info ──────────────────────────── */}
      <section className="bg-[#F8F8F8] py-[120px]">
        <div ref={formSectionRef} className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-16 md:grid-cols-[42%_58%]">

            {/* Left — Contextual info */}
            <div className="form-reveal">
              <span className="font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C]">
                Get In Touch
              </span>
              <h2 className="mt-6 font-['Newsreader'] text-5xl font-light leading-[1.08] text-[#212121]">
                We'd Love to Hear From You
              </h2>
              <p className="mt-6 max-w-[380px] font-['Inter'] text-base leading-relaxed text-[#888888]">
                Fill out the form and one of our advisors will reach out within 24 hours. We respect your time and your privacy.
              </p>

              {/* Stats strip */}
              <div className="mt-12 flex gap-8 border-t border-[#ECECEC] pt-10">
                <div>
                  <p className="font-['Newsreader'] text-4xl font-light text-[#00523C]">24h</p>
                  <p className="mt-1 font-['Inter'] text-[13px] text-[#888888]">Response Time</p>
                </div>
                <div className="w-px bg-[#ECECEC]" />
                <div>
                  <p className="font-['Newsreader'] text-4xl font-light text-[#00523C]">14+</p>
                  <p className="mt-1 font-['Inter'] text-[13px] text-[#888888]">Years Experience</p>
                </div>
                <div className="w-px bg-[#ECECEC]" />
                <div>
                  <p className="font-['Newsreader'] text-4xl font-light text-[#00523C]">100%</p>
                  <p className="mt-1 font-['Inter'] text-[13px] text-[#888888]">Confidential</p>
                </div>
              </div>

              {/* Agent card */}
              <div className="mt-12 flex items-center gap-5 rounded-2xl border border-[#ECECEC] bg-white p-6">
                <div
                  className="h-14 w-14 flex-shrink-0 rounded-full bg-[#00523C]/10"
                  style={{
                    backgroundImage: 'url(/assets/agent-avatar.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div>
                  <p className="font-['Inter'] text-[15px] font-medium text-[#212121]">Sheheyar Khan</p>
                  <p className="mt-0.5 font-['Inter'] text-[13px] text-[#888888]">
                    Senior Advisor · Luxury Division
                  </p>
                  <a
                    href="tel:+919419000000"
                    className="mt-2 inline-block font-['Inter'] text-[13px] font-medium uppercase tracking-[0.04em] text-[#00523C] underline-offset-4 hover:underline"
                  >
                    Call Directly &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="form-reveal">
              {submitted ? (
                <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-2xl border border-[#ECECEC] bg-white px-10 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00523C]/10">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00523C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-8 font-['Newsreader'] text-4xl font-light text-[#212121]">
                    Message Received
                  </h3>
                  <p className="mt-4 max-w-[320px] font-['Inter'] text-base leading-relaxed text-[#888888]">
                    Thank you for reaching out. One of our advisors will be in touch within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialForm) }}
                    className="mt-8 rounded-full border border-[#00523C] px-7 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-[#ECECEC] bg-white px-10 py-12"
                >
                  {/* Name row */}
                  <div className="grid gap-6 sm:grid-cols-2">
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
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
                  <div className="relative mt-8">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="peer w-full resize-none border-b-2 border-[#ECECEC] bg-transparent pb-3 pt-6 font-['Inter'] text-[15px] text-[#212121] outline-none transition-colors focus:border-[#00523C]"
                      placeholder=" "
                    />
                    <label
                      htmlFor="message"
                      className={`pointer-events-none absolute left-0 font-['Inter'] text-[13px] transition-all duration-200 ${
                        focused === 'message' || form.message
                          ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]'
                          : 'top-6 text-[#888888]'
                      }`}
                    >
                      Your Message
                    </label>
                  </div>

                  {/* Privacy note + Submit */}
                  <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-['Inter'] text-[12px] leading-relaxed text-[#888888]">
                      Your information is kept strictly confidential and never shared with third parties.
                    </p>
                    <button
                      type="submit"
                      className="flex-shrink-0 rounded-full bg-[#00523C] px-8 py-3.5 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-200 hover:bg-[#003D2C] active:scale-[0.98]"
                    >
                      Send Message
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
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.560693442156!2d74.7796717!3d34.055138400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1910ef5238439%3A0x5cdc130bdc093bea!2sRealestate%20Srinagar!5e0!3m2!1sen!2sin!4v1779561485308!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block', filter: 'grayscale(25%) contrast(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-['Newsreader'] text-2xl font-light text-[#212121]">
                Al sitaar complex, Batamaloo - Tengpur Rd, Gangabug, Gungbugh, Hyderpora, Srinagar, Jammu and Kashmir 190009
              </p>
              <p className="mt-1 font-['Inter'] text-[13px] text-[#888888]">
                Mon – Sat &nbsp;·&nbsp; 9:00 AM – 7:00 PM
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#00523C] px-7 py-3 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-[#00523C] py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2
            className="font-['Newsreader'] text-5xl font-light text-white"
            style={{ lineHeight: 1.1 }}
          >
            Your Dream Home Awaits
          </h2>
          <p className="mt-4 font-['Inter'] text-base text-white/80">
            Exclusive listings, personal service, and deep local expertise, all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  focused,
  setFocused,
  required,
}: FloatingInputProps) {
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
        className={`pointer-events-none absolute left-0 font-['Inter'] transition-all duration-200 ${
          active
            ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]'
            : 'top-6 text-[13px] text-[#888888]'
        }`}
      >
        {label}
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

function FloatingSelect({
  label,
  name,
  value,
  options,
  onChange,
  focused,
  setFocused,
}: FloatingSelectProps) {
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
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-['Inter'] transition-all duration-200 ${
          active
            ? 'top-0 text-[11px] uppercase tracking-[0.05em] text-[#00523C]'
            : 'top-6 text-[13px] text-[#888888]'
        }`}
      >
        {label}
      </label>
      {/* Custom chevron */}
      <svg
        className="pointer-events-none absolute bottom-4 right-1 text-[#888888]"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
