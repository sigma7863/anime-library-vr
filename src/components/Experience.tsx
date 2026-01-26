'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { Suspense } from 'react'
import LibraryRoom from './LibraryRoom'
import Player from './Player'
import BookReader from './BookReader'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
]

export default function Experience() {
  const [selectedBook, setSelectedBook] = useState<any>(null)

  const handleBookClick = (book: any) => {
    setSelectedBook(book)
  }

  const handleCloseBook = () => {
    setSelectedBook(null)
  }

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{
            position: [0, 1.6, 5],
            fov: 75,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <LibraryRoom onBookClick={handleBookClick} />
            <Player />
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Book Reader Modal */}
      {selectedBook && (
        <BookReader book={selectedBook} onClose={handleCloseBook} />
      )}
    </>
  )
}
