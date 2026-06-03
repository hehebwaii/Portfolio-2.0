'use client';

import BiosBoot from '@/components/BiosBoot';
import Hero from '@/components/Hero';
import AboutProfile from '@/components/AboutProfile';
import SkillsMatrix from '@/components/SkillsMatrix';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ScrollCanvasSequence from '@/components/ScrollCanvasSequence';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import FilmStrip from '@/components/FilmStrip';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DevHUD from '@/components/DevHUD';
import { useAppStore } from '@/store/useAppStore';

import type {
  BiosBootData,
  NavigationSettingsData,
  HeroData,
  ServicesData,
  ProjectsData,
  SkillsMatrixData,
  FooterData,
  DevHudData,
  CameraSequenceData,
  AboutProfileData,
  ExperienceTimelineData,
  FilmstripData,
  AchievementsData,
} from '@/app/page';

interface HomeClientProps {
  biosData: BiosBootData;
  navigationData: NavigationSettingsData;
  heroData: HeroData;
  servicesData: ServicesData;
  projectsData: ProjectsData;
  skillsData: SkillsMatrixData;
  footerData: FooterData;
  devHudData: DevHudData;
  cameraData: CameraSequenceData;
  aboutProfileData: AboutProfileData;
  timelineData: ExperienceTimelineData;
  filmstripData: FilmstripData;
  achievementsData: AchievementsData;
  sectionOrder: string[];
}

export default function HomeClient({
  biosData,
  navigationData,
  heroData,
  servicesData,
  projectsData,
  skillsData,
  footerData,
  devHudData,
  cameraData,
  aboutProfileData,
  timelineData,
  filmstripData,
  achievementsData,
  sectionOrder,
}: HomeClientProps) {
  const { isRecruiterMode, isDevMode } = useAppStore();

  const sectionsRegistry: Record<string, React.ReactNode> = {
    hero: <Hero key="hero" data={heroData} />,
    about: <AboutProfile key="about" data={aboutProfileData} />,
    skills: <SkillsMatrix key="skills" data={skillsData} />,
    timeline: <ExperienceTimeline key="timeline" data={timelineData} />,
    canvas: <ScrollCanvasSequence key="canvas" data={cameraData} />,
    services: <Services key="services" data={servicesData} />,
    projects: <Projects key="projects" data={projectsData} />,
    filmstrip: <FilmStrip key="filmstrip" data={filmstripData} />,
    achievements: <Achievements key="achievements" data={achievementsData} />,
  };

  const recruiterHiddenSections = new Set([
    'canvas',
    'services',
    'projects',
    'filmstrip',
    'achievements',
  ]);

  const activeSections = sectionOrder.filter((sectionKey) => {
    if (isRecruiterMode && recruiterHiddenSections.has(sectionKey)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Navbar data={navigationData} />
      {isDevMode && <DevHUD data={devHudData} />}
      <main
        id="portfolio-core"
        style={{
          willChange: 'transform',
          filter: isDevMode ? 'url(#attenuation-noise)' : 'none',
        }}
      >
        <BiosBoot data={biosData} />
        {activeSections.map((key) => sectionsRegistry[key] || null)}
        <Footer data={footerData} />
      </main>
    </>
  );
}
