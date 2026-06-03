'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// 1. FadeIn Component
interface FadeInProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({ children, as = 'div', delay = 0, className, style }: FadeInProps) {
  // Leverage motion.create() if available, fallback to motion(tag)
  const MotionEl = motion.create 
    ? motion.create(as as any) 
    : motion(as as any);

  return (
    <MotionEl
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionEl>
  );
}

// 2. Magnet Component (Mouse-following spring physics, disabled on touch viewports)
interface MagnetProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Magnet({ children, range = 50, strength = 0.35, className, style }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setDisabled(isTouch);
    }
  }, []);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const transform = useTransform(
    [springX, springY],
    ([latestX, latestY]) => `translate3d(${latestX}px, ${latestY}px, 0)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: disabled ? 'none' : transform,
        willChange: disabled ? 'auto' : 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. AnimatedText Component (Character-by-character scroll reveal)
interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'start 50%']
  });

  const words = text.split(' ');
  let charIndex = 0;
  const totalChars = text.replace(/\s/g, '').length || 1;

  return (
    <p 
      ref={containerRef} 
      className={className} 
      style={{ 
        ...style, 
        display: 'flex', 
        flexWrap: 'wrap',
        margin: 0
      }}
    >
      {words.map((word, wIdx) => {
        return (
          <span 
            key={wIdx} 
            style={{ 
              display: 'inline-block', 
              marginRight: '0.25em', 
              whiteSpace: 'nowrap' 
            }}
          >
            {word.split('').map((char, cIdx) => {
              const currentIdx = charIndex++;
              // Start and end fraction for character opacity mapping
              const start = currentIdx / totalChars;
              const end = Math.min(1, (currentIdx + 4) / totalChars);
              
              // Map character opacity from 0.2 (dimmed) to 1.0 (fully active)
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1.0]);

              return (
                <motion.span
                  key={cIdx}
                  style={{ opacity, willChange: 'opacity' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

// 4. LiveProjectButton Component (Ghost capsule pill button)
interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function LiveProjectButton({ href, label = 'LIVE PROJECT', className, onClick }: LiveProjectButtonProps) {
  const buttonContent = (
    <motion.button
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        borderRadius: '9999px',
        border: '2px solid #D7E2EA',
        backgroundColor: 'transparent',
        color: '#D7E2EA',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
      }}
      whileHover="hover"
      initial="initial"
    >
      {/* Backdrop Slide Cover */}
      <motion.span
        variants={{
          initial: { x: '-100%' },
          hover: { x: '0%' }
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#D7E2EA',
          zIndex: 1,
        }}
      />
      {/* Monospace Text */}
      <motion.span
        variants={{
          initial: { color: '#D7E2EA' },
          hover: { color: '#0C0C0C' }
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
