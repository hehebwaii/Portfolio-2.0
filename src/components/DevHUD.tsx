'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function DevHUD() {
  const state = useAppStore();
  const [gsapCount, setGsapCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'logs'>('architecture');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.isDevMode) return;
    
    // Reset SVG Filter values on mount
    const turb = document.getElementById('noise-turbulence');
    const disp = document.querySelector('#attenuation-noise feDisplacementMap');
    if (turb) turb.setAttribute('baseFrequency', '0');
    if (disp) disp.setAttribute('scale', '0');

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
    const dragInstances = Draggable.create('.dev-sticker', {
      type: 'x,y',
    });

    // Initialize Attenuation Dial with GSAP Draggable Rotation
    const dialInstance = Draggable.create('#attenuation-dial', {
      type: 'rotation',
      bounds: { minRotation: 0, maxRotation: 360 },
      onDrag: function() {
        const rot = this.rotation; // 0 to 360 degrees
        
        // Map rotation to frequency: 0.0 to 0.05
        const freq = rot / 7200;
        // Map rotation to displacement scale: 0 to 35
        const scale = rot / 10;

        // Perform raw DOM mutations directly to protect frame rate
        const noiseTurb = document.getElementById('noise-turbulence');
        const noiseDisp = document.querySelector('#attenuation-noise feDisplacementMap');
        if (noiseTurb) noiseTurb.setAttribute('baseFrequency', freq.toFixed(5));
        if (noiseDisp) noiseDisp.setAttribute('scale', scale.toFixed(2));

        // Update display text readouts directly
        const attnReadout = document.getElementById('attn-readout');
        const freqReadout = document.getElementById('freq-readout');
        const dispReadout = document.getElementById('disp-readout');
        if (attnReadout) attnReadout.innerText = `${(scale / 1.5).toFixed(1)} dB`;
        if (freqReadout) freqReadout.innerText = `${(freq * 100).toFixed(3)} Hz`;
        if (dispReadout) dispReadout.innerText = `${scale.toFixed(1)} px`;
      }
    });

    const interval = setInterval(() => {
      setGsapCount(gsap.globalTimeline.getChildren().length);
    }, 500);
    
    return () => {
      clearInterval(interval);
      // CRITICAL MEMORY CLEANUP: Kill all Draggable instances on unmount to prevent zombie listeners
      dragInstances.forEach(d => d.kill());
      dialInstance.forEach(d => d.kill());
    };
  }, [state.isDevMode]);

  if (!state.isDevMode) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.05) 2px, rgba(0, 255, 65, 0.05) 4px)',
        color: '#00FF41',
        padding: '2rem 4rem',
        fontFamily: "'JetBrains Mono', monospace",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Draggable Decals Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        {/* Microcontroller Sticker */}
        <div className="dev-sticker" style={{ position: 'absolute', top: '10%', right: '15%', pointerEvents: 'auto', zIndex: 10000 }}>
          <svg style={{ width: '80px', height: '80px', transform: 'rotate(15deg)', background: '#fff', border: '3px solid #000', display: 'block' }} viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" fill="#fff" stroke="#000" strokeWidth="2" />
            <path d="M2,6 L4,6 M2,10 L4,10 M2,14 L4,14 M2,18 L4,18" stroke="#000" strokeWidth="2" />
            <path d="M22,6 L20,6 M22,10 L20,10 M22,14 L20,14 M22,18 L20,18" stroke="#000" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#000" />
          </svg>
        </div>
        
        {/* IEEE WIE Sticker */}
        <div className="dev-sticker" style={{ position: 'absolute', bottom: '15%', left: '10%', pointerEvents: 'auto', zIndex: 10000 }}>
          <svg style={{ width: '90px', height: '90px', transform: 'rotate(-10deg)', background: '#fff', border: '3px solid #000', display: 'block' }} viewBox="0 0 24 24">
            <text x="12" y="16" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">WIE</text>
            <path d="M4,4 L20,4 L20,20 L4,20 Z" fill="none" stroke="#000" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Header and Interactive Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #00FF41', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, textShadow: '0 0 8px rgba(0, 255, 65, 0.6)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          SYS.ADMIN // DEV_MODE
          <div className="status-led led-active" title="System Oscilloscope Active"></div>
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['architecture', 'telemetry', 'logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                backgroundColor: activeTab === tab ? '#00FF41' : 'transparent',
                color: activeTab === tab ? '#000' : '#00FF41',
                border: '2px solid #00FF41',
                padding: '0.5rem 1rem',
                fontFamily: 'inherit',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
              className="nav-link"
            >
              [{tab}]
            </button>
          ))}
          <button onClick={state.closeOverlays} className="nav-link" style={{ backgroundColor: 'transparent', color: '#00FF41', border: '2px solid #00FF41', padding: '0.5rem 1rem', fontFamily: 'inherit', fontWeight: 'bold' }}>
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Content Mount Area */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'architecture' && (
          <pre style={{ fontSize: '1.25rem', lineHeight: 1.6, textShadow: '0 0 5px rgba(0, 255, 65, 0.5)' }}>
{`[Next.js App Router] (Active Engine)
  │
  ├── page.tsx
  │    ├── LoadingScreen [Zustand Lock]
  │    ├── Hero [Signature Bound]
  │    ├── AboutProfile
  │    ├── SkillsMatrix [GSAP Data]
  │    ├── ExperienceTimeline [Accordion]
  │    ├── FilmStrip [Marquee Loop]
  │    └── Achievements
  │
  └── layout.tsx
       ├── Navbar [Fixed Anchor]
       ├── ClientLayoutManager
       ├── SmoothScroller [Lenis Engine]
       ├── CustomCursor [gsap.quickTo]
       ├── SettingsDock [Floating Gear]
       ├── ImageModal [Metadata Engine]
       └── DevHUD [CRT Active]`}
          </pre>
        )}

        {activeTab === 'telemetry' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.3fr', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #00FF41', paddingBottom: '0.5rem' }}>ZUSTAND HASH DUMP</h3>
              <pre style={{ fontSize: '1.25rem', lineHeight: 1.5 }}>
{JSON.stringify({
  isTerminalOpen: state.isTerminalOpen,
  isOverclocked: state.isOverclocked,
  isDevMode: state.isDevMode,
  isRecruiterMode: state.isRecruiterMode,
  isEStopped: state.isEStopped,
  tripleClickCount: state.tripleClickCount,
  activeImageObj: state.activeImageDetails ? 'LOADED' : 'NULL'
}, null, 2)}
              </pre>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #00FF41', paddingBottom: '0.5rem' }}>GSAP MEMORY</h3>
              <pre style={{ fontSize: '1.25rem', lineHeight: 1.5 }}>
{`Active Tweens: [ ${gsapCount} ]`}
              </pre>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #00FF41', paddingBottom: '0.5rem' }}>SIGNAL ATTENUATION DIAL</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div 
                    id="attenuation-dial" 
                    className="cursor-text-override"
                    style={{ 
                      width: '74px', 
                      height: '74px', 
                      borderRadius: '50%', 
                      border: '3px solid #00FF41', 
                      backgroundColor: '#111111', 
                      position: 'relative', 
                      cursor: 'grab' 
                    }}
                  >
                    <div style={{ 
                      width: '4px', 
                      height: '22px', 
                      backgroundColor: '#00FF41', 
                      position: 'absolute', 
                      top: '4px', 
                      left: '50%', 
                      transform: 'translateX(-50%)' 
                    }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>DRAG DIAL TO ROTATE</span>
                </div>
                <div style={{ fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div>ATTN_VAL: <span id="attn-readout" style={{ fontWeight: 'bold' }}>0.0 dB</span></div>
                  <div>FREQ_VAL: <span id="freq-readout" style={{ fontWeight: 'bold' }}>0.000 Hz</span></div>
                  <div>DISP_VAL: <span id="disp-readout" style={{ fontWeight: 'bold' }}>0.0 px</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <ul style={{ listStyle: 'none', fontSize: '1.25rem', lineHeight: 2, padding: 0 }}>
            <li><span style={{opacity: 0.5}}>[01:42:10]</span> [WARN] Hydration mismatch bypassed via StrictMode exception.</li>
            <li><span style={{opacity: 0.5}}>[01:42:15]</span> [INFO] FilmStrip Component mounted with seamless repeat constraint.</li>
            <li><span style={{opacity: 0.5}}>[01:42:15]</span> [INFO] Zustand activeImageDetails populated with EXIF metadata node.</li>
            <li><span style={{opacity: 0.5}}>[01:42:17]</span> [INFO] Recruiter mode invoked. Dispatching ScrollTrigger.kill() hook.</li>
            <li><span style={{opacity: 0.5}}>[01:42:18]</span> [INFO] Settings Gear rotation physics active.</li>
          </ul>
        )}
      </div>

      <div style={{ marginTop: 'auto', fontSize: '1.5rem', paddingTop: '2rem', borderTop: '2px solid #00FF41' }}>
        C:\SYSTEM\DEV_MODE\&gt; Awaiting input<span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 50% { opacity: 0; } }
      `}} />
    </div>
  );
}
