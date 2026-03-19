'use client'

import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import { Suspense } from 'react'
import LibraryRoom from './LibraryRoom'
import Player from './Player'
import BookReader from './BookReader'
import { AozoraBook } from '@/data/aozora'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
]

interface ExperienceProps {
  selectedBook: AozoraBook | null
  onBookSelect: (book: AozoraBook) => void
  onCloseBook: () => void
}

export default function Experience({ selectedBook, onBookSelect, onCloseBook }: ExperienceProps) {

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{
            position: [0, 1.6, 10],
            fov: 75,
          }}
          shadows
        >
          <Suspense fallback={null}>
            <LibraryRoom onBookClick={onBookSelect} />
            <Player enabled={!selectedBook} />
            <ambientLight intensity={0.5} />
            <hemisphereLight args={['#fff1d6', '#7b5a3a', 0.6]} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-6, 4, 6]} intensity={0.4} color="#ffd7aa" />
            <pointLight position={[6, 4, -6]} intensity={0.35} color="#ffd7aa" />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Book Reader Modal */}
      {selectedBook && (
        <BookReader book={selectedBook} onClose={onCloseBook} />
      )}
    </>
  )
}
