'use client';

import { useState, useEffect } from 'react';
import type { HeroData } from '@/app/page';

const PHRASES = [
  "> Compiling ENIX tech fest schedule...",
  "> Initializing Sustaination backend...",
  "> Calibrating ethereal lighting...",
  "> Cultivating raw iron discipline..."
];

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mainTitle, subtitle } = data;

  // Typing effect
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && text === currentPhrase) {
      typingSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentPhrase.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section className="section" style={{ justifyContent: 'center', position: 'relative' }}>
      <div className="terminal-status font-mono">
        {text}
        <span style={{ opacity: text.length === PHRASES[phraseIndex].length ? 1 : 0.5, animation: 'blink 1s step-end infinite' }}>_</span>
      </div>

      <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
        {mainTitle}
      </h1>

      <p
        style={{
          fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
          maxWidth: '650px',
          color: 'var(--color-text)',
          opacity: 0.8,
          margin: '0.5rem 0 1.5rem 0',
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <a href="#experience" className="btn btn-primary" style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}>Routing Connections</a>
        <a href="#contact" className="btn" style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}>Contact</a>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}} />
    </section>
  );
}
