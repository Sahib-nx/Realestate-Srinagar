"use client"

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const HERO_THRESHOLDS: Record<string, number> = {
  '/': typeof window !== 'undefined' ? window.innerHeight : 800,
  '/about': 340,
  '/contact': 480,
}

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const isHeroPage = pathname !== null && pathname in HERO_THRESHOLDS
    setShouldRender(isHeroPage)
  }, [pathname])

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, 4400)

    const threshold =
      pathname === '/'
        ? window.innerHeight
        : HERO_THRESHOLDS[pathname ?? ''] ?? 400

    const handleScroll = () => {
      if (window.scrollY > threshold * 0.75) {
        gsap.to(containerRef.current, { opacity: 0, y: 10, duration: 0.4 })
      } else {
        gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.4 })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldRender, pathname])

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-10 left-0 right-0 z-[9999] flex justify-center"
      style={{ opacity: 0, transform: 'translateY(16px)' }}
    >
      <div className="relative flex flex-col items-center gap-4">

        {/* Glow — now deep green */}
        <div
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,82,60,0.35) 0%, transparent 70%)',
            transform: 'scale(2.5)',
          }}
        />

        {/* Label */}
        <div className="flex items-center gap-2">
          <div
            className="h-px w-8"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,82,60,0.6))' }}
          />
          <span
            className="font-['Inter'] text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{
              color: '#00523C',
              textShadow: '0 1px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
            }}
          >
            Scroll to explore
          </span>
          <div
            className="h-px w-8"
            style={{ background: 'linear-gradient(to left, transparent, rgba(0,82,60,0.6))' }}
          />
        </div>

        {/* Animated scroll line */}
        <div className="relative flex flex-col items-center">
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 1.5,
              height: 56,
              background: 'rgba(0,0,0,0.25)',
              boxShadow: '0 0 10px rgba(0,82,60,0.5)',
            }}
          >
            <div
              className="absolute left-0 right-0 rounded-full"
              style={{
                height: 20,
                background: 'linear-gradient(to bottom, transparent, #00523C, rgba(0,0,0,0.1))',
                animation: 'scrollDot 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
          </div>

          {/* Chevrons */}
          <div className="mt-2 flex flex-col items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  opacity: 0.3 + i * 0.25,
                  animation: `chevronPulse 1.8s ease ${i * 0.15}s infinite`,
                }}
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="#00523C"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { top: -20px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 56px; opacity: 0; }
        }
        @keyframes chevronPulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 0.9; transform: translateY(2px); }
        }
      `}</style>
    </div>
  )
}