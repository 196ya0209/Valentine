// components/sections/SunsetEnding.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-react'

export default function SunsetEnding() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [answered, setAnswered] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const runAwayButton = () => {
    const maxX = window.innerWidth - 150
    const maxY = 200
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2
    setNoButtonPosition({ x: newX, y: newY })
  }

  const handleYesClick = () => {
    setAnswered(true)
    setShowHearts(true)
    
    const duration = 4 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

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
        colors: ['#FB923C', '#F59E0B', '#FBBF24', '#FFFFFF']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FB923C', '#F59E0B', '#FBBF24', '#FFFFFF']
      })
    }, 250)
  }

  return (
    <section 
      ref={ref}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Modern sunset gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #0C0A09 0%,
            #1C1917 15%,
            #78350F 35%,
            #B45309 50%,
            #D97706 60%,
            #F59E0B 70%,
            #FBBF24 80%,
            #FDE68A 90%,
            #FEF3C7 100%
          )`
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, #FEF3C7 0%, #FBBF24 30%, #F59E0B 60%, #EA580C 100%)',
          bottom: '15%',
          filter: 'blur(2px)'
        }}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 0.9, y: 0 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Sun glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: '0 0 100px 60px rgba(251, 191, 36, 0.3), 0 0 200px 100px rgba(245, 158, 11, 0.2)'
          }}
          animate={{
            boxShadow: [
              '0 0 100px 60px rgba(251, 191, 36, 0.3), 0 0 200px 100px rgba(245, 158, 11, 0.2)',
              '0 0 120px 80px rgba(251, 191, 36, 0.4), 0 0 220px 120px rgba(245, 158, 11, 0.25)',
              '0 0 100px 60px rgba(251, 191, 36, 0.3), 0 0 200px 100px rgba(245, 158, 11, 0.2)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      {/* Horizon line */}
      <div 
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ bottom: '25%' }}
      />

      {/* Water reflection */}
      <motion.div
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.2) 0%, rgba(234, 88, 12, 0.1) 50%, transparent 100%)'
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          {/* Question */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-6"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
            animate={{ scale: answered ? [1, 1.05, 1] : 1 }}
          >
            {answered ? "I Knew It!" : "Will you be there for me always?"}
          </motion.h2>

          {!answered && (
            <motion.p
              className="text-lg md:text-xl text-white/80 mb-12 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              My love, I need to ask you something important...
            </motion.p>
          )}

          {/* Buttons */}
          {!answered && (
            <motion.div
              className="flex flex-col sm:flex-row gap-6 items-center justify-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {/* Yes Button */}
              <motion.button
                onClick={handleYesClick}
                className="group relative px-10 py-4 text-lg font-medium rounded-full bg-white text-[#EA580C] shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FB923C] to-[#F59E0B]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                  <Heart className="w-5 h-5 group-hover:fill-current" />
                  Yes, Forever
                </span>
              </motion.button>

              {/* No Button - Runs away */}
              <motion.button
                className="px-10 py-4 text-lg font-medium rounded-full bg-black/20 backdrop-blur-sm text-white/60 border border-white/20"
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={runAwayButton}
                onTouchStart={runAwayButton}
                onClick={runAwayButton}
              >
                No...
              </motion.button>
            </motion.div>
          )}

          {/* Success message */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.p
                className="text-2xl md:text-3xl text-white mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                You just made me the happiest person alive
              </motion.p>
              
              <div className="flex justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Silhouette */}
      <motion.div 
        className="absolute bottom-[26%] left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="black">
          {/* Two people silhouette */}
          <ellipse cx="40" cy="20" rx="10" ry="12" />
          <ellipse cx="80" cy="18" rx="9" ry="11" />
          <path d="M30 32 Q40 70 50 75 L60 70 Q70 60 70 50 Q75 55 80 75 L90 70 Q95 55 90 32 Q80 28 70 30 L60 35 L50 30 Q40 28 30 32" />
        </svg>
      </motion.div>

      {/* Floating hearts when answered */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '-50px',
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                opacity: [1, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            >
              <Heart 
                className="text-white" 
                size={16 + Math.random() * 16}
                fill="white"
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
