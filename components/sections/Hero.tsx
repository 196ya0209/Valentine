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
    <section className="relative w-full h-screen overflow-hidden bg-[#0C0A09]">
      {/* Ambient Background */}
      <div className="aurora-bg" />
      
      {/* 3D Scene with particle name */}
      <Scene />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Subtitle - Elegant */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#A8A29E] text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-8"
        >
          {heroConfig.subtitle}
        </motion.p>
        
        {/* Spacer for the 3D name */}
        <div className="h-24 md:h-32" />
        
        {/* Occasion */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-4xl font-light tracking-wide"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {heroConfig.occasion}
        </motion.h2>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-[#78716C] text-sm md:text-base mt-6 tracking-wide"
        >
          {heroConfig.tagline}
        </motion.p>
      </div>
      
      {/* Subtle particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FB923C]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.p
          className="text-[#57534E] text-xs tracking-widest uppercase mb-3"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full border border-[#44403C]"
        >
          <ChevronDown className="w-4 h-4 text-[#78716C]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
