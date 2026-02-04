// components/sections/Stargazing.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { stargazing } from '@/config/stars'

interface Star {
  id: number
  x: number
  y: number
  size: number
  twinkleDelay: number
  isNamed?: boolean
  namedIndex?: number
}

export default function Stargazing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedStar, setSelectedStar] = useState<number | null>(null)
  const [shootingStars, setShootingStars] = useState(stargazing.shootingStarWishes)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate stars
    const generatedStars: Star[] = []
    
    // Named stars
    stargazing.namedStars.forEach((_, index) => {
      generatedStars.push({
        id: index,
        x: 20 + (index * 20) + Math.random() * 10,
        y: 20 + Math.random() * 40,
        size: 4,
        twinkleDelay: Math.random() * 2,
        isNamed: true,
        namedIndex: index
      })
    })
    
    // Random background stars
    for (let i = 0; i < 150; i++) {
      generatedStars.push({
        id: 100 + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        twinkleDelay: Math.random() * 3
      })
    }
    
    setStars(generatedStars)
  }, [])

  const triggerShootingStar = () => {
    if (shootingStars > 0) {
      setShootingStars(prev => prev - 1)
    }
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0A0A1A] via-[#0A0515] to-[#FFF8F0] overflow-hidden min-h-screen"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <h2
          className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {stargazing.title}
        </h2>
        <p className="text-[#3A3229]/60">Click on the glowing stars to see our messages</p>
      </motion.div>

      {/* Night Sky */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-pink-900/10" />
        
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className={`absolute rounded-full ${star.isNamed ? 'cursor-pointer' : ''}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size * (star.isNamed ? 4 : 1),
              height: star.size * (star.isNamed ? 4 : 1),
              backgroundColor: star.isNamed ? '#FFD700' : '#FFFFFF',
              boxShadow: star.isNamed 
                ? '0 0 20px #FFD700, 0 0 40px #FFD700' 
                : `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`
            }}
            animate={star.isNamed ? {
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            } : {
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: star.twinkleDelay,
            }}
            onClick={() => star.isNamed && setSelectedStar(star.namedIndex!)}
            whileHover={star.isNamed ? { scale: 1.5 } : {}}
          />
        ))}
        
        {/* Shooting star */}
        {shootingStars < stargazing.shootingStarWishes && (
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ left: '10%', top: '10%', opacity: 1 }}
            animate={{ left: '90%', top: '60%', opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 10px #fff, 0 0 20px #fff, -50px -20px 30px rgba(255,255,255,0.3)'
            }}
          />
        )}
      </div>

      {/* Shooting star button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={triggerShootingStar}
          disabled={shootingStars === 0}
          className={`px-6 py-3 rounded-full ${
            shootingStars > 0 
              ? 'bg-gradient-to-r from-[#E63946] to-[#FF69B4] text-[#3A3229]' 
              : 'bg-white/10 text-[#3A3229]/50'
          }`}
          whileHover={shootingStars > 0 ? { scale: 1.05 } : {}}
          whileTap={shootingStars > 0 ? { scale: 0.95 } : {}}
        >
          ⭐ Make a Wish ({shootingStars} left)
        </motion.button>
      </motion.div>

      {/* Star message modal */}
      <AnimatePresence>
        {selectedStar !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#0A0A1A] to-[#1A0A2A] p-8 rounded-2xl max-w-md w-full border border-[#FFD700]/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-6xl mb-4 block">⭐</span>
              <h3 className="text-2xl text-[#FFD700] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stargazing.namedStars[selectedStar].name}
              </h3>
              <p className="text-[#3A3229]/80">
                {stargazing.namedStars[selectedStar].message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
