// components/3d/FloatingModels.tsx
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Heart } from 'lucide-react'

interface FloatingModel {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'heart' | 'dot'
}

export default function FloatingModels() {
  const models = useMemo(() => {
    const floatingModels: FloatingModel[] = []
    
    // Add minimal, elegant floating elements - mostly subtle hearts and dots
    for (let i = 0; i < 15; i++) {
      floatingModels.push({
        id: i,
        x: 5 + Math.random() * 90,
        y: Math.random() * 100,
        size: 12 + Math.random() * 12,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 10,
        type: i % 3 === 0 ? 'heart' : 'dot',
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
            y: [0, -60, 0],
            x: [0, Math.sin(model.id) * 20, 0],
            opacity: [0.15, 0.35, 0.15],
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
              className="text-[#EA580C]" 
              strokeWidth={1}
              fill="rgba(234, 88, 12, 0.2)"
            />
          ) : (
            <div 
              className="rounded-full"
              style={{ 
                width: model.size / 3, 
                height: model.size / 3,
                background: 'radial-gradient(circle, rgba(251,146,60,0.6) 0%, rgba(234,88,12,0.3) 100%)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
