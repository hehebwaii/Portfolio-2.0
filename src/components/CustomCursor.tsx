'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if (!cursorRef.current) return;

    // Use GSAP quickTo for zero-latency tracking (duration 0 for absolute instant mapping)
    // Set the initial translation center
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    // Using x and y instead of left and top for sub-pixel rendering performance
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0, ease: 'none' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0, ease: 'none' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent has interactive class
      if (target.closest('.card') || target.closest('.btn') || target.closest('button') || target.closest('a') || target.closest('.nav-link')) {
        cursorRef.current?.classList.add('hover-active');
      }
      
      // Hide completely over text inputs to let native cursor take over
      if (target.closest('input') || target.closest('textarea') || target.closest('.cursor-text-override')) {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
      } else {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.card') || target.closest('.btn') || target.closest('button') || target.closest('a') || target.closest('.nav-link')) {
        cursorRef.current?.classList.remove('hover-active');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor-dot" />;
}
