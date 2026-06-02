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

  const buttonStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    backgroundColor: isActive ? 'var(--color-text)' : 'var(--color-bg)',
    color: isActive ? 'var(--color-bg)' : 'var(--color-text)',
    border: '2px solid var(--color-text)',
    cursor: 'none',
    transition: 'all 0.2s',
    boxShadow: '3px 3px 0px 0px var(--color-text)',
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
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <button 
          style={buttonStyle(isRecruiterMode)} 
          onClick={toggleRecruiterMode}
          title="Toggle Recruiter Mode (Max Performance)"
          className="nav-link"
        >
          <EyeOff size={24} />
        </button>

        <button 
          style={buttonStyle(isDevMode)} 
          onClick={toggleDevMode}
          title="Toggle Dev HUD"
          className="nav-link"
        >
          <TerminalSquare size={24} />
        </button>

        <button 
          style={buttonStyle(isOverclocked)} 
          onClick={toggleOverclock}
          title="Toggle Overclock Mode"
          className="nav-link"
        >
          <Zap size={24} />
        </button>
      </div>
    </div>
  );
}
