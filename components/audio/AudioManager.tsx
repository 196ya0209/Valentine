// components/audio/AudioManager.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'
import { useAudioStore } from '@/stores/audioStore'

export default function AudioManager() {
  const { isMuted, volume, setPlaying } = useAudioStore()
  const bgMusicRef = useRef<Howl | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Try to load local audio first, if not available, use a simple generated tone
    const bgMusic = new Howl({
      src: [
        '/audio/romantic-piano.mp3',
        '/audio/background-music.mp3'
      ],
      loop: true,
      volume: volume * 0.3,
      html5: true,
      preload: true,
      onload: () => {
        setIsLoaded(true)
        bgMusicRef.current = bgMusic
        if (!isMuted) {
          bgMusic.play()
          setPlaying(true)
        }
      },
      onloaderror: () => {
        console.log('No local audio file found - Audio disabled')
        // Silently continue without audio
        setIsLoaded(false)
      },
      onplayerror: () => {
        console.log('Audio playback error - trying to unlock audio')
        // Try to unlock audio on user interaction
        bgMusic.once('unlock', () => {
          if (!isMuted) {
            bgMusic.play()
          }
        })
      }
    })

    bgMusicRef.current = bgMusic

    return () => {
      bgMusic.unload()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Howler.mute(isMuted)
    if (bgMusicRef.current && isLoaded) {
      if (isMuted) {
        bgMusicRef.current.pause()
      } else {
        bgMusicRef.current.play()
      }
    }
  }, [isMuted, isLoaded])

  useEffect(() => {
    Howler.volume(volume)
    if (bgMusicRef.current) {
      bgMusicRef.current.volume(volume * 0.3)
    }
  }, [volume])

  return null
}
