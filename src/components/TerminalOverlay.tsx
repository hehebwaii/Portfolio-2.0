'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import gsap from 'gsap';

export default function TerminalOverlay() {
  const { isTerminalOpen, toggleTerminal, setTerminalOpen, toggleOverclock, toggleDevMode } = useAppStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>(['> SYSTEM TERMINAL V1.0. TYPE "help" FOR COMMANDS.']);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isTerminalOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setTerminalOpen(true);
      } else if (e.key === 'Escape' && isTerminalOpen) {
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (overlayRef.current) {
      if (isTerminalOpen) {
        gsap.fromTo(
          overlayRef.current,
          { y: '-100%' },
          { y: '0%', duration: 0.5, ease: 'power4.out' }
        );
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        gsap.to(overlayRef.current, { y: '-100%', duration: 0.4, ease: 'power4.in' });
      }
    }
  }, [isTerminalOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    let output = '';
    switch (cmd) {
      case 'help':
        output = 'AVAILABLE COMMANDS: help, overclock, devmode, close, exit';
        break;
      case 'overclock':
        toggleOverclock();
        output = 'OVERCLOCK MODE TOGGLED.';
        break;
      case 'devmode':
        toggleDevMode();
        output = 'DEVELOPER HUD TOGGLED.';
        break;
      case 'close':
      case 'exit':
        setTerminalOpen(false);
        output = 'TERMINATING SESSION...';
        break;
      case '':
        break;
      default:
        output = `COMMAND NOT FOUND: ${cmd}`;
    }

    setHistory((prev) => [...prev, `> ${cmd}`, output].filter(Boolean));
    setInput('');
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: '#00FF41',
        zIndex: 100,
        fontFamily: "'JetBrains Mono', monospace",
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        transform: 'translateY(-100%)', // Initial state for SSR
        pointerEvents: isTerminalOpen ? 'auto' : 'none', // Ensure it doesn't block clicks when closed
      }}
    >
      <div 
        data-lenis-prevent="true"
        style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="cursor-text-override" // Critical: Restore I-beam cursor
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            color: '#00FF41',
            fontFamily: 'inherit',
            fontSize: '1rem',
            outline: 'none',
          }}
          autoFocus={isTerminalOpen}
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
