// components/sections/PhotoGallery.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
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
      className="relative py-32 md:py-40 bg-[#0C0A09] overflow-hidden"
    >
      {/* Background */}
      <div className="aurora-bg opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.p className="text-[#78716C] text-sm tracking-[0.3em] uppercase mb-4">
            Captured Moments
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
            {photoGallery.title}
          </h2>
          
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Photo Grid - Modern Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {photoGallery.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative cursor-pointer group ${
                index % 5 === 0 || index % 5 === 3 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C1917] to-[#0C0A09]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Photo placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EA580C]/20 to-[#F59E0B]/10 flex items-center justify-center">
                  <span className="text-5xl opacity-50">📷</span>
                </div>
                
                {/* Overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[#FB923C] text-xs font-medium mb-1">
                      {photo.petName}
                    </p>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.05] group-hover:border-[#FB923C]/30 transition-colors duration-300" />
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Navigation - Previous */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: currentIndex > 0 ? 1 : 0.3, x: 0 }}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            
            {/* Navigation - Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentIndex < photoGallery.photos.length - 1 ? 1 : 0.3, x: 0 }}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              disabled={currentIndex >= photoGallery.photos.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-14 right-0 p-2 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Photo */}
              <div className="aspect-video bg-gradient-to-br from-[#1C1917] to-[#0C0A09] rounded-2xl overflow-hidden flex items-center justify-center border border-white/[0.05]">
                <span className="text-8xl opacity-50">📷</span>
              </div>

              {/* Caption */}
              {photoGallery.photos.find(p => p.id === selectedPhoto) && (
                <div className="mt-6 text-center">
                  <p className="text-[#FB923C] text-sm font-medium mb-2">
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.petName}
                  </p>
                  <p className="text-white/70 text-base">
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.caption}
                  </p>
                </div>
              )}
              
              {/* Photo counter */}
              <p className="text-center text-[#57534E] text-sm mt-4">
                {currentIndex + 1} / {photoGallery.photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
