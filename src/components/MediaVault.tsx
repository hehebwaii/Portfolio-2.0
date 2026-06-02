'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';

const BENTO_ITEMS = [
  {
    url: 'https://freerangestock.com/sample/170504/abstract-view-of-brutalist-architecture.jpg',
    label: '01 / STRUCTURE',
    spanRow: 2,
    spanCol: 2
  },
  {
    url: 'https://static.vecteezy.com/system/resources/previews/073/736/648/non_2x/detailed-macrograph-of-a-complex-green-printed-circuit-board-inside-an-electronic-device-highlighting-the-microchip-and-test-points-photo.jpg',
    label: '02 / CIRCUITS',
    spanRow: 1,
    spanCol: 1
  },
  {
    url: 'https://images.stockcake.com/public/9/d/9/9d9b68d6-feda-4e9d-9380-69790e34f056_large/strength-through-shadow-stockcake.jpg',
    label: '03 / SHADOWS',
    spanRow: 1,
    spanCol: 1
  }
];

export default function MediaVault() {
  const { setActiveImage } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // DrawSVG emulation using pathLength="100" and stroke-dashoffset
      const rects = gsap.utils.toArray<SVGRectElement>('.bento-svg-rect');
      
      rects.forEach((rect) => {
        gsap.fromTo(rect, 
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: rect,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax Scrub for internal images
      const images = gsap.utils.toArray<HTMLDivElement>('.bento-parallax-img');
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 30, // Move image downwards as we scroll down
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement, // Trigger based on the container box
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="section">
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Act II: Capturing Reality</h2>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--color-accent)' }}>
        CAPTURING LIGHT & PACE
      </h3>

      <div className="card" style={{ marginBottom: '4rem' }}>
        <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
          Photography // Video Editing // Color Grading
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Finding the exact frame where momentum and light intersect.
        </p>
      </div>

      <div 
        ref={containerRef}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gridAutoRows: '300px',
          gap: '2rem'
        }}
      >
        {BENTO_ITEMS.map((img, idx) => (
          <div
            key={idx}
            className="bento-box"
            onClick={() => setActiveImage(img.url)}
            style={{ 
              gridRow: `span ${img.spanRow}`,
              gridColumn: `span ${img.spanCol}`,
              position: 'relative',
              backgroundColor: 'var(--color-bg)',
              cursor: 'none',
              overflow: 'hidden'
            }}
          >
            {/* DrawSVG Emulation Border */}
            <svg 
              width="100%" 
              height="100%" 
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 5, pointerEvents: 'none' }}
            >
              <rect 
                className="bento-svg-rect"
                x="2" y="2" 
                width="calc(100% - 4px)" 
                height="calc(100% - 4px)" 
                fill="none" 
                stroke="var(--color-text)" 
                strokeWidth="4" 
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              />
            </svg>

            {/* Parallax Image Container */}
            <div 
              style={{
                position: 'absolute',
                top: '-20%', // Give headroom for parallax
                left: 0,
                width: '100%',
                height: '140%', // Give bottom room for parallax
                overflow: 'hidden'
              }}
            >
              <div 
                className="bento-parallax-img"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Label */}
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 10 }}>
              <span style={{ background: '#000', color: '#fff', padding: '0.25rem 0.75rem', fontWeight: 'bold', fontSize: '1rem', border: '2px solid #fff' }}>
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
