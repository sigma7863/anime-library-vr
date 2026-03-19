'use client'

import { useRef } from 'react'
import { Group } from 'three'

interface TableProps {
  position: [number, number, number]
  size?: [number, number, number]
}

export default function Table({ position, size = [3, 0.08, 1.2] }: TableProps) {
  const tableRef = useRef<Group>(null)
  const [width, height, depth] = size

  return (
    <group ref={tableRef} position={position}>
      {/* Tabletop */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#C79B63" />
      </mesh>

      {/* Legs */}
      {[
        [-width / 2 + 0.12, 0.35, -depth / 2 + 0.12],
        [width / 2 - 0.12, 0.35, -depth / 2 + 0.12],
        [-width / 2 + 0.12, 0.35, depth / 2 - 0.12],
        [width / 2 - 0.12, 0.35, depth / 2 - 0.12],
      ].map((legPosition, index) => (
        <mesh key={index} position={legPosition as [number, number, number]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#8B6F47" />
        </mesh>
      ))}
    </group>
  )
}
