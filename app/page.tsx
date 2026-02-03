'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PasswordGate from '@/components/auth/PasswordGate'
import { useAuthStore } from '@/stores/authStore'

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/experience')
    }
  }, [isAuthenticated, router])

  return <PasswordGate />
}
