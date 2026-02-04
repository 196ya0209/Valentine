// components/3d/Globe3D.tsx
'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { dreamDestinations } from '@/config/destinations'

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  
  return new THREE.Vector3(x, y, z)
}

// Approximate coordinates for destinations
const destinationCoords: { [key: string]: { lat: number; lng: number } } = {
  'Paris, France': { lat: 48.8566, lng: 2.3522 },
  'Santorini, Greece': { lat: 36.3932, lng: 25.4615 },
  'Maldives': { lat: 3.2028, lng: 73.2207 },
  'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
  'Northern Lights, Iceland': { lat: 64.9631, lng: -19.0208 },
}

interface LocationPinProps {
  position: THREE.Vector3
  place: typeof dreamDestinations.places[0]
  isSelected: boolean
  onClick: () => void
}

function LocationPin({ position, place, isSelected, onClick }: LocationPinProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isSelected ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2 : hovered ? 1.3 : 1)
    }
  })
  
  return (
    <group position={position}>
      {/* Pin */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={isSelected ? '#E85D04' : hovered ? '#FF9B85' : '#FFD6BA'}
          emissive={isSelected ? '#E85D04' : '#FF9B85'}
          emissiveIntensity={isSelected ? 0.8 : 0.3}
        />
      </mesh>
      
      {/* Glow ring */}
      {(isSelected || hovered) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.15, 32]} />
          <meshBasicMaterial color="#E85D04" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
      
      {/* Label */}
      {(isSelected || hovered) && (
        <Html
          position={[0, 0.2, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className="px-3 py-2 rounded-lg whitespace-nowrap transform -translate-y-2"
            style={{
              background: 'rgba(44, 24, 16, 0.95)',
              border: '2px solid rgba(232, 93, 4, 0.6)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <p className="text-sm font-semibold text-center" style={{ color: '#FFD6BA' }}>
              {place.emoji} {place.place}
            </p>
            {isSelected && (
              <p className="text-xs text-center mt-1" style={{ color: '#FF9B85' }}>
                {place.reason}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

interface GlobeProps {
  selectedPlace: number | null
  onSelectPlace: (index: number) => void
  autoRotate: boolean
}

function Globe({ selectedPlace, onSelectPlace, autoRotate }: GlobeProps) {
  const globeRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (globeRef.current && autoRotate) {
      globeRef.current.rotation.y += 0.002
    }
  })
  
  // Get pin positions
  const pinPositions = useMemo(() => {
    return dreamDestinations.places.map(place => {
      const coords = destinationCoords[place.place] || { lat: 0, lng: 0 }
      return latLngToVector3(coords.lat, coords.lng, 2.05)
    })
  }, [])
  
  // Pre-calculate grid line radii to avoid NaN
  const gridLineData = useMemo(() => {
    return [...Array(5)].map((_, i) => {
      const y = -1.2 + i * 0.6 // y values: -1.2, -0.6, 0, 0.6, 1.2
      const radiusSquared = 4 - y * y
      return {
        y,
        radius: radiusSquared > 0 ? Math.sqrt(radiusSquared) : 0,
        visible: radiusSquared > 0
      }
    })
  }, [])
  
  return (
    <group ref={globeRef}>
      {/* Ocean sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1E4D7B"
          emissive="#0A2540"
          emissiveIntensity={0.2}
          shininess={50}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#4A90D9"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Simplified landmasses using spherical segments */}
      {/* North America */}
      <mesh position={latLngToVector3(40, -100, 2)} scale={[0.6, 0.5, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* South America */}
      <mesh position={latLngToVector3(-15, -60, 2)} scale={[0.35, 0.6, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Europe */}
      <mesh position={latLngToVector3(50, 10, 2)} scale={[0.4, 0.3, 0.1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Africa */}
      <mesh position={latLngToVector3(5, 20, 2)} scale={[0.45, 0.55, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Asia */}
      <mesh position={latLngToVector3(45, 100, 2)} scale={[0.8, 0.5, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Australia */}
      <mesh position={latLngToVector3(-25, 135, 2)} scale={[0.35, 0.25, 0.1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshPhongMaterial color="#228B22" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Location pins */}
      {dreamDestinations.places.map((place, index) => (
        <LocationPin
          key={index}
          position={pinPositions[index]}
          place={place}
          isSelected={selectedPlace === index}
          onClick={() => onSelectPlace(index)}
        />
      ))}
      
      {/* Grid lines - latitude circles */}
      {gridLineData.filter(g => g.visible).map((grid, i) => (
        <mesh key={`lat-${i}`} rotation={[0, 0, 0]} position={[0, grid.y, 0]}>
          <torusGeometry args={[grid.radius, 0.005, 8, 64]} />
          <meshBasicMaterial color="#4A90D9" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

interface Globe3DProps {
  selectedPlace: number | null
  onSelectPlace: (index: number) => void
  autoRotate?: boolean
}

export default function Globe3D({ selectedPlace, onSelectPlace, autoRotate = true }: Globe3DProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1} color="#FFF5E6" />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4A90D9" />
        <pointLight position={[0, 0, 8]} intensity={0.5} color="#FFD6BA" />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        
        {/* Globe */}
        <Globe 
          selectedPlace={selectedPlace} 
          onSelectPlace={onSelectPlace}
          autoRotate={autoRotate}
        />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
