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
      duration: 1.8, // Slower, dreamier scroll
      easing: (t) => {
        // Custom easing for ultra-smooth feel
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slower wheel for dreamy feel
      touchMultiplier: 1.5,
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
