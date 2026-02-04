// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { heroConfig } from '@/config/heroConfig'

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#1A0A00] via-[#2D1408] to-[#1A0A00]">
      {/* Aurora background */}
      <div className="aurora-bg" />
      
      {/* 3D Scene with particle name */}
      <Scene />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-[#FFAB91] text-xl md:text-2xl mb-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {heroConfig.subtitle}
        </motion.p>
        
        {/* Spacer for the 3D name */}
        <div className="h-32 md:h-48" />
        
        {/* Occasion */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-white text-2xl md:text-4xl font-light tracking-wide"
        >
          {heroConfig.occasion}
        </motion.h2>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-[#FFE4C4]/60 text-sm md:text-base mt-4"
        >
          {heroConfig.tagline}
        </motion.p>
      </div>
      
      {/* Sparkle effects with orange theme */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FFD700' : '#FFFFFF',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.p
          className="text-white/50 text-sm mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore our story
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#FF6B35]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
