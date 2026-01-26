'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import Bookshelf from './Bookshelf'
import Chair from './Chair'

interface LibraryRoomProps {
  onBookClick: (book: any) => void
}

export default function LibraryRoom({ onBookClick }: LibraryRoomProps) {
  const floorRef = useRef<Mesh>(null)

  return (
    <group>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>

      {/* Walls */}
      {/* Back wall */}
      <mesh position={[0, 3, -15]} receiveShadow>
        <planeGeometry args={[30, 6]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-15, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[30, 6]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>

      {/* Right wall */}
      <mesh position={[15, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[30, 6]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#FFF8F0" />
      </mesh>

      {/* Large Windows */}
      <mesh position={[-8, 3, -14.9]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>
      <mesh position={[8, 3, -14.9]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>

      {/* Window Frames */}
      <mesh position={[-8, 3, -14.8]}>
        <boxGeometry args={[6.2, 4.2, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      <mesh position={[8, 3, -14.8]}>
        <boxGeometry args={[6.2, 4.2, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Ceiling Lights */}
      <mesh position={[-7, 5.5, -5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
        <meshStandardMaterial color="#FFE4B5" emissive="#FFE4B5" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[7, 5.5, -5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
        <meshStandardMaterial color="#FFE4B5" emissive="#FFE4B5" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 5.5, 5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
        <meshStandardMaterial color="#FFE4B5" emissive="#FFE4B5" emissiveIntensity={0.3} />
      </mesh>

      {/* Bookshelves */}
      <Bookshelf position={[-10, 0, -10]} onBookClick={onBookClick} />
      <Bookshelf position={[0, 0, -10]} onBookClick={onBookClick} />
      <Bookshelf position={[10, 0, -10]} onBookClick={onBookClick} />
      <Bookshelf position={[-10, 0, 0]} onBookClick={onBookClick} />
      <Bookshelf position={[10, 0, 0]} onBookClick={onBookClick} />

      {/* Chairs */}
      <Chair position={[-5, 0, 5]} />
      <Chair position={[5, 0, 5]} />
      <Chair position={[0, 0, 8]} />

      {/* Windows */}
      <mesh position={[-10, 3, -14.9]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[10, 3, -14.9]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Wall Decorations - Posters */}
      <mesh position={[-12, 4, -14.5]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#E6F3FF" />
      </mesh>
      <mesh position={[12, 4, -14.5]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#FFE6F0" />
      </mesh>

      {/* Clock */}
      <mesh position={[0, 4.5, -14.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 4.5, -14.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  )
}
