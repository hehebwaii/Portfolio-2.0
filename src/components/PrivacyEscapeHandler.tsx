'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyEscapeHandler() {
  const router = useRouter();

  const handleReturn = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Attempt clean client-side router transition, fallback to hard reload if intercepted
    try {
      router.push('/');
    } catch (err) {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReturn(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[99999] bg-black border-b border-green-500/30 p-4">
      <a 
        href="/" 
        onClick={handleReturn}
        className="block w-full text-center text-green-500 font-bold hover:bg-green-500 hover:text-black transition-colors p-4"
        style={{
          border: '2px solid #22c55e',
          textDecoration: 'none',
          fontSize: '1.1rem',
          letterSpacing: '0.05em',
          cursor: 'pointer'
        }}
      >
        ← RETURN TO MAIN DECK [ESC]
      </a>
    </div>
  );
}
