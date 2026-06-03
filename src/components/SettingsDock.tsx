'use client';

import { useAppStore } from '@/store/useAppStore';
import { TerminalSquare, Zap, EyeOff, Settings } from 'lucide-react';
import { useState } from 'react';

export default function SettingsDock() {
  const { isOverclocked, isDevMode, isRecruiterMode, toggleOverclock, toggleDevMode, toggleRecruiterMode } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const dockStyle = {
    position: 'fixed' as const,
    bottom: '40px',
    left: '80px',
    zIndex: 500,
    display: 'flex',
    flexDirection: 'column-reverse' as const,
    gap: '1rem',
    alignItems: 'center'
  };

  const buttonStyle = (isActive: boolean, hasText = false) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hasText ? '0.5rem' : '0',
    width: hasText ? 'auto' : '48px',
    height: '48px',
    padding: hasText ? '0 1rem' : '0',
    backgroundColor: isActive ? 'var(--color-text)' : 'var(--color-bg)',
    color: isActive ? 'var(--color-bg)' : 'var(--color-text)',
    border: '2px solid var(--color-text)',
    cursor: 'none',
    transition: 'all 0.2s',
    boxShadow: '3px 3px 0px 0px var(--color-text)',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div 
      id="settings-dock"
      style={dockStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Master Gear Toggle */}
      <button 
        style={{
          ...buttonStyle(isOpen),
          borderRadius: '50%',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s'
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link"
      >
        <Settings size={24} />
      </button>

      {/* Expanded Actions Stack */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        alignItems: 'center'
      }}>
        <button 
          style={buttonStyle(isRecruiterMode, true)} 
          onClick={toggleRecruiterMode}
          title="Toggle Recruiter Mode (Max Performance)"
          className="nav-link"
        >
          <EyeOff size={20} />
          <span>Recruiter Mode</span>
        </button>

        <button 
          style={buttonStyle(isDevMode, true)} 
          onClick={toggleDevMode}
          title="Toggle Dev HUD"
          className="nav-link"
        >
          <TerminalSquare size={20} />
          <span>Dev HUD</span>
        </button>

        <button 
          style={buttonStyle(isOverclocked, true)} 
          onClick={toggleOverclock}
          title="Toggle Overclock Mode"
          className="nav-link"
        >
          <Zap size={20} />
          <span>Overclock</span>
        </button>
      </div>
    </div>
  );
}
