'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  const isLoading = useAppStore((state) => state.isLoading);
  const isRecruiterMode = useAppStore((state) => state.isRecruiterMode);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isRecruiterMode) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickHandler = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };

    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isRecruiterMode, isLoading]);

  return <>{children}</>;
}
