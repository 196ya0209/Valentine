// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { heroConfig } from '@/config/heroConfig'

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

export default function Hero() {
  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #3D2318 25%, #4A2C1C 50%, #2C1810 75%, #1A0F0A 100%)'
      }}
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.2) 0%, rgba(255,155,133,0.1) 40%, transparent 70%)',
            top: '-20%',
            right: '-20%',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom left warm glow */}
        <motion.div 
          className="absolute w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.15) 0%, rgba(255,155,133,0.05) 60%, transparent 80%)',
            bottom: '-15%',
            left: '-10%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle sparkle accents */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: '#FF9B85', opacity: 0.7 }} />
          </motion.div>
        ))}
      </div>
      
      {/* 3D Scene with particle name */}
      <Scene />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Subtitle - Elegant */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-8"
          style={{ 
            fontFamily: "'Outfit', sans-serif",
            color: '#FF9B85',
            letterSpacing: '3px'
          }}
        >
          {heroConfig.subtitle}
        </motion.p>
        
        {/* Spacer for the 3D name */}
        <div className="h-24 md:h-32" />
        
        {/* Occasion - Playfair Display */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-semibold tracking-wide"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#FF9B85',
            letterSpacing: '-0.5px',
            textShadow: '0 0 40px rgba(232, 93, 4, 0.5)'
          }}
        >
          {heroConfig.occasion}
        </motion.h2>
        
        {/* Tagline - Pacifico script */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-lg md:text-xl mt-6"
          style={{ 
            fontFamily: "'Pacifico', cursive",
            color: 'rgba(255, 214, 186, 0.9)'
          }}
        >
          {heroConfig.tagline}
        </motion.p>
      </div>
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
              background: i % 2 === 0 
                ? 'rgba(255, 155, 133, 0.6)' 
                : 'rgba(232, 93, 4, 0.5)',
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
              y: [-5, -25],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator - warm themed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.p
          className="text-xs tracking-widest uppercase mb-3 font-medium"
          style={{ 
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(255, 214, 186, 0.7)'
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 rounded-full"
          style={{ 
            border: '2px solid rgba(232, 93, 4, 0.5)',
            background: 'rgba(44, 24, 16, 0.8)'
          }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: '#FF9B85' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
