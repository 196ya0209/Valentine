// components/3d/FloatingHearts.tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Heart {
  position: THREE.Vector3
  velocity: THREE.Vector3
  scale: number
  rotationSpeed: number
}

export default function FloatingHearts() {
  const groupRef = useRef<THREE.Group>(null)
  
  const hearts = useMemo(() => {
    const heartArray: Heart[] = []
    for (let i = 0; i < 30; i++) {
      heartArray.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          Math.random() * 0.02 + 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        scale: Math.random() * 0.3 + 0.1,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      })
    }
    return heartArray
  }, [])

  // Create heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    shape.moveTo(x + 0.25, y + 0.25)
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y)
    shape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35)
    shape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.2, y + 0.77, x + 0.25, y + 0.95)
    shape.bezierCurveTo(x + 0.7, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35)
    shape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y)
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25)
    return shape
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((child, i) => {
      const heart = hearts[i]
      if (!heart) return
      
      // Update position
      heart.position.add(heart.velocity)
      
      // Wrap around
      if (heart.position.y > 10) heart.position.y = -10
      if (heart.position.x > 15) heart.position.x = -15
      if (heart.position.x < -15) heart.position.x = 15
      
      child.position.copy(heart.position)
      child.rotation.y += heart.rotationSpeed
      child.rotation.z = Math.sin(time + i) * 0.1
    })
  })

  // Orange theme colors
  const colors = ['#FF6B35', '#FFD700', '#FFAB91']

  return (
    <group ref={groupRef}>
      {hearts.map((heart, i) => (
        <mesh
          key={i}
          position={heart.position}
          scale={heart.scale}
          rotation={[Math.PI, 0, 0]}
        >
          <shapeGeometry args={[heartShape]} />
          <meshBasicMaterial
            color={colors[i % 3]}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
