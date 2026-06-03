'use client';

import React from 'react';
import type { NavigationSettingsData } from '@/app/page';

interface NavbarProps {
  data: NavigationSettingsData;
}

export default function Navbar({ data }: NavbarProps) {
  const { logoText, navLinks } = data;

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-logo">
          <a href="#" className="nav-link logo-link" style={{ color: 'inherit', textDecoration: 'none' }}>
            {logoText}
          </a>
        </div>
        
        <div className="navbar-links">
          {navLinks?.map((link, i) => (
            <a key={i} href={link.slug} className="nav-link">
              {link.label}
            </a>
          ))}
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
          padding: 0.5rem 2rem;
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

        .logo-link {
          display: inline-flex;
          align-items: center;
          min-height: 48px;
          min-width: 48px;
        }

        .navbar-links {
          display: flex;
          gap: clamp(0.2rem, 1vw, 1rem);
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          min-width: 48px;
          padding: 0 0.5rem;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0.25rem 1rem !important;
            top: 10px !important;
            width: 96% !important;
          }
          .navbar-links {
            gap: 0 !important;
          }
        }

        @media (max-width: 375px) {
          .navbar-container {
            width: 98% !important;
            padding: 0.25rem 0.5rem !important;
          }
        }
      `}} />
    </>
  );
}
