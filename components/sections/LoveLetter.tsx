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
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] overflow-hidden min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        {/* Envelope */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Closed envelope */}
          <motion.div
            className="w-full aspect-[4/3] bg-gradient-to-br from-[#F5E6D3] to-[#E8D4C4] rounded-lg shadow-2xl relative overflow-hidden"
            animate={{ 
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          >
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-[#E8D4C4] to-[#D4C4B4]" 
              style={{
                clipPath: 'polygon(0 0, 50% 80%, 100% 0)'
              }}
            />
            {/* Heart seal */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">💕</span>
            </div>
            {/* Address */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[#5C3D3D] text-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
                To: My Beloved Mookie
              </p>
            </div>
          </motion.div>

          {/* Letter content */}
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-br from-[#FFF5F0] to-[#FFF0E8] rounded-lg shadow-2xl p-6 md:p-10 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 50
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E8E0D8 31px, #E8E0D8 32px)',
              minHeight: '600px'
            }}
          >
            {/* Greeting */}
            <motion.h2
              className="text-3xl md:text-4xl text-[#E63946] mb-8"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleParagraphs >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {loveLetterToAmritha.greeting}
            </motion.h2>

            {/* Paragraphs with typewriter effect */}
            <div className="space-y-6">
              {loveLetterToAmritha.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-[#5C3D3D] leading-relaxed text-sm md:text-base"
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
              className="mt-10 text-right"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: visibleParagraphs >= loveLetterToAmritha.paragraphs.length + 2 ? 1 : 0 
              }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#5C3D3D] mb-2">{loveLetterToAmritha.closing}</p>
              <p 
                className="text-2xl text-[#E63946]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {loveLetterToAmritha.signature}
              </p>
              <p className="text-[#E63946] text-sm mt-4 italic">
                {loveLetterToAmritha.postScript}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
