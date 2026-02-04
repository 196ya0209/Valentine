// components/sections/PetNamesGalaxy.tsx
'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { petNamesData } from '@/config/petNames'
import { X, Sparkles } from 'lucide-react'

interface PetName {
  name: string
  emoji: string
  meaning: string
  usedWhen: string
}

export default function PetNamesGalaxy() {
  const [selectedName, setSelectedName] = useState<PetName | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Generate star positions once with useMemo
  const starPositions = useMemo(() => 
    [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    })), []
  )

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Subtle sparkle background */}
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: star.left,
              top: star.top,
              background: 'rgba(232, 93, 4, 0.4)',
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
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
            All The Names I Call You
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {petNamesData.title}
          </h2>
          
          <p 
            className="text-lg"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            {petNamesData.subtitle}
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

        {/* Categories */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {petNamesData.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              <h3 
                className="text-lg mb-6 text-center tracking-wide font-medium"
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  color: '#8C7A6B'
                }}
              >
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {category.names.map((name, nameIndex) => (
                  <motion.button
                    key={nameIndex}
                    onClick={() => setSelectedName(name)}
                    className="group px-5 py-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: 'rgba(255, 251, 245, 0.9)',
                      border: '2px solid rgba(255, 214, 186, 0.6)',
                      boxShadow: '0 4px 12px rgba(232, 93, 4, 0.08)'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: '0 8px 24px rgba(232, 93, 4, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2 group-hover:scale-110 inline-block transition-transform">{name.emoji}</span>
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: '#3A3229' }}
                    >
                      {name.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Name details modal */}
      <AnimatePresence>
        {selectedName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{
              background: 'rgba(58, 50, 41, 0.9)',
              backdropFilter: 'blur(20px)'
            }}
            onClick={() => setSelectedName(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-md w-full relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFF8F0, #FFE5D9)',
                boxShadow: '0 20px 60px rgba(232, 93, 4, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                style={{
                  background: 'rgba(232, 93, 4, 0.1)'
                }}
              >
                <X className="w-4 h-4" style={{ color: '#D4622C' }} />
              </button>
              
              <div className="text-center p-8 md:p-10">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,93,4,0.15), rgba(255,155,133,0.1))',
                    border: '2px solid rgba(232, 93, 4, 0.2)'
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedName.emoji}
                </motion.div>
                
                <h3 
                  className="text-3xl mb-6 font-bold" 
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#E85D04'
                  }}
                >
                  {selectedName.name}
                </h3>
                
                <div className="space-y-4 text-left">
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 214, 186, 0.4)',
                      border: '1px solid rgba(232, 93, 4, 0.15)'
                    }}
                  >
                    <p 
                      className="text-xs uppercase tracking-wider mb-2 flex items-center gap-1 font-semibold"
                      style={{ color: '#D4622C' }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Meaning
                    </p>
                    <p 
                      className="text-sm"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#3A3229'
                      }}
                    >
                      {selectedName.meaning}
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 214, 186, 0.4)',
                      border: '1px solid rgba(232, 93, 4, 0.15)'
                    }}
                  >
                    <p 
                      className="text-xs uppercase tracking-wider mb-2 font-semibold"
                      style={{ color: '#D4622C' }}
                    >
                      Used When
                    </p>
                    <p 
                      className="text-sm font-medium"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#E85D04'
                      }}
                    >
                      {selectedName.usedWhen}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
