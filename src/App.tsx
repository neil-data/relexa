import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { FourWorldsSection } from './components/FourWorldsSection';
import { ProductsSection } from './components/ProductsSection';
import { GlobalReachMap } from './components/GlobalReachMap';
import { QualityStandards } from './components/QualityStandards';
import { LogisticsExperience } from './components/LogisticsExperience';
import { VisionSection } from './components/VisionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { CustomCursor } from './components/CustomCursor';
import { SectorId } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqSector, setRfqSector] = useState<SectorId>('healthcare');
  const [rfqProduct, setRfqProduct] = useState<string>('');
  const [productFilter, setProductFilter] = useState<SectorId | 'all'>('all');

  // Initialize Lenis Smooth Scrolling Synchronized with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleExploreWorlds = () => {
    const element = document.getElementById('sectors');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSectorProducts = (sectorId: SectorId) => {
    setProductFilter(sectorId);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRfqWithSector = (sectorId: SectorId) => {
    setRfqSector(sectorId);
    setRfqProduct('');
    setRfqModalOpen(true);
  };

  const handleOpenRfqWithProduct = (productName: string, sectorId: SectorId) => {
    setRfqSector(sectorId);
    setRfqProduct(productName);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0E14] text-[#F3F4F6] selection:bg-[#DFBA73] selection:text-[#0C0E14] relative">
      {/* 28 Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 07 Hero Animation / Cinematic Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* 08 Navbar */}
      <Navbar
        onOpenRfqModal={() => {
          setRfqProduct('');
          setRfqModalOpen(true);
        }}
      />

      {/* Main Page Layout */}
      <main id="main-content">
        {/* 06 Hero — The WOW Moment */}
        <Hero
          onExploreClick={handleExploreWorlds}
          onOpenRfqModal={() => {
            setRfqProduct('');
            setRfqModalOpen(true);
          }}
        />

        {/* 01 Company Story / Opening Manifesto */}
        <Manifesto />

        {/* 02 The Four Worlds: Healthcare, Frozen Foods, Pet Nutrition, Steel */}
        <FourWorldsSection
          onSelectSectorProducts={handleSelectSectorProducts}
          onOpenRfqWithSector={handleOpenRfqWithSector}
        />

        {/* 03 Editorial Product Specifications Showcase */}
        <ProductsSection
          selectedSectorFilter={productFilter}
          onOpenRfqWithProduct={handleOpenRfqWithProduct}
        />

        {/* 04 Global Maritime Trade Routes */}
        <GlobalReachMap />

        {/* 05 Quality Certifications & Zero Defect Governance */}
        <QualityStandards />

        {/* 21 Logistics Experience (5 Stages: Source, Quality, Process, Logistics, Delivery) */}
        <LogisticsExperience />

        {/* 22 Vision ("EXPANDING THE GLOBAL FOOTPRINT.") */}
        <VisionSection />

        {/* 23 & 24 Final CTA ("LET'S CONNECT. BUILD THE NEXT GLOBAL SUPPLY CHAIN.") & Verified Contact Info */}
        <ContactSection
          onOpenRfqModal={() => {
            setRfqProduct('');
            setRfqModalOpen(true);
          }}
        />
      </main>

      {/* 25 Minimal Premium Footer */}
      <Footer />

      {/* Interactive Export RFQ Modal */}
      <InquiryModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialSector={rfqSector}
        initialProduct={rfqProduct}
      />
    </div>
  );
}
