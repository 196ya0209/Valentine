// components/sections/VirtualGifts.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { virtualGifts } from '@/config/gifts'
import confetti from 'canvas-confetti'

export default function VirtualGifts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isOpen, setIsOpen] = useState(false)
  const [revealedCoupons, setRevealedCoupons] = useState<Set<number>>(new Set())

  const openGift = () => {
    setIsOpen(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#E63946', '#FFB4C2', '#FF69B4', '#FFD700']
    })
  }

  const revealCoupon = (index: number) => {
    setRevealedCoupons(prev => new Set(prev).add(index))
  }

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
            {virtualGifts.title}
          </h2>
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
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-br from-[#E63946] to-[#C41E3A] rounded-lg shadow-2xl" />
                  
                  {/* Box lid */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-[#FF69B4] to-[#E63946] rounded-lg shadow-lg"
                    style={{ transformOrigin: 'bottom' }}
                  >
                    {/* Ribbon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-full bg-[#FFD700]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-full bg-[#FFD700]" />
                    {/* Bow */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl">🎀</div>
                  </motion.div>
                  
                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-[#3A3229]/60 mt-8 animate-pulse">Click to open your gift!</p>
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
                      className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                        revealedCoupons.has(index)
                          ? 'bg-gradient-to-br from-[#E63946]/20 to-[#FF69B4]/20 border-[#FFB4C2]'
                          : 'bg-white/5 border-white/20 hover:border-[#FFB4C2]/50'
                      }`}
                      onClick={() => revealCoupon(index)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">🎟️</div>
                        <div>
                          <h4 className="text-[#3A3229] font-bold mb-2">{coupon.title}</h4>
                          <p className="text-[#3A3229]/70 text-sm mb-2">{coupon.description}</p>
                          <span className="text-[#FFB4C2] text-xs">For: {coupon.petName}</span>
                        </div>
                      </div>
                      
                      {revealedCoupons.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-[#3A3229]"
                        >
                          ✓
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
