// components/3d/FloatingModels.tsx
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FloatingModel {
  id: number
  emoji: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingModels() {
  const models = useMemo(() => {
    const modelEmojis = ['🥚', '🍑', '🫐', '🍫', '❤️', '💕', '🌹', '🧁', '🎂', '☕', '🥭', '🍓']
    const floatingModels: FloatingModel[] = []
    
    for (let i = 0; i < 40; i++) {
      floatingModels.push({
        id: i,
        emoji: modelEmojis[i % modelEmojis.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 30,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
      })
    }
    return floatingModels
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {models.map((model) => (
        <motion.div
          key={model.id}
          className="absolute"
          style={{
            left: `${model.x}%`,
            top: `${model.y}%`,
            fontSize: `${model.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(model.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: model.duration,
            delay: model.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {model.emoji}
        </motion.div>
      ))}
    </div>
  )
}
