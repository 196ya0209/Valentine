// components/loading/HeartLoader.tsx
'use client'

import { motion } from 'framer-motion'

export default function HeartLoader() {
  return (
    <motion.div
      className="relative"
      animate={{
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-24 h-24 relative">
        {/* Heart SVG - Orange theme */}
        <svg
          viewBox="0 0 32 29.6"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFAB91" />
            </linearGradient>
            <filter id="heartGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            fill="url(#heartGradient)"
            filter="url(#heartGlow)"
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </svg>
        
        {/* Glow effect - Orange theme */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}
