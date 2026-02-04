// components/3d/FloatingModels.tsx
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Heart, Sparkles } from 'lucide-react'

interface FloatingModel {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'heart' | 'sparkle' | 'dot'
}

export default function FloatingModels() {
  const models = useMemo(() => {
    const floatingModels: FloatingModel[] = []
    
    // Elegant floating elements - warm orange themed
    for (let i = 0; i < 18; i++) {
      floatingModels.push({
        id: i,
        x: 5 + Math.random() * 90,
        y: Math.random() * 100,
        size: 14 + Math.random() * 14,
        duration: 18 + Math.random() * 12,
        delay: Math.random() * 8,
        type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'sparkle' : 'dot',
      })
    }
    return floatingModels
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {models.map((model) => (
        <motion.div
          key={model.id}
          className="absolute"
          style={{
            left: `${model.x}%`,
            top: `${model.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(model.id) * 15, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: model.type === 'heart' ? [-5, 5, -5] : [0, 0, 0],
          }}
          transition={{
            duration: model.duration,
            delay: model.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {model.type === 'heart' ? (
            <Heart 
              size={model.size} 
              className="text-[#E85D04]" 
              strokeWidth={1.5}
              fill="rgba(232, 93, 4, 0.25)"
            />
          ) : model.type === 'sparkle' ? (
            <Sparkles
              size={model.size * 0.8}
              className="text-[#D4622C]"
              strokeWidth={1.5}
            />
          ) : (
            <div 
              className="rounded-full"
              style={{ 
                width: model.size / 2.5, 
                height: model.size / 2.5,
                background: 'radial-gradient(circle, rgba(232,93,4,0.5) 0%, rgba(255,155,133,0.3) 100%)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
