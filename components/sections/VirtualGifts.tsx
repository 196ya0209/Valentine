// components/sections/VirtualGifts.tsx
'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { virtualGifts } from '@/config/gifts'
import { Gift, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function VirtualGifts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isOpen, setIsOpen] = useState(false)
  const [revealedCoupons, setRevealedCoupons] = useState<Set<number>>(new Set())

  // Memoize sparkle positions
  const sparklePositions = useMemo(() => 
    [...Array(6)].map(() => ({
      left: `${20 + Math.random() * 60}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5,
    })), []
  )

  const openGift = () => {
    setIsOpen(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#E85D04', '#FF9B85', '#FFD6BA', '#F4A261']
    })
  }

  const revealCoupon = (index: number) => {
    setRevealedCoupons(prev => new Set(prev).add(index))
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
            Something Special
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {virtualGifts.title}
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

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Gift Box */
              <motion.div
                key="box"
                className="flex flex-col items-center"
                exit={{ scale: 0, opacity: 0, rotateY: 180 }}
              >
                <motion.div
                  className="relative w-64 h-64 cursor-pointer"
                  onClick={openGift}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Box bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-40 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #E85D04, #C1440E)',
                      boxShadow: '0 12px 40px rgba(232, 93, 4, 0.4)'
                    }}
                  />
                  
                  {/* Box lid */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-24 rounded-lg"
                    style={{ 
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(135deg, #FF9B85, #E85D04)',
                      boxShadow: '0 8px 24px rgba(232, 93, 4, 0.3)'
                    }}
                  >
                    {/* Ribbon */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-full"
                      style={{ background: '#F4A261' }}
                    />
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-full"
                      style={{ background: '#F4A261' }}
                    />
                    {/* Bow */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl">🎀</div>
                  </motion.div>
                  
                  {/* Sparkles */}
                  {sparklePositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: pos.left,
                        top: pos.top,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: pos.delay,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
                <p 
                  className="mt-8 animate-pulse font-medium"
                  style={{ color: '#8C7A6B' }}
                >
                  Click to open your gift!
                </p>
              </motion.div>
            ) : (
              /* Coupons */
              <motion.div
                key="coupons"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {virtualGifts.coupons.map((coupon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.div
                      className="p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300"
                      style={{
                        background: revealedCoupons.has(index)
                          ? 'linear-gradient(135deg, rgba(232,93,4,0.15), rgba(255,155,133,0.15))'
                          : 'rgba(255, 251, 245, 0.95)',
                        borderColor: revealedCoupons.has(index) ? '#E85D04' : 'rgba(255, 214, 186, 0.6)',
                        boxShadow: '0 8px 24px rgba(232, 93, 4, 0.12)'
                      }}
                      onClick={() => revealCoupon(index)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                            boxShadow: '0 4px 12px rgba(232, 93, 4, 0.25)'
                          }}
                        >
                          <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 
                            className="font-bold mb-2"
                            style={{ 
                              fontFamily: "'Outfit', sans-serif",
                              color: '#3A3229'
                            }}
                          >
                            {coupon.title}
                          </h4>
                          <p 
                            className="text-sm mb-2"
                            style={{ color: '#8C7A6B' }}
                          >
                            {coupon.description}
                          </p>
                          <span 
                            className="text-xs font-semibold"
                            style={{ color: '#E85D04' }}
                          >
                            For: {coupon.petName}
                          </span>
                        </div>
                      </div>
                      
                      {revealedCoupons.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: '#22c55e',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                          }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
