'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import CustomCursor from './CustomCursor';
import TerminalOverlay from './TerminalOverlay';
import DevHUD from './DevHUD';
import dynamic from 'next/dynamic';
import SettingsDock from './SettingsDock';
import ImageModal from './ImageModal';
import VelocityMarquee from './VelocityMarquee';

const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas'), { ssr: false });

export default function ClientLayoutManager() {
  const { isOverclocked, isRecruiterMode, closeOverlays, isEStopped, toggleEStop } = useAppStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    }
  }, [isRecruiterMode]);

  useEffect(() => {
    const targets = [
      '#portfolio-core',
      'nav',
      '#settings-dock',
      '#webgl-canvas-container',
      '#velocity-marquee-container'
    ];

    if (isEStopped) {
      // 1. Force close other overlays if open
      closeOverlays();

      // 2. Clear current active tweens on targets & overlay elements
      gsap.killTweensOf(targets);
      gsap.killTweensOf([lineRef.current, dotRef.current, contentRef.current, overlayRef.current]);

      // 3. Force body styles to pitch black and disable scroll
      document.body.style.backgroundColor = '#000000';
      document.body.style.overflow = 'hidden';

      // 4. Initialize elements state before collapse starts
      gsap.set(overlayRef.current, {
        visibility: 'visible',
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,0.95)'
      });
      gsap.set(lineRef.current, { opacity: 0, scaleX: 0, height: '4px' });
      gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline();

      // Step A: Turn on the white phosphor line
      tl.to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.15,
        ease: 'power1.out'
      });

      // Step B: Collapse targets vertically to a horizontal thin slice in middle
      tl.to(targets, {
        clipPath: 'polygon(0% 49.8%, 100% 49.8%, 100% 50.2%, 0% 50.2%)',
        duration: 0.4,
        ease: 'power3.inOut'
      }, '<');

      // Step C: Collapse horizontally to a single dot
      tl.to(targets, {
        clipPath: 'polygon(49.8% 49.8%, 50.2% 49.8%, 50.2% 50.2%, 49.8% 50.2%)',
        duration: 0.3,
        ease: 'power4.in'
      });
      tl.to(lineRef.current, {
        scaleX: 0,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power4.in'
      }, '<');
      tl.to(dotRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        ease: 'power1.out'
      }, '>-0.1');

      // Step D: Vanish the dot (phosphor decay)
      tl.to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power4.in'
      });

      // Step E: Hide layouts entirely so they don't intercept mouse/focus
      tl.set(targets, {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        display: 'none'
      });

      // Step F: Overlay background goes pure solid black
      tl.to(overlayRef.current, {
        backgroundColor: '#000000',
        duration: 0.1
      });

      // Step G: Render diagnostics logs
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Recovery sequence: reverse the collapse
      // We check if the viewport is currently collapsed before playing boot animation
      const isCollapsed = targets.some(selector => {
        const el = document.querySelector(selector);
        return el ? (el as HTMLElement).style.display === 'none' : false;
      });

      if (isCollapsed) {
        gsap.killTweensOf(targets);
        gsap.killTweensOf([lineRef.current, dotRef.current, contentRef.current, overlayRef.current]);

        const tl = gsap.timeline({
          onComplete: () => {
            // Restore styles cleanly
            gsap.set(targets, {
              clearProps: 'clipPath,display,clip-path'
            });
            gsap.set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
            document.body.style.backgroundColor = '';
            document.body.style.overflow = '';
          }
        });

        // Fade out warning contents
        tl.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in'
        });

        // Pre-set layouts for expansion
        tl.set(targets, {
          display: '',
          clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
        });

        // Render dot
        tl.set(dotRef.current, { scale: 0, opacity: 0 });
        tl.to(dotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out'
        });

        // Expand dot to horizontal line
        tl.to(dotRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in'
        });
        tl.set(lineRef.current, { scaleX: 0, opacity: 1, height: '4px' });
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.25,
          ease: 'power2.out'
        }, '<');
        tl.to(targets, {
          clipPath: 'polygon(49.8% 49.8%, 50.2% 49.8%, 50.2% 50.2%, 49.8% 50.2%)',
          duration: 0.15,
          ease: 'power2.out'
        }, '<');

        // Vertical expand line to show full page
        tl.to(targets, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.45,
          ease: 'power3.out'
        });
        tl.to(lineRef.current, {
          height: '0px',
          opacity: 0,
          duration: 0.3,
          ease: 'power3.out'
        }, '<');

        // Fade out background overlay wrapper
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3
        }, '<');
      }
    }
  }, [isEStopped, closeOverlays]);

  const activeColor = isOverclocked ? '#00FF41' : '#FF3B30';

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
      <DevHUD />
      <SettingsDock />
      <ImageModal />

      {/* CRT Shutdown Overlay Container */}
      <div 
        ref={overlayRef}
        id="crt-shutdown-overlay" 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 999999, // Rendered above everything
          visibility: 'hidden',
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          color: activeColor,
          overflow: 'hidden',
          padding: '2rem',
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        {/* CRT Scanline and Screen Overlay effects */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
          zIndex: 5
        }} />

        {/* Phosphor Line representation */}
        <div 
          ref={lineRef} 
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#ffffff',
            transform: 'translateY(-50%) scaleX(0)',
            opacity: 0,
            zIndex: 10,
            boxShadow: `0 0 10px #ffffff, 0 0 20px ${activeColor}`
          }} 
        />

        {/* Phosphor Dot representation */}
        <div 
          ref={dotRef} 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0,
            zIndex: 10,
            boxShadow: `0 0 12px #ffffff, 0 0 24px ${activeColor}`
          }} 
        />

        {/* Diagnostics & Warning Content */}
        <div 
          ref={contentRef}
          style={{
            zIndex: 6,
            maxWidth: '650px',
            border: `3px solid ${activeColor}`,
            padding: '2.5rem',
            backgroundColor: '#050505',
            boxShadow: `6px 6px 0px ${activeColor}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            transform: 'translateY(30px)',
            opacity: 0
          }}
        >
          {/* Header Warning Banner */}
          <div style={{ borderBottom: `2px solid ${activeColor}`, paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0, animation: 'crt-blink 1s step-end infinite', color: activeColor }}>
              !!! SYSTEM HALT !!!
            </h2>
            <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
              EMERGENCY HARDWARE CONTROL DISENGAGEMENT
            </div>
          </div>

          {/* Diagnostic Log Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.95rem' }}>
            <div>&gt; STATE: SAFETY_LOCK_ESTOP_ACTIVE</div>
            <div>&gt; GSAP RUNTIMES: TIMELINE_PAUSE_OK</div>
            <div>&gt; LENIS SCROLL FRAMEWORK: FORCE_INHIBITED</div>
            <div>&gt; 3D canvas thread: PAUSED</div>
            <div>&gt; STICKER DRIFTS & TELEMETRY: HALTED</div>
            <div style={{ borderTop: `1px dashed ${activeColor}`, marginTop: '0.5rem', paddingTop: '0.5rem', opacity: 0.7 }}>
              CORE OVERCLOCK PARAMETERS RETAINED IN CACHE MEMORY.
            </div>
          </div>

          {/* Operator Action Message */}
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '0.5rem 0', opacity: 0.9 }}>
            A MANUAL OPERATOR INTRUSION IS COMPULSORY TO STABILIZE INTERFACE AND UNLOCK CORE TELEMETRY THREADS.
          </p>

          {/* Reboot Button */}
          <button
            onClick={() => toggleEStop()}
            className="cursor-text-override"
            style={{
              padding: '1.25rem 2rem',
              backgroundColor: activeColor,
              color: '#000000',
              border: '2px solid #000000',
              fontWeight: 900,
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: `4px 4px 0px #ffffff`,
              transition: 'all 0.15s ease-in-out',
              fontFamily: 'inherit',
              outline: 'none',
              marginTop: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.boxShadow = `4px 4px 0px ${activeColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = activeColor;
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.boxShadow = `4px 4px 0px #ffffff`;
            }}
          >
            RESTORE_PORTFOLIO_RUNTIME()
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes crt-blink {
          50% { opacity: 0.15; }
        }
      `}} />
    </>
  );
}
