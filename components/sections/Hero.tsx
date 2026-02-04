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
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative sun rays - top right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.12) 0%, rgba(255,155,133,0.08) 40%, transparent 70%)',
            top: '-15%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom left organic shape */}
        <motion.div 
          className="absolute w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,214,186,0.5) 0%, rgba(232,93,4,0.05) 60%, transparent 80%)',
            bottom: '-10%',
            left: '-5%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Sparkle accents */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="w-4 h-4 text-[#E85D04]" style={{ opacity: 0.6 }} />
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
            color: '#D4622C',
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
            color: '#E85D04',
            letterSpacing: '-0.5px'
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
            color: '#8C7A6B'
          }}
        >
          {heroConfig.tagline}
        </motion.p>
      </div>
      
      {/* Subtle floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              background: i % 2 === 0 
                ? 'rgba(232, 93, 4, 0.4)' 
                : 'rgba(255, 155, 133, 0.5)',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [-10, -40],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator - Orange themed */}
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
            color: '#8C7A6B'
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 rounded-full"
          style={{ 
            border: '2px solid rgba(232, 93, 4, 0.4)',
            background: 'rgba(255, 251, 245, 0.8)'
          }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: '#E85D04' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
