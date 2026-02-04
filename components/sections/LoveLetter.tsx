// components/sections/LoveLetter.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { loveLetterToAmritha } from '@/config/loveLetter'
import { Heart, Mail } from 'lucide-react'

export default function LoveLetter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isOpen, setIsOpen] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState(0)

  useEffect(() => {
    if (isInView && !isOpen) {
      setTimeout(() => setIsOpen(true), 800)
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
      }, 1200)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 bg-[#0C0A09] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Ambient Background */}
      <div className="aurora-bg opacity-30" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.p className="text-[#78716C] text-sm tracking-[0.3em] uppercase mb-4">
            From My Heart
          </motion.p>
          
          <h2
            className="text-4xl md:text-5xl"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            A Letter For You
          </h2>
        </motion.div>
        
        {/* Envelope / Letter Container */}
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Closed Envelope */}
          <motion.div
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            animate={{ 
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.9 : 1,
              y: isOpen ? -50 : 0
            }}
            transition={{ duration: 0.6 }}
            style={{ display: isOpen ? 'none' : 'block' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] relative">
              {/* Envelope flap */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B]" 
                style={{ clipPath: 'polygon(0 0, 50% 70%, 100% 0)' }}
              />
              
              {/* Seal */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#EA580C] to-[#DC2626] rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              
              {/* Address */}
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
                <p className="text-[#92400E] text-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  To: My Beloved
                </p>
              </div>
            </div>
          </motion.div>

          {/* Opened Letter */}
          <motion.div
            className="w-full rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 50
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            {/* Paper */}
            <div 
              className="w-full bg-[#FFFBEB] p-8 md:p-12"
              style={{ 
                minHeight: '500px',
                background: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 31px,
                    rgba(234, 88, 12, 0.08) 31px,
                    rgba(234, 88, 12, 0.08) 32px
                  ),
                  linear-gradient(to bottom, #FFFBEB, #FEF3C7)
                `
              }}
            >
              {/* Red margin line */}
              <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[1px] bg-[#F43F5E]/20" />
              
              {/* Greeting */}
              <motion.h2
                className="text-3xl md:text-4xl mb-8 relative"
                style={{ 
                  fontFamily: "'Great Vibes', cursive",
                  color: '#EA580C',
                  lineHeight: '32px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleParagraphs >= 1 ? 1 : 0 }}
              >
                {loveLetterToAmritha.greeting}
              </motion.h2>

              {/* Paragraphs */}
              <div className="space-y-6 text-[#44403C]">
                {loveLetterToAmritha.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-base md:text-lg leading-8"
                    style={{ fontFamily: "'Georgia', serif" }}
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
                className="mt-12 text-right"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: visibleParagraphs >= loveLetterToAmritha.paragraphs.length + 2 ? 1 : 0 
                }}
              >
                <p className="text-[#44403C]" style={{ fontFamily: "'Georgia', serif" }}>
                  {loveLetterToAmritha.closing}
                </p>
                <p 
                  className="text-3xl mt-4"
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    color: '#EA580C'
                  }}
                >
                  {loveLetterToAmritha.signature}
                </p>
                <p 
                  className="text-sm mt-6 italic text-[#78716C]"
                >
                  {loveLetterToAmritha.postScript}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Tap hint when closed */}
        {!isOpen && isInView && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-[#57534E] text-sm mt-6 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Opening your letter...
          </motion.p>
        )}
      </div>
    </section>
  )
}
