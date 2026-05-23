"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  childSelector?: string
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const {
    y = 30,
    duration = 0.8,
    stagger = 0.12,
    start = 'top 85%',
    childSelector,
  } = options

  useEffect(() => {
    if (!ref.current) return

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current.children

    if (targets.length === 0) return

    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill()
      })
    }
  }, [y, duration, stagger, start, childSelector])

  return ref
}
