'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register GSAP Draggable plugin safely on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export default function DevHUD() {
  const state = useAppStore();

  // Sector A: Sustaination OS Telemetry State
  const [latency, setLatency] = useState<number>(24);
  const [nodesCount, setNodesCount] = useState<number>(1402);
  const [efficiency, setEfficiency] = useState<number>(98.4);
  const [cacheBanner, setCacheBanner] = useState<boolean>(false);

  // Sector B: Oscilloscope Waveform Rendering State
  const [pathD, setPathD] = useState<string>('');
  
  // Sector C: Optics Rig Lens Selector State
  const [selectedLens, setSelectedLens] = useState<'alpha' | 'beta'>('alpha');

  // Interactive Coordinates & Reference Hooks for High-Performance Animation
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<number>(0);
  const mouseVelocityRef = useRef<number>(0);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const phaseRef = useRef<number>(0);
  const draggableRef = useRef<any[]>([]);

  // Telemetry Interval Loop (Sector A) - Fluctuates every 800ms
  useEffect(() => {
    if (!state.isDevMode) return;

    const telemetryInterval = setInterval(() => {
      // FIRESTORE DB SYNC LATENCY: random bounce between 18ms and 32ms
      setLatency(Math.floor(Math.random() * (32 - 18 + 1)) + 18);
      
      // ACTIVE HARVEST NODES: 1,402 CLUSTERS with secondary integer noise +/- 4
      setNodesCount(1402 + Math.floor(Math.random() * 9) - 4);
      
      // SUSTAINABLE SOIL MATRIX RE-CALIBRATION: 98.4% EFFICIENCY with fractional drift +/- 0.15%
      const drift = Math.random() * 0.3 - 0.15;
      setEfficiency(Number((98.4 + drift).toFixed(2)));
    }, 800);

    return () => {
      clearInterval(telemetryInterval);
    };
  }, [state.isDevMode]);

  // Container Scroll Tracking for Waveform Frequency Modulation
  useEffect(() => {
    if (!state.isDevMode) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      scrollTopRef.current = container.scrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [state.isDevMode]);

  // Real-time Mouse Velocity Tracking for Oscilloscope Distortion
  useEffect(() => {
    if (!state.isDevMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastMousePosRef.current.time || 1;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Compute mouse speed (pixels per ms) and cap it for stability
      const velocity = dist / dt;
      mouseVelocityRef.current = Math.min(15, velocity);

      lastMousePosRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state.isDevMode]);

  // RequestAnimationFrame Animation Loop for SVG Bezier Sine Wave
  useEffect(() => {
    if (!state.isDevMode) return;

    let animId: number;
    const width = 400;
    const height = 120;
    const centerY = height / 2;

    const drawWave = () => {
      // Phase shifts continuously, accelerated by cursor sweeps
      phaseRef.current += 0.04 + mouseVelocityRef.current * 0.08;
      
      // Decay velocity exponentially to return wave to rest position
      mouseVelocityRef.current *= 0.95;
      if (mouseVelocityRef.current < 0.01) {
        mouseVelocityRef.current = 0;
      }

      // Compute frequency based on scrolling position and mouse speed
      const scrollY = scrollTopRef.current;
      const freq = 0.015 + (scrollY * 0.00004) + (mouseVelocityRef.current * 0.02);
      
      // Compute amplitude with mathematical random noise & speed expansion
      const noise = (Math.random() - 0.5) * 5;
      const amp = 25 + noise + (mouseVelocityRef.current * 10);

      // Generate points array to translate into bezier curve commands
      const points: { x: number; y: number }[] = [];
      const step = 20; // 20px intervals
      
      for (let x = 0; x <= width; x += step) {
        // Apply sinusoidal physical distortion mapped to cursor speed
        const distortion = Math.sin(x * 0.07 + phaseRef.current * 2.5) * (mouseVelocityRef.current * 6);
        const y = centerY + Math.sin(x * freq + phaseRef.current) * amp + distortion;
        points.push({ x, y });
      }

      // Convert points array into Quadratic Bezier curve instructions (M x y Q cx cy, x y)
      let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i - 1].x + points[i].x) / 2;
        const yc = (points[i - 1].y + points[i].y) / 2;
        d += ` Q ${points[i - 1].x.toFixed(1)} ${points[i - 1].y.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`;
      }
      d += ` L ${points[points.length - 1].x.toFixed(1)} ${points[points.length - 1].y.toFixed(1)}`;

      setPathD(d);
      animId = requestAnimationFrame(drawWave);
    };

    animId = requestAnimationFrame(drawWave);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [state.isDevMode]);

  // GSAP Draggable Instances Setup for Dial & stickers (Sector B)
  useEffect(() => {
    if (!state.isDevMode) return;

    // Reset SVG displacement filter states on mount for clean starts
    const turb = document.getElementById('noise-turbulence');
    const disp = document.querySelector('#attenuation-noise feDisplacementMap');
    if (turb) turb.setAttribute('baseFrequency', '0');
    if (disp) disp.setAttribute('scale', '0');

    // Draggable stickers
    const dragInstances = Draggable.create('.dev-sticker', {
      type: 'x,y',
      bounds: '.command-deck-wrapper',
    });

    // Draggable Attenuation Dial
    const dialInstance = Draggable.create('#attenuation-dial', {
      type: 'rotation',
      bounds: { minRotation: 0, maxRotation: 360 },
      onDrag: function (this: any) {
        const rot = this.rotation; // 0 to 360 deg
        const freq = rot / 7200;
        const scale = rot / 10;

        // Apply hardware filter updates directly to DOM elements
        const noiseTurb = document.getElementById('noise-turbulence');
        const noiseDisp = document.querySelector('#attenuation-noise feDisplacementMap');
        if (noiseTurb) noiseTurb.setAttribute('baseFrequency', freq.toFixed(5));
        if (noiseDisp) noiseDisp.setAttribute('scale', scale.toFixed(2));

        // Update diagnostic readings inside oscilloscope panel
        const attnReadout = document.getElementById('attn-readout');
        const freqReadout = document.getElementById('freq-readout');
        const dispReadout = document.getElementById('disp-readout');
        if (attnReadout) attnReadout.innerText = `${(scale / 1.5).toFixed(1)} dB`;
        if (freqReadout) freqReadout.innerText = `${(freq * 100).toFixed(3)} Hz`;
        if (dispReadout) dispReadout.innerText = `${scale.toFixed(1)} px`;
      },
    });

    draggableRef.current = [...dragInstances, ...dialInstance];

    return () => {
      // Comprehensive garbage collection for GSAP Draggables
      draggableRef.current.forEach((instance) => {
        if (instance && typeof instance.kill === 'function') {
          instance.kill();
        }
      });
      draggableRef.current = [];
    };
  }, [state.isDevMode]);

  const handleCacheFlush = () => {
    setCacheBanner(true);
    setTimeout(() => {
      setCacheBanner(false);
    }, 2000);
  };

  if (!state.isDevMode) return null;

  return (
    <div
      ref={containerRef}
      className="command-deck-wrapper"
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: '#0D0D0D',
        color: '#00FF41',
        fontFamily: "'JetBrains Mono', monospace",
        overflowY: 'auto',
        border: '1px solid #222',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Repeating CRT Scanline Overlay */}
      <div
        className="crt-scanline-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
          zIndex: 99990,
        }}
      />

      {/* Massive Tactile Close Target */}
      <button
        onClick={state.closeOverlays}
        className="devhud-exit-btn"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 99999,
          backgroundColor: '#FF3B30',
          color: '#FFFFFF',
          border: '3px solid #000000',
          fontFamily: 'inherit',
          fontWeight: 900,
          fontSize: '0.85rem',
          height: '48px',
          minWidth: '160px',
          cursor: 'pointer',
          boxShadow: '4px 4px 0px #000000',
          textTransform: 'uppercase',
          outline: 'none',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.1s ease',
        }}
      >
        EXIT WORKSPACE
      </button>

      {/* Draggable Decals & Stickers Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
        {/* Sticker A: ECE Danger Warning */}
        <div
          className="dev-sticker cursor-grab-override"
          style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            pointerEvents: 'auto',
            zIndex: 1000,
            transform: 'rotate(-6deg)',
          }}
        >
          <div
            style={{
              background: '#FFD700',
              color: '#000',
              border: '3px solid #000000',
              padding: '6px 12px',
              fontWeight: 900,
              fontSize: '0.65rem',
              boxShadow: '3px 3px 0px #000000',
              textTransform: 'uppercase',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>⚡ CAUTION ⚡</span>
            <span style={{ fontSize: '0.55rem', fontWeight: 700 }}>HIGH VOLTAGE LAB</span>
          </div>
        </div>

        {/* Sticker B: Lens Specs Sticker */}
        <div
          className="dev-sticker cursor-grab-override"
          style={{
            position: 'absolute',
            top: '25%',
            right: '12%',
            pointerEvents: 'auto',
            zIndex: 1000,
            transform: 'rotate(5deg)',
          }}
        >
          <div
            style={{
              background: '#FF3B30',
              color: '#FFFFFF',
              border: '3px solid #000000',
              padding: '8px 14px',
              fontWeight: 900,
              fontSize: '0.65rem',
              boxShadow: '3px 3px 0px #000000',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            📷 SONY α6400 RIG
          </div>
        </div>

        {/* Sticker C: Web App Platform Badge */}
        <div
          className="dev-sticker cursor-grab-override"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '20%',
            pointerEvents: 'auto',
            zIndex: 1000,
            transform: 'rotate(-8deg)',
          }}
        >
          <div
            style={{
              background: '#00FF41',
              color: '#000',
              border: '3px solid #000000',
              padding: '6px 10px',
              fontWeight: 900,
              fontSize: '0.6rem',
              boxShadow: '3px 3px 0px #000000',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            SUSTAINATION OS v1.0
          </div>
        </div>
      </div>

      {/* Main Container Contents */}
      <div style={{ flex: 1, padding: '2.5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Physical Panel Header */}
        <div
          className="command-deck-header"
          style={{
            borderBottom: '3px solid #222',
            paddingBottom: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              height: '8px',
              background:
                'repeating-linear-gradient(45deg, #FFB000, #FFB000 10px, #111111 10px, #111111 20px)',
              border: '1px solid #222',
              width: '100%',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                }}
              >
                <span className="status-led led-default" style={{ width: '12px', height: '12px' }} />
                <span className="status-led led-active" style={{ width: '12px', height: '12px' }} />
                <span className="status-led led-darkroom" style={{ width: '12px', height: '12px' }} />
              </div>
              <h1
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  margin: 0,
                  color: '#FFFFFF',
                  textShadow: '0 0 8px rgba(0, 255, 65, 0.4)',
                }}
              >
                ENGINEERING COMMAND DECK // PORTFOLIO CONSOLE
              </h1>
            </div>

            <div
              className="hide-on-mobile"
              style={{
                fontSize: '0.75rem',
                color: '#666666',
                textTransform: 'uppercase',
              }}
            >
              SYS_NODE_LOC: PORTFOLIO-V2 // OSCILLOSCOPE: ONLINE
            </div>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="devhud-grid">
          
          {/* MODULE SECTOR A: [LOGIC FRAMEWORK] — SUSTAINATION OS */}
          <div
            className="command-deck-card sector-a"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#121212',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0px 0px #000000',
              padding: '1.5rem',
              position: 'relative',
            }}
          >
            {/* Corner Decorative Screws */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />

            <div style={{ borderBottom: '2px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#00FF41' }}>[SECTOR 01: LOGIC FRAMEWORK]</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '4px 0 0 0', color: '#FFFFFF' }}>
                SUSTAINATION OS
              </h2>
            </div>

            {/* Simulated Live Telemetry Updates */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                fontSize: '0.8rem',
                color: '#00FF41',
                flex: 1,
              }}
            >
              <div>
                &gt; FIRESTORE DB SYNC: <span style={{ color: '#FFFFFF' }}>ONLINE</span> // LATENCY:{' '}
                <span style={{ fontWeight: 900 }}>{latency}ms</span>
              </div>
              <div>
                &gt; ACTIVE HARVEST NODES:{' '}
                <span style={{ color: '#FFFFFF', fontWeight: 900 }}>
                  {nodesCount.toLocaleString()} CLUSTERS
                </span>
              </div>
              <div>
                &gt; SUSTAINABLE SOIL MATRIX RE-CALIBRATION:{' '}
                <span style={{ color: '#FFFFFF', fontWeight: 900 }}>{efficiency.toFixed(2)}% EFFICIENCY</span>
              </div>
            </div>

            {/* Flashing Green Notification Banner */}
            {cacheBanner && (
              <div
                className="flash-green-banner"
                style={{
                  marginTop: '1.5rem',
                  padding: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  textAlign: 'center',
                  border: '2px solid #00FF41',
                  textTransform: 'uppercase',
                }}
              >
                🚨 SYS_MSG: PRODUCTION CACHE FLUSHED // NODES RE-INDEXED 🚨
              </div>
            )}

            <button
              onClick={handleCacheFlush}
              className="devhud-brutal-btn"
              style={{
                marginTop: cacheBanner ? '0.75rem' : 'auto',
                backgroundColor: 'transparent',
                color: '#00FF41',
                border: '2px solid #00FF41',
                padding: '10px',
                fontFamily: 'inherit',
                fontWeight: 900,
                fontSize: '0.75rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '3px 3px 0px #00FF41',
                transition: 'all 0.1s ease',
              }}
            >
              FORCE PRODUCTION CACHE FLUSH
            </button>
          </div>

          {/* MODULE SECTOR B: [WAVEFORM ANALYSIS] — SIGNAL OSCILLOSCOPE */}
          <div
            className="command-deck-card sector-b"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#121212',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0px 0px #000000',
              padding: '1.5rem',
              position: 'relative',
            }}
          >
            {/* Corner Decorative Screws */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />

            <div style={{ borderBottom: '2px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#00FF41' }}>[SECTOR 02: WAVEFORM ANALYSIS]</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '4px 0 0 0', color: '#FFFFFF' }}>
                SIGNAL OSCILLOSCOPE
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Active Analog Screen Grid */}
              <div
                style={{
                  position: 'relative',
                  border: '2px solid #00FF41',
                  backgroundColor: '#050505',
                  overflow: 'hidden',
                  lineHeight: 0,
                }}
              >
                <svg
                  viewBox="0 0 400 120"
                  style={{
                    width: '100%',
                    height: '120px',
                    display: 'block',
                  }}
                >
                  <defs>
                    <pattern id="osc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 65, 0.08)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  
                  {/* Grid Background */}
                  <rect width="100%" height="100%" fill="url(#osc-grid)" />
                  
                  {/* Crosshairs */}
                  <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(0, 255, 65, 0.15)" strokeDasharray="3,3" />
                  <line x1="200" y1="0" x2="200" y2="120" stroke="rgba(0, 255, 65, 0.15)" strokeDasharray="3,3" />

                  {/* Bezier Recalculated Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#00FF41"
                    strokeWidth="2.5"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(0, 255, 65, 0.8))',
                    }}
                  />
                </svg>
              </div>

              {/* Rotary Dial & Coordinates */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  flexWrap: 'wrap',
                  backgroundColor: '#0a0a0a',
                  padding: '10px',
                  border: '1px solid #222',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {/* Mechanical Attenuation Rotary Dial */}
                  <div
                    id="attenuation-dial"
                    className="cursor-grab-override"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '3px solid #00FF41',
                      backgroundColor: '#151515',
                      position: 'relative',
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
                    }}
                  >
                    <div
                      style={{
                        width: '4px',
                        height: '14px',
                        backgroundColor: '#FFB000',
                        position: 'absolute',
                        top: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 4px #FFB000',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.55rem', color: '#666666', fontWeight: 900 }}>
                    ATTENUATE DIAL
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.7rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    color: '#00FF41',
                    fontFamily: 'inherit',
                  }}
                >
                  <div>
                    ATTN_VAL: <span id="attn-readout" style={{ fontWeight: 900, color: '#FFFFFF' }}>0.0 dB</span>
                  </div>
                  <div>
                    FREQ_VAL: <span id="freq-readout" style={{ fontWeight: 900, color: '#FFFFFF' }}>0.000 Hz</span>
                  </div>
                  <div>
                    DISP_VAL: <span id="disp-readout" style={{ fontWeight: 900, color: '#FFFFFF' }}>0.0 px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODULE SECTOR C: [OPTICS TELEMETRY] — SONY α6400 RIG */}
          <div
            className="command-deck-card sector-c"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#121212',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0px 0px #000000',
              padding: '1.5rem',
              position: 'relative',
            }}
          >
            {/* Corner Decorative Screws */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />

            <div style={{ borderBottom: '2px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#00FF41' }}>[SECTOR 03: OPTICS TELEMETRY]</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '4px 0 0 0', color: '#FFFFFF' }}>
                SONY α6400 RIG
              </h2>
            </div>

            {/* Lens Switch Selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <button
                onClick={() => setSelectedLens('alpha')}
                style={{
                  flex: 1,
                  backgroundColor: selectedLens === 'alpha' ? '#1c1c1c' : '#0a0a0a',
                  color: selectedLens === 'alpha' ? '#00FF41' : '#666666',
                  border: '2px solid',
                  borderColor: selectedLens === 'alpha' ? '#00FF41' : '#333333',
                  padding: '8px',
                  fontFamily: 'inherit',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: selectedLens === 'alpha' ? '2px 2px 0px #00FF41' : 'none',
                  transform: selectedLens === 'alpha' ? 'translate(-1px, -1px)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: selectedLens === 'alpha' ? '#FFB000' : '#444444',
                    boxShadow: selectedLens === 'alpha' ? '0 0 6px #FFB000' : 'none',
                  }}
                />
                16-50MM ZOOM
              </button>
              
              <button
                onClick={() => setSelectedLens('beta')}
                style={{
                  flex: 1,
                  backgroundColor: selectedLens === 'beta' ? '#1c1c1c' : '#0a0a0a',
                  color: selectedLens === 'beta' ? '#00FF41' : '#666666',
                  border: '2px solid',
                  borderColor: selectedLens === 'beta' ? '#00FF41' : '#333333',
                  padding: '8px',
                  fontFamily: 'inherit',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: selectedLens === 'beta' ? '2px 2px 0px #00FF41' : 'none',
                  transform: selectedLens === 'beta' ? 'translate(-1px, -1px)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: selectedLens === 'beta' ? '#FFB000' : '#444444',
                    boxShadow: selectedLens === 'beta' ? '0 0 6px #FFB000' : 'none',
                  }}
                />
                20MM PRIME
              </button>
            </div>

            {/* Camera Diagnostics Terminal Readout */}
            <div
              style={{
                backgroundColor: '#050505',
                border: '1px solid #222',
                padding: '10px',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                color: '#00FF41',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {selectedLens === 'alpha' ? (
                <>
                  <div style={{ color: '#FFFFFF', fontWeight: 900, marginBottom: '6px' }}>
                    &gt; SONY E 16-50mm f/3.5-5.6 OSS
                  </div>
                  <div>FOCAL STEPS: MULTI-STAGE</div>
                  <div>FIELD ARCHITECTURE: VARIABLE VARIABLE</div>
                  <div>POWER ZOOM CAPACITOR: ARMED</div>
                </>
              ) : (
                <>
                  <div style={{ color: '#FFFFFF', fontWeight: 900, marginBottom: '6px' }}>
                    &gt; VILTROX 20mm f/2.8 PRIME
                  </div>
                  <div>FOCAL STEPS: FIXED 20mm</div>
                  <div>APERTURE GAP: MAX f/2.8 WIDE</div>
                  <div>CHROMATIC DEVIATION: OPTIMIZED ZERO</div>
                </>
              )}
            </div>
          </div>

          {/* MODULE SECTOR D: [NETWORK ARCHITECTURE] — LEADERSHIP CORES */}
          <div
            className="command-deck-card sector-d"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#121212',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0px 0px #000000',
              padding: '1.5rem',
              position: 'relative',
            }}
          >
            {/* Corner Decorative Screws */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #333', background: '#222' }} />

            <div style={{ borderBottom: '2px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#00FF41' }}>[SECTOR 04: NETWORK ARCHITECTURE]</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '4px 0 0 0', color: '#FFFFFF' }}>
                LEADERSHIP CORES
              </h2>
            </div>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table
                className="command-deck-table"
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '3px solid #000000',
                  color: '#00FF41',
                  fontSize: '0.75rem',
                  backgroundColor: '#050505',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: '#161616',
                      borderBottom: '3px solid #000000',
                    }}
                  >
                    <th
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        textAlign: 'left',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                      }}
                    >
                      CORE NODE
                    </th>
                    <th
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        textAlign: 'left',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                      }}
                    >
                      TELEMETRY COORDINATES
                    </th>
                    <th
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        textAlign: 'center',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        width: '120px',
                      }}
                    >
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '2px solid #222' }}>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        fontWeight: 900,
                        color: '#00FF41',
                      }}
                    >
                      IEEE WIE CORE
                    </td>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        color: '#AAAAAA',
                      }}
                    >
                      MEMBERSHIP DEVELOPMENT ONBOARDING: ACTIVE // CLUSTER NODE: 2026-2027 REGION
                    </td>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        color: '#00FF41',
                        fontWeight: 900,
                        textAlign: 'center',
                      }}
                    >
                      ACTIVE
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        fontWeight: 900,
                        color: '#00FF41',
                      }}
                    >
                      ENIX EXECUTIVE COMMS
                    </td>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        color: '#AAAAAA',
                      }}
                    >
                      TECH FEST ARCHITECTURE: COORDINATION LOCK // FREQUENCY: STABLE
                    </td>
                    <td
                      style={{
                        border: '2px solid #222',
                        padding: '10px 12px',
                        color: '#FFB000',
                        fontWeight: 900,
                        textAlign: 'center',
                      }}
                    >
                      LOCKED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Styled scoped styling via dangerouslySetInnerHTML */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink-green {
            0%, 100% { background-color: #00FF41; color: #000000; }
            50% { background-color: #000000; color: #00FF41; border-color: #00FF41; }
          }
          
          .flash-green-banner {
            animation: blink-green 0.5s infinite;
          }

          .devhud-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            width: 100%;
          }

          .sector-a { grid-column: span 1; }
          .sector-b { grid-column: span 1; }
          .sector-c { grid-column: span 1; }
          .sector-d { grid-column: span 3; }

          .devhud-exit-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #000000 !important;
          }
          .devhud-exit-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px #000000 !important;
          }

          .devhud-brutal-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 5px 5px 0px #00FF41 !important;
          }
          .devhud-brutal-btn:active {
            transform: translate(1px, 1px);
            box-shadow: 1px 1px 0px #00FF41 !important;
          }

          .cursor-grab-override {
            cursor: grab !important;
          }
          .cursor-grab-override:active {
            cursor: grabbing !important;
          }

          @media (max-width: 1024px) {
            .command-deck-wrapper {
              padding: 5rem 0 1.5rem 0 !important;
            }
            .devhud-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
              padding: 1.5rem !important;
            }
            .sector-a, .sector-b, .sector-c, .sector-d {
              grid-column: span 1 !important;
            }
            .hide-on-mobile {
              display: none !important;
            }
            .command-deck-header {
              padding: 0 1.5rem 1rem 1.5rem !important;
            }
            .command-deck-header h1 {
              font-size: 1.1rem !important;
            }
            .devhud-exit-btn {
              top: 15px !important;
              right: 15px !important;
              height: 48px !important;
              font-size: 0.8rem !important;
              min-width: 140px !important;
            }
          }
        `
      }} />
    </div>
  );
}
