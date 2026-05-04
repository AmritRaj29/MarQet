"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-1, 1, 0]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshPhysicalMaterial 
            color="#2dd4bf" 
            roughness={0.2} 
            metalness={0.8} 
            transmission={0.5} 
            thickness={1}
            clearcoat={1}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[1.5, -0.5, 1]} rotation={[-0.5, 0.5, 0.5]}>
          <octahedronGeometry args={[1]} />
          <MeshDistortMaterial 
            color="#22d3ee" 
            distort={0.4} 
            speed={2} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={2} floatIntensity={1.8}>
        <mesh position={[0, -1.5, -1]} rotation={[0.5, -0.5, 0]}>
          <torusGeometry args={[0.8, 0.2, 16, 100]} />
          <meshPhysicalMaterial 
            color="#34d399" 
            roughness={0.1} 
            metalness={0.9} 
            clearcoat={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2dd4bf" />
        
        <PresentationControls 
          global 
          rotation={[0, 0.3, 0]} 
          polar={[-0.4, 0.2]} 
          azimuth={[-1, 0.75]}
          // @ts-ignore
          config={{ mass: 2, tension: 400 }} 
          // @ts-ignore
          snap={{ mass: 4, tension: 400 }}
        >
          <FloatingObjects />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
