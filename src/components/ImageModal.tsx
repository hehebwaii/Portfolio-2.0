'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function ImageModal() {
  const { activeImageDetails, closeOverlays } = useAppStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeImageDetails) return;

    // Hardware-accelerated modal drop & impact shake
    const tl = gsap.timeline();
    tl.fromTo(modalRef.current,
      { yPercent: -100 },
      { yPercent: 0, ease: "bounce.out", duration: 0.6 }
    ).to("#portfolio-core", 
      { x: 5, y: -5, duration: 0.05, yoyo: true, repeat: 3 },
      "<0.6" // Trigger precisely at the moment the bounce hits 0
    );

    // Initialize memory-safe Draggable SVG stickers
    const dragInstances = Draggable.create('.modal-sticker', {
      type: 'x,y',
    });

    return () => {
      // CRITICAL MEMORY CLEANUP
      dragInstances.forEach(d => d.kill());
    };
  }, [activeImageDetails]);

  if (!activeImageDetails) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap'
      }}
    >
      {/* Click outside to close interceptor */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={closeOverlays} />
      
      {/* Draggable Decals Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 999999 }}>
        {/* Blood Drop Sticker (4X Donor) */}
        <div className="modal-sticker" style={{ position: 'absolute', top: '20%', left: '5%', pointerEvents: 'auto', zIndex: 10000 }}>
          <svg style={{ width: '70px', height: '70px', transform: 'rotate(-25deg)', background: '#fff', border: '3px solid #000', display: 'block' }} viewBox="0 0 24 24">
            <path d="M12,2 C12,2 4,10 4,15 C4,19.4183 7.58172,23 12,23 C16.4183,23 20,19.4183 20,15 C20,10 12,2 12,2 Z" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="12" y="18" fontFamily="monospace" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#000">4X</text>
          </svg>
        </div>

        {/* Camera Shutter Sticker */}
        <div className="modal-sticker" style={{ position: 'absolute', bottom: '10%', right: '5%', pointerEvents: 'auto', zIndex: 10000 }}>
          <svg style={{ width: '85px', height: '85px', transform: 'rotate(12deg)', background: '#fff', border: '3px solid #000', display: 'block' }} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M12,2 L16,10 L22,12 L16,14 L12,22 L8,14 L2,12 L8,10 Z" fill="none" stroke="#000" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="#000" />
          </svg>
        </div>
      </div>

      {/* Core Animated Modal Wrapper */}
      <div 
        ref={modalRef}
        style={{
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          position: 'relative',
          pointerEvents: 'none' // allow interceptor clicks where there's no UI
        }}
      >
        {/* Raw Image Container */}
        <div style={{ pointerEvents: 'auto', flex: '1 1 50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', minWidth: '300px' }}>
          <img 
            src={activeImageDetails.url} 
            alt={activeImageDetails.title} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', border: '5px solid #fff' }} 
          />
        </div>

        {/* Metadata Panel */}
        <div 
          style={{ 
            pointerEvents: 'auto',
            flex: '1 1 50%', 
            position: 'relative',
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000',
            color: '#fff',
            overflowY: 'auto',
            borderLeft: '3px solid #00FF41'
          }}
        >
          <button 
            className="btn font-mono" 
            onClick={closeOverlays} 
            style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem', backgroundColor: '#00FF41', color: '#000', border: 'none', boxShadow: 'none' }}
          >
            [ESC] CLOSE
          </button>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: '3px solid #00FF41', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <span>{activeImageDetails.title}</span>
              <div className="status-led led-darkroom" title="Darkroom State Active"></div>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div>
                <h3 className="font-mono" style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#00FF41' }}>// Backstory</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.6 }}>{activeImageDetails.backstory}</p>
              </div>
              
              <div>
                <h3 className="font-mono" style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#00FF41' }}>// Hardware Gear</h3>
                <p className="font-mono" style={{ fontSize: '1.25rem' }}>{activeImageDetails.gear}</p>
              </div>

              <div>
                <h3 className="font-mono" style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#00FF41' }}>// Exposure & Settings</h3>
                <p className="font-mono" style={{ fontSize: '1.25rem' }}>{activeImageDetails.settings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
