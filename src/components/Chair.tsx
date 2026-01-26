'use client'

import { useRef } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'

interface ChairProps {
  position: [number, number, number]
}

export default function Chair({ position }: ChairProps) {
  const chairRef = useRef<Group>(null)

  return (
    <group ref={chairRef} position={position}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.8, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.35, 0.2, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.35, 0.2, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[-0.35, 0.2, 0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.35, 0.2, 0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}
