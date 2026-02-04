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
        colors: ['#E85D04', '#FF9B85', '#FFD6BA']
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
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE5D9 0%, #FFD6BA 30%, #FFE5D9 60%, #FFF8F0 100%)'
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p 
            className="text-sm tracking-[0.3em] uppercase mb-4 font-semibold"
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              color: '#D4622C'
            }}
          >
            Let&apos;s Play
          </motion.p>
          
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#E85D04'
            }}
          >
            {gamesConfig.loveQuiz.title}
          </h2>
          
          {/* Wavy divider */}
          <svg className="w-32 h-4 mx-auto mt-6" viewBox="0 0 120 12">
            <path 
              d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" 
              fill="none" 
              stroke="#E85D04" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl p-6 md:p-8"
          style={{
            background: 'rgba(255, 251, 245, 0.95)',
            border: '2px solid rgba(255, 214, 186, 0.6)',
            boxShadow: '0 12px 36px rgba(232, 93, 4, 0.12)'
          }}
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
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: '#E85D04' }}
                  >
                    Question {currentQuestion + 1}/{questions.length}
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: '#8C7A6B' }}
                  >
                    Score: {score}
                  </span>
                </div>

                {/* Question */}
                <h3 
                  className="text-xl md:text-2xl mb-8 text-center font-medium"
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    color: '#3A3229'
                  }}
                >
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className="p-4 rounded-xl font-medium transition-all duration-300"
                      style={{
                        background: selectedAnswer === null
                          ? 'linear-gradient(135deg, rgba(232,93,4,0.15), rgba(255,155,133,0.15))'
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? '#22c55e'
                            : '#ef4444'
                          : index === questions[currentQuestion].correct
                          ? '#22c55e'
                          : 'rgba(255, 214, 186, 0.3)',
                        border: '2px solid rgba(232, 93, 4, 0.2)',
                        color: selectedAnswer !== null && (selectedAnswer === index || index === questions[currentQuestion].correct)
                          ? '#FFFBF5'
                          : '#3A3229'
                      }}
                      whileHover={selectedAnswer === null ? { scale: 1.02, boxShadow: '0 8px 24px rgba(232, 93, 4, 0.15)' } : {}}
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
                      className="mt-6 p-4 rounded-xl text-center"
                      style={{
                        background: 'rgba(232, 93, 4, 0.1)',
                        border: '1px solid rgba(232, 93, 4, 0.2)'
                      }}
                    >
                      <p style={{ color: '#D4622C' }}>
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
                <h3 
                  className="text-3xl mb-4 font-bold"
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    color: '#E85D04'
                  }}
                >
                  {score === questions.length 
                    ? "Perfect Score, Mookie!" 
                    : score >= questions.length / 2 
                    ? "Great job, my love!" 
                    : "You're still my favorite!"}
                </h3>
                <p 
                  className="text-xl mb-8"
                  style={{ color: '#8C7A6B' }}
                >
                  You got {score} out of {questions.length} correct!
                </p>
                <motion.button
                  onClick={resetQuiz}
                  className="px-8 py-4 rounded-full font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #E85D04, #FF9B85)',
                    color: '#FFFBF5',
                    boxShadow: '0 4px 16px rgba(232, 93, 4, 0.3)'
                  }}
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
