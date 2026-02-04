// components/sections/SunsetEnding.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function SunsetEnding() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [answered, setAnswered] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const runAwayButton = () => {
    // Generate random position within viewport
    const maxX = window.innerWidth - 150
    const maxY = 200
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2
    setNoButtonPosition({ x: newX, y: newY })
  }

  const handleYesClick = () => {
    setAnswered(true)
    setShowHearts(true)
    
    // Celebration confetti
    const duration = 5 * 1000
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
      className="relative min-h-screen overflow-hidden"
    >
      {/* Sunset gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #1A0A00 0%,
            #2D1408 10%,
            #FF6347 30%,
            #FF7F50 45%,
            #FFA500 55%,
            #FFD700 70%,
            #FFE4B5 85%,
            #FFDAB9 100%
          )`
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 40%, #FF6B35 100%)',
          boxShadow: '0 0 100px 50px rgba(255, 165, 0, 0.5)',
          bottom: '20%',
        }}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
        } : {}}
        transition={{ duration: 2 }}
      />

      {/* Clouds at sunset */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 150 + Math.random() * 200,
            height: 50 + Math.random() * 50,
            left: `${i * 20}%`,
            bottom: `${30 + i * 5}%`,
            background: `linear-gradient(90deg, 
              rgba(255, 127, 80, 0.8) 0%, 
              rgba(255, 165, 0, 0.6) 50%, 
              rgba(255, 215, 0, 0.8) 100%
            )`,
            filter: 'blur(15px)',
          }}
          animate={{
            x: [0, 50, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

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
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-8 drop-shadow-lg"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              textShadow: '2px 2px 20px rgba(0,0,0,0.3)'
            }}
            animate={{ 
              scale: answered ? [1, 1.1, 1] : 1 
            }}
            transition={{ duration: 0.5 }}
          >
            {answered ? "I Knew It! 💕" : "Will you be there for me alltimes?"}
          </motion.h2>

          {!answered && (
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              My Mookie, I need to ask you something... 🧡
            </motion.p>
          )}

          {/* Buttons */}
          {!answered && (
            <motion.div
              className="flex flex-col sm:flex-row gap-6 items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {/* Yes Button */}
              <motion.button
                onClick={handleYesClick}
                className="px-12 py-5 text-2xl font-bold rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.5)'
                }}
              >
                Yes, Forever! 💕
              </motion.button>

              {/* No Button - Runs away */}
              <motion.button
                className="px-12 py-5 text-2xl font-bold rounded-full bg-gray-400/50 text-white/70 shadow-lg cursor-pointer"
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={runAwayButton}
                onTouchStart={runAwayButton}
                onClick={runAwayButton}
              >
                No... 😢
              </motion.button>
            </motion.div>
          )}

          {/* Success message */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.p
                className="text-2xl md:text-4xl text-white mb-8"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                You just made me the happiest person alive! 🧡
              </motion.p>
              
              <div className="flex justify-center gap-4 flex-wrap">
                {['🧡', '💛', '❤️', '💕', '✨', '🔥', '💫', '🌟'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl md:text-5xl"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Silhouette of two people at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 flex items-end justify-center">
        <motion.div
          className="text-6xl md:text-8xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          👫
        </motion.div>
      </div>

      {/* Floating hearts when answered */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-50px',
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                opacity: [1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            >
              {i % 3 === 0 ? '🧡' : i % 3 === 1 ? '💛' : '❤️'}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
