'use client';

import BiosBoot from '@/components/BiosBoot'
import Hero from '@/components/Hero'
import AboutProfile from '@/components/AboutProfile'
import SkillsMatrix from '@/components/SkillsMatrix'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import ScrollCanvasSequence from '@/components/ScrollCanvasSequence'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import FilmStrip from '@/components/FilmStrip'
import Achievements from '@/components/Achievements'
import Footer from '@/components/Footer'
import { useAppStore } from '@/store/useAppStore'

export default function Home() {
  const { isRecruiterMode, isDevMode } = useAppStore();
  return (
    <main 
      id="portfolio-core" 
      style={{ 
        willChange: 'transform',
        filter: isDevMode ? 'url(#attenuation-noise)' : 'none'
      }}
    >
      <BiosBoot />
      <Hero />
      <AboutProfile />
      <SkillsMatrix />
      <ExperienceTimeline />
      {!isRecruiterMode && (
        <>
          <ScrollCanvasSequence />
          <Services />
          <Projects />
          <FilmStrip />
          <Achievements />
        </>
      )}
      <Footer />
    </main>
  )
}
