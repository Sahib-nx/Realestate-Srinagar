"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname() // string | null
  const router = useRouter()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile menu slide animation
  useEffect(() => {
    if (!panelRef.current) return
    if (menuOpen) {
      gsap.to(panelRef.current, { y: 0, duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(panelRef.current, { y: '-100%', duration: 0.28, ease: 'power3.in' })
    }
  }, [menuOpen])

  // Search bar expand animation
  useEffect(() => {
    if (!searchRef.current) return
    if (searchOpen) {
      gsap.to(searchRef.current, { height: 80, opacity: 1, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to(searchRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [searchOpen])

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const prevPathnameRef = useRef(pathname)
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return
    prevPathnameRef.current = pathname
    // Only runs when pathname genuinely changed — no setState here,
    // we close via the GSAP animation triggers by toggling state outside effect
    const close = () => {
      setMenuOpen(false)
      setSearchOpen(false)
    }
    close()
  }, [pathname])

  const isActive = (href: string) => {
    if (!pathname) return false
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Main Nav Bar ──────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-[500] h-14 transition-all duration-200"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid #ECECEC' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#00523C] sm:text-[13px]"
          >
            Realestate Srinagar
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-[#00523C]'
                    : 'text-[#212121] hover:text-[#00523C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden text-[#212121] transition-colors hover:text-[#00523C] md:block"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* CTA */}
            <button
              className="hidden rounded-full border border-[#00523C] px-5 py-2 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#00523C] transition-all duration-200 hover:bg-[#00523C] hover:text-white md:block"
              onClick={() => router.push('/contact')}
            >
              Get in Touch
            </button>

            {/* Hamburger */}
            <button
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="origin-center block h-[1.5px] w-[18px] bg-[#00523C] transition-transform duration-300"
                style={{ transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none' }}
              />
              <span
                className="origin-center block h-[1.5px] w-[18px] bg-[#00523C] transition-transform duration-300"
                style={{ transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Search Bar ───────────────────────────────────────────────── */}
      <div
        ref={searchRef}
        className="fixed left-0 right-0 z-[499] hidden overflow-hidden bg-white md:block"
        style={{ top: 56, height: 0, opacity: 0 }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 border-b border-[#ECECEC] px-6 py-5">
          <SearchIcon color="#888888" />
          <input
            type="text"
            placeholder="Search neighborhoods, properties, guides…"
            autoFocus={searchOpen}
            className="flex-1 bg-transparent font-['Inter'] text-base text-[#212121] outline-none placeholder:text-[#BBBBBB]"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#888888] transition-colors hover:text-[#212121]"
          >
            Close
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-[498] flex flex-col overflow-y-auto bg-white pt-14 md:hidden"
        style={{ transform: 'translateY(-100%)' }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-1 flex-col px-5 pb-10 pt-8">

          {/* Nav links */}
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b py-5 font-['Newsreader'] text-[38px] font-light leading-none transition-colors ${
                  isActive(link.href)
                    ? 'border-[#00523C]/20 text-[#00523C]'
                    : 'border-[#ECECEC] text-[#212121] hover:text-[#00523C]'
                }`}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Secondary actions */}
          <div className="mt-8 flex items-center gap-6 border-b border-[#ECECEC] pb-8">
            <button
              onClick={() => {
                setMenuOpen(false)
                setTimeout(() => setSearchOpen(true), 350)
              }}
              className="font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#888888] transition-colors hover:text-[#212121]"
            >
              Search
            </button>
            <div className="h-3 w-px bg-[#ECECEC]" />
            <button className="font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-[#888888] transition-colors hover:text-[#212121]">
              Sign In
            </button>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={() => {
                setMenuOpen(false)
                router.push('/contact')
              }}
              className="w-full rounded-full bg-[#00523C] py-4 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.05em] text-white transition-all duration-200 active:scale-[0.98]"
            >
              Get in Touch
            </button>
          </div>

          {/* Bottom image */}
          <div className="mt-auto hidden min-h-0 pt-8 sm:block">
            <img
              src="/assets/Austin-skyline.jpg"
              alt="Srinagar Skyline"
              className="h-36 w-full rounded object-cover"
            />
            <p className="mt-3 text-center font-['Inter'] text-[12px] text-[#888888]">
              Independent. Full service. Fiduciary real estate representation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile Search ────────────────────────────────────────────── */}
      <div
        className="fixed left-0 right-0 z-[501] overflow-hidden bg-white md:hidden"
        style={{
          top: 56,
          height: searchOpen ? 'auto' : 0,
          opacity: searchOpen ? 1 : 0,
          transition: 'opacity 0.25s ease, height 0.25s ease',
        }}
      >
        <div className="flex items-center gap-3 border-b border-[#ECECEC] px-5 py-4">
          <SearchIcon color="#888888" />
          <input
            type="text"
            placeholder="Search…"
            className="flex-1 bg-transparent font-['Inter'] text-base text-[#212121] outline-none placeholder:text-[#BBBBBB]"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 text-[#888888]"
            aria-label="Close search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

function SearchIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}