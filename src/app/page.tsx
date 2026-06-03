import client from '../../tina/__generated__/client';
import TinaWrapper from '@/components/TinaWrapper';

// ─── Type Definitions ───────────────────────────────────────
export interface BiosBootData {
  kernelVersion: string;
  diagnosticLines: string[];
  completionTime: number;
  copyrightText: string;
  loadingText: string;
  loadedText: string;
  energyStarText: string;
}

export interface NavigationSettingsData {
  logoText: string;
  navLinks: Array<{ label: string; slug: string }>;
}

export interface HeroData {
  mainTitle: string;
  subtitle: string;
  signatureSvgPath: string;
  signatureScaleMobile: number;
  signatureScaleDesktop: number;
}

export interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

export interface ServicesData {
  sectionHeading: string;
  items: ServiceItem[];
}

export interface ProjectCard {
  index: string;
  name: string;
  category: string;
  description: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2TallImage: string;
}

export interface ProjectsData {
  sectionHeading: string;
  cards: ProjectCard[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  categoryName: string;
  skills: SkillItem[];
}

export interface SkillsMatrixData {
  sectionHeading: string;
  skillCategories: SkillCategory[];
}

export interface SocialLink {
  platformName: string;
  url: string;
}

export interface FooterData {
  copyrightText: string;
  socialLinks: SocialLink[];
}

export interface DevHudRow {
  coreName: string;
  telemetryDetails: string;
}

export interface DevHudData {
  sustainationBaseLatency: number;
  sustainationHarvestNodes: string;
  sustainationEfficiency: string;
  oscilloscopeBaseAmplitude: number;
  telemetryTable: DevHudRow[];
}

export interface CameraSequenceData {
  totalFrames: number;
  act1Title: string;
  act1Subtitle: string;
  act2Title: string;
  act2Subtitle: string;
  act3Title: string;
  act3Subtitle: string;
}

export interface AboutProfileData {
  location: string;
  networkLabel: string;
  networkUrl: string;
  languages: string[];
  story: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  active: boolean;
  detail: string;
}

export interface TimelineData {
  sectionHeading: string;
  items: TimelineItem[];
}

export type ExperienceTimelineData = TimelineData;

export interface FilmItem {
  url: string;
  title: string;
  backstory: string;
  gear: string;
  settings: string;
}

export interface FilmstripData {
  heading: string;
  photos: FilmItem[];
}

export interface AchievementItem {
  title: string;
  date: string;
  description: string;
}

export interface AchievementsData {
  heading: string;
  benchmarks: AchievementItem[];
}

// ─── Default Fallback Objects ───────────────────────────────
const DEFAULT_BIOS: BiosBootData = {
  kernelVersion: 'SYSTEM: KERNEL v2.0.26 ASSEMBLY',
  diagnosticLines: [
    'HARDWARE: SONY ILCE-6400 SYSTEM INIT ... OK',
    'NETWORK: IEEE WIE MEMBERSHIP NODE ... ALIGNED',
    'DATABASE: SUSTAINATION FIRESTORE SYNC ... OK',
    'DATA: ESTABLISHING SANITY CMS UPLINK ... OK',
  ],
  completionTime: 2500,
  copyrightText: 'COPYRIGHT (C) 2026 ENIX SYSTEMS CO. ALL RIGHTS RESERVED.',
  loadingText: 'RUNNING HARDWARE CHECK... STATUS: ',
  loadedText: 'SYSTEM INITIALIZATION COMPLETE. DISPATCHING SCROLL_UNLOCK...',
  energyStarText: 'ENERGY STAR\n___________\nNIRANJAN S S\nSYSTEMS ENG.',
};

const DEFAULT_NAVIGATION: NavigationSettingsData = {
  logoText: 'SYS.N',
  navLinks: [
    { label: 'Identity', slug: '#about' },
    { label: 'Skills', slug: '#skills' },
    { label: 'Timeline', slug: '#experience' },
    { label: 'Lens', slug: '#camerasequence' },
    { label: 'Benchmarks', slug: '#achievements' },
    { label: 'Contact', slug: '#contact' },
  ],
};

const DEFAULT_HERO: HeroData = {
  mainTitle: 'NIRANJAN S S.\nSYSTEMS, LIGHT,\n& DISCIPLINE.',
  subtitle:
    'Second-year Electronics and Communication Engineering undergraduate bridging systems design with interactive media pipelines.',
  signatureSvgPath: '',
  signatureScaleMobile: 80,
  signatureScaleDesktop: 300,
};

const DEFAULT_SERVICES: ServicesData = {
  sectionHeading: 'SERVICES',
  items: [
    { index: '01', title: 'SYSTEMS ARCHITECTURE', description: 'Designing and deploying robust hardware-software bridges.' },
    { index: '02', title: 'INTERACTIVE WEB APPS', description: 'Building high-performance platforms using React, Next.js, and Firebase.' },
    { index: '03', title: 'VISUAL CURATION', description: 'High-fidelity photographic editing, color grading, and dynamic object removal.' },
    { index: '04', title: 'COMMUNITY LEADERSHIP', description: 'Orchestrating technical fests and driving membership development.' },
  ],
};

const DEFAULT_PROJECTS: ProjectsData = {
  sectionHeading: 'PROJECTS',
  cards: [
    {
      index: '01', category: 'Smart India Hackathon', name: 'SUSTAINATION PLATFORM',
      description: 'A sustainability-focused social platform designed to track and gamify eco-conscious habits.',
      liveUrl: 'https://github.com',
      col1Image1: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80',
      col1Image2: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
      col2TallImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80',
    },
    {
      index: '02', category: 'Systems Architecture', name: 'PORTFOLIO CORE v2.0',
      description: 'Neo-Brutalist developer portfolio featuring GSAP scroll-bound animations and CRT shader effects.',
      liveUrl: 'https://github.com',
      col1Image1: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      col1Image2: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
      col2TallImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

const DEFAULT_SKILLS: SkillsMatrixData = {
  sectionHeading: 'TECHNICAL CAPABILITIES',
  skillCategories: [
    {
      categoryName: 'LANGUAGES & WEB',
      skills: [
        { name: 'React & Next.js', level: 95 },
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'Firebase/Firestore', level: 85 },
        { name: 'C/C++', level: 80 }
      ]
    },
    {
      categoryName: 'HARDWARE & ECE',
      skills: [
        { name: 'Microcontroller Systems', level: 88 },
        { name: 'Signal Processing', level: 82 },
        { name: 'Solid State Devices', level: 78 },
        { name: 'Circuit Architecture', level: 85 }
      ]
    },
    {
      categoryName: 'MEDIA PRODUCTION',
      skills: [
        { name: 'Sony Alpha Optics', level: 90 },
        { name: 'Color Grading', level: 85 },
        { name: 'Object Removal', level: 80 },
        { name: 'Lighting Correction', level: 85 }
      ]
    },
    {
      categoryName: 'LEADERSHIP',
      skills: [
        { name: 'IEEE WIE Coordination', level: 95 },
        { name: 'ENIX EXECOM', level: 92 },
        { name: 'Tech Fest Management', level: 90 }
      ]
    }
  ]
};

const DEFAULT_FOOTER: FooterData = {
  copyrightText: `© ${new Date().getFullYear()} NIRANJAN S S. ALL RIGHTS RESERVED.`,
  socialLinks: [],
};

const DEFAULT_DEVHUD: DevHudData = {
  sustainationBaseLatency: 24,
  sustainationHarvestNodes: '1,402 NODES',
  sustainationEfficiency: '98.4%',
  oscilloscopeBaseAmplitude: 45,
  telemetryTable: [
    { coreName: 'IEEE WIE CORE', telemetryDetails: 'MEMBERSHIP DEVELOPMENT ONBOARDING: ACTIVE' },
    { coreName: 'ENIX EXECUTIVE COMMS', telemetryDetails: 'TECH FEST ARCHITECTURE: COORDINATION LOCK' },
  ],
};

const DEFAULT_CAMERA: CameraSequenceData = {
  totalFrames: 192,
  act1Title: '01 // THE SENSOR MATRIX — SONY α6400',
  act1Subtitle: 'An engineering baseline capturing raw ambient data at 24.2 megapixels.',
  act2Title: '02 // TACTICAL FIELD SELECTION — E 16-50MM',
  act2Subtitle: 'The everyday kit architecture built for split-second deployment.',
  act3Title: '03 // COMPOSITION GEOMETRY — VILTROX 20MM PRIME',
  act3Subtitle: 'Ultra-wide narrative rendering at f/2.8.',
};

// ─── Server Component ───────────────────────────────────────
export default async function Home() {
  let query = "";
  let variables = {};
  let data: any = null;

  try {
    const res = await client.queries.portfolio({ relativePath: 'index.json' });
    query = res.query;
    variables = res.variables;
    data = res.data;
  } catch (error) {
    console.warn("TinaCMS remote query failed. Falling back to local content/portfolio/index.json. Error:", error);
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'content/portfolio/index.json');
      const fileData = fs.readFileSync(filePath, 'utf8');
      const portfolioJson = JSON.parse(fileData);
      
      data = {
        portfolio: portfolioJson
      };
    } catch (fsError) {
      console.error("Critical: Failed to read local fallback index.json:", fsError);
      data = {
        portfolio: {
          biosBoot: DEFAULT_BIOS,
          navigationSettings: DEFAULT_NAVIGATION,
          hero: DEFAULT_HERO,
          services: DEFAULT_SERVICES,
          projects: DEFAULT_PROJECTS,
          skillsMatrix: DEFAULT_SKILLS,
          devHud: DEFAULT_DEVHUD,
          cameraSequence: DEFAULT_CAMERA,
          footer: DEFAULT_FOOTER,
          sectionOrder: ['about', 'skills', 'timeline', 'canvas', 'services', 'projects', 'filmstrip', 'achievements'],
          timeline: {
            sectionHeading: "Routing Connections",
            items: []
          }
        }
      };
    }
  }

  return (
    <TinaWrapper
      query={query}
      variables={variables}
      data={data}
    />
  );
}
