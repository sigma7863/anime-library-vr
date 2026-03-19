'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

interface PlayerProps {
  enabled?: boolean
}

export default function Player({ enabled = true }: PlayerProps) {
  const playerRef = useRef<THREE.Group>(null)
  const direction = useRef(new THREE.Vector3())
  const frontVector = useRef(new THREE.Vector3())
  const sideVector = useRef(new THREE.Vector3())
  
  const [, get] = useKeyboardControls()
  
  const { speed, jumpForce } = useControls({
    speed: { value: 5, min: 1, max: 20 },
    jumpForce: { value: 5, min: 1, max: 20 }
  })

  useFrame((state, delta) => {
    if (!enabled) return
    if (!playerRef.current) return

    const { forward, backward, leftward, rightward, jump, run } = get()
    
    // Calculate movement direction
    frontVector.current.set(0, 0, Number(backward) - Number(forward))
    sideVector.current.set(Number(leftward) - Number(rightward), 0, 0)
    
    direction.current
      .subVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(speed * delta * (run ? 2 : 1))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), state.camera.rotation.y)

    // Apply movement
    playerRef.current.position.add(direction.current)

    // Update camera position to follow player
    state.camera.position.lerp(
      new THREE.Vector3(
        playerRef.current.position.x,
        playerRef.current.position.y + 1.6,
        playerRef.current.position.z
      ),
      0.1
    )
  })

  return (
    <group ref={playerRef} position={[0, 0.8, 0]}>
      {/* Player collision body (invisible) */}
      <mesh visible={false}>
        <boxGeometry args={[0.6, 1.6, 0.6]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}
