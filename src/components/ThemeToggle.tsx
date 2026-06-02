'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap } from 'lucide-react';

export default function ThemeToggle() {
  const { isOverclocked, toggleOverclock } = useAppStore();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        y: isOverclocked ? 4 : 0,
        x: isOverclocked ? 4 : 0,
        boxShadow: isOverclocked ? '2px 2px 0px 0px #00FF41' : '5px 5px 0px 0px #000000',
        duration: 0.1,
        ease: 'power4.out',
      });
    }
  }, [isOverclocked]);

  return (
    <button
      ref={toggleRef}
      onClick={toggleOverclock}
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 50,
        backgroundColor: isOverclocked ? '#111' : '#fff',
        color: isOverclocked ? '#00FF41' : '#000',
        border: isOverclocked ? '3px solid #00FF41' : '3px solid #000',
        padding: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none', // Handled by CustomCursor
      }}
      aria-label="Toggle Overclock Mode"
    >
      <Zap size={24} style={{ fill: isOverclocked ? '#00FF41' : 'transparent' }} />
    </button>
  );
}
