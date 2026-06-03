'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import type { CameraSequenceData } from '@/app/page';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCanvasSequenceProps {
  data: CameraSequenceData;
}

export default function ScrollCanvasSequence({ data }: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  const { isOverclocked } = useAppStore();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { totalFrames, act1Title, act1Subtitle, act2Title, act2Subtitle, act3Title, act3Subtitle } = data;

  // Preload all frames on mount
  useEffect(() => {
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
  }, [totalFrames]);

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
          // Map scroll progress (0-1) to frame indices (0 to totalFrames - 1)
          const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
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

    // ACT 1: Timeline Progress: ~0.0 to ~0.31
    tl.to(act1Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0)
      .to(act1Ref.current, { opacity: 0, y: -20, duration: 0.1 }, 0.28);

    // ACT 2: Timeline Progress: ~0.34 to ~0.65
    tl.to(act2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.35)
      .to(act2Ref.current, { opacity: 0, y: -20, duration: 0.1 }, 0.62);

    // ACT 3: Timeline Progress: ~0.68 to ~1.0
    tl.to(act3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.68);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [imagesLoaded, images, totalFrames]);

  const activeColor = isOverclocked ? '#00FF41' : '#FF3B30';

  return (
    <div 
      ref={containerRef} 
      id="camerasequence"
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
        <div className="sequence-overlay-container">
          <div className="card sequence-narrative-card" style={{ borderColor: activeColor }}>
            <div className="sequence-text-wrapper">
              
              {/* ACT 1 */}
              <div 
                ref={act1Ref} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem'
                }}
              >
                <div className="sequence-label-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="sequence-label font-mono" style={{ color: activeColor }}>
                    ACT 1: THE OPTICAL CORE
                  </span>
                </div>
                <h3 className="sequence-title font-mono">
                  {act1Title}
                </h3>
                <p className="sequence-desc">
                  {act1Subtitle}
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
                  gap: '0.5rem'
                }}
              >
                <div className="sequence-label-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="sequence-label font-mono" style={{ color: activeColor }}>
                    ACT 2: THE ADAPTABLE RANGE
                  </span>
                </div>
                <h3 className="sequence-title font-mono">
                  {act2Title}
                </h3>
                <p className="sequence-desc">
                  {act2Subtitle}
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
                  gap: '0.5rem'
                }}
              >
                <div className="sequence-label-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="status-led led-default" style={{ backgroundColor: activeColor }} />
                  <span className="sequence-label font-mono" style={{ color: activeColor }}>
                    ACT 3: THE DEEP PERSPECTIVE
                  </span>
                </div>
                <h3 className="sequence-title font-mono">
                  {act3Title}
                </h3>
                <p className="sequence-desc">
                  {act3Subtitle}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .sequence-overlay-container {
          position: absolute;
          top: 10%;
          left: 10%;
          z-index: 10;
          pointer-events: none;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: auto;
          height: auto;
        }

        .sequence-narrative-card {
          width: 100vw;
          max-width: 480px;
          background-color: rgba(5, 5, 5, 0.85) !important;
          color: var(--color-text) !important;
          border: var(--border-thick) !important;
          box-shadow: var(--shadow-brutal) !important;
          padding: 2rem !important;
          backdrop-filter: blur(5px) !important;
          pointer-events: auto;
          border-radius: 0px !important;
          text-align: left;
        }

        .sequence-text-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .sequence-label {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sequence-title {
          font-size: 1.25rem;
          margin: 0;
          font-weight: 900;
          color: #ffffff;
        }

        .sequence-desc {
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
          color: #b7b9bb;
        }

        @media (max-width: 768px) {
          .sequence-overlay-container {
            top: auto !important;
            bottom: 8% !important;
            left: 5% !important;
            right: 5% !important;
            width: 90% !important;
            margin: 0 auto !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .sequence-narrative-card {
            max-width: 100% !important;
            padding: 1rem !important;
            text-align: center !important;
            box-shadow: none !important;
            background-color: rgba(0, 0, 0, 0.8) !important;
            border: 1px solid var(--color-text) !important;
          }

          .sequence-text-wrapper {
            height: 130px !important;
          }

          .sequence-label-wrapper {
            justify-content: center !important;
          }

          .sequence-label {
            font-size: 0.65rem !important;
          }

          .sequence-title {
            font-size: 1.05rem !important;
          }

          .sequence-desc {
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
          }
        }
      `}} />
    </div>
  );
}
