'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/store/useAppStore';
import type { FooterData } from '@/app/page';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isRecruiterMode = useAppStore((state) => state.isRecruiterMode);

  const { copyrightText, socialLinks } = data;

  useEffect(() => {
    if (isRecruiterMode) {
      if (footerRef.current) {
        gsap.set(footerRef.current, { clearProps: 'y' });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { y: 100 },
          {
            y: 0,
            ease: "bounce.out",
            duration: 1.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isRecruiterMode]);

  return (
    <>
      <footer id="contact" ref={footerRef} className="section" style={{ borderTop: 'var(--border-thick)', backgroundColor: 'var(--color-bg)', minHeight: 'auto', paddingBottom: '2rem' }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>06. The Horizon</h2>

        <div className="footer-layout-wrapper">
          {/* Left Column: Contact Copy */}
          <div className="footer-copy-col">
            <p style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 1.2, textTransform: 'uppercase' }}>
              Initiate Contact Sequence. Let&apos;s engineer something meaningful.
            </p>
            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)' }}>
              Available for high-level systems architecture, visual storytelling, and organizational leadership roles.
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="footer-form-col">
            <ContactForm />
          </div>
        </div>

        {/* Subtext Footer */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)', paddingTop: '2rem', borderTop: '2px solid var(--color-text)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="font-mono" style={{ fontWeight: 'bold', maxWidth: '600px', fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)' }}>
            {copyrightText}
          </span>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="nav-link font-mono" style={{ fontWeight: 'bold', textDecoration: 'underline', color: 'inherit', minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}>
                [{link.platformName}]
              </a>
            ))}
            <Link 
              href="/privacy" 
              className="nav-link font-mono hover:text-green-500" 
              style={{ 
                fontWeight: 'bold', 
                textDecoration: 'underline', 
                color: 'inherit', 
                minHeight: '48px', 
                display: 'inline-flex', 
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
            >
              [PRIVACY_POLICY]
            </Link>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .footer-layout-wrapper {
            display: flex;
            flex-direction: row;
            gap: clamp(2rem, 5vw, 4rem);
            width: 100%;
            align-items: flex-start;
          }

          .footer-copy-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-right: clamp(0rem, 2vw, 2rem);
          }

          .footer-form-col {
            flex: 1;
            width: 100%;
          }

          @media (max-width: 768px) {
            .footer-layout-wrapper {
              flex-direction: column;
              gap: 2rem;
            }
            .footer-copy-col {
              padding-right: 0;
            }
          }
        `}} />
      </footer>
    </>
  );
}
