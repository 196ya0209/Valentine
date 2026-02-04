// components/sections/VirtualGarden.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { virtualGarden } from '@/config/garden'

const flowerEmojis: Record<string, string> = {
  rose: '🌹',
  tulip: '🌷',
  sunflower: '🌻',
  cherry: '🌸',
  hibiscus: '🌺'
}

export default function VirtualGarden() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null)

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#FFE5D9] via-[#0A1A0A] to-[#FFF8F0] overflow-hidden min-h-screen"
    >
      {/* Grass gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1A3A1A]/50 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {virtualGarden.title}
          </h2>
          <p className="text-[#3A3229]/60 text-lg">
            {virtualGarden.subtitle}
          </p>
        </motion.div>

        {/* Garden */}
        <div className="relative h-96 md:h-[500px]">
          {/* Sky with sun */}
          <motion.div
            className="absolute top-0 right-10 text-6xl"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ☀️
          </motion.div>

          {/* Clouds */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-50"
              style={{
                top: `${10 + i * 15}%`,
                left: `${20 + i * 30}%`,
              }}
              animate={{
                x: [0, 50, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              ☁️
            </motion.div>
          ))}

          {/* Ground flowers */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 flex items-end justify-center gap-8 md:gap-16 px-4">
            {virtualGarden.flowers.map((flower, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer"
                initial={{ scale: 0, y: 50 }}
                animate={isInView ? { scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onClick={() => setSelectedFlower(index)}
              >
                {/* Stem */}
                <motion.div
                  className="w-1 mx-auto bg-gradient-to-t from-green-600 to-green-400"
                  style={{ height: 100 + index * 20 }}
                  animate={{
                    scaleY: [1, 1.02, 1],
                    rotateZ: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                
                {/* Leaves */}
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 flex gap-1">
                  <motion.div
                    className="text-2xl"
                    style={{ transform: 'scaleX(-1) rotate(-30deg)' }}
                    animate={{ rotate: [-35, -25, -35] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🍃
                  </motion.div>
                  <motion.div
                    className="text-2xl"
                    style={{ transform: 'rotate(30deg)' }}
                    animate={{ rotate: [25, 35, 25] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🍃
                  </motion.div>
                </div>
                
                {/* Flower head */}
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl md:text-6xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  {flowerEmojis[flower.type] || '🌸'}
                </motion.div>
                
                {/* Label */}
                <motion.p
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#3A3229]/60 text-xs whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                >
                  {flower.occasion}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Butterflies */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                x: [0, 50, 0, -30, 0],
                y: [0, -30, -10, -40, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2,
              }}
            >
              🦋
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flower message modal */}
      <AnimatePresence>
        {selectedFlower !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gradient-to-br from-[#2D0A0A] to-[#FFF8F0] p-8 rounded-2xl max-w-md w-full border border-[#FFB4C2]/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-7xl mb-4 block">
                {flowerEmojis[virtualGarden.flowers[selectedFlower].type]}
              </span>
              <h3 className="text-2xl text-[#3A3229] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {virtualGarden.flowers[selectedFlower].occasion}
              </h3>
              <p className="text-[#FFB4C2]">
                {virtualGarden.flowers[selectedFlower].message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
