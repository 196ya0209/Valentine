// components/sections/FinalMessage.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { finalMessage } from '@/config/finalMessage'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-react'

const romanticTexts = [
  "You are my today and all of my tomorrows",
  "Every love story is beautiful, but ours is my favorite",
  "In you, I've found the love of my life",
  "You're the reason I believe in love",
  "Forever isn't long enough with you"
]

export default function FinalMessage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [celebrated, setCelebrated] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const triggerCelebration = () => {
    if (celebrated) return
    setCelebrated(true)

    const duration = 4 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Warm orange confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#E85D04', '#D4622C', '#FF9B85', '#FFD6BA', '#FFFBF5'],
        shapes: ['circle']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#E85D04', '#D4622C', '#FF9B85', '#FFD6BA', '#FFFBF5'],
        shapes: ['circle']
      })
    }, 250)
  }

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circle */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.1) 0%, transparent 60%)',
            top: '-10%',
            right: '-15%',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Floating hearts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i % 5) * 20}%`,
              top: `${15 + Math.floor(i / 5) * 40}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <Heart 
              className="text-[#E85D04]" 
              size={16 + (i % 3) * 8}
              strokeWidth={1.5}
              fill="rgba(232, 93, 4, 0.2)"
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase mb-6 font-semibold"
          style={{ 
            fontFamily: "'Outfit', sans-serif",
            color: '#D4622C',
            letterSpacing: '4px'
          }}
        >
          A Message For You
        </motion.p>

        {/* Title - Playfair */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl mb-8 font-bold"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#E85D04',
            letterSpacing: '-2px'
          }}
        >
          {finalMessage.title}
        </motion.h2>

        {/* Cycling romantic texts */}
        <div className="h-10 mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg"
              style={{ 
                fontFamily: "'Pacifico', cursive",
                color: '#8C7A6B'
              }}
            >
              {romanticTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Big Name - Animated gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-16"
        >
          <motion.h1
            className="text-7xl md:text-[10rem] lg:text-[14rem] font-bold relative z-10 tracking-tight"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #C1440E 0%, #E85D04 25%, #D4622C 50%, #FF9B85 75%, #E85D04 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              letterSpacing: '-4px'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {finalMessage.name}
          </motion.h1>
          
          {/* Subtle glow behind name */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(232, 93, 4, 0.2) 0%, transparent 60%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Sparkle accents around name */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 13}%`,
                top: `${i % 2 === 0 ? 5 : 85}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-5 h-5 text-[#D4622C]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ 
            fontFamily: "'Outfit', sans-serif",
            color: '#3A3229',
            lineHeight: '1.7'
          }}
        >
          {finalMessage.mainMessage}
        </motion.p>

        {/* Love Button - Pill shaped */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={triggerCelebration}
          className={`group relative px-12 py-5 rounded-full text-lg font-semibold transition-all duration-500 overflow-hidden ${
            celebrated
              ? ''
              : ''
          }`}
          style={{
            background: celebrated 
              ? 'rgba(255, 251, 245, 0.9)'
              : 'linear-gradient(135deg, #E85D04 0%, #FF9B85 100%)',
            color: celebrated ? '#E85D04' : '#FFF8F0',
            border: celebrated ? '2px solid rgba(232, 93, 4, 0.3)' : 'none',
            boxShadow: celebrated ? 'none' : '0 8px 32px rgba(232, 93, 4, 0.35)',
            fontFamily: "'Outfit', sans-serif"
          }}
          whileHover={celebrated ? {} : { 
            scale: 1.03, 
            boxShadow: '0 12px 40px rgba(232, 93, 4, 0.4)' 
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative flex items-center justify-center gap-3">
            <Heart className={`w-5 h-5 ${celebrated ? 'fill-current' : ''}`} />
            {celebrated ? "You're glowing! 🧡" : finalMessage.button}
          </span>
        </motion.button>

        {/* Signature - Pacifico */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-2xl md:text-3xl"
          style={{ 
            fontFamily: "'Pacifico', cursive",
            color: '#D4622C'
          }}
        >
          {finalMessage.signature}
        </motion.p>

        {/* Wavy Divider */}
        <svg className="w-32 h-4 mx-auto mt-12" viewBox="0 0 120 12">
          <path 
            d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" 
            fill="none" 
            stroke="#E85D04" 
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  )
}
