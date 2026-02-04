// components/3d/FloatingModels.tsx
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export type ModelType = 'heart' | 'sparkle' | 'dot' | 'pomegranate' | 'egg' | 'lipstick' | 'blender' | 'earbuds'

interface FloatingModel {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: ModelType
}

// SVG components for special items
const PomegranateIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pomegranate body */}
    <ellipse cx="32" cy="36" rx="22" ry="24" fill="url(#pomGrad)" />
    {/* Crown/calyx */}
    <path d="M26 14 L32 6 L38 14 L36 16 L32 12 L28 16 Z" fill="#8B4513" />
    <path d="M29 15 L32 10 L35 15" stroke="#654321" strokeWidth="1.5" fill="none" />
    {/* Highlight */}
    <ellipse cx="24" cy="30" rx="6" ry="8" fill="rgba(255,255,255,0.2)" />
    {/* Seeds visible through */}
    <circle cx="28" cy="38" r="3" fill="#8B0000" opacity="0.6" />
    <circle cx="36" cy="40" r="2.5" fill="#8B0000" opacity="0.5" />
    <circle cx="32" cy="44" r="2" fill="#8B0000" opacity="0.4" />
    <defs>
      <radialGradient id="pomGrad" cx="0.3" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="50%" stopColor="#DC143C" />
        <stop offset="100%" stopColor="#8B0000" />
      </radialGradient>
    </defs>
  </svg>
)

const EggIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Egg shape */}
    <ellipse cx="32" cy="36" rx="18" ry="24" fill="url(#eggGrad)" />
    {/* Highlight */}
    <ellipse cx="26" cy="28" rx="5" ry="7" fill="rgba(255,255,255,0.4)" />
    <ellipse cx="24" cy="32" rx="3" ry="4" fill="rgba(255,255,255,0.2)" />
    <defs>
      <radialGradient id="eggGrad" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#FFFEF5" />
        <stop offset="40%" stopColor="#FFF8E7" />
        <stop offset="100%" stopColor="#F5DEB3" />
      </radialGradient>
    </defs>
  </svg>
)

const LipstickIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lipstick tip */}
    <path d="M26 8 L32 2 L38 8 L38 20 L26 20 Z" fill="url(#lipGrad)" />
    {/* Gold band */}
    <rect x="25" y="20" width="14" height="4" fill="#FFD700" />
    <rect x="25" y="22" width="14" height="1" fill="#FFA500" opacity="0.5" />
    {/* Body */}
    <rect x="24" y="24" width="16" height="36" rx="2" fill="url(#lipBodyGrad)" />
    {/* Highlight on tip */}
    <path d="M28 6 L30 4 L30 10 L28 12 Z" fill="rgba(255,255,255,0.4)" />
    {/* Body highlight */}
    <rect x="26" y="26" width="3" height="32" rx="1" fill="rgba(255,255,255,0.15)" />
    <defs>
      <linearGradient id="lipGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF6B8A" />
        <stop offset="50%" stopColor="#E85D75" />
        <stop offset="100%" stopColor="#C41E3A" />
      </linearGradient>
      <linearGradient id="lipBodyGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2D2D2D" />
        <stop offset="50%" stopColor="#1A1A1A" />
        <stop offset="100%" stopColor="#0D0D0D" />
      </linearGradient>
    </defs>
  </svg>
)

const BlenderIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blender jar */}
    <path d="M18 16 L20 52 L44 52 L46 16 Z" fill="url(#blenderJarGrad)" stroke="#DDD" strokeWidth="1" />
    {/* Liquid inside */}
    <path d="M20 26 L21 50 L43 50 L44 26 Z" fill="url(#smoothieGrad)" />
    {/* Handle */}
    <path d="M46 24 L54 22 L54 36 L46 34" fill="#4A4A4A" stroke="#333" strokeWidth="1" />
    {/* Lid */}
    <rect x="16" y="10" width="32" height="6" rx="2" fill="#333" />
    <rect x="28" y="6" width="8" height="6" rx="1" fill="#222" />
    {/* Base */}
    <rect x="16" y="52" width="32" height="10" rx="3" fill="url(#baseGrad)" />
    {/* Button */}
    <circle cx="32" cy="57" r="3" fill="#E85D04" />
    {/* Jar highlight */}
    <path d="M22 18 L23 48 L26 48 L25 18 Z" fill="rgba(255,255,255,0.2)" />
    <defs>
      <linearGradient id="blenderJarGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
      </linearGradient>
      <linearGradient id="smoothieGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB347" />
        <stop offset="50%" stopColor="#FF8C42" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
      <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A4A4A" />
        <stop offset="100%" stopColor="#2D2D2D" />
      </linearGradient>
    </defs>
  </svg>
)

const EarbudsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left earbud */}
    <ellipse cx="18" cy="22" rx="10" ry="12" fill="url(#earbudGrad)" />
    <ellipse cx="16" cy="20" rx="3" ry="4" fill="rgba(255,255,255,0.3)" />
    {/* Left stem */}
    <rect x="15" y="34" width="6" height="14" rx="3" fill="url(#earbudGrad)" />
    
    {/* Right earbud */}
    <ellipse cx="46" cy="22" rx="10" ry="12" fill="url(#earbudGrad)" />
    <ellipse cx="44" cy="20" rx="3" ry="4" fill="rgba(255,255,255,0.3)" />
    {/* Right stem */}
    <rect x="43" y="34" width="6" height="14" rx="3" fill="url(#earbudGrad)" />
    
    {/* Connecting line (case hint) */}
    <path d="M21 48 Q32 54 43 48" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
    
    <defs>
      <linearGradient id="earbudGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F5F5F5" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
    </defs>
  </svg>
)

export default function FloatingModels() {
  const models = useMemo(() => {
    const floatingModels: FloatingModel[] = []
    const specialTypes: ModelType[] = ['pomegranate', 'egg', 'lipstick', 'blender', 'earbuds']
    
    // Add special items - more of them and distributed throughout the page
    for (let i = 0; i < 30; i++) {
      const typeIndex = i % 8
      let type: ModelType
      
      if (typeIndex < 5) {
        type = specialTypes[typeIndex]
      } else if (typeIndex === 5) {
        type = 'heart'
      } else if (typeIndex === 6) {
        type = 'sparkle'
      } else {
        type = 'dot'
      }
      
      floatingModels.push({
        id: i,
        x: 3 + Math.random() * 94,
        y: Math.random() * 100,
        size: type === 'dot' ? 8 + Math.random() * 8 : 28 + Math.random() * 20,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 10,
        type,
      })
    }
    return floatingModels
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {models.map((model) => (
        <motion.div
          key={model.id}
          className="absolute"
          style={{
            left: `${model.x}%`,
            top: `${model.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(model.id) * 20, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: model.type === 'heart' ? [-10, 10, -10] : [-5, 5, -5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: model.duration,
            delay: model.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {model.type === 'pomegranate' ? (
            <PomegranateIcon size={model.size} />
          ) : model.type === 'egg' ? (
            <EggIcon size={model.size} />
          ) : model.type === 'lipstick' ? (
            <LipstickIcon size={model.size} />
          ) : model.type === 'blender' ? (
            <BlenderIcon size={model.size} />
          ) : model.type === 'earbuds' ? (
            <EarbudsIcon size={model.size} />
          ) : model.type === 'heart' ? (
            <Heart 
              size={model.size} 
              className="text-[#E85D04]" 
              strokeWidth={1.5}
              fill="rgba(232, 93, 4, 0.25)"
            />
          ) : model.type === 'sparkle' ? (
            <Sparkles
              size={model.size * 0.8}
              className="text-[#D4622C]"
              strokeWidth={1.5}
            />
          ) : (
            <div 
              className="rounded-full"
              style={{ 
                width: model.size / 2.5, 
                height: model.size / 2.5,
                background: 'radial-gradient(circle, rgba(232,93,4,0.5) 0%, rgba(255,155,133,0.3) 100%)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
