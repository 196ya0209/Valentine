// components/transitions/CloudDivider.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CloudDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative h-24 md:h-32 overflow-hidden bg-[#0C0A09]">
      {/* Subtle gradient wave */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 146, 60, 0.08)" />
              <stop offset="50%" stopColor="rgba(245, 158, 11, 0.12)" />
              <stop offset="100%" stopColor="rgba(251, 146, 60, 0.08)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="url(#dividerGradient)"
            animate={{
              d: [
                "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
                "M0,70 C200,30 400,90 600,50 C800,10 1000,90 1200,70 L1200,120 L0,120 Z",
                "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Subtle particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#FB923C]"
          style={{
            left: `${15 + i * 18}%`,
            top: '50%',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.5, 0],
            y: [10, -10, 10],
          } : {}}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Center line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FB923C]/30 to-transparent" />
    </div>
  )
}
