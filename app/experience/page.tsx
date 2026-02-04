'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import LoadingScreen from '@/components/loading/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import AudioControls from '@/components/audio/AudioControls'
import AudioManager from '@/components/audio/AudioManager'
import FloatingModels from '@/components/3d/FloatingModels'
import Hero from '@/components/sections/Hero'
import StoryTimeline from '@/components/sections/StoryTimeline'
import PhotoGallery from '@/components/sections/PhotoGallery'
import PetNamesGalaxy from '@/components/sections/PetNamesGalaxy'
import ReasonsILoveYou from '@/components/sections/ReasonsILoveYou'
import LoveLetter from '@/components/sections/LoveLetter'
import Games from '@/components/sections/Games'
import OurFuture from '@/components/sections/OurFuture'
import Achievements from '@/components/sections/Achievements'
import VirtualGifts from '@/components/sections/VirtualGifts'
import Stargazing from '@/components/sections/Stargazing'
import DreamDestinations from '@/components/sections/DreamDestinations'
import OurSoundtrack from '@/components/sections/OurSoundtrack'
import FinalMessage from '@/components/sections/FinalMessage'
import SunsetEnding from '@/components/sections/SunsetEnding'

export default function ExperiencePage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main 
      className="relative min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)'
      }}
    >
      {/* Light aurora background */}
      <div className="aurora-bg" />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {showContent && (
        <>
          {/* Floating models throughout the page */}
          <FloatingModels />
          
          {/* Audio Manager */}
          <AudioManager />
          
          <SmoothScroll>
            <Hero />
            <StoryTimeline />
            <PhotoGallery />
            <PetNamesGalaxy />
            <ReasonsILoveYou />
            <LoveLetter />
            <Games />
            <OurFuture />
            <Achievements />
            <VirtualGifts />
            <Stargazing />
            <DreamDestinations />
            <OurSoundtrack />
            <FinalMessage />
            <SunsetEnding />
            <AudioControls />
          </SmoothScroll>
        </>
      )}
    </main>
  )
}
