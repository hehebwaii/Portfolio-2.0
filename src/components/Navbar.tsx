'use client';

import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95%',
      maxWidth: '1000px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'var(--color-bg)',
      border: 'var(--border-thick)',
      boxShadow: 'var(--shadow-brutal)',
      borderRadius: '50px',
      zIndex: 100,
      transition: 'all 0.2s'
    }}>
      <div style={{ fontWeight: 900, fontSize: '1.25rem' }}>
        <a href="#" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>SYS.N</a>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 'bold', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <a href="#about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Identity</a>
        <a href="#skills" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Skills</a>
        <a href="#experience" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Timeline</a>
        <a href="#photography" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Lens</a>
        <a href="#achievements" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Benchmarks</a>
        <a href="#contact" className="nav-link" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>Contact</a>
      </div>
    </nav>
  );
}
