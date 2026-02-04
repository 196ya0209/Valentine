// stores/audioStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AudioState {
  isMuted: boolean
  volume: number
  isPlaying: boolean
  toggleMute: () => void
  setVolume: (value: number) => void
  setPlaying: (value: boolean) => void
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isMuted: false,
      volume: 0.5,
      isPlaying: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (value: number) => set({ volume: value }),
      setPlaying: (value: boolean) => set({ isPlaying: value })
    }),
    {
      name: 'valentine-audio'
    }
  )
)
