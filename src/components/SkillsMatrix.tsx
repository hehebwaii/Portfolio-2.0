'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import type { SkillsMatrixData } from '@/app/page';

interface SkillsMatrixProps {
  data: SkillsMatrixData;
}

export default function SkillsMatrix({ data }: SkillsMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRecruiterMode = useAppStore((state) => state.isRecruiterMode);

  const { sectionHeading, skillCategories } = data;

  useEffect(() => {
    if (isRecruiterMode) {
      const bars = gsap.utils.toArray<HTMLElement>('.skill-progress-bar');
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-target-width');
        gsap.to(bar, { width: `${targetWidth}%`, duration: 0.5, ease: "power3.out" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>('.skill-progress-bar');

      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-target-width');
        gsap.to(bar, {
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          width: `${targetWidth}%`,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isRecruiterMode]);

  return (
    <section id="skills" className="section" style={{ borderTop: 'var(--border-thick)', backgroundColor: 'var(--color-bg)' }}>
      <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase' }}>{sectionHeading}</h2>

      <div ref={containerRef} className="masonry-grid" style={{ gap: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)' }}>
        {skillCategories.map((group, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', borderBottom: '2px solid var(--color-text)', paddingBottom: '0.5rem', margin: 0 }}>
              {group.categoryName}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {group.skills?.map((skill, sIdx) => (
                <div key={sIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontWeight: 600, fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>
                    <span className="font-mono">{skill.name}</span>
                    <span className="font-mono">{skill.level}%</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '24px',
                      border: 'var(--border-thick)',
                      borderRadius: 'var(--radius-sharp)',
                      backgroundColor: 'var(--color-bg)',
                      position: 'relative'
                    }}
                  >
                    <div
                      className="skill-progress-bar"
                      data-target-width={skill.level}
                      style={{
                        width: '0%',
                        height: '100%',
                        backgroundColor: 'var(--color-text)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
