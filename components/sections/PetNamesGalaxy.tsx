// components/sections/PetNamesGalaxy.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { petNamesData } from '@/config/petNames'

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

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#0A0A1A] to-[#1A0A0A] overflow-hidden"
    >
      {/* Star background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
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
          <h2
            className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {petNamesData.title}
          </h2>
          <p className="text-white/60 text-lg">
            {petNamesData.subtitle}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {petNamesData.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl text-white mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-4">
                {category.names.map((name, nameIndex) => (
                  <motion.button
                    key={nameIndex}
                    onClick={() => setSelectedName(name)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E63946]/20 to-[#FF69B4]/20 border border-[#FFB4C2]/30 text-white hover:border-[#FF69B4] transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        delay: nameIndex * 0.3,
                      }
                    }}
                  >
                    <span className="mr-2">{name.emoji}</span>
                    {name.name}
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
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
            onClick={() => setSelectedName(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
              className="bg-gradient-to-br from-[#2D0A0A] to-[#1A0A0A] p-8 rounded-2xl max-w-md w-full border border-[#FFB4C2]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <span className="text-6xl mb-4 block">{selectedName.emoji}</span>
                <h3 className="text-3xl text-[#FFB4C2] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  {selectedName.name}
                </h3>
                <p className="text-white/80 mb-6">
                  <span className="text-[#FF69B4]">Meaning:</span> {selectedName.meaning}
                </p>
                <p className="text-white/60 text-sm">
                  <span className="text-[#FFB4C2]">Used when:</span> {selectedName.usedWhen}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
