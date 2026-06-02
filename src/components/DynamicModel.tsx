'use client';

import { useRef, useLayoutEffect } from 'react';
import { useGLTF, Float, Icosahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DynamicModelProps {
  modelPath?: string;
}

export default function DynamicModel({ modelPath }: DynamicModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  let scene: THREE.Group | null = null;
  try {
    if (modelPath) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const gltf = useGLTF(modelPath);
      scene = gltf.scene;
    }
  } catch (error) {
    console.warn(`Failed to load model at ${modelPath}, using fallback.`, error);
  }

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      // Rotate the model based on scroll position
      gsap.to(groupRef.current!.rotation, {
        y: Math.PI * 4,
        x: Math.PI * 2,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  // Continuous subtle rotation added to the float
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <group ref={groupRef}>
        {scene ? (
          <primitive object={scene} />
        ) : (
          <Icosahedron args={[2, 0]}>
            <meshBasicMaterial color="#000000" wireframe />
          </Icosahedron>
        )}
      </group>
    </Float>
  );
}

// Preload if a path is consistently used
// useGLTF.preload('/models/hero-object.glb');
