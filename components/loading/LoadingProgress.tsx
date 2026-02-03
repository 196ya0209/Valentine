// components/loading/LoadingProgress.tsx
'use client'

import { motion } from 'framer-motion'

interface LoadingProgressProps {
  progress: number
}

export default function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="w-64 md:w-80 relative">
      {/* Background bar */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        {/* Progress fill with rose petal effect */}
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #E63946, #FF69B4, #FFB4C2)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* Rose petal decorations */}
      <motion.span
        className="absolute -top-6 text-xl"
        style={{ left: `${Math.min(progress, 95)}%` }}
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        🌹
      </motion.span>
    </div>
  )
}
