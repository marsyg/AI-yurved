"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, MeshDistortMaterial, Float } from "@react-three/drei"

function ParticleSystem() {
  const particles = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1
    particles.current.rotation.y = t
  })

  const particlePositions = Array.from({ length: 50 }, () => [
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
  ])

  return (
    <group ref={particles}>
      {particlePositions.map((position, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={position}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4ade80" : "#22d3ee"}
              emissive={i % 2 === 0 ? "#4ade80" : "#22d3ee"}
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function MainSphere() {
  const main = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.3
    main.current.rotation.z = t * 0.1
    main.current.rotation.y = t * 0.1
  })

  return (
    <mesh ref={main} position={[0, 0, 0]} scale={4}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#10b981"
        roughness={0.3}
        metalness={0.8}
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function ThreeDHero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <MainSphere />
        <ParticleSystem />
        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

