'use client'

import { useState } from 'react'
import { useRef } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import Book from './Book'

interface BookshelfProps {
  position: [number, number, number]
  onBookClick: (book: any) => void
}

export default function Bookshelf({ position, onBookClick }: BookshelfProps) {
  const shelfRef = useRef<Group>(null)
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)

  const books = [
    { id: 'book1', title: '日本の神話', color: '#FF6B9D', author: '太安万呂' },
    { id: 'book2', title: '源氏物語', color: '#C44569', author: '紫式部' },
    { id: 'book3', title: '枕草子', color: '#F8B195', author: '清少納言' },
    { id: 'book4', title: '徒然草', color: '#F67280', author: '吉田兼好' },
    { id: 'book5', title: '奥の細道', color: '#355C7D', author: '松尾芭蕉' },
    { id: 'book6', title: '雨月物語', color: '#6C5B7B', author: '上田秋成' },
  ]

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
      {books.slice(0, 3).map((book, index) => (
        <Book
          key={book.id}
          book={book}
          position={[-1.5 + index * 1.0, 0.55, 0]}
          onHover={setHoveredBook}
          isHovered={hoveredBook === book.id}
          onBookClick={onBookClick}
        />
      ))}
      
      {books.slice(3, 6).map((book, index) => (
        <Book
          key={book.id}
          book={book}
          position={[-1.5 + index * 1.0, 1.05, 0]}
          onHover={setHoveredBook}
          isHovered={hoveredBook === book.id}
          onBookClick={onBookClick}
        />
      ))}

      {/* Shelf label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.2}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        古典文学
      </Text>
    </group>
  )
}
