import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const GlobalReachMap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      if (mapImageRef.current) {
        gsap.set(mapImageRef.current, { opacity: 0, scale: 1.06 });
      }

      // 2. Editorial GSAP Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Step 1: Headline reveals line-by-line
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        }
      );

      // Step 2: World map image reveals
      if (mapImageRef.current) {
        tl.to(
          mapImageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }

      // Step 3: Supporting copy
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // Step 4: CTA button appears last
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="global-reach"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#F9F7F2] text-[#0C1222] border-t border-[#E8E2D2] border-b overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Responsive Grid: Left Editorial Typography & Right World Map Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ========================================================================= */}
          {/* LEFT SIDE CONTENT — Editorial Relexa Brand Identity */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* SMALL LABEL: GLOBAL REACH */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1.5px] bg-[#C8A25D]" />
              <span className="text-xs font-mono tracking-[0.28em] uppercase font-bold text-[#8C6B1C]">
                GLOBAL REACH
              </span>
            </div>

            {/* MAIN HEADLINE: DELIVERING EXCELLENCE ACROSS BORDERS */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-cinzel font-bold text-[#0C1222] tracking-tight leading-[1.12] mb-6">
              <span ref={headlineLine1Ref} className="block overflow-hidden">
                DELIVERING
              </span>
              <span ref={headlineLine2Ref} className="block overflow-hidden text-[#0C1222]">
                EXCELLENCE
              </span>
              <span ref={headlineLine3Ref} className="block overflow-hidden text-[#8C6B1C]">
                ACROSS BORDERS
              </span>
            </h2>

            {/* Supporting Copy */}
            <p
              ref={textRef}
              className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed mb-8 max-w-lg"
            >
              RelExa Exports connects quality products with international markets through reliable partnerships, efficient logistics, and a commitment to excellence across borders.
            </p>

            {/* CTA BUTTON: EXPLORE GLOBAL REACH → */}
            <div ref={ctaRef}>
              <button
                type="button"
                onClick={handleExploreClick}
                id="global-reach-explore-cta"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#0C1222] hover:bg-[#162036] text-[#FAF8F5] font-mono text-xs tracking-[0.2em] uppercase font-bold rounded-xs transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 border border-[#0C1222]"
              >
                <span>EXPLORE GLOBAL REACH</span>
                <ArrowRight className="w-4 h-4 text-[#C8A25D] transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE — WORLD MAP IMAGE */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 w-full max-w-full overflow-hidden">

            <div className="relative w-full aspect-[1678/937] min-h-[340px] sm:min-h-[420px] select-none p-2 sm:p-4 rounded-xs border border-[#E8E2D2] bg-[#FAF8F5] shadow-[0_4px_25px_rgba(12,18,34,0.03)] flex items-center justify-center">

              {/* Subtle Gold Corner Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C8A25D]/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C8A25D]/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C8A25D]/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C8A25D]/60" />

              <img
                ref={mapImageRef}
                src="/world_map.png"
                alt="RelExa Exports global reach — world map"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};