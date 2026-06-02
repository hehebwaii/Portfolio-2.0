'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { toggleEStop } = useAppStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { y: 100 },
          {
            y: 0,
            ease: "bounce.out",
            duration: 1.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer id="contact" ref={footerRef} className="section" style={{ borderTop: 'var(--border-thick)', backgroundColor: 'var(--color-bg)', minHeight: 'auto', paddingBottom: '2rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>06. The Horizon</h2>
        
        <div className="grid-2">
          {/* Left Column: Contact Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingRight: '2rem' }}>
            <p style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1.2, textTransform: 'uppercase' }}>
              Initiate Contact Sequence. Let's engineer something meaningful.
            </p>
            <p style={{ fontSize: '1.25rem' }}>
              Available for high-level systems architecture, visual storytelling, and organizational leadership roles.
            </p>
          </div>

          {/* Right Column: Form Portal */}
          <form suppressHydrationWarning className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#000', color: '#fff' }} onSubmit={(e) => e.preventDefault()}>
            <input 
              suppressHydrationWarning
              type="text" 
              placeholder="IDENTIFIER [NAME]" 
              className="cursor-text-override font-mono"
              style={{
                width: '100%', padding: '1rem', border: '3px solid #00FF41', 
                backgroundColor: 'transparent', color: '#00FF41', fontSize: '1.25rem', outline: 'none'
              }}
            />
            <input 
              suppressHydrationWarning
              type="email" 
              placeholder="ROUTING [EMAIL]" 
              className="cursor-text-override font-mono"
              style={{
                width: '100%', padding: '1rem', border: '3px solid #00FF41', 
                backgroundColor: 'transparent', color: '#00FF41', fontSize: '1.25rem', outline: 'none'
              }}
            />
            <textarea 
              suppressHydrationWarning
              placeholder="TRANSMISSION [MESSAGE]" 
              rows={4}
              className="cursor-text-override font-mono"
              style={{
                width: '100%', padding: '1rem', border: '3px solid #00FF41', 
                backgroundColor: 'transparent', color: '#00FF41', fontSize: '1.25rem', outline: 'none', resize: 'vertical'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary font-mono" 
              style={{ width: '100%', fontSize: '1.5rem', padding: '1.5rem', backgroundColor: '#00FF41', color: '#000' }}
            >
              EXECUTE_TRANSMISSION()
            </button>
          </form>
        </div>

        {/* Subtext Footer */}
        <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '2px solid var(--color-text)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="font-mono" style={{ fontWeight: 'bold' }}>
            © {new Date().getFullYear()} NIRANJAN S S. ALL RIGHTS RESERVED.
          </span>

          {/* E-Stop Control Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '3px solid var(--color-text)', padding: '0.5rem 1rem', backgroundColor: '#FFD700', color: '#000', boxShadow: '3px 3px 0px #000' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-mono" style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase' }}>SYSTEM E-STOP</span>
              <span className="font-mono" style={{ fontSize: '0.65rem', opacity: 0.8, textTransform: 'uppercase' }}>PAUSE RUNTIME TWEEES</span>
            </div>
            <button 
              onClick={() => toggleEStop()}
              className="cursor-text-override"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid #000',
                background: 'repeating-linear-gradient(45deg, #000, #000 6px, #FFD700 6px, #FFD700 12px)',
                boxShadow: '2px 2px 0px #000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'
              }}
              title="EMERGENCY STOP TIMELINE FREEZE"
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FF3B30',
                border: '2px solid #000',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5)'
              }} />
            </button>
          </div>

          <button onClick={() => setShowPrivacy(true)} className="nav-link font-mono" style={{ background: 'none', border: 'none', fontWeight: 'bold', textDecoration: 'underline', color: 'inherit' }}>
            [PRIVACY_POLICY]
          </button>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '90%', maxWidth: '600px', backgroundColor: '#fff', border: 'var(--border-thick)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Privacy Policy // Legal</h3>
              <button className="btn" onClick={() => setShowPrivacy(false)}>X</button>
            </div>
            <p style={{ lineHeight: 1.6 }}>
              Transmission telemetry and identifier data entered into this contact portal are strictly utilized for direct communication. No third-party data brokering, tracking cookies, or unauthorized distribution vectors are implemented within this infrastructure.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
