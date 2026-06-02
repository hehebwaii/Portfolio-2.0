import React from 'react';
import { MapPin, Link2, Languages } from 'lucide-react';

export default function AboutProfile() {
  return (
    <section id="about" className="section" style={{ borderTop: 'var(--border-thick)', backgroundColor: 'var(--color-bg)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>01. Core Identity</h2>
      
      <div className="grid-2">
        {/* The Anchor */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
            THE ANCHOR
          </h3>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <MapPin size={24} style={{ marginTop: '0.2rem', minWidth: '24px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase' }}>Location</strong>
                <span className="font-mono" style={{ fontSize: '1rem' }}>Thiruvananthapuram, Kerala</span>
              </div>
            </li>
            
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Link2 size={24} style={{ marginTop: '0.2rem', minWidth: '24px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase' }}>Network</strong>
                <a href="https://linkedin.com/in/niranjanss/" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: '1rem', color: 'inherit' }}>
                  linkedin.com/in/niranjanss/
                </a>
              </div>
            </li>

            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Languages size={24} style={{ marginTop: '0.2rem', minWidth: '24px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase' }}>Languages</strong>
                <span className="font-mono" style={{ fontSize: '1rem' }}>
                  Malayalam, Tamil, Hindi, English<br/>
                  (Native & Fluent)
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* The Story */}
        <div style={{ padding: '2rem', display: 'flex', alignItems: 'center' }}>
          <p style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase'
          }}>
            I don't just build systems; I engineer experiences. Rooted in Electronics and Communication at MBCET, my work bridges the rigid logic of hardware with the fluid creativity of visual storytelling. Whether I am architecting software infrastructure, capturing raw emotion through a camera lens, or mobilizing communities for a cause, I am driven by one simple metric: <span style={{ color: 'var(--color-accent)' }}>leaving a meaningful, lasting impact.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
