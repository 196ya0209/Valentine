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

      const particleCount = 40 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FB923C', '#F59E0B', '#FBBF24', '#FFFFFF'],
        shapes: ['circle']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FB923C', '#F59E0B', '#FBBF24', '#FFFFFF'],
        shapes: ['circle']
      })
    }, 250)
  }

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 bg-[#0C0A09] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Ambient Background */}
      <div className="aurora-bg" />

      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <Heart 
              className="text-[#FB923C]" 
              size={16 + (i % 3) * 8}
              strokeWidth={1}
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
          className="text-[#78716C] text-sm tracking-[0.3em] uppercase mb-6"
        >
          A Message For You
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl mb-8"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {finalMessage.title}
        </motion.h2>

        {/* Cycling romantic texts */}
        <div className="h-8 mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-[#A8A29E] text-lg"
            >
              {romanticTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Big Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16"
        >
          <motion.h1
            className="text-7xl md:text-[10rem] lg:text-[14rem] font-bold relative z-10 tracking-tight"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #EA580C 0%, #FB923C 25%, #F59E0B 50%, #FBBF24 75%, #FCD34D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
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
              background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.15) 0%, transparent 60%)'
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

          {/* Sparkle accents */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 12}%`,
                top: `${i % 2 === 0 ? 10 : 80}%`,
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
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-[#E7E5E4] mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {finalMessage.mainMessage}
        </motion.p>

        {/* Love Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={triggerCelebration}
          className={`group relative px-12 py-5 rounded-full text-lg font-medium transition-all duration-500 overflow-hidden ${
            celebrated
              ? 'bg-white/[0.05] border border-[#FB923C]/30 text-[#FB923C]'
              : 'bg-gradient-to-r from-[#EA580C] to-[#F59E0B] text-white'
          }`}
          whileHover={celebrated ? {} : { scale: 1.02, boxShadow: '0 20px 60px rgba(234, 88, 12, 0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          {!celebrated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#EA580C]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <span className="relative flex items-center justify-center gap-3">
            <Heart className={`w-5 h-5 ${celebrated ? 'fill-current' : ''}`} />
            {celebrated ? 'I Love You Too!' : finalMessage.button}
          </span>
        </motion.button>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-2xl md:text-3xl text-[#A8A29E]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {finalMessage.signature}
        </motion.p>

        {/* Divider */}
        <div className="section-divider w-24 mx-auto mt-12" />
      </div>
    </section>
  )
}
