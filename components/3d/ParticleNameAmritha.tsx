// components/3d/ParticleNameAmritha.tsx
'use client'

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { heroConfig } from '@/config/heroConfig'

// Create heart-shaped texture (only in browser)
function createHeartTexture(): THREE.Texture | null {
  if (typeof window === 'undefined') return null
  
  const canvas = document.createElement('canvas')
  const size = 64
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return null
  
  // Clear canvas
  ctx.clearRect(0, 0, size, size)
  
  // Draw heart shape
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  
  const x = size / 2
  const y = size / 2
  const scale = size / 32
  
  // Heart path
  ctx.moveTo(x, y + 4 * scale)
  ctx.bezierCurveTo(x, y + 3 * scale, x - 5 * scale, y - 3 * scale, x - 10 * scale, y - 3 * scale)
  ctx.bezierCurveTo(x - 16 * scale, y - 3 * scale, x - 16 * scale, y + 5 * scale, x - 16 * scale, y + 5 * scale)
  ctx.bezierCurveTo(x - 16 * scale, y + 10 * scale, x - 10 * scale, y + 16 * scale, x, y + 20 * scale)
  ctx.bezierCurveTo(x + 10 * scale, y + 16 * scale, x + 16 * scale, y + 10 * scale, x + 16 * scale, y + 5 * scale)
  ctx.bezierCurveTo(x + 16 * scale, y + 5 * scale, x + 16 * scale, y - 3 * scale, x + 10 * scale, y - 3 * scale)
  ctx.bezierCurveTo(x + 5 * scale, y - 3 * scale, x, y + 3 * scale, x, y + 4 * scale)
  
  ctx.closePath()
  ctx.fill()
  
  // Add glow effect
  ctx.shadowColor = '#ffffff'
  ctx.shadowBlur = 8
  ctx.fill()
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function ParticleNameAmritha() {
  const particlesRef = useRef<THREE.Points>(null)
  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null)
  const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heartTexture, setHeartTexture] = useState<THREE.Texture | null>(null)
  
  const particleCount = heroConfig.particles.count
  const petNames = heroConfig.petNamesForAnimation || [heroConfig.name]
  const currentName = petNames[currentNameIndex]

  // Create heart texture in useEffect (client-side only)
  useEffect(() => {
    const texture = createHeartTexture()
    if (texture) {
      setHeartTexture(texture)
    }
  }, [])

  // Generate initial random positions with heart particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color1 = new THREE.Color(heroConfig.particles.color.primary)
    const color2 = new THREE.Color(heroConfig.particles.color.glow)
    const color3 = new THREE.Color(heroConfig.particles.color.core)
    const heartColor = new THREE.Color('#E85D04')
    
    for (let i = 0; i < particleCount; i++) {
      // Random starting positions
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      // Color variation - more orange/burnt orange for hearts
      const t = Math.random()
      let color: THREE.Color
      if (t < 0.4) {
        color = heartColor // 40% burnt orange hearts
      } else if (t < 0.6) {
        color = color1 // 20% primary pink
      } else if (t < 0.8) {
        color = color2 // 20% glow pink
      } else {
        color = color3 // 20% core white
      }
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

  // Generate target positions based on text
  const generateTextPositions = useCallback((name: string) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    canvas.width = 1024
    canvas.height = 256
    
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#FFFFFF'
    // Adjust font size based on name length
    const fontSize = name.length > 10 ? 80 : name.length > 7 ? 100 : 140
    ctx.font = `bold ${fontSize}px Georgia, serif`
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
    
    return targets
  }, [particleCount])

  // Update target positions when name changes
  useEffect(() => {
    const targets = generateTextPositions(currentName)
    if (targets) {
      setTargetPositions(targets)
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 1000)
    }
  }, [currentName, generateTextPositions])

  // Cycle through pet names with heartbeat effect - 8 seconds total (5s to form + 3s pause)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prev) => (prev + 1) % petNames.length)
    }, 8000) // 8 seconds: enough time to fully form (5s) + pause to read (3s)

    return () => clearInterval(interval)
  }, [petNames.length])

  useFrame((state) => {
    if (!particlesRef.current || !targetPositions) return
    
    const time = state.clock.getElapsedTime()
    const geo = particlesRef.current.geometry
    const positionAttr = geo.attributes.position as THREE.BufferAttribute
    const positionArray = positionAttr.array as Float32Array
    
    // Heartbeat scale effect
    const heartbeatScale = 1 + Math.sin(time * 4) * 0.03
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Slower lerp speed for gradual text formation
      const lerpSpeed = isTransitioning ? 0.015 : 0.01
      
      // Lerp towards target with heartbeat effect
      positionArray[i] += (targetPositions[i] * heartbeatScale - positionArray[i]) * lerpSpeed
      positionArray[i + 1] += (targetPositions[i + 1] * heartbeatScale - positionArray[i + 1]) * lerpSpeed
      positionArray[i + 2] += (targetPositions[i + 2] - positionArray[i + 2]) * lerpSpeed
      
      // Add floating animation
      if (heroConfig.particles.float.enabled) {
        positionArray[i + 1] += Math.sin(time * heroConfig.particles.float.speed + i * 0.01) * 0.001
        positionArray[i] += Math.cos(time * heroConfig.particles.float.speed * 0.5 + i * 0.01) * 0.0005
      }
    }
    
    positionAttr.needsUpdate = true
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        map={heartTexture}
        alphaMap={heartTexture}
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  )
}
