'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import CustomCursor from './CustomCursor';
import TerminalOverlay from './TerminalOverlay';
import dynamic from 'next/dynamic';
import SettingsDock from './SettingsDock';
import ImageModal from './ImageModal';
import VelocityMarquee from './VelocityMarquee';

const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas'), { ssr: false });

export default function ClientLayoutManager() {
  const { isOverclocked, isRecruiterMode, closeOverlays } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlays();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOverlays]);

  useEffect(() => {
    if (isOverclocked) {
      document.body.classList.add('theme-overclock');
    } else {
      document.body.classList.remove('theme-overclock');
    }
  }, [isOverclocked]);

  useEffect(() => {
    if (isRecruiterMode) {
      ScrollTrigger.disable(true); // true parameter clears structural pinning and completely flattens layout
    } else {
      ScrollTrigger.enable();
      // Allow DOM to settle, then refresh ScrollTrigger calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [isRecruiterMode]);

  return (
    <>
      {!isRecruiterMode && (
        <>
          <BackgroundCanvas />
          <VelocityMarquee />
        </>
      )}
      <CustomCursor />
      <TerminalOverlay />
      <SettingsDock />
      <ImageModal />
    </>
  );
}
