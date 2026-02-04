// components/SmoothScroll.tsx
'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Balanced smooth scroll duration
      easing: (t) => {
        // Smooth ease-out-expo for natural feel
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Normal scroll speed
      touchMultiplier: 2.0, // More responsive touch
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Make lenis available globally for integration with other libraries
    window.lenis = lenis

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return <div className="lenis-scroll-container">{children}</div>
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    lenis?: Lenis
  }
}
