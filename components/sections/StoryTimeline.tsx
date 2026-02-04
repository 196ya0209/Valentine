// components/sections/StoryTimeline.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ourLoveStory } from '@/config/storyData'
import { ChevronDown, Sparkles, Heart } from 'lucide-react'

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

function StoryCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.34, 1.56, 0.64, 1] // Bouncy!
      }}
    >
      <motion.div
        className={`relative rounded-[20px] cursor-pointer overflow-hidden transition-all duration-500 ${
          chapter.isSpecial || chapter.isFinal
            ? 'card-accent'
            : ''
        }`}
        style={{
          background: 'rgba(255, 251, 245, 0.95)',
          border: chapter.isSpecial || chapter.isFinal 
            ? '2px solid rgba(232, 93, 4, 0.3)' 
            : '2px solid rgba(255, 214, 186, 0.6)',
          boxShadow: '0 8px 24px rgba(232, 93, 4, 0.12)'
        }}
        whileHover={{ 
          y: -6,
          rotate: 1,
          boxShadow: '0 16px 40px rgba(232, 93, 4, 0.18)'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        {/* Orange accent bar on left for special cards */}
        {(chapter.isSpecial || chapter.isFinal) && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px]"
            style={{ background: 'linear-gradient(180deg, #E85D04, #D4622C)' }}
          />
        )}
        
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ 
                background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                boxShadow: '0 4px 12px rgba(232, 93, 4, 0.25)'
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {chapter.emoji}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h3 
                className="text-lg md:text-xl font-semibold mb-1 line-clamp-1"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#3A3229'
                }}
              >
                {chapter.title}
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  color: '#8C7A6B'
                }}
              >
                For my <span className="font-semibold" style={{ color: '#E85D04' }}>{chapter.petName}</span>
              </p>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255, 214, 186, 0.5)' }}
            >
              <ChevronDown className="w-4 h-4" style={{ color: '#D4622C' }} />
            </motion.div>
          </div>
          
          {/* Preview text */}
          {!isExpanded && (
            <p 
              className="text-sm line-clamp-2 pl-16"
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                color: '#8C7A6B'
              }}
            >
              {chapter.content.substring(0, 120)}...
            </p>
          )}
          
          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 pl-16 space-y-4">
                  <p 
                    className="leading-relaxed text-base"
                    style={{ 
                      fontFamily: "'Outfit', sans-serif",
                      color: '#3A3229',
                      lineHeight: '1.7'
                    }}
                  >
                    {chapter.content}
                  </p>
                  
                  {/* Highlight pill */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(232,93,4,0.1), rgba(255,155,133,0.1))',
                      border: '1px solid rgba(232, 93, 4, 0.2)'
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[#E85D04]" />
                    <span 
                      className="text-sm font-semibold"
                      style={{ 
                        fontFamily: "'Outfit', sans-serif",
                        color: '#D4622C'
                      }}
                    >
                      {chapter.highlight}
                    </span>
                  </motion.div>
                  
                  {/* Rituals grid */}
                  {chapter.rituals && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-3 md:grid-cols-6 gap-2 pt-4"
                    >
                      {chapter.rituals.map((ritual, i) => (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300"
                          style={{
                            background: 'rgba(255, 214, 186, 0.4)',
                            border: '1px solid rgba(232, 93, 4, 0.15)'
                          }}
                          whileHover={{ y: -2, scale: 1.03 }}
                        >
                          <span className="text-xl mb-1">{ritual.emoji}</span>
                          <span 
                            className="text-xs text-center font-medium"
                            style={{ color: '#8C7A6B' }}
                          >
                            {ritual.item}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Gifts grid */}
                  {chapter.gifts && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-3 md:grid-cols-6 gap-2 pt-4"
                    >
                      {chapter.gifts.map((gift, i) => (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center p-3 rounded-xl transition-all duration-300"
                          style={{
                            background: 'rgba(255, 214, 186, 0.4)',
                            border: '1px solid rgba(232, 93, 4, 0.15)'
                          }}
                          whileHover={{ y: -2, scale: 1.03 }}
                        >
                          <span className="text-xl mb-1">{gift.emoji}</span>
                          <span 
                            className="text-xs text-center font-medium"
                            style={{ color: '#8C7A6B' }}
                          >
                            {gift.item}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom gradient line for special cards */}
        {(chapter.isSpecial || chapter.isFinal) && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #E85D04, transparent)'
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function StoryTimeline() {
  return (
    <section 
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 30%, #FFD6BA 60%, #FFE5D9 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large organic blob */}
        <motion.div
          className="absolute w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.08) 0%, transparent 60%)',
            top: '10%',
            right: '-10%',
            borderRadius: '30% 70% 60% 40% / 60% 30% 70% 40%',
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <Heart 
              className="text-[#E85D04]" 
              size={16 + (i % 3) * 8}
              fill="rgba(232, 93, 4, 0.15)"
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.p 
            className="text-xs tracking-[0.4em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C',
              letterSpacing: '4px'
            }}
          >
            Our Journey
          </motion.p>
          
          <motion.h2
            className="text-5xl md:text-7xl mb-6 font-bold"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04',
              letterSpacing: '-2px'
            }}
          >
            {ourLoveStory.title}
          </motion.h2>
          
          <p 
            className="text-lg max-w-md mx-auto"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B'
            }}
          >
            {ourLoveStory.subtitle}
          </p>
          
          {/* Wavy divider */}
          <svg className="w-32 h-4 mx-auto mt-8" viewBox="0 0 120 12">
            <path 
              d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" 
              fill="none" 
              stroke="#E85D04" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ourLoveStory.chapters.map((chapter, index) => (
            <StoryCard key={chapter.id} chapter={chapter as Chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
