// components/sections/Achievements.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '@/config/achievements'
import { Trophy, Lock, Check, Star } from 'lucide-react'

const rarityStyles = {
  Epic: {
    bg: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.4)',
    text: '#8B5CF6',
  },
  Legendary: {
    bg: 'rgba(232, 93, 4, 0.15)',
    border: 'rgba(232, 93, 4, 0.4)',
    text: '#E85D04',
  },
  Mythic: {
    bg: 'rgba(236, 72, 153, 0.15)',
    border: 'rgba(236, 72, 153, 0.4)',
    text: '#EC4899',
  }
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
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
            Unlocked
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {achievements.title}
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

        {/* Her Achievements */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-10">
            <Trophy className="w-5 h-5" style={{ color: '#E85D04' }} />
            <h3 
              className="text-lg tracking-wide font-medium"
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                color: '#8C7A6B'
              }}
            >
              Legendary Achievements
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.herAchievements.map((achievement, index) => {
              const style = rarityStyles[achievement.rarity as keyof typeof rarityStyles]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl overflow-hidden group"
                  style={{
                    background: style.bg,
                    border: `2px solid ${style.border}`,
                    boxShadow: '0 8px 24px rgba(232, 93, 4, 0.1)'
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  {/* Rarity badge */}
                  <div 
                    className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      background: 'rgba(255, 251, 245, 0.9)',
                      color: style.text
                    }}
                  >
                    {achievement.rarity}
                  </div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255, 251, 245, 0.5)' }}
                    >
                      <Star className="w-5 h-5" style={{ color: style.text }} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 
                        className="text-base font-semibold"
                        style={{ color: '#3A3229' }}
                      >
                        {achievement.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p 
                    className="text-sm pl-[52px]"
                    style={{ color: '#8C7A6B' }}
                  >
                    {achievement.description}
                  </p>
                  
                  {/* Subtle shine on hover */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Relationship Milestones */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-10">
            <Check className="w-5 h-5" style={{ color: '#E85D04' }} />
            <h3 
              className="text-lg tracking-wide font-medium"
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                color: '#8C7A6B'
              }}
            >
              Our Milestones
            </h3>
          </div>
          
          <div className="space-y-3">
            {achievements.relationshipAchievements.map((milestone, index) => {
              const isUnlocked = milestone.status === 'Unlocked'
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                  className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: isUnlocked ? 'rgba(255, 251, 245, 0.95)' : 'rgba(255, 251, 245, 0.5)',
                    border: isUnlocked ? '2px solid rgba(232, 93, 4, 0.3)' : '2px solid rgba(255, 214, 186, 0.4)',
                    opacity: isUnlocked ? 1 : 0.7
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isUnlocked 
                          ? 'linear-gradient(135deg, rgba(232,93,4,0.15), rgba(255,155,133,0.1))'
                          : 'rgba(255, 214, 186, 0.3)'
                      }}
                    >
                      {isUnlocked 
                        ? <Check className="w-5 h-5" style={{ color: '#E85D04' }} />
                        : <Lock className="w-4 h-4" style={{ color: '#8C7A6B' }} />
                      }
                    </div>
                    <span 
                      className="font-medium"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: isUnlocked ? '#3A3229' : '#8C7A6B'
                      }}
                    >
                      {milestone.title}
                    </span>
                  </div>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: isUnlocked ? '#E85D04' : '#8C7A6B' }}
                  >
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
