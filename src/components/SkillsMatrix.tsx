'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';

const SKILLS_DATA = [
  {
    category: "Category A: Photography & Imaging",
    skills: [
      { name: "Camera settings", value: 95 },
      { name: "Color science", value: 90 },
      { name: "Composition", value: 95 },
      { name: "Light correction", value: 95 },
      { name: "Current Gear Expertise", value: 95 }
    ]
  },
  {
    category: "Category B: Backend & Databases",
    skills: [
      { name: "Node.js & Express", value: 50 },
      { name: "REST APIs", value: 40 },
      { name: "MongoDB", value: 30 },
      { name: "MySQL / SQLite", value: 40 },
      { name: "Firebase", value: 60 }
    ]
  },
  {
    category: "Category C: UI/UX & Design",
    skills: [
      { name: "Figma", value: 78 },
      { name: "Prototyping", value: 72 },
      { name: "Design Systems", value: 78 },
      { name: "Adobe Photoshop", value: 50 },
      { name: "Lightroom (Photo Edit)", value: 95 }
    ]
  },
  {
    category: "Category D: Frontend Development",
    skills: [
      { name: "React.js", value: 50 },
      { name: "HTML5 & CSS3", value: 50 },
      { name: "JavaScript (ES6+)", value: 75 },
      { name: "Responsive Design", value: 72 },
      { name: "Framer Motion", value: 78 }
    ]
  },
  {
    category: "Category E: Electronics & IoT",
    skills: [
      { name: "Arduino", value: 70 },
      { name: "STM32", value: 70 },
      { name: "Circuit Design", value: 75 },
      { name: "C", value: 88 },
      { name: "Circuit Simulation", value: 88 }
    ]
  }
];

export default function SkillsMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRecruiterMode = useAppStore((state) => state.isRecruiterMode);

  useEffect(() => {
    if (isRecruiterMode) {
      // Direct instant/smooth animation to target width when ScrollTrigger is disabled
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
            start: "top 90%", // Trigger slightly before it fully enters view
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
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>02. Skills and Expertise</h2>

      <div ref={containerRef} className="masonry-grid" style={{ gap: '4rem 2rem' }}>
        {SKILLS_DATA.map((group, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--color-text)', paddingBottom: '0.5rem', margin: 0 }}>
              {group.category}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontWeight: 600, fontSize: '0.875rem' }}>
                    <span className="font-mono">{skill.name}</span>
                    <span className="font-mono">{skill.value}%</span>
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
                      data-target-width={skill.value}
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
