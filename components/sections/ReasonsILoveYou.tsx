// components/sections/ReasonsILoveYou.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reasonsILoveAmritha } from '@/config/reasons'
import { Heart, RotateCcw } from 'lucide-react'

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
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C'
            }}
          >
            Let Me Count The Ways
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            Reasons I Love You
          </h2>
          
          <p 
            className="text-base flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Tap each card to reveal
          </p>
          
          {/* Wavy divider */}
          <svg className="w-32 h-4 mx-auto mt-6" viewBox="0 0 120 12">
            <path 
              d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" 
              fill="none" 
              stroke="#E85D04" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {reasonsILoveAmritha.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="perspective-1000"
            >
              <motion.div
                className="relative w-full aspect-[3/4] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                onClick={() => toggleCard(index)}
                whileHover={{ y: -4 }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    background: 'rgba(255, 251, 245, 0.95)',
                    border: '2px solid rgba(255, 214, 186, 0.6)',
                    boxShadow: '0 8px 24px rgba(232, 93, 4, 0.12)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                      boxShadow: '0 4px 12px rgba(232, 93, 4, 0.25)'
                    }}
                  >
                    <Heart className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <span 
                    className="font-semibold text-center text-sm md:text-base"
                    style={{ color: '#3A3229' }}
                  >
                    {item.petName}
                  </span>
                  <span 
                    className="text-xs mt-3 flex items-center gap-1"
                    style={{ color: '#8C7A6B' }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    Tap
                  </span>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 rounded-2xl flex items-center justify-center p-5"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #E85D04, #D4622C)',
                    boxShadow: '0 8px 24px rgba(232, 93, 4, 0.25)'
                  }}
                >
                  <p 
                    className="text-center text-sm md:text-base font-medium leading-relaxed"
                    style={{ color: '#FFFBF5' }}
                  >
                    {item.reason}
                  </p>
                </div>

                {/* Subtle glow when flipped */}
                {flippedCards.has(index) && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ boxShadow: '0 0 0px rgba(232, 93, 4, 0)' }}
                    animate={{ boxShadow: '0 20px 60px rgba(232, 93, 4, 0.3)' }}
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
