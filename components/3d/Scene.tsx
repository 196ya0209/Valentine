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
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#E85D04" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#FF9B85" />
          
          <ParticleNameAmritha />
          <FloatingHearts />
          
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              intensity={1.8}
              radius={0.9}
            />
          </EffectComposer>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            minDistance={8}
            maxDistance={25}
            autoRotate
            autoRotateSpeed={0.3}
            zoomSpeed={0.5}
          />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
