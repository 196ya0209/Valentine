// components/sections/FinalMessage.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { finalMessage } from '@/config/finalMessage'
import confetti from 'canvas-confetti'

const romanticTexts = [
  "You are my sunshine ☀️",
  "My heart belongs to you 💕",
  "Forever & Always 💫",
  "My soulmate 🧡",
  "The love of my life 💛"
]

export default function FinalMessage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [celebrated, setCelebrated] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const triggerCelebration = () => {
    if (celebrated) return
    setCelebrated(true)

    // Heart confetti
    const duration = 5 * 1000
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
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF6B35', '#FFD700', '#FFAB91', '#FFFFFF']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF6B35', '#FFD700', '#FFAB91', '#FFFFFF']
      })
    }, 250)
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A00] via-[#2D1408] to-[#1A0A00] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 4 === 0 ? '🧡' : i % 4 === 1 ? '💛' : i % 4 === 2 ? '❤️' : '✨'}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        {/* Title with animated text cycling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#FFD700] to-[#FFAB91] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {finalMessage.title}
          </h2>
          
          {/* Cycling romantic texts */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl md:text-2xl text-[#FFAB91]"
            >
              {romanticTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Big Name with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-12"
        >
          <motion.h1
            className="text-6xl md:text-9xl lg:text-[12rem] font-bold relative z-10"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FFAB91 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              filter: [
                'drop-shadow(0 0 30px rgba(255, 107, 53, 0.5))',
                'drop-shadow(0 0 60px rgba(255, 215, 0, 0.7))',
                'drop-shadow(0 0 30px rgba(255, 107, 53, 0.5))',
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {finalMessage.name}
          </motion.h1>
          
          {/* Heartbeat animation around name */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Sparkles around the name */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-3xl"
              style={{
                left: `${50 + 45 * Math.cos((i / 12) * Math.PI * 2)}%`,
                top: `${50 + 45 * Math.sin((i / 12) * Math.PI * 2)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>

        {/* Main Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-[#FFAB91] mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {finalMessage.mainMessage}
        </motion.p>

        {/* Love Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={triggerCelebration}
          className={`px-12 py-6 rounded-full text-xl md:text-2xl font-semibold transition-all duration-500 ${
            celebrated
              ? 'bg-gradient-to-r from-[#FFAB91] to-[#FFE4C4] text-[#FF6B35]'
              : 'bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white hover:shadow-[0_0_50px_rgba(255,107,53,0.5)]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {celebrated ? '💕 I Love You Too! 💕' : finalMessage.button}
        </motion.button>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-2xl md:text-3xl text-[#FFAB91]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {finalMessage.signature}
        </motion.p>

        {/* Roses and Hearts at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex justify-center gap-4 flex-wrap"
        >
          {['🌹', '🧡', '🌹', '💛', '🌹', '❤️', '🌹'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-5xl"
              animate={{
                y: [0, -15, 0],
                rotate: emoji === '🌹' ? [-5, 5, -5] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
