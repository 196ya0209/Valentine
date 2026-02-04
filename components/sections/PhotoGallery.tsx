// components/sections/PhotoGallery.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { photoGallery } from '@/config/photos'

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const currentIndex = selectedPhoto ? photoGallery.photos.findIndex(p => p.id === selectedPhoto) : -1
  
  const goToNext = () => {
    if (currentIndex < photoGallery.photos.length - 1) {
      setSelectedPhoto(photoGallery.photos[currentIndex + 1].id)
    }
  }
  
  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(photoGallery.photos[currentIndex - 1].id)
    }
  }

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.1) 0%, transparent 60%)',
            top: '5%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart 
              className="text-[#E85D04]" 
              size={14 + (i % 3) * 6}
              fill="rgba(232, 93, 4, 0.2)"
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-xs tracking-[0.4em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C',
              letterSpacing: '4px'
            }}
          >
            Captured Moments
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04',
              letterSpacing: '-2px'
            }}
          >
            {photoGallery.title}
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

        {/* Photo Grid - Modern Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {photoGallery.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              className={`relative cursor-pointer group ${
                index % 5 === 0 || index % 5 === 3 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <motion.div 
                className="absolute inset-0 rounded-[20px] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FFF8F0, #FFE5D9)',
                  boxShadow: '0 8px 24px rgba(232, 93, 4, 0.12)'
                }}
                whileHover={{ 
                  scale: 1.03,
                  rotate: 1,
                  boxShadow: '0 12px 36px rgba(232, 93, 4, 0.2)'
                }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Photo placeholder */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(232,93,4,0.1), rgba(255,155,133,0.1))' }}
                >
                  <span className="text-5xl opacity-40">📷</span>
                </div>
                
                {/* Overlay on hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(74, 29, 8, 0.85) 0%, rgba(232, 93, 4, 0.2) 50%, transparent 100%)'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p 
                      className="text-xs font-semibold mb-1"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#FFD6BA'
                      }}
                    >
                      {photo.petName}
                    </p>
                    <p 
                      className="text-sm line-clamp-2"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: 'rgba(255, 251, 245, 0.85)'
                      }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
                
                {/* Border */}
                <div 
                  className="absolute inset-0 rounded-[20px] border-2 transition-colors duration-300"
                  style={{ 
                    borderColor: 'rgba(255, 214, 186, 0.5)'
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{
              background: 'rgba(74, 29, 8, 0.95)',
              backdropFilter: 'blur(20px)'
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Navigation - Previous */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: currentIndex > 0 ? 1 : 0.3, x: 0 }}
              className="absolute left-4 md:left-8 p-3 rounded-full transition-all"
              style={{
                background: 'rgba(255, 251, 245, 0.1)',
                border: '2px solid rgba(255, 251, 245, 0.2)'
              }}
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="w-6 h-6 text-[#FFFBF5]" />
            </motion.button>
            
            {/* Navigation - Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentIndex < photoGallery.photos.length - 1 ? 1 : 0.3, x: 0 }}
              className="absolute right-4 md:right-8 p-3 rounded-full transition-all"
              style={{
                background: 'rgba(255, 251, 245, 0.1)',
                border: '2px solid rgba(255, 251, 245, 0.2)'
              }}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              disabled={currentIndex >= photoGallery.photos.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-[#FFFBF5]" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-14 right-0 p-2 rounded-full transition-all"
                style={{
                  background: 'rgba(255, 251, 245, 0.1)',
                  border: '2px solid rgba(255, 251, 245, 0.2)'
                }}
              >
                <X className="w-5 h-5 text-[#FFFBF5]" />
              </button>

              {/* Photo */}
              <div 
                className="aspect-video rounded-3xl overflow-hidden flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFF8F0, #FFE5D9)',
                  boxShadow: '0 20px 60px rgba(74, 29, 8, 0.5)',
                  border: '2px solid rgba(255, 214, 186, 0.3)'
                }}
              >
                <span className="text-8xl opacity-40">📷</span>
              </div>

              {/* Caption */}
              {photoGallery.photos.find(p => p.id === selectedPhoto) && (
                <div className="mt-6 text-center">
                  <p 
                    className="text-sm font-semibold mb-2"
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFD6BA'
                    }}
                  >
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.petName}
                  </p>
                  <p 
                    className="text-base"
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      color: 'rgba(255, 251, 245, 0.8)'
                    }}
                  >
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.caption}
                  </p>
                </div>
              )}
              
              {/* Photo counter */}
              <p 
                className="text-center text-sm mt-4"
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(255, 214, 186, 0.6)'
                }}
              >
                {currentIndex + 1} / {photoGallery.photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
