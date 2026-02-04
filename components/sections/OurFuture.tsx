// components/sections/OurFuture.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { futureWithAmritha } from '@/config/future'

export default function OurFuture() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#FFE5D9] via-[#0A0A1A] to-[#FFF8F0] overflow-hidden"
    >
      {/* Horizon gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FF69B4]/10 to-transparent" />
      
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
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
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {futureWithAmritha.title}
          </h2>
          <p className="text-[#3A3229]/60 text-lg">
            {futureWithAmritha.subtitle}
          </p>
        </motion.div>

        {/* Dreams Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Path line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E63946] via-[#FF69B4] to-[#FFB4C2]" />

            {futureWithAmritha.dreams.map((dream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} mb-12`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFB4C2] rounded-full ring-4 ring-[#1A0A0A] z-10" />

                <motion.div
                  className={`ml-16 md:ml-0 md:w-5/12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-[#FFB4C2]/20 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255, 105, 180, 0.5)' }}
                >
                  <span className="text-4xl mb-4 block">{dream.emoji}</span>
                  <h3 className="text-xl text-[#3A3229] font-semibold mb-2">{dream.title}</h3>
                  <p className="text-[#3A3229]/70 mb-3">{dream.description}</p>
                  <span className="text-[#FFB4C2] text-sm">{dream.timeline}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bucket List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-3xl text-[#FFB4C2] text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Bucket List
          </h3>
          <div className="space-y-3">
            {futureWithAmritha.bucketList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFB4C2]/30 transition-colors"
              >
                <div className="w-5 h-5 rounded border-2 border-[#FFB4C2] flex items-center justify-center">
                  <span className="text-[#FFB4C2] text-xs">○</span>
                </div>
                <span className="text-[#3A3229]/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
