// hooks/usePageTransition.ts
'use client'

import { useState, useCallback } from 'react'
import { heartCloudTransitionConfig } from '@/config/transitionConfig'

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const triggerTransition = useCallback((callback?: () => void) => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      callback?.()
      setTimeout(() => {
        setIsTransitioning(false)
      }, heartCloudTransitionConfig.duration / 2)
    }, heartCloudTransitionConfig.duration / 2)
  }, [])

  return { isTransitioning, triggerTransition }
}
