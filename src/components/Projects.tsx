'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, LiveProjectButton } from '@/components/shared/DesignSystem';
import { client, urlFor } from '@/sanity/lib/client';

interface ProjectType {
  index: string;
  name: string;
  category: string;
  description: string;
  href: string;
  col1Image1?: any;
  col1Image2?: any;
  col2TallImage?: any;
  fallbackImages: string[];
}

const DEFAULT_PROJECTS: ProjectType[] = [
  {
    index: '001',
    category: 'Full-Stack Platform',
    name: 'Sustaination',
    description:
      'A sustainability-focused social platform designed to track and gamify eco-conscious habits through community engagement and real-time data visualization.',
    href: '#',
    fallbackImages: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    ],
  },
  {
    index: '002',
    category: 'Interactive Portfolio',
    name: 'Portfolio v5',
    description:
      'A Neo-Brutalist developer portfolio featuring GSAP scroll-bound animations, BIOS boot sequences, CRT shader effects, and a fully interactive Engineering Command Deck.',
    href: '#',
    fallbackImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    ],
  },
  {
    index: '003',
    category: 'Community Initiative',
    name: 'Young Innovators',
    description:
      'An IoT-integrated educational framework empowering student engineers with hands-on embedded systems workshops, Arduino labs, and competitive hackathon infrastructure.',
    href: '#',
    fallbackImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1200&q=80',
    ],
  },
];

const getImageUrl = (image: any, fallbackUrl: string) => {
  if (!image) return fallbackUrl;
  try {
    return urlFor(image).url() || fallbackUrl;
  } catch (err) {
    return fallbackUrl;
  }
};

// Individual Project Card with sticky stacking + scale transform
interface ProjectCardProps {
  project: ProjectType;
  index: number;
  totalCards: number;
}

function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start end', 'start start'],
  });

  // Scale target interpolation: e.g. Card 0: 0.94, Card 1: 0.97, Card 2: 1.00
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const img1 = getImageUrl(project.col1Image1, project.fallbackImages[0]);
  const img2 = getImageUrl(project.col1Image2, project.fallbackImages[1]);
  const img3 = getImageUrl(project.col2TallImage, project.fallbackImages[2]);

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
            {/* Index Tag */}
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

            {/* Category Badge */}
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

            {/* Project Name */}
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

          <LiveProjectButton href={project.href} label="LIVE PROJECT" />
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
            {project.description}
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
                src={img1}
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
                src={img2}
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
              src={img3}
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

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    let isMounted = true;
    client.fetch(`*[_type == "project"] | order(index asc)`)
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0 && isMounted) {
          const mapped = data.map((p: any, idx: number) => ({
            index: p.index || `00${idx + 1}`,
            name: p.name || 'Project Name',
            category: p.category || 'Category',
            description: p.description || '',
            href: p.liveUrl || '#',
            col1Image1: p.col1Image1,
            col1Image2: p.col1Image2,
            col2TallImage: p.col2TallImage,
            // Fall back to default project static images in circular order if out of bounds
            fallbackImages: DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].fallbackImages,
          }));
          setProjects(mapped);
        } else if (isMounted) {
          setProjects(DEFAULT_PROJECTS);
        }
      })
      .catch((err) => {
        console.error("Sanity fetch failed in Projects, using local fallbacks:", err);
        if (isMounted) {
          setProjects(DEFAULT_PROJECTS);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
          Projects
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
          Featured work & case studies
        </p>
      </FadeIn>

      {/* Stacking Cards Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard 
            key={i} 
            project={project} 
            index={i} 
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
