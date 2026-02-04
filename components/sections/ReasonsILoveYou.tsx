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
      className="relative py-32 md:py-40 bg-[#FFE5D9] overflow-hidden"
    >
      {/* Background */}
      <div className="aurora-bg opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p className="text-[#8C7A6B] text-sm tracking-[0.3em] uppercase mb-4">
            Let Me Count The Ways
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #E85D04 0%, #D4622C 50%, #FF9B85 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Reasons I Love You
          </h2>
          
          <p className="text-[#8C7A6B] text-base flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Tap each card to reveal
          </p>
          
          <div className="section-divider w-24 mx-auto mt-6" />
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
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E85D04]/20 to-[#D4622C]/10 border border-[#E85D04]/20 backdrop-blur-xl flex flex-col items-center justify-center p-4 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E85D04] to-[#D4622C] flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-[#3A3229] fill-white" />
                  </div>
                  <span className="text-[#3A3229] font-medium text-center text-sm md:text-base">
                    {item.petName}
                  </span>
                  <span className="text-[#8C7A6B] text-xs mt-3 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    Tap
                  </span>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center p-5 backface-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <p className="text-[#78350F] text-center text-sm md:text-base font-medium leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                {/* Subtle glow when flipped */}
                {flippedCards.has(index) && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ boxShadow: '0 0 0px rgba(251, 146, 60, 0)' }}
                    animate={{ boxShadow: '0 20px 60px rgba(251, 191, 36, 0.2)' }}
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
