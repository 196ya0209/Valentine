// components/sections/DreamDestinations.tsx
'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { dreamDestinations } from '@/config/destinations'
import { MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Calculate rotation angle per place
const ROTATION_PER_PLACE = 360 / dreamDestinations.places.length

export default function DreamDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [globeRotation, setGlobeRotation] = useState(0)

  // Helper function to get rotation for a specific index
  const getRotationForIndex = useCallback((index: number) => {
    return index * ROTATION_PER_PLACE
  }, [])

  // Memoized pin positions based on globe rotation
  const pinPositions = useMemo(() => {
    return dreamDestinations.places.map((_, index) => {
      const baseAngle = index * ROTATION_PER_PLACE
      const adjustedAngle = baseAngle - globeRotation
      const rad = (adjustedAngle * Math.PI) / 180
      const x = 50 + 35 * Math.sin(rad)
      const z = Math.cos(rad)
      return { x, z, visible: z > -0.3 }
    })
  }, [globeRotation])

  // Handle mouse/touch drag for globe rotation
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true)
    setDragStart({ x: clientX, y: clientY })
  }, [])

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return
    const deltaX = clientX - dragStart.x
    setGlobeRotation(prev => prev + deltaX * 0.5)
    setDragStart({ x: clientX, y: clientY })
  }, [isDragging, dragStart])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX, e.clientY)
  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
    if (!isDragging) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientY - rect.top - rect.height / 2) / 30
      const y = (e.clientX - rect.left - rect.width / 2) / 30
      setRotation({ x: -x, y })
    }
  }
  const handleMouseUp = () => handleDragEnd()
  const handleMouseLeave = () => {
    handleDragEnd()
    setRotation({ x: 0, y: 0 })
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }
  const handleTouchEnd = () => handleDragEnd()

  // Navigate destinations
  const goToNext = () => {
    const nextIndex = selectedPlace === null ? 0 : (selectedPlace + 1) % dreamDestinations.places.length
    setSelectedPlace(nextIndex)
    setGlobeRotation(getRotationForIndex(nextIndex))
  }

  const goToPrev = () => {
    const prevIndex = selectedPlace === null 
      ? dreamDestinations.places.length - 1 
      : (selectedPlace - 1 + dreamDestinations.places.length) % dreamDestinations.places.length
    setSelectedPlace(prevIndex)
    setGlobeRotation(getRotationForIndex(prevIndex))
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
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
            Our Adventures Await
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {dreamDestinations.title}
          </h2>
          
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

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            {/* Navigation arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-2 rounded-full transition-all"
              style={{
                background: 'rgba(255, 251, 245, 0.9)',
                border: '2px solid rgba(232, 93, 4, 0.3)',
                boxShadow: '0 4px 12px rgba(232, 93, 4, 0.15)'
              }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#E85D04' }} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-2 rounded-full transition-all"
              style={{
                background: 'rgba(255, 251, 245, 0.9)',
                border: '2px solid rgba(232, 93, 4, 0.3)',
                boxShadow: '0 4px 12px rgba(232, 93, 4, 0.15)'
              }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#E85D04' }} />
            </button>

            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full relative cursor-grab active:cursor-grabbing select-none"
              style={{
                background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 30%, #1E40AF 60%, #1E3A8A 100%)',
                boxShadow: '0 0 60px rgba(37, 99, 235, 0.3), inset 0 0 60px rgba(0,0,0,0.3)',
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y + globeRotation,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Continents (simplified) */}
              <div 
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: `
                    radial-gradient(ellipse 30% 15% at 30% 40%, #22C55E 0%, transparent 100%),
                    radial-gradient(ellipse 25% 20% at 70% 35%, #22C55E 0%, transparent 100%),
                    radial-gradient(ellipse 20% 15% at 50% 65%, #22C55E 0%, transparent 100%),
                    radial-gradient(ellipse 15% 10% at 80% 60%, #22C55E 0%, transparent 100%)
                  `
                }}
              />
              
              {/* Grid lines */}
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 20px,
                      rgba(255,255,255,0.3) 20px,
                      rgba(255,255,255,0.3) 21px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 20px,
                      rgba(255,255,255,0.3) 20px,
                      rgba(255,255,255,0.3) 21px
                    )
                  `
                }}
              />
              
              {/* Pin markers */}
              {dreamDestinations.places.map((place, index) => {
                const pos = pinPositions[index]
                const isSelected = selectedPlace === index
                
                return (
                  <motion.button
                    key={index}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ 
                      left: `${pos.x}%`, 
                      top: '50%',
                      opacity: pos.visible ? 1 : 0,
                      scale: pos.visible ? 1 : 0.5,
                      zIndex: pos.z > 0 ? 10 : 5
                    }}
                    whileHover={{ scale: 1.3 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPlace(index)
                    }}
                  >
                    <motion.div
                      className="relative"
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                        style={{
                          background: isSelected 
                            ? 'linear-gradient(135deg, #E85D04, #FF9B85)' 
                            : 'rgba(255, 251, 245, 0.95)',
                          boxShadow: isSelected 
                            ? '0 4px 16px rgba(232, 93, 4, 0.5)' 
                            : '0 4px 12px rgba(0, 0, 0, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {place.emoji}
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(232, 93, 4, 0.5)' }}
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.button>
                )
              })}
              
              {/* Globe shine */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)'
                }}
              />
            </motion.div>

            {/* Drag hint */}
            <p 
              className="text-center text-sm mt-4 font-medium"
              style={{ color: '#8C7A6B' }}
            >
              Drag to explore • Click pins to select
            </p>
          </motion.div>

          {/* Destinations list */}
          <div className="flex-1 space-y-4 w-full lg:w-auto">
            {dreamDestinations.places.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: selectedPlace === index
                    ? 'linear-gradient(135deg, rgba(232,93,4,0.15), rgba(255,155,133,0.1))'
                    : 'rgba(255, 251, 245, 0.9)',
                  border: selectedPlace === index
                    ? '2px solid rgba(232, 93, 4, 0.4)'
                    : '2px solid rgba(255, 214, 186, 0.5)',
                  boxShadow: selectedPlace === index
                    ? '0 8px 24px rgba(232, 93, 4, 0.15)'
                    : '0 4px 12px rgba(232, 93, 4, 0.08)'
                }}
                onClick={() => {
                  setSelectedPlace(index)
                  setGlobeRotation(getRotationForIndex(index))
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{place.emoji}</span>
                  <div className="flex-1">
                    <h4 
                      className="font-semibold"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#3A3229'
                      }}
                    >
                      {place.place}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: selectedPlace === index ? '#E85D04' : '#8C7A6B' }}
                    >
                      {place.reason}
                    </p>
                  </div>
                  {selectedPlace === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#E85D04' }}
                    >
                      <MapPin className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected place modal (mobile) */}
      <AnimatePresence>
        {selectedPlace !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 lg:hidden"
            style={{
              background: 'rgba(58, 50, 41, 0.9)',
              backdropFilter: 'blur(20px)'
            }}
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-md w-full relative rounded-3xl overflow-hidden text-center p-8"
              style={{
                background: 'linear-gradient(135deg, #FFF8F0, #FFE5D9)',
                boxShadow: '0 20px 60px rgba(232, 93, 4, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ background: 'rgba(232, 93, 4, 0.1)' }}
              >
                <X className="w-4 h-4" style={{ color: '#D4622C' }} />
              </button>
              
              <span className="text-6xl mb-4 block">{dreamDestinations.places[selectedPlace].emoji}</span>
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#E85D04'
                }}
              >
                {dreamDestinations.places[selectedPlace].place}
              </h3>
              <p style={{ color: '#8C7A6B' }}>
                {dreamDestinations.places[selectedPlace].reason}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
