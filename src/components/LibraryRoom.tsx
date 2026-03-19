'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import Bookshelf from './Bookshelf'
import Chair from './Chair'
import Table from './Table'
import { AozoraBook } from '@/data/aozora'

interface LibraryRoomProps {
  onBookClick: (book: AozoraBook) => void
}

export default function LibraryRoom({ onBookClick }: LibraryRoomProps) {
  const floorRef = useRef<Mesh>(null)
  const shelfPositions: Array<[number, number, number]> = [
    [-10, 0, -12],
    [0, 0, -12],
    [10, 0, -12],
    [-10, 0, -4],
    [0, 0, -4],
    [10, 0, -4],
    [-10, 0, 4],
    [0, 0, 4],
    [10, 0, 4],
  ]
  const shelfLabels = [
    '近代文学',
    '短編',
    '怪奇',
    '長編',
    '童話',
    '物語',
    '随筆',
    '幻想',
    '名作',
  ]

  return (
    <group>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#E2C79C" />
      </mesh>

      {/* Walls */}
      {/* Back wall */}
      <mesh position={[0, 3, -18]} receiveShadow>
        <planeGeometry args={[36, 6]} />
        <meshStandardMaterial color="#F6EFE6" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-18, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[36, 6]} />
        <meshStandardMaterial color="#F6EFE6" />
      </mesh>

      {/* Right wall */}
      <mesh position={[18, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[36, 6]} />
        <meshStandardMaterial color="#F6EFE6" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#FFF7EC" />
      </mesh>

      {/* Large Windows */}
      <mesh position={[-9, 3, -17.9]}>
        <planeGeometry args={[7, 4]} />
        <meshStandardMaterial color="#98C6E6" transparent opacity={0.35} />
      </mesh>
      <mesh position={[9, 3, -17.9]}>
        <planeGeometry args={[7, 4]} />
        <meshStandardMaterial color="#98C6E6" transparent opacity={0.35} />
      </mesh>

      {/* Window Frames */}
      <mesh position={[-9, 3, -17.8]}>
        <boxGeometry args={[7.2, 4.2, 0.1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      <mesh position={[9, 3, -17.8]}>
        <boxGeometry args={[7.2, 4.2, 0.1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>

      {/* Ceiling Lights */}
      {[-12, -4, 4, 12].map((x, index) => (
        <mesh key={`light-${x}`} position={[x, 5.6, -2]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 16]} />
          <meshStandardMaterial color="#FFE7C2" emissive="#FFE7C2" emissiveIntensity={0.35} />
        </mesh>
      ))}

      {/* Bookshelves */}
      {shelfPositions.map((shelfPosition, index) => (
        <Bookshelf
          key={`shelf-${index}`}
          position={shelfPosition}
          onBookClick={onBookClick}
          shelfIndex={index}
          label={shelfLabels[index % shelfLabels.length]}
        />
      ))}

      {/* Chairs */}
      <Table position={[0, 0, 11]} size={[4, 0.08, 1.6]} />
      <Chair position={[-1.2, 0, 10.2]} />
      <Chair position={[1.2, 0, 10.2]} />
      <Chair position={[-1.2, 0, 12]} />
      <Chair position={[1.2, 0, 12]} />
      <Chair position={[0, 0, 14]} />

      {/* Windows */}
      <mesh position={[-12, 3, -17.9]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#9ECDEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[12, 3, -17.9]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#9ECDEB" transparent opacity={0.7} />
      </mesh>

      {/* Wall Decorations - Posters */}
      <mesh position={[-12, 4, -17.5]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#E6F3FF" />
      </mesh>
      <mesh position={[12, 4, -17.5]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#FFE6F0" />
      </mesh>

      {/* Clock */}
      <mesh position={[0, 4.5, -17.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 4.5, -17.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  )
}
