// components/transitions/CloudDivider.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CloudDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative h-32 md:h-48 overflow-hidden">
      {/* Cloud layer 1 */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 107, 53, 0.3)" />
              <stop offset="50%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 171, 145, 0.3)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#cloudGradient)"
            animate={{
              d: [
                "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
                "M0,80 C150,20 350,100 600,50 C850,0 1050,100 1200,80 L1200,120 L0,120 Z",
                "M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Floating hearts and sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            top: '50%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? {
            opacity: [0, 0.8, 0],
            y: [20, -20, 20],
          } : {}}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        >
          {i % 2 === 0 ? '🧡' : '✨'}
        </motion.div>
      ))}

      {/* Dreamy mist effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFAB91]/10 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  )
}
