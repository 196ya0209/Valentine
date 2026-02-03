// components/loading/LoadingScreen.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { loadingMessages } from '@/config/loadingMessages'
import HeartLoader from './HeartLoader'
import LoadingProgress from './LoadingProgress'

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
    }, 2500)

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A]"
    >
      {/* Pulsing Heart */}
      <HeartLoader />

      {/* Loading Message */}
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-[#FFB4C2] text-lg md:text-xl text-center px-8 mt-8 mb-12"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem' }}
      >
        {loadingMessages[messageIndex]}
      </motion.p>

      {/* Progress Bar */}
      <LoadingProgress progress={Math.min(progress, 100)} />

      {/* Percentage */}
      <motion.p
        className="text-white/70 text-sm mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {Math.min(Math.round(progress), 100)}%
      </motion.p>
    </motion.div>
  )
}
