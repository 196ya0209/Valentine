// components/sections/StoryTimeline.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-16 md:mb-24`}
    >
      {/* Timeline connector */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E63946] via-[#FF69B4] to-[#FFB4C2] -translate-x-1/2" />
      
      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 top-8 w-4 h-4 -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={`w-full h-full rounded-full ${chapter.isSpecial ? 'bg-[#FFD700]' : 'bg-[#E63946]'} ring-4 ring-[#1A0A0A]`} />
      </motion.div>
      
      {/* Card */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          className={`p-6 md:p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden ${
            chapter.isSpecial
              ? 'bg-gradient-to-br from-[#E63946]/30 to-[#FF69B4]/20 border border-[#FFD700]/30'
              : chapter.isFinal
              ? 'bg-gradient-to-br from-[#FF69B4]/30 to-[#FFB4C2]/20 border border-[#FF69B4]/50'
              : 'bg-white/5 border border-white/10'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect for special cards */}
          {(chapter.isSpecial || chapter.isFinal) && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF69B4]/10 to-transparent" />
          )}
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <span className="text-3xl">{chapter.emoji}</span>
            <div>
              <h3 className="text-xl md:text-2xl text-white font-semibold">
                {chapter.title}
              </h3>
              <p className="text-[#FFB4C2] text-sm">
                For my {chapter.petName}
              </p>
            </div>
          </div>
          
          {/* Content */}
          <p className="text-white/80 leading-relaxed mb-4 relative z-10">
            {chapter.content}
          </p>
          
          {/* Highlight */}
          <motion.div
            className="inline-block px-4 py-2 rounded-full bg-[#E63946]/20 border border-[#E63946]/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[#FFB4C2] text-sm font-medium">
              ✨ {chapter.highlight}
            </span>
          </motion.div>
          
          {/* Rituals grid */}
          {chapter.rituals && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {chapter.rituals.map((ritual, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center p-3 rounded-lg bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <span className="text-2xl mb-1">{ritual.emoji}</span>
                  <span className="text-xs text-white/60 text-center">{ritual.item}</span>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Gifts grid */}
          {chapter.gifts && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {chapter.gifts.map((gift, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center p-3 rounded-lg bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <span className="text-2xl mb-1">{gift.emoji}</span>
                  <span className="text-xs text-white/60 text-center">{gift.item}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function StoryTimeline() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {ourLoveStory.title}
          </h2>
          <p className="text-white/60 text-lg">
            {ourLoveStory.subtitle}
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {ourLoveStory.chapters.map((chapter, index) => (
            <ChapterCard key={chapter.id} chapter={chapter as Chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
