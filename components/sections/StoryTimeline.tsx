// components/sections/StoryTimeline.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ourLoveStory } from '@/config/storyData'

interface Chapter {
  id: number
  title: string
  petName: string
  emoji: string
  content: string
  highlight: string
  isSpecial?: boolean
  isMemory?: boolean
  isFinal?: boolean
  rituals?: { item: string; emoji: string }[]
  gifts?: { item: string; emoji: string }[]
}

function InteractiveCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        className={`relative p-6 md:p-8 rounded-3xl backdrop-blur-md cursor-pointer overflow-hidden ${
          chapter.isSpecial
            ? 'bg-gradient-to-br from-[#FF6B35]/30 to-[#FFD700]/20 border-2 border-[#FFD700]/50'
            : chapter.isFinal
            ? 'bg-gradient-to-br from-[#FF6B35]/30 to-[#FFAB91]/20 border-2 border-[#FF6B35]/50'
            : 'bg-white/5 border border-white/20'
        }`}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: '0 20px 60px rgba(255, 107, 53, 0.3)',
          borderColor: 'rgba(255, 107, 53, 0.6)'
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(!isExpanded)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-3xl"
          animate={{
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating particles effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#FF6B35]"
                  initial={{ 
                    x: 0, y: 0, 
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 100, 
                    y: (Math.random() - 0.5) * 100,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Header with emoji and title */}
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <motion.span 
            className="text-4xl md:text-5xl"
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {chapter.emoji}
          </motion.span>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl text-white font-semibold mb-1">
              {chapter.title}
            </h3>
            <motion.p 
              className="text-[#FFAB91] text-sm flex items-center gap-2"
              animate={{ color: isHovered ? '#FFD700' : '#FFAB91' }}
            >
              <span>For my</span>
              <span className="font-semibold">{chapter.petName}</span>
              <span className="animate-heartbeat inline-block">💕</span>
            </motion.p>
          </div>
          
          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-[#FF6B35] text-xl"
          >
            ▼
          </motion.div>
        </div>
        
        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {/* Content */}
              <p className="text-white/90 leading-relaxed mb-4 relative z-10 text-base md:text-lg">
                {chapter.content}
              </p>
              
              {/* Highlight badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/30 border border-[#FF6B35]/50"
              >
                <span className="text-lg">✨</span>
                <span className="text-[#FFD700] text-sm font-medium">
                  {chapter.highlight}
                </span>
              </motion.div>
              
              {/* Rituals grid */}
              {chapter.rituals && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3"
                >
                  {chapter.rituals.map((ritual, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-[#FF6B35]/20 hover:to-[#FFD700]/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <span className="text-2xl mb-1">{ritual.emoji}</span>
                      <span className="text-xs text-white/80 text-center">{ritual.item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Gifts grid */}
              {chapter.gifts && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3"
                >
                  {chapter.gifts.map((gift, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-[#FF6B35]/20 hover:to-[#FFD700]/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <span className="text-2xl mb-1">{gift.emoji}</span>
                      <span className="text-xs text-white/80 text-center">{gift.item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Preview text when collapsed */}
        {!isExpanded && (
          <motion.p 
            className="text-white/60 text-sm line-clamp-2 relative z-10"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {chapter.content.substring(0, 100)}...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function StoryTimeline() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A00] via-[#2D1408] to-[#1A0A00] overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg opacity-50" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {i % 3 === 0 ? '🧡' : i % 3 === 1 ? '🔥' : '✨'}
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2
            className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#FFD700] to-[#FFAB91] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {ourLoveStory.title}
          </motion.h2>
          <p className="text-white/60 text-lg md:text-xl">
            {ourLoveStory.subtitle}
          </p>
          <p className="text-[#FFAB91] text-sm mt-2">
            ✨ Tap each card to explore our memories ✨
          </p>
        </motion.div>
        
        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {ourLoveStory.chapters.map((chapter, index) => (
            <InteractiveCard key={chapter.id} chapter={chapter as Chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
