'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores/authStore'
import LoadingScreen from '@/components/loading/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import AudioControls from '@/components/audio/AudioControls'
import HeartCloudTransition from '@/components/transitions/HeartCloudTransition'
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
import VirtualGarden from '@/components/sections/VirtualGarden'
import FinalMessage from '@/components/sections/FinalMessage'

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
    <main className="relative bg-[#1A0A0A] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {showContent && (
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
          <VirtualGarden />
          <FinalMessage />
          <AudioControls />
        </SmoothScroll>
      )}

      <HeartCloudTransition isActive={false} />
    </main>
  )
}
