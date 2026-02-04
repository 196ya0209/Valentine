// components/loading/LoadingScreen.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { loadingMessages } from '@/config/loadingMessages'
import { Heart } from 'lucide-react'

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C0A09]"
    >
      {/* Ambient Background */}
      <div className="aurora-bg" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Heart */}
        <motion.div
          className="relative mb-12"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#F59E0B] flex items-center justify-center shadow-2xl shadow-orange-500/20">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-[#FB923C]/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-3xl border border-[#FB923C]/20"
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Loading Message */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl md:text-2xl text-center px-8 mb-12 max-w-md"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 md:w-80">
          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#EA580C] to-[#F59E0B] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Percentage */}
          <motion.p
            className="text-[#57534E] text-xs mt-3 text-center tracking-widest"
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
