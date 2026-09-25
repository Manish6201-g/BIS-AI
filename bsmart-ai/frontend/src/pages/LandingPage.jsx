import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from '../components/landing/HeroSection';
import { MarqueeSection } from '../components/landing/MarqueeSection';
import { StatsSection } from '../components/landing/StatsSection';
import { FeatureStack } from '../components/landing/FeatureStack';
import { TimelineSection } from '../components/landing/TimelineSection';
import { AISection } from '../components/landing/AISection';
import { VerificationSection } from '../components/landing/VerificationSection';
import { FooterSection } from '../components/landing/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
  useEffect(() => {
    // Refresh ScrollTrigger calculations after initial mount and font render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page-root w-full overflow-x-hidden selection:bg-black selection:text-white">
      {/* 01. White Hero Section */}
      <HeroSection />

      {/* 02. Black Scroll Scrub Marquee */}
      <MarqueeSection />

      {/* 03. Black Statistics Section */}
      <StatsSection />

      {/* 04. Black Pinned Feature Cards Stack */}
      <FeatureStack />

      {/* 05. White Workflow Vertical Timeline */}
      <TimelineSection />

      {/* 06. Black AI Intelligence Layer */}
      <AISection />

      {/* 07. White Citizen Verification Section */}
      <VerificationSection />

      {/* 08. Black Giant Wordmark Footer */}
      <FooterSection />
    </div>
  );
};
