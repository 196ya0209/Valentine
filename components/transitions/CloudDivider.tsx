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
  
  // Scroll-based zoom effect for page transition feel
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Create immersive zoom out/in effect - feels like leaving one world entering another
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.6, 1, 1.3, 1, 0.6])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [10, 0, 0, 0, 10])

  // Pre-compute random values for clouds to avoid re-render issues
  const largeClouds = useMemo<CloudConfig[]>(() => 
    [...Array(12)].map((_, i) => ({
      width: 300 + Math.random() * 400,
      height: 150 + Math.random() * 200,
      left: (i * 12) - 20 + Math.random() * 15,
      top: 15 + Math.random() * 50,
      duration: 10 + i * 2,
      delay: i * 0.4,
    })), [])

  const mediumClouds = useMemo<CloudConfig[]>(() =>
    [...Array(18)].map((_, i) => ({
      width: 150 + Math.random() * 200,
      height: 80 + Math.random() * 120,
      left: (i * 8) - 10 + Math.random() * 10,
      top: 5 + Math.random() * 70,
      duration: 7 + i * 1.2,
      delay: i * 0.25,
    })), [])

  const smallClouds = useMemo<CloudConfig[]>(() =>
    [...Array(25)].map(() => ({
      width: 80 + Math.random() * 120,
      height: 40 + Math.random() * 70,
      left: Math.random() * 120 - 10,
      top: Math.random() * 90,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 2,
    })), [])

  return (
    <div 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0C0A09 0%, #1C1917 20%, #292524 50%, #1C1917 80%, #0C0A09 100%)'
      }}
    >
      {/* Full screen cloud overlay with zoom effect - Page transition feel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          scale, 
          opacity,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
        }}
      >
        {/* Dreamy cloud layers filling entire viewport */}
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
                background: 'radial-gradient(ellipse at center, rgba(251,146,60,0.25) 0%, rgba(245,158,11,0.15) 40%, rgba(28,25,23,0.3) 70%, transparent 90%)',
                filter: 'blur(30px)',
              }}
              animate={{
                x: [0, 40, 0],
                y: [0, -20, 0],
                scale: [1, 1.15, 1],
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
                background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.2) 0%, rgba(234,88,12,0.12) 50%, transparent 80%)',
                filter: 'blur(20px)',
              }}
              animate={{
                x: [0, -30, 0],
                y: [0, 25, 0],
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
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(251,146,60,0.08) 60%, transparent 90%)',
                filter: 'blur(12px)',
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.85, 1.2, 0.85],
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
        
        {/* Central warm glow - like sun through clouds */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(251,146,60,0.2) 0%, rgba(234,88,12,0.1) 40%, transparent 70%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating hearts scattered in clouds */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-xl md:text-2xl"
            style={{
              left: `${10 + i * 9}%`,
              top: `${20 + (i % 4) * 18}%`,
              opacity: 0.6,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.7, 1.1, 0.7],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            🧡
          </motion.div>
        ))}
        
        {/* Center message - Dreamy transition text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center px-8"
            animate={{
              scale: [0.92, 1.08, 0.92],
              y: [10, -10, 10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="text-5xl md:text-7xl mb-6"
              animate={{
                rotate: [-5, 5, -5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ☁️
            </motion.div>
            <p 
              className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase"
              style={{
                color: '#FBBF24',
                textShadow: '0 0 30px rgba(251,146,60,0.5), 0 0 60px rgba(234,88,12,0.3)',
              }}
            >
              Dreaming of You
            </p>
            <motion.div
              className="mt-4 flex justify-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">✨</span>
              <span className="text-2xl">💫</span>
              <span className="text-2xl">✨</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Top fade - seamless blend from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, #0C0A09 0%, transparent 100%)',
        }}
      />
      
      {/* Bottom fade - seamless blend to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, #0C0A09 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
