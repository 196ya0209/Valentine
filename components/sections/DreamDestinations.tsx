// components/sections/DreamDestinations.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { dreamDestinations } from '@/config/destinations'

export default function DreamDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / 20
    const y = (e.clientX - rect.left - rect.width / 2) / 20
    setRotation({ x: -x, y })
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#0A1A2A] to-[#1A0A0A] overflow-hidden"
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
            {dreamDestinations.title}
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotation({ x: 0, y: 0 })}
          >
            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full relative"
              style={{
                background: 'linear-gradient(135deg, #1a4d8c 0%, #0d2b4d 50%, #051525 100%)',
                boxShadow: '0 0 60px rgba(26, 77, 140, 0.5), inset 0 0 60px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {/* Continents (simplified) */}
              <div className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: `
                    radial-gradient(ellipse 30% 15% at 30% 40%, #3d9970 0%, transparent 100%),
                    radial-gradient(ellipse 25% 20% at 70% 35%, #3d9970 0%, transparent 100%),
                    radial-gradient(ellipse 15% 10% at 50% 60%, #3d9970 0%, transparent 100%)
                  `
                }}
              />
              
              {/* Pin markers */}
              {dreamDestinations.places.map((place, index) => {
                const angle = (index / dreamDestinations.places.length) * 360
                const x = 50 + 35 * Math.cos(angle * Math.PI / 180)
                const y = 50 + 35 * Math.sin(angle * Math.PI / 180)
                
                return (
                  <motion.button
                    key={index}
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => setSelectedPlace(index)}
                  >
                    <span className="text-2xl">{place.emoji}</span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#E63946]"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                )
              })}
              
              {/* Globe shine */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Destinations list */}
          <div className="flex-1 space-y-4">
            {dreamDestinations.places.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedPlace === index
                    ? 'bg-gradient-to-r from-[#E63946]/20 to-[#FF69B4]/20 border-[#FFB4C2]'
                    : 'bg-white/5 border-white/10 hover:border-[#FFB4C2]/50'
                }`}
                onClick={() => setSelectedPlace(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{place.emoji}</span>
                  <div>
                    <h4 className="text-white font-semibold">{place.place}</h4>
                    <p className="text-[#FFB4C2] text-sm">{place.reason}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected place modal */}
      <AnimatePresence>
        {selectedPlace !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8 lg:hidden"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gradient-to-br from-[#2D0A0A] to-[#1A0A0A] p-8 rounded-2xl max-w-md w-full border border-[#FFB4C2]/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-6xl mb-4 block">{dreamDestinations.places[selectedPlace].emoji}</span>
              <h3 className="text-2xl text-white mb-2">{dreamDestinations.places[selectedPlace].place}</h3>
              <p className="text-[#FFB4C2]">{dreamDestinations.places[selectedPlace].reason}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
