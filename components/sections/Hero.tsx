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
    <section 
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 40%, #FED7AA 70%, #FDBA74 100%)'
      }}
    >
      {/* Subtle decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(253,186,116,0.5) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
          }}
        />
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
          className="text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-8"
          style={{ color: '#92400E' }}
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
            background: 'linear-gradient(135deg, #EA580C 0%, #D97706 50%, #B45309 100%)',
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
          className="text-sm md:text-base mt-6 tracking-wide"
          style={{ color: '#B45309' }}
        >
          {heroConfig.tagline}
        </motion.p>
      </div>
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(251,146,60,0.6) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [-20, -60],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
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
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: '#92400E' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full"
          style={{ 
            border: '1px solid rgba(180, 83, 9, 0.3)',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: '#92400E' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
