// components/sections/PhotoGallery.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X } from 'lucide-react'
import { photoGallery } from '@/config/photos'
import Image from 'next/image'

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] overflow-hidden"
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
            {photoGallery.title}
          </h2>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {photoGallery.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                rotateY: 5,
                z: 50,
                boxShadow: '0 25px 50px rgba(255, 105, 180, 0.3)'
              }}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedPhoto(photo.id)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Photo placeholder - in production, use actual photos */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E63946] to-[#FF69B4] flex items-center justify-center">
                <span className="text-6xl">📷</span>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <span className="text-[#FFB4C2] text-sm font-medium mb-2">
                  {photo.petName}
                </span>
                <span className="text-white text-xs text-center">
                  {photo.caption}
                </span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-[#FF69B4]/0 group-hover:ring-[#FF69B4]/50 transition-all duration-300" />
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Photo */}
              <div className="aspect-video bg-gradient-to-br from-[#E63946] to-[#FF69B4] rounded-xl flex items-center justify-center">
                <span className="text-9xl">📷</span>
              </div>

              {/* Caption */}
              {photoGallery.photos.find(p => p.id === selectedPhoto) && (
                <div className="mt-6 text-center">
                  <p className="text-[#FFB4C2] text-xl mb-2">
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.petName}
                  </p>
                  <p className="text-white/80">
                    {photoGallery.photos.find(p => p.id === selectedPhoto)?.caption}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
