'use client';

import React from 'react';

export default function Navbar() {
  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-logo">
          <a href="#" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>SYS.N</a>
        </div>
        
        <div className="navbar-links">
          <a href="#about" className="nav-link">Identity</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Timeline</a>
          <a href="#photography" className="nav-link">Lens</a>
          <a href="#achievements" className="nav-link">Benchmarks</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{__html: `
        .navbar-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 1000px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--color-bg);
          border: var(--border-thick);
          box-shadow: var(--shadow-brutal);
          border-radius: 50px;
          z-index: 100;
          transition: all 0.2s;
        }

        .navbar-logo {
          font-weight: 900;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          flex-shrink: 0;
        }

        .navbar-links {
          display: flex;
          gap: clamp(0.4rem, 1.8vw, 2rem);
          align-items: center;
          font-weight: bold;
          flex-wrap: nowrap;
          justify-content: flex-end;
          overflow: hidden;
        }

        .navbar-links .nav-link {
          font-size: clamp(0.62rem, 1.4vw, 0.95rem);
          color: inherit;
          text-decoration: none;
          text-transform: uppercase;
          white-space: nowrap;
          transition: opacity 0.2s;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0.65rem 1rem !important;
            top: 10px !important;
            width: 96% !important;
          }
          .navbar-links {
            gap: clamp(0.35rem, 1.2vw, 0.8rem) !important;
          }
        }

        @media (max-width: 375px) {
          /* Further tighten margins and scale down slightly on tiny viewports */
          .navbar-container {
            width: 98% !important;
            padding: 0.5rem 0.75rem !important;
          }
        }
      `}} />
    </>
  );
}
