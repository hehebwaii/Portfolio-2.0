'use client';

import React from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Image, Text } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DynamicModel from './DynamicModel';

function ScrollTypography() {
  const { isOverclocked } = useAppStore();
  const eceRef = useRef<THREE.Mesh>(null);
  const mbcetRef = useRef<THREE.Mesh>(null);
  const y2026Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Get scroll progress
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const maxScroll = typeof document !== 'undefined' 
      ? document.documentElement.scrollHeight - window.innerHeight 
      : 1;
    const progress = scrollY / (maxScroll || 1);
    const elapsedTime = state.clock.getElapsedTime();

    // Parallel parallax scrolling, Z-axis depth changes, and continuous rotations
    if (eceRef.current) {
      eceRef.current.position.y = 5.0 - progress * 15.0;
      eceRef.current.position.z = -8.0 + progress * 7.0;
      eceRef.current.rotation.y = elapsedTime * 0.15 + progress * Math.PI;
      eceRef.current.rotation.x = progress * Math.PI * 0.5;
    }

    if (mbcetRef.current) {
      mbcetRef.current.position.y = -1.0 - progress * 12.0;
      mbcetRef.current.position.z = -12.0 + progress * 9.0;
      mbcetRef.current.rotation.y = -elapsedTime * 0.1 - progress * Math.PI * 1.5;
      mbcetRef.current.rotation.z = progress * Math.PI * 0.2;
    }

    if (y2026Ref.current) {
      y2026Ref.current.position.y = -7.0 - progress * 8.0;
      y2026Ref.current.position.z = -6.0 + progress * 5.0;
      y2026Ref.current.rotation.y = elapsedTime * 0.2 + progress * Math.PI * 2.0;
      y2026Ref.current.rotation.x = -progress * Math.PI * 0.3;
    }
  });

  const textColor = isOverclocked ? '#00FF41' : '#FF3B30';

  return (
    <group>
      <Text 
        ref={eceRef as any}
        fontSize={2.5}
        font="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/files/jetbrains-mono-latin-400-normal.woff"
        anchorX="center"
        anchorY="middle"
      >
        ECE
        <meshBasicMaterial color={textColor} wireframe />
      </Text>

      <Text 
        ref={mbcetRef as any}
        fontSize={2.0}
        font="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/files/jetbrains-mono-latin-400-normal.woff"
        anchorX="center"
        anchorY="middle"
      >
        MBCET
        <meshBasicMaterial color={textColor} wireframe />
      </Text>

      <Text 
        ref={y2026Ref as any}
        fontSize={2.2}
        font="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/files/jetbrains-mono-latin-400-normal.woff"
        anchorX="center"
        anchorY="middle"
      >
        2026
        <meshBasicMaterial color={textColor} wireframe />
      </Text>
    </group>
  );
}

function ImageInspector() {
  const { activeImage, setActiveImage } = useAppStore();
  const imageRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (activeImage && imageRef.current) {
      gsap.fromTo(imageRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(1.5)' });
    }
  }, [activeImage]);

  useFrame((state) => {
    if (imageRef.current && activeImage) {
      // Subtle parallax tilt
      const x = (state.pointer.x * viewport.width) / 20;
      const y = (state.pointer.y * viewport.height) / 20;
      
      // Smooth interpolation for rotation
      imageRef.current.rotation.y = THREE.MathUtils.lerp(imageRef.current.rotation.y, x, 0.1);
      imageRef.current.rotation.x = THREE.MathUtils.lerp(imageRef.current.rotation.x, -y, 0.1);
    }
  });

  if (!activeImage) return null;

  return (
    <group>
      {/* Background click interceptor to close */}
      <mesh onClick={() => setActiveImage(null)} position={[0, 0, -1]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0.8} color="#000" />
      </mesh>
      
      {/* The 3D Image */}
      <Image 
        ref={imageRef as any}
        url={activeImage} 
        position={[0, 0, 1]} 
        scale={[viewport.width * 0.6, (viewport.width * 0.6) * 0.6]} // Maintain approx 16:9 or similar ratio
        transparent
      />
    </group>
  );
}

export default function BackgroundCanvas() {
  const { isDevMode, activeImage } = useAppStore();

  return (
    <div id="webgl-canvas-container" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: (activeImage || isDevMode) ? 'auto' : 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        {isDevMode && <Perf position="top-left" className="cursor-text-override" />}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        <ScrollTypography />
        <DynamicModel />
        <React.Suspense fallback={null}>
          <ImageInspector />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
