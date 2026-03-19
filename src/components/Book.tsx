'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { AozoraBook } from '@/data/aozora'

interface BookProps {
  book: AozoraBook
  position: [number, number, number]
  onHover: (bookId: string | null) => void
  isHovered: boolean
  onBookClick: (book: AozoraBook) => void
}

export default function Book({ book, position, onHover, isHovered, onBookClick }: BookProps) {
  const bookRef = useRef<Mesh>(null)

  useFrame(() => {
    if (bookRef.current && isHovered) {
      bookRef.current.scale.x = 1.1
      bookRef.current.scale.z = 1.1
    } else if (bookRef.current) {
      bookRef.current.scale.x = 1
      bookRef.current.scale.z = 1
    }
  })

  const handleClick = () => {
    onBookClick(book)
  }

  return (
    <group position={position}>
      <mesh
        ref={bookRef}
        castShadow
        receiveShadow
        onPointerOver={() => onHover(book.id)}
        onPointerOut={() => onHover(null)}
        onClick={handleClick}
      >
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color={book.color} />
      </mesh>

      {/* Accent band */}
      <mesh position={[0, -0.35, 0.055]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.12, 0.02]} />
        <meshStandardMaterial color={book.accent} />
      </mesh>
      
      {/* Book spine text */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.08}
        color="#FFF"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, Math.PI / 2]}
      >
        {book.title}
      </Text>

      {/* Hover tooltip */}
      {isHovered && (
        <group position={[0, 1.5, 0]}>
          <mesh>
            <planeGeometry args={[2, 0.8]} />
            <meshStandardMaterial color="#333" transparent opacity={0.9} />
          </mesh>
          <Text
            position={[0, 0.1, 0.01]}
            fontSize={0.12}
            color="#FFF"
            anchorX="center"
            anchorY="middle"
          >
            {book.title}
          </Text>
          <Text
            position={[0, -0.1, 0.01]}
            fontSize={0.08}
            color="#CCC"
            anchorX="center"
            anchorY="middle"
          >
            {book.author}
          </Text>
        </group>
      )}
    </group>
  )
}
