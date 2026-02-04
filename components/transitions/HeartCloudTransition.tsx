// components/transitions/HeartCloudTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { heartCloudTransitionConfig } from '@/config/transitionConfig'

interface HeartCloudTransitionProps {
  isActive: boolean
}

export default function HeartCloudTransition({ isActive }: HeartCloudTransitionProps) {
  const { heartCount, duration, cloudColors, heartColors } = heartCloudTransitionConfig

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 2000 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Cloud layers */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, ${cloudColors.secondary} 0%, ${cloudColors.primary} 50%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeInOut"
            }}
          />

          {/* Floating hearts */}
          {[...Array(heartCount)].map((_, i) => {
            const size = 15 + Math.random() * 30
            const color = heartColors[Math.floor(Math.random() * heartColors.length)]
            const startX = Math.random() * 100
            const startY = Math.random() * 100
            const delay = Math.random() * 0.5

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  fontSize: `${size}px`,
                  color: color,
                  textShadow: `0 0 10px ${color}80`
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  y: 0,
                  rotate: Math.random() * 360
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.5],
                  y: [-20, 0, 0, 20],
                  rotate: Math.random() * 720 - 360
                }}
                transition={{
                  duration: duration / 1000,
                  delay: delay,
                  ease: "easeInOut"
                }}
              >
                ❤
              </motion.div>
            )
          })}

          {/* Cloud puffs */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute rounded-full"
              style={{
                width: 100 + Math.random() * 150,
                height: 80 + Math.random() * 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(ellipse at center, ${cloudColors.secondary} 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: duration / 1000,
                delay: Math.random() * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
