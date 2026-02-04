// components/sections/StoryTimeline.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ourLoveStory } from '@/config/storyData'
import { ChevronDown, Sparkles } from 'lucide-react'

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
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`relative rounded-3xl backdrop-blur-xl cursor-pointer overflow-hidden transition-all duration-500 ${
          chapter.isSpecial || chapter.isFinal
            ? 'bg-gradient-to-br from-[#FB923C]/10 to-[#F59E0B]/5 border border-[#FB923C]/20'
            : 'bg-white/[0.02] border border-white/[0.06] hover:border-[#FB923C]/20'
        }`}
        whileHover={{ 
          y: -4,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FB923C]/5 to-transparent opacity-0 transition-opacity duration-500"
          whileHover={{ opacity: 1 }}
        />
        
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EA580C]/20 to-[#F59E0B]/10 flex items-center justify-center text-2xl flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {chapter.emoji}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl text-white font-medium mb-1 line-clamp-1">
                {chapter.title}
              </h3>
              <p className="text-[#A8A29E] text-sm">
                For my <span className="text-[#FB923C] font-medium">{chapter.petName}</span>
              </p>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-[#78716C]" />
            </motion.div>
          </div>
          
          {/* Preview text */}
          {!isExpanded && (
            <p className="text-[#78716C] text-sm line-clamp-2 pl-16">
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
                  <p className="text-[#E7E5E4] leading-relaxed text-base">
                    {chapter.content}
                  </p>
                  
                  {/* Highlight */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FB923C]/10 border border-[#FB923C]/20"
                  >
                    <Sparkles className="w-4 h-4 text-[#FB923C]" />
                    <span className="text-[#FBBF24] text-sm font-medium">
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
                          className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#FB923C]/20 transition-all duration-300"
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <span className="text-xl mb-1">{ritual.emoji}</span>
                          <span className="text-xs text-[#A8A29E] text-center">{ritual.item}</span>
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
                          className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#FB923C]/20 transition-all duration-300"
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <span className="text-xl mb-1">{gift.emoji}</span>
                          <span className="text-xs text-[#A8A29E] text-center">{gift.item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Special indicator line */}
        {(chapter.isSpecial || chapter.isFinal) && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FB923C]/50 to-transparent" />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function StoryTimeline() {
  return (
    <section className="relative py-32 md:py-40 bg-[#0C0A09] overflow-hidden">
      {/* Background */}
      <div className="aurora-bg opacity-30" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.p className="text-[#78716C] text-sm tracking-[0.3em] uppercase mb-4">
            Our Journey
          </motion.p>
          
          <motion.h2
            className="text-5xl md:text-7xl mb-6"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {ourLoveStory.title}
          </motion.h2>
          
          <p className="text-[#A8A29E] text-lg max-w-md mx-auto">
            {ourLoveStory.subtitle}
          </p>
          
          <div className="section-divider w-24 mx-auto mt-8" />
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
