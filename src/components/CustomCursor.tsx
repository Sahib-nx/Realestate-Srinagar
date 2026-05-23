"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY
      setIsVisible(true) 
    }

    const onEnterInteractive = () => {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        borderColor: '#00523C',
        backgroundColor: 'rgba(0, 82, 60, 0.06)',
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const onLeaveInteractive = () => {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        borderColor: '#212121',
        backgroundColor: 'transparent',
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const tick = () => {
      gsap.set(cursor, {
        x: posRef.current.x,
        y: posRef.current.y,
        xPercent: -50,
        yPercent: -50,
      })
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      newInteractives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[10000] hidden lg:block"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: '1px solid #212121',
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    />
  )
}