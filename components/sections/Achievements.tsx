// components/sections/Achievements.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '@/config/achievements'
import { Trophy, Lock, Check, Star } from 'lucide-react'

const rarityStyles = {
  Epic: {
    bg: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/20'
  },
  Legendary: {
    bg: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20'
  },
  Mythic: {
    bg: 'from-rose-500/20 to-pink-600/20',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    glow: 'shadow-rose-500/20'
  }
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section 
      ref={ref}
      className="relative py-32 md:py-40 bg-[#FFE5D9] overflow-hidden"
    >
      {/* Background */}
      <div className="aurora-bg opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p className="text-[#8C7A6B] text-sm tracking-[0.3em] uppercase mb-4">
            Unlocked
          </motion.p>
          
          <h2
            className="text-5xl md:text-7xl mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #E85D04 0%, #D4622C 50%, #FF9B85 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {achievements.title}
          </h2>
          
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Her Achievements */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-10">
            <Trophy className="w-5 h-5 text-[#E85D04]" />
            <h3 className="text-lg text-[#8C7A6B] tracking-wide">Legendary Achievements</h3>
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
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} backdrop-blur-xl shadow-lg ${style.glow} overflow-hidden group`}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  {/* Rarity badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full bg-black/30 text-xs font-medium ${style.text}`}>
                    {achievement.rarity}
                  </div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center`}>
                      <Star className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-base text-[#3A3229] font-medium">{achievement.title}</h4>
                    </div>
                  </div>
                  
                  <p className="text-[#3A3229]/60 text-sm pl-[52px]">{achievement.description}</p>
                  
                  {/* Subtle shine on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Relationship Milestones */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-10">
            <Check className="w-5 h-5 text-[#E85D04]" />
            <h3 className="text-lg text-[#8C7A6B] tracking-wide">Our Milestones</h3>
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
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    isUnlocked 
                      ? 'bg-white/[0.03] border-[#E85D04]/20 hover:border-[#E85D04]/40' 
                      : 'bg-white/[0.01] border-white/[0.05] opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-[#E85D04]/20 to-[#D4622C]/20' 
                        : 'bg-white/[0.03]'
                    }`}>
                      {isUnlocked 
                        ? <Check className="w-5 h-5 text-[#E85D04]" />
                        : <Lock className="w-4 h-4 text-[#8C7A6B]" />
                      }
                    </div>
                    <span className={`font-medium ${isUnlocked ? 'text-[#3A3229]' : 'text-[#8C7A6B]'}`}>
                      {milestone.title}
                    </span>
                  </div>
                  <span className={`text-sm ${isUnlocked ? 'text-[#E85D04]' : 'text-[#8C7A6B]'}`}>
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
