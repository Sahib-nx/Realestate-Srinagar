"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
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

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Close menu on route change
  const prevPathnameRef = useRef(pathname)
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return
    prevPathnameRef.current = pathname
    setMenuOpen(false)
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
    </>
  )
}