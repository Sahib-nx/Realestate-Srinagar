"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 4400)

    const handleScroll = () => {
      if (window.scrollY > 100) {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.3 })
      } else if (visible) {
        gsap.to(containerRef.current, { opacity: 1, duration: 0.3 })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visible])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-4"
      style={{ opacity: 0 }}
    >
      <div className="relative h-[2px] w-20 bg-[#ECECEC]">
        <div
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(0,82,60,0.08) 0%, transparent 70%)',
          }}
        >
          <svg
            viewBox="0 0 40 40"
            className="h-full w-full animate-spin"
            style={{ animationDuration: '12s' }}
          >
            <polygon
              points="20,4 32,12 32,28 20,36 8,28 8,12"
              fill="none"
              stroke="#00523C"
              strokeWidth="0.5"
              opacity="0.5"
            />
            <polygon
              points="20,8 28,14 28,26 20,32 12,26 12,14"
              fill="none"
              stroke="#00523C"
              strokeWidth="0.3"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
      <span className="font-['Inter'] text-[13px] text-[#888888]">
        Scroll to explore
      </span>
    </div>
  )
}
