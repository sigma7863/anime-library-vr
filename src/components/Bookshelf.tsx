'use client'

import { useState } from 'react'
import { useRef } from 'react'
import { Group } from 'three'
import { Text } from '@react-three/drei'
import Book from './Book'
import { aozoraBooks, AozoraBook } from '@/data/aozora'

interface BookshelfProps {
  position: [number, number, number]
  onBookClick: (book: AozoraBook) => void
  shelfIndex: number
  label: string
}

const ROWS = 3
const COLS = 4
const BOOK_SPACING = 1.0
const START_X = -1.5
const ROW_HEIGHTS = [0.55, 1.05, 1.55]

export default function Bookshelf({ position, onBookClick, shelfIndex, label }: BookshelfProps) {
  const shelfRef = useRef<Group>(null)
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  const offset = shelfIndex * ROWS * COLS
  const shelfBooks = Array.from({ length: ROWS * COLS }, (_, index) => {
    return aozoraBooks[(offset + index) % aozoraBooks.length]
  })

  return (
    <group ref={shelfRef} position={position}>
      {/* Shelf structure */}
      {/* Back panel */}
      <mesh position={[0, 1, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 0.1]} />
        <meshStandardMaterial color="#A0826D" />
      </mesh>

      {/* Shelves */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>

      {/* Side panels */}
      <mesh position={[-1.95, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      <mesh position={[1.95, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>

      {/* Books on shelves */}
      {shelfBooks.map((book, index) => {
        const row = Math.floor(index / COLS)
        const col = index % COLS
        const positionX = START_X + col * BOOK_SPACING
        const positionY = ROW_HEIGHTS[row]
        return (
          <Book
            key={`${book.id}-${row}-${col}`}
            book={book}
            position={[positionX, positionY, 0]}
            onHover={setHoveredBook}
            isHovered={hoveredBook === book.id}
            onBookClick={onBookClick}
          />
        )
      })}

      {/* Shelf label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.2}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}
