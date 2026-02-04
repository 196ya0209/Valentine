// components/loading/LoadingScreen.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { loadingMessages } from '@/config/loadingMessages'
import { Heart, Sparkles } from 'lucide-react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 3 + 1
      })
    }, 100)

    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 40%, #FFE5D9 70%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.12) 0%, transparent 60%)',
            top: '-10%',
            right: '-5%',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="w-4 h-4 text-[#E85D04]" style={{ opacity: 0.5 }} />
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Heart */}
        <motion.div
          className="relative mb-12"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
              boxShadow: '0 8px 32px rgba(232, 93, 4, 0.35)'
            }}
          >
            <Heart className="w-8 h-8 text-[#FFF8F0]" fill="currentColor" />
          </div>
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(232, 93, 4, 0.3)' }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(232, 93, 4, 0.2)' }}
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Loading Message - Playfair Display */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl md:text-2xl text-center px-8 mb-12 max-w-md font-semibold"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#E85D04',
          }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 md:w-80">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(255, 214, 186, 0.5)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #E85D04, #FF9B85)'
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Percentage */}
          <motion.p
            className="text-xs mt-3 text-center tracking-widest font-medium"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
