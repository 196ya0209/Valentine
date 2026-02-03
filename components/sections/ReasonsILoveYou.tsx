// components/sections/ReasonsILoveYou.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reasonsILoveAmritha } from '@/config/reasons'

export default function ReasonsILoveYou() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Reasons I Love You
          </h2>
          <p className="text-white/60 text-lg">
            Click each card to reveal why, Mookie 💕
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {reasonsILoveAmritha.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="perspective-1000"
            >
              <motion.div
                className="relative w-full aspect-[3/4] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => toggleCard(index)}
                whileHover={{ scale: 1.05 }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#E63946] to-[#FF69B4] flex flex-col items-center justify-center p-4 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-4xl mb-3">❤️</span>
                  <span className="text-white font-medium text-center text-sm md:text-base">
                    {item.petName}
                  </span>
                  <span className="text-white/60 text-xs mt-2">Tap to reveal</span>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFB4C2] to-[#FFDDE1] flex items-center justify-center p-4 backface-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <p className="text-[#2D0A0A] text-center text-xs md:text-sm font-medium leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                {/* Glow effect */}
                {flippedCards.has(index) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ boxShadow: '0 0 0px rgba(255, 105, 180, 0)' }}
                    animate={{ boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)' }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
