// components/sections/DreamDestinations.tsx
'use client'

import { useState, useRef, useMemo, Suspense } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { dreamDestinations } from '@/config/destinations'
import { MapPin, X, Search } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import 3D globe to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/3d/Globe3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="text-center">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
            boxShadow: '0 0 40px rgba(37, 99, 235, 0.5)'
          }}
        />
        <p style={{ color: '#FF9B85' }}>Loading Globe...</p>
      </div>
    </div>
  )
})

export default function DreamDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [autoRotate, setAutoRotate] = useState(true)

  // Filter places by search query
  const filteredPlaces = useMemo(() => {
    if (!searchQuery.trim()) return dreamDestinations.places
    const query = searchQuery.toLowerCase()
    return dreamDestinations.places.filter(
      place => place.place.toLowerCase().includes(query) || 
               place.reason.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Handle search and go to first match
  const handleSearchSelect = (placeIndex: number) => {
    const originalIndex = dreamDestinations.places.findIndex(p => p === filteredPlaces[placeIndex])
    if (originalIndex !== -1) {
      setAutoRotate(false)
      setSelectedPlace(originalIndex)
      setSearchQuery('')
    }
  }

  // Handle globe place selection
  const handleGlobeSelect = (index: number) => {
    setAutoRotate(false)
    setSelectedPlace(index)
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #2C1810 0%, #1A0F0A 30%, #0D0705 60%, #1A0F0A 100%)'
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
              color: '#FF9B85'
            }}
          >
            Our Adventures Await
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#FF9B85',
              textShadow: '0 0 40px rgba(232, 93, 4, 0.4)'
            }}
          >
            {dreamDestinations.title}
          </h2>
          
          {/* Wavy divider */}
          <svg className="w-32 h-4 mx-auto mt-6" viewBox="0 0 120 12">
            <path 
              d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" 
              fill="none" 
              stroke="#FF9B85" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12 relative"
        >
          <div 
            className="relative"
            style={{
              background: 'rgba(44, 24, 16, 0.9)',
              borderRadius: '50px',
              border: '2px solid rgba(232, 93, 4, 0.4)',
              boxShadow: '0 4px 20px rgba(232, 93, 4, 0.2)'
            }}
          >
            <Search 
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" 
              style={{ color: '#FF9B85' }} 
            />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-5 bg-transparent outline-none text-base placeholder:text-orange-200/50"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFD6BA'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-orange-900/30 transition-colors"
              >
                <X className="w-4 h-4" style={{ color: '#FF9B85' }} />
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchQuery && filteredPlaces.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-30 mt-2 w-full rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(44, 24, 16, 0.98)',
                  border: '2px solid rgba(232, 93, 4, 0.3)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}
              >
                {filteredPlaces.map((place, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(index)}
                    className="w-full px-5 py-3 flex items-center gap-3 hover:bg-orange-900/30 transition-colors text-left"
                  >
                    <span className="text-2xl">{place.emoji}</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#FFD6BA' }}>{place.place}</p>
                      <p className="text-sm" style={{ color: '#FF9B85' }}>{place.reason}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {searchQuery && filteredPlaces.length === 0 && (
            <p className="text-center mt-4 text-sm" style={{ color: '#FF9B85' }}>
              No destinations found. Try another search!
            </p>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <Suspense fallback={
              <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, #4A90D9 0%, #2563EB 100%)',
                      boxShadow: '0 0 40px rgba(37, 99, 235, 0.5)'
                    }}
                  />
                  <p style={{ color: '#FF9B85' }}>Loading Globe...</p>
                </div>
              </div>
            }>
              <Globe3D 
                selectedPlace={selectedPlace}
                onSelectPlace={handleGlobeSelect}
                autoRotate={autoRotate}
              />
            </Suspense>
            
            {/* Drag hint */}
            <p 
              className="text-center text-sm mt-4 font-medium"
              style={{ color: 'rgba(255, 214, 186, 0.7)' }}
            >
              🌍 Drag to rotate • Scroll to zoom • Click pins to explore
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
                className="p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: selectedPlace === index
                    ? 'linear-gradient(135deg, rgba(232,93,4,0.25), rgba(255,155,133,0.15))'
                    : 'rgba(44, 24, 16, 0.9)',
                  border: selectedPlace === index
                    ? '2px solid rgba(232, 93, 4, 0.6)'
                    : '2px solid rgba(232, 93, 4, 0.2)',
                  boxShadow: selectedPlace === index
                    ? '0 8px 24px rgba(232, 93, 4, 0.25)'
                    : '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
                onClick={() => {
                  setAutoRotate(false)
                  setSelectedPlace(index)
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{place.emoji}</span>
                  <div className="flex-1">
                    <h4 
                      className="font-semibold"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#FFD6BA'
                      }}
                    >
                      {place.place}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: selectedPlace === index ? '#FF9B85' : 'rgba(255, 155, 133, 0.7)' }}
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
              background: 'rgba(26, 15, 10, 0.95)',
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
                background: 'linear-gradient(135deg, #3D2318, #2C1810)',
                border: '2px solid rgba(232, 93, 4, 0.4)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(232, 93, 4, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ background: 'rgba(232, 93, 4, 0.2)' }}
              >
                <X className="w-4 h-4" style={{ color: '#FF9B85' }} />
              </button>
              
              <span className="text-6xl mb-4 block">{dreamDestinations.places[selectedPlace].emoji}</span>
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#FF9B85'
                }}
              >
                {dreamDestinations.places[selectedPlace].place}
              </h3>
              <p style={{ color: 'rgba(255, 214, 186, 0.9)' }}>
                {dreamDestinations.places[selectedPlace].reason}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
