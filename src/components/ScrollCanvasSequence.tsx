'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvasSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  const { isOverclocked } = useAppStore();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all 192 frames on mount
  useEffect(() => {
    const totalFrames = 192;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/images/sequence/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
        
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Initialize ScrollTrigger animation once all images are loaded
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas drawing buffer resolution to match the source images
    const firstImage = images[0];
    if (firstImage) {
      canvas.width = firstImage.naturalWidth || 1920;
      canvas.height = firstImage.naturalHeight || 1080;
      
      // Draw first frame immediately
      ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    }

    // ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Map scroll progress (0-1) to frame indices (0-191)
          const frameIndex = Math.min(191, Math.floor(progress * 192));
          const currentImg = images[frameIndex];
          if (currentImg && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
          }
        }
      }
    });

    // Set initial layout offsets and hidden states for overlays
    gsap.set([act1Ref.current, act2Ref.current, act3Ref.current], { 
      opacity: 0, 
      y: 20 
    });

    // ACT 1: Frames 001 to 060 (Timeline Progress: ~0.0 to ~0.31)
    tl.to(act1Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .to(act1Ref.current, { opacity: 0, y: -20, duration: 0.1 }, 0.28);

    // ACT 2: Frames 065 to 125 (Timeline Progress: ~0.34 to ~0.65)
    tl.to(act2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.35)
      .to(act2Ref.current, { opacity: 0, y: -20, duration: 0.1 }, 0.62);

    // ACT 3: Frames 130 to 192 (Timeline Progress: ~0.68 to ~1.0)
    tl.to(act3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.68);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [imagesLoaded, images]);

  const activeColor = isOverclocked ? '#00FF41' : '#FF3B30';

  return (
    <div 
      ref={containerRef} 
      id="scroll-sequence-container"
      style={{ 
        height: '400vh', 
        position: 'relative', 
        borderTop: 'var(--border-thick)',
        borderBottom: 'var(--border-thick)',
        backgroundColor: '#000000'
      }}
    >
      {/* Loading Readout Overlay */}
      {!imagesLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          color: activeColor
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            PRELOADING OPTICAL MATRIX TELEMETRY...
          </div>
          <div style={{ width: '300px', height: '10px', border: `2px solid ${activeColor}`, padding: '2px' }}>
            <div style={{ width: `${loadProgress}%`, height: '100%', backgroundColor: activeColor }} />
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            {loadProgress}% CACHED
          </div>
        </div>
      )}

      {/* Sticky Canvas Viewport container */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Canvas for frame drawing */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />

        {/* Scanlines Effect for authenticity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
          zIndex: 5
        }} />

        {/* Neo-Brutalist Narrative Card Overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '5%',
          paddingRight: '5%'
        }}>
          <div 
            className="card"
            style={{ 
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'rgba(5, 5, 5, 0.85)', 
              color: 'var(--color-text)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-brutal)',
              padding: '2rem',
              backdropFilter: 'blur(5px)',
              pointerEvents: 'auto',
              borderRadius: '0px',
              borderColor: activeColor
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
              
              {/* ACT 1 */}
              <div 
                ref={act1Ref} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 900, color: activeColor, textTransform: 'uppercase' }}>
                    ACT 1: THE OPTICAL CORE
                  </span>
                </div>
                <h3 className="font-mono" style={{ fontSize: '1.25rem', margin: 0, fontWeight: 900, color: '#ffffff' }}>
                  01 // THE SENSOR MATRIX — SONY α6400
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, color: '#b7b9bb' }}>
                  An engineering baseline capturing raw ambient data at 24.2 megapixels. High-speed phase detection meets compressed visual telemetry.
                </p>
              </div>

              {/* ACT 2 */}
              <div 
                ref={act2Ref} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 900, color: activeColor, textTransform: 'uppercase' }}>
                    ACT 2: THE ADAPTABLE RANGE
                  </span>
                </div>
                <h3 className="font-mono" style={{ fontSize: '1.25rem', margin: 0, fontWeight: 900, color: '#ffffff' }}>
                  02 // TACTICAL FIELD SELECTION — E 16-50MM
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, color: '#b7b9bb' }}>
                  The everyday kit architecture built for split-second deployment. Mechanical power-zoom mapping immediate world space from wide angles to compression.
                </p>
              </div>

              {/* ACT 3 */}
              <div 
                ref={act3Ref} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 900, color: activeColor, textTransform: 'uppercase' }}>
                    ACT 3: THE DEEP PERSPECTIVE
                  </span>
                </div>
                <h3 className="font-mono" style={{ fontSize: '1.25rem', margin: 0, fontWeight: 900, color: '#ffffff' }}>
                  03 // COMPOSITION GEOMETRY — VILTROX 20MM PRIME
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, color: '#b7b9bb' }}>
                  Ultra-wide narrative rendering at f/2.8. Gathering expansive low-light environments with absolute sharpness across the focal plane.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
