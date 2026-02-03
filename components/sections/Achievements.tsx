// components/sections/Achievements.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '@/config/achievements'

const rarityColors = {
  Epic: 'from-purple-500 to-purple-700',
  Legendary: 'from-yellow-500 to-orange-500',
  Mythic: 'from-pink-500 to-red-500'
}

const rarityGlow = {
  Epic: 'shadow-purple-500/30',
  Legendary: 'shadow-yellow-500/30',
  Mythic: 'shadow-pink-500/30'
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#0A0A1A] to-[#1A0A0A] overflow-hidden"
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
            {achievements.title}
          </h2>
        </motion.div>

        {/* Her Achievements */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-2xl text-white mb-8 text-center">✨ Legendary Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.herAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${rarityColors[achievement.rarity as keyof typeof rarityColors]} shadow-lg ${rarityGlow[achievement.rarity as keyof typeof rarityGlow]}`}
              >
                {/* Rarity badge */}
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-black/50 text-xs font-bold text-white">
                  {achievement.rarity}
                </div>
                
                <h4 className="text-xl text-white font-bold mb-2">{achievement.title}</h4>
                <p className="text-white/80 text-sm">{achievement.description}</p>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: index * 0.5
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relationship Achievements */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl text-white mb-8 text-center">💕 Our Milestones</h3>
          <div className="space-y-4">
            {achievements.relationshipAchievements.map((milestone, index) => {
              const isUnlocked = milestone.status === 'Unlocked'
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isUnlocked 
                      ? 'bg-white/10 border-[#FFB4C2]/30' 
                      : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isUnlocked ? 'bg-[#E63946]' : 'bg-white/20'
                    }`}>
                      {isUnlocked ? '✓' : '🔒'}
                    </div>
                    <span className="text-white font-medium">{milestone.title}</span>
                  </div>
                  <span className={`text-sm ${isUnlocked ? 'text-[#FFB4C2]' : 'text-white/50'}`}>
                    {milestone.status}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
