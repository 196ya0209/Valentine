// components/3d/ParticleNameAmritha.tsx
'use client'

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { heroConfig } from '@/config/heroConfig'

export default function ParticleNameAmritha() {
  const particlesRef = useRef<THREE.Points>(null)
  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null)
  const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const particleCount = heroConfig.particles.count
  const petNames = heroConfig.petNamesForAnimation || [heroConfig.name]
  const currentName = petNames[currentNameIndex]

  // Generate initial random positions with heart particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color1 = new THREE.Color(heroConfig.particles.color.primary)
    const color2 = new THREE.Color(heroConfig.particles.color.glow)
    const color3 = new THREE.Color(heroConfig.particles.color.core)
    const heartColor = new THREE.Color('#E85D04')
    
    for (let i = 0; i < particleCount; i++) {
      // Make some particles heart-colored at random positions
      if (i % 150 === 0) {
        const angle = (i / 150) * Math.PI * 2
        const hx = 16 * Math.pow(Math.sin(angle), 3) * 0.02
        const hy = (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 0.02
        positions[i * 3] = hx + (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = hy + (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5
        colors[i * 3] = heartColor.r
        colors[i * 3 + 1] = heartColor.g
        colors[i * 3 + 2] = heartColor.b
      } else {
        positions[i * 3] = (Math.random() - 0.5) * 30
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        
        const t = Math.random()
        const color = t < 0.33 ? color1 : t < 0.66 ? color2 : color3
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }
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
