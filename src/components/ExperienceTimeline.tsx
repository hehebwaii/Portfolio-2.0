'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/store/useAppStore';
import type { ExperienceTimelineData } from '@/app/page';

interface ExperienceTimelineProps {
  data: ExperienceTimelineData;
}

export default function ExperienceTimeline({ data }: ExperienceTimelineProps) {
  const { openPositions, togglePosition } = useAppStore();
  const detailsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    data.items.forEach((item) => {
      const el = detailsRef.current[item.id];
      if (!el) return;

      if (openPositions[item.id]) {
        gsap.to(el, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out', marginTop: '1rem' });
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in', marginTop: 0 });
      }
    });
  }, [openPositions, data.items]);

  return (
    <section id="experience" className="section" style={{ borderTop: 'var(--border-thick)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>{data.sectionHeading}</h2>
      
      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', paddingLeft: '2rem' }}>
        {/* Structural Line */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: 'var(--color-text)'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {data.items.map((item) => {
            const isOpen = !!openPositions[item.id];
            
            return (
              <div key={item.id} style={{ position: 'relative' }}>
                {/* Connector Node */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '2rem',
                    width: '16px',
                    height: '16px',
                    backgroundColor: item.active ? '#00FF41' : '#fff',
                    border: 'var(--border-thick)',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}
                />
                
                <div 
                  className="card timeline-header-card" 
                  onClick={() => togglePosition(item.id)}
                  style={{ 
                    cursor: 'none', 
                    padding: '1.5rem',
                    backgroundColor: isOpen ? 'var(--color-text)' : 'var(--color-bg)',
                    color: isOpen ? 'var(--color-bg)' : 'var(--color-text)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, maxWidth: '70%' }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span className="font-mono" style={{ 
                        backgroundColor: isOpen ? 'var(--color-bg)' : 'var(--color-text)', 
                        color: isOpen ? 'var(--color-text)' : 'var(--color-bg)', 
                        padding: '0.25rem 0.5rem', 
                        fontWeight: 'bold',
                        fontSize: '0.875rem'
                      }}>
                        {item.date}
                      </span>
                      <span className="font-mono" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                        {isOpen ? '-' : '+'}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    ref={(el) => { detailsRef.current[item.id] = el; }}
                    style={{ 
                      height: 0, 
                      opacity: 0, 
                      overflow: 'hidden',
                    }}
                  >
                    <p style={{ 
                      fontSize: '1.125rem', 
                      lineHeight: 1.6, 
                      borderTop: `2px solid ${isOpen ? 'var(--color-bg)' : 'var(--color-text)'}`, 
                      paddingTop: '1rem' 
                    }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
