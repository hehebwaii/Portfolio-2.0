'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VelocityMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Create a ScrollTrigger instance to track viewport scroll velocity
    const scrollTracker = ScrollTrigger.create({});

    // Core GSAP marquee tween
    const marqueeTween = gsap.to(marquee, {
      xPercent: -50,
      ease: 'none',
      duration: 30, // Base duration for normal speed
      repeat: -1
    });

    let currentVelocity = 0;
    const baseSpeed = 1;

    const updateMarqueeSpeed = () => {
      // Get vertical scroll velocity (pixels per second) from the instance
      const scrollVelocity = Math.abs(scrollTracker.getVelocity()) || 0;

      // Lerp / interpolate the velocity value for smooth transitions and decay
      currentVelocity = gsap.utils.interpolate(currentVelocity, scrollVelocity, 0.06);

      // Map velocity to a timescale multiplier
      const timeScaleTarget = baseSpeed + (currentVelocity / 180);
      marqueeTween.timeScale(timeScaleTarget);

      // Map velocity to text blur filter (max 8px blur)
      const blurAmount = Math.min(8, currentVelocity / 250);
      marquee.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
    };

    // Attach velocity tracking loop to GSAP ticker
    gsap.ticker.add(updateMarqueeSpeed);

    return () => {
      marqueeTween.kill();
      scrollTracker.kill();
      gsap.ticker.remove(updateMarqueeSpeed);
    };
  }, []);

  const marqueeText = "SYSTEMS ARCHITECTURE // CREATIVE VISUALS // HARDWARE LOGIC // ";

  return (
    <div 
      id="velocity-marquee-container"
      style={{
        position: 'fixed',
        top: '50%',
        left: 0,
        width: '100vw',
        transform: 'translateY(-50%)',
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      <div 
        ref={marqueeRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform, filter'
        }}
      >
        <span 
          className="font-mono"
          style={{
            fontSize: '8vw',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px var(--color-text)',
            opacity: 0.05,
            letterSpacing: '0.05em',
            paddingRight: '2rem'
          }}
        >
          {marqueeText}
        </span>
        <span 
          className="font-mono"
          style={{
            fontSize: '8vw',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px var(--color-text)',
            opacity: 0.05,
            letterSpacing: '0.05em',
            paddingRight: '2rem'
          }}
        >
          {marqueeText}
        </span>
        <span 
          className="font-mono"
          style={{
            fontSize: '8vw',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px var(--color-text)',
            opacity: 0.05,
            letterSpacing: '0.05em',
            paddingRight: '2rem'
          }}
        >
          {marqueeText}
        </span>
        <span 
          className="font-mono"
          style={{
            fontSize: '8vw',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px var(--color-text)',
            opacity: 0.05,
            letterSpacing: '0.05em',
            paddingRight: '2rem'
          }}
        >
          {marqueeText}
        </span>
      </div>
    </div>
  );
}
