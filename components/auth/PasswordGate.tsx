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
      
      // Elegant confetti
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FB923C', '#F59E0B', '#FBBF24', '#FFFFFF'],
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 1.2
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
      <div className="min-h-screen flex items-center justify-center bg-[#0C0A09]">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#F59E0B] animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0C0A09] relative overflow-hidden">
      {/* Ambient Background */}
      <div className="aurora-bg" />
      
      {/* Subtle floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ 
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `radial-gradient(circle, rgba(251, 146, 60, ${0.04 - i * 0.005}) 0%, transparent 70%)`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
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
        {/* Logo/Icon */}
        <motion.div
          className="mb-12 flex justify-center"
          animate={isSuccess ? { scale: [1, 1.2, 1] } : {}}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#F59E0B] flex items-center justify-center shadow-2xl"
              animate={isSuccess ? {} : { boxShadow: ['0 0 30px rgba(251, 146, 60, 0.2)', '0 0 50px rgba(251, 146, 60, 0.3)', '0 0 30px rgba(251, 146, 60, 0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={isSuccess ? { scale: [1, 0, 0] } : {}}
              >
                {isSuccess ? (
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" />
                ) : (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </>
                )}
              </motion.svg>
            </motion.div>
            
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{ background: 'transparent', border: '1px solid rgba(251, 146, 60, 0.3)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl font-light mb-3 text-gradient"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {passwordGateConfig.greeting}
          </motion.h1>
          
          <motion.p className="text-[#A8A29E] text-sm tracking-wide">
            {passwordGateConfig.subtitle}
          </motion.p>
        </motion.div>

        {/* Password Form */}
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
                "w-full px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border text-center text-white text-lg tracking-[0.3em] placeholder:text-[#78716C] placeholder:tracking-normal focus:outline-none transition-all duration-300",
                error 
                  ? "border-red-500/50" 
                  : isFocused 
                    ? "border-[#FB923C]/50 shadow-[0_0_30px_rgba(251,146,60,0.15)]" 
                    : "border-white/10"
              )}
            />
            
            {/* Input glow effect */}
            {isFocused && (
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                }}
              />
            )}
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#FB923C] text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(234, 88, 12, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#EA580C] to-[#F59E0B] text-white font-medium text-base shadow-lg shadow-orange-500/20 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {passwordGateConfig.buttonText}
            </span>
          </motion.button>
        </form>
        
        {/* Subtle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-[#57534E] text-xs mt-8"
        >
          Made with love, for you
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
