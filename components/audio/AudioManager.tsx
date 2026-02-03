// components/audio/AudioManager.tsx
'use client'

import { useEffect } from 'react'
import { Howl } from 'howler'
import { useAudioStore } from '@/stores/audioStore'

export default function AudioManager() {
  const { isMuted, volume, setPlaying } = useAudioStore()

  useEffect(() => {
    // Background music (only create if audio file exists)
    const bgMusic = new Howl({
      src: ['/audio/romantic-piano.mp3'],
      loop: true,
      volume: volume * 0.3,
      html5: true,
      onload: () => {
        if (!isMuted) {
          bgMusic.play()
          setPlaying(true)
        }
      },
      onloaderror: () => {
        console.log('Background music not found - continuing without audio')
      }
    })

    return () => {
      bgMusic.unload()
    }
  }, [])

  useEffect(() => {
    Howler.mute(isMuted)
  }, [isMuted])

  useEffect(() => {
    Howler.volume(volume)
  }, [volume])

  return null
}
