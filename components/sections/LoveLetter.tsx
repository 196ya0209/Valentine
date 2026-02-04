// components/sections/LoveLetter.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { loveLetterToAmritha } from '@/config/loveLetter'
import { Heart, Mail, Sparkles } from 'lucide-react'

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
      className="relative py-32 md:py-40 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.08) 0%, transparent 60%)',
            top: '10%',
            right: '-5%',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="w-4 h-4 text-[#E85D04]" style={{ opacity: 0.5 }} />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.p 
            className="text-xs tracking-[0.4em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C',
              letterSpacing: '4px'
            }}
          >
            From My Heart
          </motion.p>
          
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04',
              letterSpacing: '-1px'
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
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Closed Envelope */}
          <motion.div
            className="w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
            animate={{ 
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.9 : 1,
              y: isOpen ? -50 : 0
            }}
            transition={{ duration: 0.6 }}
            style={{ 
              display: isOpen ? 'none' : 'block',
              boxShadow: '0 16px 48px rgba(232, 93, 4, 0.2)'
            }}
          >
            <div 
              className="w-full h-full relative"
              style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE5D9)' }}
            >
              {/* Envelope flap */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2" 
                style={{ 
                  background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                  clipPath: 'polygon(0 0, 50% 70%, 100% 0)' 
                }}
              />
              
              {/* Seal */}
              <div 
                className="absolute top-[35%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #C1440E, #E85D04)',
                  boxShadow: '0 4px 16px rgba(193, 68, 14, 0.4)'
                }}
              >
                <Heart className="w-6 h-6 text-[#FFF8F0]" fill="currentColor" />
              </div>
              
              {/* Address */}
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
                <p 
                  className="text-xl"
                  style={{ 
                    fontFamily: "'Pacifico', cursive",
                    color: '#D4622C'
                  }}
                >
                  To: My Beloved
                </p>
              </div>
            </div>
          </motion.div>

          {/* Opened Letter */}
          <motion.div
            className="w-full rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 50
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ 
              display: isOpen ? 'block' : 'none',
              boxShadow: '0 20px 60px rgba(232, 93, 4, 0.15)'
            }}
          >
            {/* Paper */}
            <div 
              className="w-full p-8 md:p-12 relative"
              style={{ 
                minHeight: '500px',
                background: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 31px,
                    rgba(232, 93, 4, 0.1) 31px,
                    rgba(232, 93, 4, 0.1) 32px
                  ),
                  linear-gradient(to bottom, #FFFBF5, #FFF8F0)
                `
              }}
            >
              {/* Red margin line */}
              <div 
                className="absolute left-12 md:left-16 top-0 bottom-0 w-[2px]"
                style={{ background: 'rgba(232, 93, 4, 0.2)' }}
              />
              
              {/* Greeting - Playfair */}
              <motion.h2
                className="text-3xl md:text-4xl mb-8 relative font-bold"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#E85D04',
                  lineHeight: '1.3'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleParagraphs >= 1 ? 1 : 0 }}
              >
                {loveLetterToAmritha.greeting}
              </motion.h2>

              {/* Paragraphs - Outfit */}
              <div className="space-y-6">
                {loveLetterToAmritha.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-base md:text-lg"
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      color: '#3A3229',
                      lineHeight: '1.8'
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

              {/* Closing - Pacifico */}
              <motion.div
                className="mt-12 text-right"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: visibleParagraphs >= loveLetterToAmritha.paragraphs.length + 2 ? 1 : 0 
                }}
              >
                <p 
                  className="text-base"
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    color: '#3A3229'
                  }}
                >
                  {loveLetterToAmritha.closing}
                </p>
                <p 
                  className="text-3xl mt-4"
                  style={{ 
                    fontFamily: "'Pacifico', cursive",
                    color: '#E85D04'
                  }}
                >
                  {loveLetterToAmritha.signature}
                </p>
                <p 
                  className="text-sm mt-6 italic"
                  style={{ color: '#8C7A6B' }}
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
            className="text-center text-sm mt-6 flex items-center justify-center gap-2 font-medium"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            <Mail className="w-4 h-4" />
            Opening your letter...
          </motion.p>
        )}
      </div>
    </section>
  )
}
