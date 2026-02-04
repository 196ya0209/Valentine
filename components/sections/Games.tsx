// components/sections/Games.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gamesConfig } from '@/config/games'
import confetti from 'canvas-confetti'

export default function Games() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFunFact, setShowFunFact] = useState(false)

  const questions = gamesConfig.loveQuiz.questions

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(prev => prev + 1)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E63946', '#FFB4C2', '#FF69B4']
      })
    }
    
    setShowFunFact(true)
    
    setTimeout(() => {
      setShowFunFact(false)
      setSelectedAnswer(null)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowResult(true)
      }
    }, 2500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setShowFunFact(false)
  }

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#FFE5D9] via-[#FFD6BA] to-[#FFF8F0] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-7xl text-[#FFB4C2] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {gamesConfig.loveQuiz.title}
          </h2>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#FFB4C2]/20"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#FFB4C2] text-sm">
                    Question {currentQuestion + 1}/{questions.length}
                  </span>
                  <span className="text-[#3A3229]/60 text-sm">
                    Score: {score}
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl text-[#3A3229] mb-8 text-center">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl text-[#3A3229] font-medium transition-all duration-300 ${
                        selectedAnswer === null
                          ? 'bg-gradient-to-r from-[#E63946]/50 to-[#FF69B4]/50 hover:from-[#E63946] hover:to-[#FF69B4]'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? 'bg-green-500'
                            : 'bg-red-500'
                          : index === questions[currentQuestion].correct
                          ? 'bg-green-500'
                          : 'bg-white/10'
                      }`}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Fun Fact */}
                <AnimatePresence>
                  {showFunFact && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 p-4 rounded-xl bg-[#FFB4C2]/20 text-center"
                    >
                      <p className="text-[#FFB4C2]">
                        {questions[currentQuestion].funFact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <span className="text-6xl mb-6 block">
                  {score === questions.length ? '🎉' : score >= questions.length / 2 ? '💕' : '🥰'}
                </span>
                <h3 className="text-3xl text-[#3A3229] mb-4">
                  {score === questions.length 
                    ? "Perfect Score, Mookie!" 
                    : score >= questions.length / 2 
                    ? "Great job, my love!" 
                    : "You're still my favorite!"}
                </h3>
                <p className="text-[#FFB4C2] text-xl mb-8">
                  You got {score} out of {questions.length} correct!
                </p>
                <motion.button
                  onClick={resetQuiz}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E63946] to-[#FF69B4] text-[#3A3229] font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
