// components/transitions/CloudDivider.tsx
'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Heart, Sparkles } from 'lucide-react'

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
  
  // Create immersive zoom out/in effect
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.7, 1, 1.2, 1, 0.7])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0])

  // Pre-compute random values for clouds
  const largeClouds = useMemo<CloudConfig[]>(() => 
    [...Array(10)].map((_, i) => ({
      width: 350 + Math.random() * 400,
      height: 180 + Math.random() * 200,
      left: (i * 12) - 15 + Math.random() * 10,
      top: 10 + Math.random() * 60,
      duration: 12 + i * 2,
      delay: i * 0.3,
    })), [])

  const mediumClouds = useMemo<CloudConfig[]>(() =>
    [...Array(15)].map((_, i) => ({
      width: 180 + Math.random() * 200,
      height: 100 + Math.random() * 120,
      left: (i * 8) - 10 + Math.random() * 8,
      top: 5 + Math.random() * 75,
      duration: 8 + i * 1.5,
      delay: i * 0.2,
    })), [])

  const smallClouds = useMemo<CloudConfig[]>(() =>
    [...Array(20)].map(() => ({
      width: 100 + Math.random() * 140,
      height: 60 + Math.random() * 80,
      left: Math.random() * 110 - 5,
      top: Math.random() * 90,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 2,
    })), [])

  return (
    <div 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 20%, #FFF8F0 50%, #FFD6BA 80%, #FFE5D9 100%)'
      }}
    >
      {/* Full screen cloud overlay with zoom effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale, opacity }}
      >
        {/* Dreamy cloud layers */}
        <div className="absolute inset-0">
          {/* Large fluffy clouds - warm cream/peach */}
          {largeClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-large-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,248,240,0.95) 0%, rgba(255,214,186,0.7) 40%, rgba(255,229,217,0.4) 70%, transparent 90%)',
                filter: 'blur(25px)',
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
          
          {/* Medium clouds - with orange hints */}
          {mediumClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-med-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,251,245,0.9) 0%, rgba(232,93,4,0.12) 50%, transparent 80%)',
                filter: 'blur(18px)',
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
          
          {/* Small accent clouds - sparkly */}
          {smallClouds.map((cloud, i) => (
            <motion.div
              key={`cloud-small-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,155,133,0.15) 60%, transparent 90%)',
                filter: 'blur(12px)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
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
        
        {/* Central warm glow - like sun through clouds */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,93,4,0.15) 0%, rgba(255,155,133,0.1) 40%, transparent 70%)',
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating hearts in clouds */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${12 + i * 10}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.1, 0.8],
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Heart 
              className="text-[#E85D04]" 
              size={20 + (i % 3) * 8}
              fill="rgba(232, 93, 4, 0.3)"
            />
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
              scale: [0.95, 1.05, 0.95],
              y: [8, -8, 8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Sparkle icon */}
            <motion.div
              className="flex justify-center mb-4"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-12 h-12 text-[#E85D04]" />
            </motion.div>
            
            <p 
              className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#E85D04',
                textShadow: '0 0 40px rgba(232,93,4,0.3)',
              }}
            >
              Dreaming of You
            </p>
            
            <motion.div
              className="mt-4 flex justify-center gap-3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-[#FF9B85]" fill="rgba(255,155,133,0.5)" />
              <Heart className="w-6 h-6 text-[#E85D04]" fill="rgba(232,93,4,0.5)" />
              <Heart className="w-5 h-5 text-[#FF9B85]" fill="rgba(255,155,133,0.5)" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Top fade - seamless blend from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, #FFE5D9 0%, transparent 100%)',
        }}
      />
      
      {/* Bottom fade - seamless blend to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, #FFE5D9 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
