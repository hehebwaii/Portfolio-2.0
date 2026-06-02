'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/store/useAppStore';

const FILM_DATA = [
  {
    url: "https://freerangestock.com/sample/170504/abstract-view-of-brutalist-architecture.jpg",
    title: "CONCRETE MONOLITH",
    backstory: "Captured during the dead of winter. The raw concrete angles provided a perfect study of harsh shadows intersecting at 90-degree vectors.",
    gear: "Sony A7III + Tamron 28-75mm f/2.8",
    settings: "f/8 | 1/250s | ISO 100"
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/073/736/648/non_2x/detailed-macrograph-of-a-complex-green-printed-circuit-board-inside-an-electronic-device-highlighting-the-microchip-and-test-points-photo.jpg",
    title: "SILICON ARTERIES",
    backstory: "A macro dissection of an exposed motherboard. I wanted to map the copper traces as if they were a city grid viewed from low-earth orbit.",
    gear: "Nikon D850 + 105mm Macro",
    settings: "f/11 | 1.5s | ISO 64 | Tripod Mounted"
  },
  {
    url: "https://images.stockcake.com/public/9/d/9/9d9b68d6-feda-4e9d-9380-69790e34f056_large/strength-through-shadow-stockcake.jpg",
    title: "VECTOR SHADOWS",
    backstory: "Experimenting with intense single-source directional lighting to carve out the depth of the subject against an absolute black background.",
    gear: "Canon EOS R5 + RF 50mm f/1.2",
    settings: "f/4 | 1/125s | ISO 400 | Key Light 45°"
  }
];

export default function FilmStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);
  const { setActiveImageDetails } = useAppStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top Track: Scrolls Left
      if (trackTopRef.current) {
        gsap.to(trackTopRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 30, // Optimum scroll speed
          ease: "none",
        });
      }
      
      // Bottom Track: Scrolls Right
      if (trackBottomRef.current) {
        gsap.fromTo(trackBottomRef.current, 
          { xPercent: -50 },
          {
            xPercent: 0,
            repeat: -1,
            duration: 30,
            ease: "none",
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="photography" className="section" style={{ overflow: 'hidden', borderTop: 'var(--border-thick)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>04. Capturing Reality</h2>
      <div 
        ref={marqueeRef}
        style={{ 
          width: '100vw',
          overflow: 'hidden',
          borderTop: 'var(--border-thick)',
          borderBottom: 'var(--border-thick)',
          backgroundColor: '#000', 
          padding: '2rem 0',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        {/* Top Track */}
        <div 
          ref={trackTopRef}
          style={{ 
            display: 'flex', 
            width: 'max-content',
            gap: '2rem',
            paddingLeft: '2rem'
          }}
        >
          {[...FILM_DATA, ...FILM_DATA].map((data, idx) => (
            <div 
              key={`top-${idx}`}
              className="card nav-link"
              onClick={() => setActiveImageDetails(data)}
              style={{
                width: '400px',
                height: '250px',
                backgroundImage: `url(${data.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                border: '3px solid #00FF41',
                padding: 0
              }}
            >
               <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem' }}>
                 <span className="font-mono" style={{ color: '#00FF41', fontWeight: 'bold' }}>{data.title}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Bottom Track (Reversed Source Data for Visual Variance) */}
        <div 
          ref={trackBottomRef}
          style={{ 
            display: 'flex', 
            width: 'max-content',
            gap: '2rem',
            paddingLeft: '2rem'
          }}
        >
          {[...FILM_DATA].reverse().concat([...FILM_DATA].reverse()).map((data, idx) => (
            <div 
              key={`bottom-${idx}`}
              className="card nav-link"
              onClick={() => setActiveImageDetails(data)}
              style={{
                width: '400px',
                height: '250px',
                backgroundImage: `url(${data.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                border: '3px solid #00FF41',
                padding: 0
              }}
            >
               <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem' }}>
                 <span className="font-mono" style={{ color: '#00FF41', fontWeight: 'bold' }}>{data.title}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
