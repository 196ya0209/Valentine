// components/transitions/CloudDivider.tsx
'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'

interface CloudConfig {
  width: number
  height: number
  left: number
  top: number
  duration: number
  delay: number
}

export default function CloudDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-10%" })
  
  // Scroll-based zoom effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Create zoom out/in effect based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 1, 1, 1, 0])

  // Pre-compute random values for clouds to avoid re-render issues
  const largeClouds = useMemo<CloudConfig[]>(() => 
    [...Array(8)].map((_, i) => ({
      width: 200 + Math.random() * 300,
      height: 100 + Math.random() * 150,
      left: (i * 15) - 10 + Math.random() * 10,
      top: 20 + Math.random() * 40,
      duration: 8 + i * 2,
      delay: i * 0.5,
    })), [])

  const mediumClouds = useMemo<CloudConfig[]>(() =>
    [...Array(12)].map((_, i) => ({
      width: 100 + Math.random() * 150,
      height: 60 + Math.random() * 80,
      left: (i * 10) - 5 + Math.random() * 8,
      top: 10 + Math.random() * 60,
      duration: 6 + i * 1.5,
      delay: i * 0.3,
    })), [])

  const smallClouds = useMemo<CloudConfig[]>(() =>
    [...Array(15)].map(() => ({
      width: 50 + Math.random() * 80,
      height: 30 + Math.random() * 50,
      left: Math.random() * 100,
      top: Math.random() * 80,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    })), [])

  return (
    <div 
      ref={ref} 
      className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 30%, #FED7AA 60%, #FDBA74 100%)'
      }}
    >
      {/* Full screen cloud overlay with zoom effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale, opacity }}
      >
        {/* Dreamy cloud layers */}
        <div className="absolute inset-0">
          {/* Cloud layer 1 - Large fluffy clouds */}
          {largeClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-large-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,237,213,0.8) 50%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cloud.delay,
              }}
            />
          ))}
          
          {/* Cloud layer 2 - Medium clouds */}
          {mediumClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-med-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(254,215,170,0.6) 60%, transparent 80%)',
                filter: 'blur(15px)',
              }}
              animate={{
                x: [0, -25, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cloud.delay,
              }}
            />
          ))}
          
          {/* Cloud layer 3 - Small accent clouds */}
          {smallClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-small-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(251,191,36,0.3) 70%, transparent 90%)',
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cloud.delay,
              }}
            />
          ))}
        </div>
        
        {/* Golden sun rays effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(251,191,36,0.2) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating hearts in clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-2xl md:text-3xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 3) * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            💛
          </motion.div>
        ))}
        
        {/* Center message during transition */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center"
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-4xl md:text-6xl">☁️</span>
            <p 
              className="mt-4 text-lg md:text-xl font-light tracking-widest"
              style={{
                color: '#92400E',
                textShadow: '0 2px 10px rgba(255,255,255,0.8)',
              }}
            >
              ✨ Dreaming of You ✨
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Top fade gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #FFF7ED, transparent)',
        }}
      />
      
      {/* Bottom fade gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FFF7ED, transparent)',
        }}
      />
    </div>
  )
}
