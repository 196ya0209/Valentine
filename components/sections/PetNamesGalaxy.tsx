// components/sections/PetNamesGalaxy.tsx
'use client'

import { useState, useRef } from 'react'
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

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 bg-[#0C0A09] overflow-hidden"
    >
      {/* Subtle star background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Aurora */}
      <div className="aurora-bg opacity-20" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p className="text-[#78716C] text-sm tracking-[0.3em] uppercase mb-4">
            All The Names I Call You
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {petNamesData.title}
          </h2>
          
          <p className="text-[#A8A29E] text-lg">
            {petNamesData.subtitle}
          </p>
          
          <div className="section-divider w-24 mx-auto mt-6" />
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
              <h3 className="text-lg text-[#A8A29E] mb-6 text-center tracking-wide">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {category.names.map((name, nameIndex) => (
                  <motion.button
                    key={nameIndex}
                    onClick={() => setSelectedName(name)}
                    className="group px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:border-[#FB923C]/40 hover:bg-[#FB923C]/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2 group-hover:scale-110 inline-block transition-transform">{name.emoji}</span>
                    <span className="text-sm font-medium">{name.name}</span>
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setSelectedName(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-[#1C1917] to-[#0C0A09] p-8 md:p-10 rounded-3xl max-w-md w-full border border-white/[0.08] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-4 h-4 text-[#78716C]" />
              </button>
              
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#EA580C]/20 to-[#F59E0B]/10 flex items-center justify-center text-4xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedName.emoji}
                </motion.div>
                
                <h3 
                  className="text-3xl mb-6" 
                  style={{ 
                    fontFamily: "'Great Vibes', cursive",
                    background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {selectedName.name}
                </h3>
                
                <div className="space-y-4 text-left">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <p className="text-[#78716C] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Meaning
                    </p>
                    <p className="text-white/80 text-sm">
                      {selectedName.meaning}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <p className="text-[#78716C] text-xs uppercase tracking-wider mb-1">
                      Used When
                    </p>
                    <p className="text-[#FB923C] text-sm">
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
