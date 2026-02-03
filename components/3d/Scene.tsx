// components/3d/Scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Preload } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleNameAmritha from './ParticleNameAmritha'
import FloatingHearts from './FloatingHearts'

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FF69B4" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFB4C2" />
          
          <ParticleNameAmritha />
          <FloatingHearts />
          
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={1.5}
              radius={0.8}
            />
          </EffectComposer>
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.3}
          />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
