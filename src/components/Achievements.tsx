'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ACHIEVEMENTS_DATA = [
  {
    title: "State Level Qualifier — Young Innovators Programme",
    date: "Feb 2026",
    description: "A testament to pushing boundaries and building viable solutions."
  },
  {
    title: "1st Place Champion — Frame-It Photography Competition",
    date: "Apr 2026",
    description: "Peer-reviewed validation of my creative eye and technical execution."
  }
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.achievement-block');
      
      blocks.forEach((block) => {
        // Initial state
        gsap.set(block, { y: 30, opacity: 0 });
        
        // ScrollTrigger animation
        gsap.to(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="section" style={{ borderTop: 'var(--border-thick)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>05. Verified Benchmarks</h2>
      
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {ACHIEVEMENTS_DATA.map((item, index) => (
          <div 
            key={index}
            className="achievement-block card"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#000', color: '#fff' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0, color: '#00FF41' }}>{item.title}</h3>
              <span className="font-mono" style={{ backgroundColor: '#fff', color: '#000', padding: '0.25rem 0.5rem', fontWeight: 'bold' }}>
                {item.date}
              </span>
            </div>
            
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
