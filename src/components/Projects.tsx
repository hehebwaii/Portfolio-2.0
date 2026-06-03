'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, LiveProjectButton } from '@/components/shared/DesignSystem';
import type { ProjectsData, ProjectCard } from '@/app/page';

// Individual Project Card with sticky stacking + scale transform
interface ProjectCardComponentProps {
  project: ProjectCard;
  index: number;
  totalCards: number;
}

function ProjectCardComponent({ project, index, totalCards }: ProjectCardComponentProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardContainerRef}
      style={{
        height: '85vh',
        position: 'sticky',
        top: `${index * 28}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        style={{
          scale,
          width: '100%',
          maxWidth: '1100px',
          backgroundColor: '#141414',
          border: '2px solid #D7E2EA',
          borderRadius: '12px',
          overflow: 'hidden',
          willChange: 'transform',
          transformOrigin: 'top center',
        }}
      >
        {/* Card Header */}
        <div
          className="project-card-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)',
            borderBottom: '1px solid rgba(215, 226, 234, 0.15)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                color: 'rgba(215, 226, 234, 0.4)',
                letterSpacing: '0.15em',
              }}
            >
              #{project.index}
            </span>

            <span
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                color: '#0C0C0C',
                backgroundColor: '#D7E2EA',
                padding: '4px 10px',
                borderRadius: '4px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {project.category}
            </span>

            <h3
              style={{
                color: '#D7E2EA',
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {project.name}
            </h3>
          </div>

          <LiveProjectButton href={project.liveUrl} label="LIVE PROJECT" />
        </div>

        {/* Card Body — Description */}
        <div
          style={{
            padding: '0 clamp(1.25rem, 3vw, 2rem)',
            paddingTop: 'clamp(0.75rem, 1.5vw, 1rem)',
          }}
        >
          <p
            style={{
              color: 'rgba(215, 226, 234, 0.55)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: 0,
            }}
          >
            {project.description || 'No description available.'}
          </p>
        </div>

        {/* Card Body — Image Grid */}
        <div
          className="project-image-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: 'clamp(0.5rem, 1vw, 0.75rem)',
            padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          {/* Left Column — 2 stacked images */}
          <div
            className="project-image-col-left"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.5rem, 1vw, 0.75rem)',
            }}
          >
            <div
              style={{
                height: 'clamp(130px, 16vw, 230px)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(215, 226, 234, 0.1)',
              }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                height: 'clamp(160px, 22vw, 340px)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(215, 226, 234, 0.1)',
              }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Right Column — 1 tall image */}
          <div
            className="project-image-col-right"
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(215, 226, 234, 0.1)',
            }}
          >
            <img
              src={project.col2TallImage}
              alt={`${project.name} hero image`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile Grid Override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .project-image-grid {
            grid-template-columns: 1fr !important;
          }
          .project-image-col-left > div {
            height: clamp(140px, 35vw, 220px) !important;
          }
          .project-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

interface ProjectsProps {
  data: ProjectsData;
}

export default function Projects({ data }: ProjectsProps) {
  const { sectionHeading, cards } = data;

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#0C0C0C',
        padding: 'clamp(4rem, 8vw, 8rem) 5%',
        marginTop: 'clamp(-2.5rem, -2vw, -3.5rem)',
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
            fontSize: 'clamp(3rem, 12vw, 160px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            margin: 0,
            background: 'linear-gradient(135deg, #D7E2EA 0%, #5A7A8A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {sectionHeading}
        </h2>
        <p
          className="font-mono"
          style={{
            color: 'rgba(215, 226, 234, 0.35)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}
        >
          Featured work &amp; case studies
        </p>
      </FadeIn>

      {/* Stacking Cards Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {cards.map((project, i) => (
          <ProjectCardComponent
            key={i}
            project={project}
            index={i}
            totalCards={cards.length}
          />
        ))}
      </div>
    </section>
  );
}
