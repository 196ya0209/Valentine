// components/auth/PasswordGate.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { passwordGateConfig } from '@/config/passwordGate'
import { siteConfig } from '@/config/siteConfig'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'
import { Heart, Lock, Sparkles } from 'lucide-react'

export default function PasswordGate() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === siteConfig.password) {
      setIsSuccess(true)
      setAuthenticated(true)
      
      // Warm orange confetti celebration
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#E85D04', '#D4622C', '#FF9B85', '#FFD6BA', '#FFF8F0'],
        shapes: ['circle'],
        gravity: 0.7,
        scalar: 1.3
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
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 50%, #FFE5D9 100%)' }}
      >
        <motion.div 
          className="w-16 h-16 rounded-full"
          style={{ background: 'linear-gradient(135deg, #E85D04, #FF9B85)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 40%, #FFE5D9 70%, #FFF8F0 100%)' }}
    >
      {/* Decorative organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circle - top right */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.15) 0%, rgba(255,155,133,0.1) 50%, transparent 70%)',
            top: '-15%',
            right: '-10%',
          }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom left organic blob */}
        <motion.div 
          className="absolute w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,214,186,0.6) 0%, rgba(232,93,4,0.1) 60%, transparent 80%)',
            bottom: '-10%',
            left: '-5%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Sun rays effect */}
        <div 
          className="absolute w-[300px] h-[300px] top-[10%] left-[5%]"
          style={{
            background: 'radial-gradient(circle, rgba(232,93,4,0.1) 0%, transparent 60%)',
          }}
        />
        
        {/* Floating hearts with orange color */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.9, 1.1, 0.9],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          >
            <Heart 
              className="text-[#E85D04]" 
              size={18 + (i % 3) * 6}
              fill="rgba(232, 93, 4, 0.3)"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 w-full max-w-md px-8",
          isShaking && "animate-shake"
        )}
      >
        {/* Logo/Icon - Orange heart lock */}
        <motion.div
          className="mb-12 flex justify-center"
          animate={isSuccess ? { scale: [1, 1.2, 1] } : {}}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                boxShadow: '0 8px 32px rgba(232, 93, 4, 0.35)'
              }}
              animate={isSuccess ? {} : { 
                boxShadow: [
                  '0 8px 32px rgba(232, 93, 4, 0.35)', 
                  '0 12px 48px rgba(232, 93, 4, 0.5)', 
                  '0 8px 32px rgba(232, 93, 4, 0.35)'
                ] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {isSuccess ? (
                <Heart className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Lock className="w-8 h-8 text-white" />
              )}
            </motion.div>
            
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid rgba(232, 93, 4, 0.4)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Greeting - Playfair Display */}
        <motion.div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04',
              letterSpacing: '-1px'
            }}
          >
            {passwordGateConfig.greeting}
          </motion.h1>
          
          <motion.p 
            className="text-base tracking-wide"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#8C7A6B' 
            }}
          >
            {passwordGateConfig.subtitle}
          </motion.p>
        </motion.div>

        {/* Password Form - Cream card */}
        <motion.div
          className="p-8 rounded-3xl"
          style={{
            background: 'rgba(255, 251, 245, 0.9)',
            border: '2px solid rgba(255, 214, 186, 0.6)',
            boxShadow: '0 12px 40px rgba(232, 93, 4, 0.12)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="relative"
              animate={{ scale: isFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter secret code"
                className={cn(
                  "w-full px-6 py-4 rounded-2xl text-center text-lg tracking-[0.3em] placeholder:tracking-normal focus:outline-none transition-all duration-300",
                  error 
                    ? "border-2 border-red-400" 
                    : isFocused 
                      ? "border-2 border-[#E85D04] shadow-[0_0_0_4px_rgba(232,93,4,0.15)]" 
                      : "border-2 border-[#FFD6BA]"
                )}
                style={{
                  background: '#FFFBF5',
                  color: '#3A3229',
                  fontFamily: "'Outfit', sans-serif"
                }}
              />
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-center font-medium"
                  style={{ 
                    color: '#E85D04',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button - Pill shaped */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(232, 93, 4, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-full text-base font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E85D04 0%, #FF9B85 100%)',
                color: '#FFF8F0',
                boxShadow: '0 4px 16px rgba(232, 93, 4, 0.3)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              <span className="flex items-center justify-center gap-3">
                <Heart className="w-5 h-5" fill="currentColor" />
                {passwordGateConfig.buttonText}
              </span>
            </motion.button>
          </form>
        </motion.div>
        
        {/* Made with love tagline - Script font */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-lg mt-10 flex items-center justify-center gap-2"
          style={{ 
            fontFamily: "'Pacifico', cursive",
            color: '#D4622C'
          }}
        >
          <Sparkles className="w-4 h-4" />
          Made with love, for you
          <Sparkles className="w-4 h-4" />
        </motion.p>
      </motion.div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}
