// components/sections/OurFuture.tsx
'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { futureWithAmritha } from '@/config/future'
import { Sparkles } from 'lucide-react'

export default function OurFuture() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Memoize star positions
  const starPositions = useMemo(() => 
    [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    })), []
  )

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      {/* Decorative sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: 'rgba(232, 93, 4, 0.4)' }} />
          </motion.div>
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
          <motion.p 
            className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C'
            }}
          >
            Looking Ahead
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {futureWithAmritha.title}
          </h2>
          <p 
            className="text-lg"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            {futureWithAmritha.subtitle}
          </p>
          
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

        {/* Dreams Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Path line */}
            <div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5"
              style={{
                background: 'linear-gradient(180deg, #E85D04, #FF9B85, #FFD6BA)'
              }}
            />

            {futureWithAmritha.dreams.map((dream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} mb-12`}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: '#E85D04',
                    boxShadow: '0 0 0 4px #FFF8F0, 0 0 0 6px rgba(232, 93, 4, 0.3)'
                  }}
                />

                <motion.div
                  className={`ml-16 md:ml-0 md:w-5/12 p-6 rounded-2xl ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                  style={{
                    background: 'rgba(255, 251, 245, 0.95)',
                    border: '2px solid rgba(255, 214, 186, 0.6)',
                    boxShadow: '0 8px 24px rgba(232, 93, 4, 0.12)'
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 12px 36px rgba(232, 93, 4, 0.18)' 
                  }}
                >
                  <span className="text-4xl mb-4 block">{dream.emoji}</span>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      color: '#3A3229'
                    }}
                  >
                    {dream.title}
                  </h3>
                  <p 
                    className="mb-3"
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      color: '#8C7A6B'
                    }}
                  >
                    {dream.description}
                  </p>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: '#E85D04' }}
                  >
                    {dream.timeline}
                  </span>
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
          <h3 
            className="text-3xl text-center mb-8 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            Our Bucket List
          </h3>
          <div className="space-y-3">
            {futureWithAmritha.bucketList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                style={{
                  background: 'rgba(255, 251, 245, 0.9)',
                  border: '2px solid rgba(255, 214, 186, 0.5)'
                }}
              >
                <div 
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{ borderColor: '#E85D04' }}
                >
                  <span style={{ color: '#E85D04', fontSize: '10px' }}>○</span>
                </div>
                <span 
                  className="font-medium"
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    color: '#3A3229'
                  }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
