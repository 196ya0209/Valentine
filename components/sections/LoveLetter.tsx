// components/sections/LoveLetter.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { loveLetterToAmritha } from '@/config/loveLetter'

export default function LoveLetter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isOpen, setIsOpen] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState(0)

  useEffect(() => {
    if (isInView && !isOpen) {
      setTimeout(() => setIsOpen(true), 500)
    }
  }, [isInView, isOpen])

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setVisibleParagraphs(prev => {
          if (prev >= loveLetterToAmritha.paragraphs.length + 2) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A00] via-[#2D1408] to-[#1A0A00] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Aurora background */}
      <div className="aurora-bg opacity-30" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
        {/* Envelope */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Closed envelope */}
          <motion.div
            className="w-full aspect-[4/3] bg-gradient-to-br from-[#FFE4C4] to-[#FFAB91] rounded-lg shadow-2xl relative overflow-hidden"
            animate={{ 
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          >
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-[#FFAB91] to-[#FF6B35]" 
              style={{
                clipPath: 'polygon(0 0, 50% 80%, 100% 0)'
              }}
            />
            {/* Heart seal */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">💕</span>
            </div>
            {/* Address */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[#5C3D2D] text-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
                To: My Beloved Mookie
              </p>
            </div>
          </motion.div>

          {/* Letter content */}
          <motion.div
            className="absolute inset-0 w-full rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 50
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Paper background with proper lines */}
            <div 
              className="w-full h-full bg-[#FFF8F0] p-6 md:p-10 overflow-y-auto"
              style={{ 
                minHeight: '600px',
                maxHeight: '80vh',
                background: `
                  linear-gradient(#FFF8F0 29px, #FF6B35 29px, #FF6B35 30px, #FFF8F0 30px),
                  linear-gradient(90deg, transparent 0%, transparent 100%)
                `,
                backgroundSize: '100% 30px',
                lineHeight: '30px'
              }}
            >
              {/* Greeting */}
              <motion.h2
                className="text-3xl md:text-4xl mb-8 leading-[30px]"
                style={{ 
                  fontFamily: "'Great Vibes', cursive",
                  color: '#FF6B35'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleParagraphs >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {loveLetterToAmritha.greeting}
              </motion.h2>

              {/* Paragraphs */}
              <div className="space-y-0">
                {loveLetterToAmritha.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="leading-[30px] text-base md:text-lg py-1"
                    style={{ 
                      color: '#2D1408',
                      fontFamily: 'Georgia, serif'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: visibleParagraphs >= index + 2 ? 1 : 0,
                      y: visibleParagraphs >= index + 2 ? 0 : 10
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Closing */}
              <motion.div
                className="mt-8 text-right"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: visibleParagraphs >= loveLetterToAmritha.paragraphs.length + 2 ? 1 : 0 
                }}
                transition={{ duration: 0.5 }}
              >
                <p className="leading-[30px]" style={{ color: '#2D1408' }}>
                  {loveLetterToAmritha.closing}
                </p>
                <p 
                  className="text-2xl leading-[30px] mt-2"
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    color: '#FF6B35'
                  }}
                >
                  {loveLetterToAmritha.signature}
                </p>
                <p 
                  className="text-sm mt-4 italic leading-[30px]"
                  style={{ color: '#FF6B35' }}
                >
                  {loveLetterToAmritha.postScript}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
