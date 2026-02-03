// components/3d/ParticleNameAmritha.tsx
'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { heroConfig } from '@/config/heroConfig'

export default function ParticleNameAmritha() {
  const particlesRef = useRef<THREE.Points>(null)
  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null)
  
  const particleCount = heroConfig.particles.count
  const name = heroConfig.name
  
  // Generate initial random positions
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color1 = new THREE.Color(heroConfig.particles.color.primary)
    const color2 = new THREE.Color(heroConfig.particles.color.glow)
    const color3 = new THREE.Color(heroConfig.particles.color.core)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const t = Math.random()
      const color = t < 0.33 ? color1 : t < 0.66 ? color2 : color3
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [particleCount])

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  useEffect(() => {
    // Create text shape for particles
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1024
    canvas.height = 256
    
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold 140px Georgia, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(name, canvas.width / 2, canvas.height / 2)
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const textPoints: number[] = []
    
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const index = (y * canvas.width + x) * 4
        if (imageData.data[index] > 128) {
          textPoints.push(
            (x - canvas.width / 2) * 0.018,
            -(y - canvas.height / 2) * 0.018,
            (Math.random() - 0.5) * 0.5
          )
        }
      }
    }
    
    const targets = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      if (textPoints.length > 0) {
        const randomIndex = Math.floor(Math.random() * (textPoints.length / 3)) * 3
        targets[i] = textPoints[randomIndex] || (Math.random() - 0.5) * 20
        targets[i + 1] = textPoints[randomIndex + 1] || (Math.random() - 0.5) * 10
        targets[i + 2] = textPoints[randomIndex + 2] || (Math.random() - 0.5) * 2
      }
    }
    
    setTargetPositions(targets)
  }, [particleCount, name])

  useFrame((state) => {
    if (!particlesRef.current || !targetPositions) return
    
    const time = state.clock.getElapsedTime()
    const geo = particlesRef.current.geometry
    const positionAttr = geo.attributes.position as THREE.BufferAttribute
    const positionArray = positionAttr.array as Float32Array
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Lerp towards target
      positionArray[i] += (targetPositions[i] - positionArray[i]) * 0.02
      positionArray[i + 1] += (targetPositions[i + 1] - positionArray[i + 1]) * 0.02
      positionArray[i + 2] += (targetPositions[i + 2] - positionArray[i + 2]) * 0.02
      
      // Add floating animation
      if (heroConfig.particles.float.enabled) {
        positionArray[i + 1] += Math.sin(time * heroConfig.particles.float.speed + i * 0.01) * 0.002
        positionArray[i] += Math.cos(time * heroConfig.particles.float.speed * 0.5 + i * 0.01) * 0.001
      }
    }
    
    positionAttr.needsUpdate = true
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
