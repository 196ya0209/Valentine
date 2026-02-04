// components/sections/OurSoundtrack.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ourSoundtrack } from '@/config/soundtrack'

export default function OurSoundtrack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#FFE5D9] via-[#FFD6BA] to-[#FFF8F0] overflow-hidden"
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
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {ourSoundtrack.title}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Our Song - Featured */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-gradient-to-br from-[#E63946]/20 to-[#FF69B4]/20 border border-[#FFB4C2]/30">
              {/* Vinyl Record */}
              <motion.div
                className="relative w-48 h-48 flex-shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#3A3A3A] to-[#2A2A2A]" />
                <div className="absolute inset-[45%] rounded-full bg-[#E63946] flex items-center justify-center">
                  <span className="text-[#3A3229] text-xs">💕</span>
                </div>
                {/* Grooves */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/5"
                    style={{
                      inset: `${16 + i * 5}%`
                    }}
                  />
                ))}
              </motion.div>

              <div className="text-center md:text-left">
                <span className="text-[#FFB4C2] text-sm mb-2 block">Our Song</span>
                <h3 className="text-2xl md:text-3xl text-[#3A3229] font-bold mb-2">
                  {ourSoundtrack.ourSong.title}
                </h3>
                <p className="text-[#3A3229]/60 mb-4">by {ourSoundtrack.ourSong.artist}</p>
                <p className="text-[#FFB4C2] italic mb-4">&ldquo;{ourSoundtrack.ourSong.favoriteLyric}&rdquo;</p>
                <p className="text-[#3A3229]/80 text-sm">{ourSoundtrack.ourSong.reason}</p>
              </div>
            </div>
          </motion.div>

          {/* Song Categories */}
          <div className="space-y-8">
            {ourSoundtrack.categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
              >
                <h3 className="text-xl text-[#3A3229] mb-4 flex items-center gap-2">
                  🎵 {category.name}
                </h3>
                <div className="space-y-3">
                  {category.songs.map((song, songIndex) => (
                    <motion.div
                      key={songIndex}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFB4C2]/30 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {/* Mini vinyl */}
                      <motion.div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center flex-shrink-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      >
                        <div className="w-3 h-3 rounded-full bg-[#E63946]" />
                      </motion.div>
                      <span className="text-[#3A3229]/80">{song}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
