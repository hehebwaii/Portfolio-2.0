'use client';

import React from 'react';
import { FadeIn } from '@/components/shared/DesignSystem';
import type { ServicesData } from '@/app/page';

interface ServicesProps {
  data: ServicesData;
}

export default function Services({ data }: ServicesProps) {
  const { sectionHeading, items } = data;

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        padding: 'clamp(4rem, 8vw, 8rem) 5%',
        marginTop: '-2rem',
      }}
    >
      {/* Section Heading */}
      <FadeIn
        as="div"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: 'clamp(3rem, 6vw, 6rem)',
        }}
      >
        <h2
          style={{
            color: '#0C0C0C',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          {sectionHeading}
        </h2>
        <p
          className="font-mono"
          style={{
            color: 'rgba(12, 12, 12, 0.5)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}
        >
          What I bring to the table
        </p>
      </FadeIn>

      {/* Services List */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {items.map((service, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className="service-row"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
              }}
            >
              <div
                className="service-row-inner"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(1.5rem, 4vw, 3rem)',
                }}
              >
                <span
                  className="font-mono service-number"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 140px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'rgba(12, 12, 12, 0.08)',
                    letterSpacing: '-0.03em',
                    flexShrink: 0,
                    userSelect: 'none',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {service.index}
                </span>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    minWidth: 0,
                    paddingTop: 'clamp(0.25rem, 1vw, 1rem)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#0C0C0C',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                      color: 'rgba(12, 12, 12, 0.6)',
                      lineHeight: 1.6,
                      maxWidth: '600px',
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .service-row:hover .service-number {
          color: rgba(12, 12, 12, 0.25) !important;
        }

        @media (max-width: 768px) {
          .service-row-inner {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }

          .service-number {
            font-size: clamp(2.5rem, 15vw, 5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
