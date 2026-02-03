// components/sections/FinalMessage.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { finalMessage } from '@/config/finalMessage'
import confetti from 'canvas-confetti'

export default function FinalMessage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [celebrated, setCelebrated] = useState(false)

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
        colors: ['#E63946', '#FFB4C2', '#FF69B4', '#FFFFFF']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#E63946', '#FFB4C2', '#FF69B4', '#FFFFFF']
      })
    }, 250)
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl text-white mb-8"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {finalMessage.title}
        </motion.h2>

        {/* Big Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-12"
        >
          <motion.h1
            className="text-6xl md:text-9xl lg:text-[12rem] font-bold"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #E63946 0%, #FF69B4 50%, #FFB4C2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(255, 105, 180, 0.5)'
            }}
            animate={{
              textShadow: [
                '0 0 80px rgba(255, 105, 180, 0.3)',
                '0 0 120px rgba(255, 105, 180, 0.6)',
                '0 0 80px rgba(255, 105, 180, 0.3)',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {finalMessage.name}
          </motion.h1>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, #FF69B4 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Main Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-[#FFB4C2] mb-12 max-w-2xl mx-auto"
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
              ? 'bg-gradient-to-r from-[#FFB4C2] to-[#FFDDE1] text-[#E63946]'
              : 'bg-gradient-to-r from-[#E63946] to-[#FF69B4] text-white hover:shadow-[0_0_50px_rgba(255,105,180,0.5)]'
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
          className="mt-16 text-2xl md:text-3xl text-[#FFB4C2]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {finalMessage.signature}
        </motion.p>

        {/* Roses at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-5xl"
              animate={{
                y: [0, -10, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              🌹
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
