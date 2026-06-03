'use client';

import { useTina } from 'tinacms/dist/react';
import type { PortfolioQuery } from '../../tina/__generated__/types';
import HomeClient from '@/components/HomeClient';

interface TinaWrapperProps {
  query: string;
  variables: Record<string, any>;
  data: PortfolioQuery;
}

export default function TinaWrapper(props: TinaWrapperProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const portfolio = data.portfolio;

  // 1. BIOS Boot Sequence
  const biosRaw = portfolio.biosBoot;
  const biosData = {
    kernelVersion: biosRaw?.kernelVersion ?? 'SYSTEM: KERNEL v2.0.26 ASSEMBLY',
    diagnosticLines: Array.isArray(biosRaw?.diagnosticLines)
      ? biosRaw.diagnosticLines.filter((l): l is string => typeof l === 'string')
      : [],
    completionTime: typeof biosRaw?.completionTime === 'number' ? biosRaw.completionTime : 2500,
    copyrightText: biosRaw?.copyrightText ?? 'COPYRIGHT (C) 2026 ENIX SYSTEMS CO. ALL RIGHTS RESERVED.',
    loadingText: biosRaw?.loadingText ?? 'RUNNING HARDWARE CHECK... STATUS: ',
    loadedText: biosRaw?.loadedText ?? 'SYSTEM INITIALIZATION COMPLETE. DISPATCHING SCROLL_UNLOCK...',
    energyStarText: biosRaw?.energyStarText ?? 'ENERGY STAR\n___________\nNIRANJAN S S\nSYSTEMS ENG.',
  };

  // 2. Navigation Settings
  const navRaw = portfolio.navigationSettings;
  const navigationData = {
    logoText: navRaw?.logoText ?? 'SYS.N',
    navLinks: Array.isArray(navRaw?.navLinks)
      ? navRaw.navLinks
          .filter(Boolean)
          .map((link: any) => ({
            label: link.label ?? '',
            slug: link.slug ?? '',
          }))
      : [],
  };

  // 3. Hero Section
  const heroRaw = portfolio.hero;
  const heroData = {
    mainTitle: heroRaw?.mainTitle ?? 'ELECTRONIC ARCHITECTURE // CREATIVE VISUALS',
    subtitle: heroRaw?.subtitle ?? 'Second-year B.Tech ECE undergraduate bridging systems design with interactive media pipelines.',
    signatureSvgPath: heroRaw?.signatureSvgPath ?? '',
    signatureScaleMobile: typeof heroRaw?.signatureScaleMobile === 'number' ? heroRaw.signatureScaleMobile : 80,
    signatureScaleDesktop: typeof heroRaw?.signatureScaleDesktop === 'number' ? heroRaw.signatureScaleDesktop : 300,
  };

  // 4. Services Section
  const servicesRaw = portfolio.services;
  const servicesData = {
    sectionHeading: servicesRaw?.sectionHeading ?? 'SERVICES',
    items: Array.isArray(servicesRaw?.items)
      ? servicesRaw.items
          .filter(Boolean)
          .map((item: any) => ({
            index: item.index ?? '',
            title: item.title ?? '',
            description: item.description ?? '',
          }))
      : [],
  };

  // 5. Projects Section
  const projectsRaw = portfolio.projects;
  const projectsData = {
    sectionHeading: projectsRaw?.sectionHeading ?? 'PROJECTS',
    cards: Array.isArray(projectsRaw?.cards)
      ? projectsRaw.cards
          .filter(Boolean)
          .map((c: any) => ({
            index: c.index ?? '',
            name: c.name ?? '',
            category: c.category ?? '',
            description: c.description ?? '',
            liveUrl: c.liveUrl ?? '',
            col1Image1: c.col1Image1 ?? '',
            col1Image2: c.col1Image2 ?? '',
            col2TallImage: c.col2TallImage ?? '',
          }))
      : [],
  };

  // 6. Skills Matrix
  const skillsRaw = portfolio.skillsMatrix;
  const skillsData = {
    sectionHeading: skillsRaw?.sectionHeading ?? 'TECHNICAL CAPABILITIES',
    skillCategories: Array.isArray(skillsRaw?.skillCategories)
      ? skillsRaw.skillCategories
          .filter(Boolean)
          .map((cat: any) => ({
            categoryName: cat.categoryName ?? '',
            skills: Array.isArray(cat.skills)
              ? cat.skills
                  .filter(Boolean)
                  .map((s: any) => ({
                    name: s.name ?? '',
                    level: typeof s.level === 'number' ? s.level : 85,
                  }))
              : [],
          }))
      : [],
  };

  // 7. Dev HUD Telemetry
  const devRaw = portfolio.devHud;
  const devHudData = {
    sustainationBaseLatency: typeof devRaw?.sustainationBaseLatency === 'number' ? devRaw.sustainationBaseLatency : 24,
    sustainationHarvestNodes: devRaw?.sustainationHarvestNodes ?? '1,402 NODES',
    sustainationEfficiency: devRaw?.sustainationEfficiency ?? '98.4%',
    oscilloscopeBaseAmplitude: typeof devRaw?.oscilloscopeBaseAmplitude === 'number' ? devRaw.oscilloscopeBaseAmplitude : 45,
    telemetryTable: Array.isArray(devRaw?.telemetryTable)
      ? devRaw.telemetryTable
          .filter(Boolean)
          .map((r: any) => ({
            coreName: r.coreName ?? '',
            telemetryDetails: r.telemetryDetails ?? '',
          }))
      : [],
  };

  // 8. Camera Sequence
  const cameraRaw = portfolio.cameraSequence;
  const cameraData = {
    totalFrames: typeof cameraRaw?.totalFrames === 'number' ? cameraRaw.totalFrames : 192,
    act1Title: cameraRaw?.act1Title ?? '',
    act1Subtitle: cameraRaw?.act1Subtitle ?? '',
    act2Title: cameraRaw?.act2Title ?? '',
    act2Subtitle: cameraRaw?.act2Subtitle ?? '',
    act3Title: cameraRaw?.act3Title ?? '',
    act3Subtitle: cameraRaw?.act3Subtitle ?? '',
  };

  // 9. Footer Settings
  const footerRaw = portfolio.footer;
  const footerData = {
    copyrightText: footerRaw?.copyrightText ?? '© 2026 NIRANJAN S S. ALL RIGHTS RESERVED.',
    socialLinks: Array.isArray(footerRaw?.socialLinks)
      ? footerRaw.socialLinks
          .filter(Boolean)
          .map((l: any) => ({
            platformName: l.platformName ?? '',
            url: l.url ?? '',
          }))
      : [],
  };

  // 10. About Profile Settings
  const aboutRaw = portfolio.aboutProfile;
  const aboutProfileData = {
    location: aboutRaw?.location ?? 'THIRUVANANTHAPURAM, KERALA',
    networkLabel: aboutRaw?.networkLabel ?? 'LINKEDIN UPLINK',
    networkUrl: aboutRaw?.networkUrl ?? 'https://linkedin.com',
    languages: Array.isArray(aboutRaw?.languages)
      ? aboutRaw.languages.filter((l): l is string => typeof l === 'string')
      : [],
    story: aboutRaw?.story ?? 'Second-year B.Tech Electronics and Communication Engineering student at Mar Baselios College of Engineering and Technology. I bridge hardware systems with high-performance interactive web pipelines.'
  };

  // 11. Experience Timeline Settings
  const timelineRaw = portfolio.timeline;
  const timelineData = {
    sectionHeading: timelineRaw?.sectionHeading ?? 'Routing Connections',
    items: Array.isArray(timelineRaw?.items)
      ? timelineRaw.items
          .filter(Boolean)
          .map((item: any) => ({
            id: item.id ?? '',
            title: item.title ?? '',
            date: item.date ?? '',
            active: typeof item.active === 'boolean' ? item.active : false,
            detail: item.detail ?? '',
          }))
      : [],
  };

  // 12. Film Strip Settings
  const filmstripRaw = portfolio.filmstrip;
  const filmstripData = {
    heading: filmstripRaw?.heading ?? 'Capturing Reality',
    photos: Array.isArray(filmstripRaw?.photos)
      ? filmstripRaw.photos
          .filter(Boolean)
          .map((item: any) => ({
            url: item.url ?? '',
            title: item.title ?? '',
            backstory: item.backstory ?? '',
            gear: item.gear ?? '',
            settings: item.settings ?? '',
          }))
      : [],
  };

  // 13. Achievements Settings
  const achievementsRaw = portfolio.achievements;
  const achievementsData = {
    heading: achievementsRaw?.heading ?? 'Verified Benchmarks',
    benchmarks: Array.isArray(achievementsRaw?.benchmarks)
      ? achievementsRaw.benchmarks
          .filter(Boolean)
          .map((item: any) => ({
            title: item.title ?? '',
            date: item.date ?? '',
            description: item.description ?? '',
          }))
      : [],
  };

  // 14. Section Order Settings
  const sectionOrder = Array.isArray(portfolio.sectionOrder)
    ? portfolio.sectionOrder.filter((o): o is string => typeof o === 'string')
    : ['about', 'skills', 'timeline', 'canvas', 'services', 'projects', 'filmstrip', 'achievements'];

  return (
    <HomeClient
      biosData={biosData}
      navigationData={navigationData}
      heroData={heroData}
      servicesData={servicesData}
      projectsData={projectsData}
      skillsData={skillsData}
      footerData={footerData}
      devHudData={devHudData}
      cameraData={cameraData}
      aboutProfileData={aboutProfileData}
      timelineData={timelineData}
      filmstripData={filmstripData}
      achievementsData={achievementsData}
      sectionOrder={sectionOrder}
    />
  );
}
