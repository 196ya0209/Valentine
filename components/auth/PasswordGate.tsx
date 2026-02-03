// components/auth/PasswordGate.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Heart, Lock } from 'lucide-react'
import { passwordGateConfig } from '@/config/passwordGate'
import { siteConfig } from '@/config/siteConfig'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

interface FloatingHeart {
  id: number
  x: number
  delay: number
  duration: number
}

export default function PasswordGate() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  useEffect(() => {
    // This is intentional - we need to know when we're on client side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    // Generate hearts on client side only
    const generatedHearts: FloatingHeart[] = []
    for (let i = 0; i < 20; i++) {
      generatedHearts.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10
      })
    }
    setHearts(generatedHearts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === siteConfig.password) {
      setIsSuccess(true)
      setAuthenticated(true)
      
      // Heart burst confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E63946', '#FFB4C2', '#FF69B4', '#FFFFFF'],
        shapes: ['circle']
      })
      
      setTimeout(() => {
        router.push('/experience')
      }, 1500)
    } else {
      setIsShaking(true)
      const randomMessage = passwordGateConfig.wrongPasswordMessages[
        Math.floor(Math.random() * passwordGateConfig.wrongPasswordMessages.length)
      ]
      setError(randomMessage)
      setPassword('')
      
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A]">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#E63946] to-[#FFB4C2] flex items-center justify-center shadow-lg shadow-pink-500/30">
          <Heart className="w-10 h-10 text-white fill-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1A0A0A] via-[#2D0A0A] to-[#1A0A0A] relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl"
            style={{ left: `${heart.x}%` }}
            initial={{
              y: '100vh',
              opacity: 0.3,
            }}
            animate={{
              y: '-10vh',
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "text-center z-10 px-8",
          isShaking && "animate-shake"
        )}
      >
        {/* Lock Icon */}
        <motion.div
          className="mb-8"
          animate={{ scale: isSuccess ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#E63946] to-[#FFB4C2] flex items-center justify-center shadow-lg shadow-pink-500/30">
            {isSuccess ? (
              <Heart className="w-10 h-10 text-white fill-white" />
            ) : (
              <Lock className="w-10 h-10 text-white" />
            )}
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          className="text-5xl md:text-6xl text-[#FFB4C2] mb-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {passwordGateConfig.greeting}
        </motion.h1>
        
        <motion.p className="text-[#FFDDE1] text-lg mb-8 opacity-80">
          {passwordGateConfig.subtitle}
        </motion.p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className={cn(
                "w-64 md:w-80 px-6 py-4 rounded-full bg-white/10 border-2 text-center text-white text-xl tracking-widest placeholder:text-white/30 focus:outline-none transition-all duration-300",
                error ? "border-red-400" : "border-[#FFB4C2]/50 focus:border-[#FFB4C2]"
              )}
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#FFB4C2] text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E63946] to-[#FF69B4] text-white font-semibold text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              {passwordGateConfig.buttonText}
            </span>
          </motion.button>
        </form>
      </motion.div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
