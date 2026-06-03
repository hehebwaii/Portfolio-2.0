'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/store/useAppStore';
import type { FilmstripData } from '@/app/page';

interface FilmStripProps {
  data: FilmstripData;
}

export default function FilmStrip({ data }: FilmStripProps) {
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
  }, [data.photos]);

  return (
    <section id="photography" className="section" style={{ overflow: 'hidden', borderTop: 'var(--border-thick)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>{data.heading}</h2>
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
          {[...data.photos, ...data.photos].map((item, idx) => (
            <div 
              key={`top-${idx}`}
              className="card nav-link"
              onClick={() => setActiveImageDetails(item)}
              style={{
                width: '400px',
                height: '250px',
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                border: '3px solid #00FF41',
                padding: 0
              }}
            >
               <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem' }}>
                 <span className="font-mono" style={{ color: '#00FF41', fontWeight: 'bold' }}>{item.title}</span>
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
          {[...data.photos].reverse().concat([...data.photos].reverse()).map((item, idx) => (
            <div 
              key={`bottom-${idx}`}
              className="card nav-link"
              onClick={() => setActiveImageDetails(item)}
              style={{
                width: '400px',
                height: '250px',
                backgroundImage: `url(${item.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                border: '3px solid #00FF41',
                padding: 0
              }}
            >
               <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem' }}>
                 <span className="font-mono" style={{ color: '#00FF41', fontWeight: 'bold' }}>{item.title}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
