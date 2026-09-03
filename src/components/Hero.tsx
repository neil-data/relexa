import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Anchor, Compass, ShieldCheck, ChevronRight } from 'lucide-react';
import { RelexaLogo } from './RelexaLogo';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const [timeStr, setTimeStr] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(new Date()) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Initial states
      gsap.set(imageContainerRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(imageRef.current, { scale: 1.25 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headlineRef.current, { opacity: 0, y: 60 });
      gsap.set(statementRef.current, { opacity: 0, y: 30 });
      gsap.set(copyRef.current, { opacity: 0, y: 30 });
      gsap.set(badgesRef.current, { opacity: 0, y: 20 });
      gsap.set(bottomBarRef.current, { opacity: 0 });

      // Cinematic Reveal Sequence
      tl.to(imageContainerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.8,
        ease: 'power3.inOut'
      })
      .to(imageRef.current, {
        scale: 1.05,
        duration: 2.4,
        ease: 'power2.out'
      }, '-=1.6')
      .to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=1.4')
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1.1')
      .to(statementRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.8')
      .to([copyRef.current, badgesRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.6')
      .to(bottomBarRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');

      // Parallax scroll on hero image
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0C0E14] text-[#F3F4F6] pt-24 pb-10 px-6 sm:px-10 lg:px-16"
    >
      {/* Background Image Container with Cinematic Overlay */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <img
          ref={imageRef}
          src="/background.png"
          alt="International container port logistics and global freight shipping"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-65 contrast-110 saturate-90"
          onError={(e) => {
            // Fallback to high-res CDN if local load issues
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop';
          }}
        />

        {/* Multi-layered cinematic gradient overlays — softened navy to keep image visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-[#0C0E14]/40 to-[#0C0E14]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(12,14,20,0.5)_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full border-x border-[#DFBA73]/30 grid grid-cols-4">
          <div className="border-r border-[#DFBA73]/15 hidden md:block" />
          <div className="border-r border-[#DFBA73]/15 hidden md:block" />
          <div className="border-r border-[#DFBA73]/15 hidden md:block" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center py-12 lg:py-16">
        {/* Top Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <span className="w-8 h-[1px] bg-[#DFBA73]" />
          <span className="text-[11px] sm:text-[13px] font-mono tracking-[0.28em] text-[#DFBA73] uppercase font-semibold">
            GLOBAL EXPORTS / INDIA
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 tracking-[0.2em]">
            • 65+ COUNTRIES
          </span>
        </div>

        {/* Huge Headline: RELEXA EXPORTS */}
        <h1
          ref={headlineRef}
          className="text-[clamp(2.5rem,9vw,7rem)] sm:text-[clamp(3rem,8vw,6.5rem)] lg:text-[clamp(4rem,7vw,7.5rem)] font-display font-extrabold tracking-tight text-[#FAF8F5] leading-[0.92] uppercase mb-6 sm:mb-8"
        >
          RELEXA
          <br />
          <span className="gold-gradient-text tracking-normal">EXPORTS</span>
        </h1>

        {/* Supporting Statement & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end max-w-5xl">
          <div className="lg:col-span-7">
            <p
              ref={statementRef}
              className="text-[clamp(1.5rem,4.5vw,2.25rem)] sm:text-[clamp(1.75rem,4vw,2.75rem)] lg:text-4xl font-display font-light text-[#E5C583] leading-snug tracking-tight mb-4"
            >
              Connecting quality with global markets.
            </p>
            <p
              ref={copyRef}
              className="text-sm sm:text-base text-[#D0D4DE] font-sans font-light leading-relaxed max-w-xl"
            >
              A globally emerging export enterprise delivering trusted healthcare, nutrition, frozen food and industrial solutions to international markets.
            </p>
          </div>

          {/* Interactive CTAs & Quick Pillar Highlights */}
          <div ref={badgesRef} className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5">
            <button
              type="button"
              onClick={onExploreClick}
              id="hero-explore-worlds-btn"
              className="group inline-flex items-center justify-between px-6 py-4 bg-[#131622]/90 hover:bg-[#131622] border border-[#DFBA73]/30 hover:border-[#DFBA73] text-[#F3F4F6] transition-all duration-300 rounded-sm shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#DFBA73] transition-transform duration-500 group-hover:rotate-90" />
                <span className="font-mono text-xs tracking-[0.16em] uppercase font-semibold text-left">
                  EXPLORE THE FOUR WORLDS
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#DFBA73] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator & Location Coordinates */}
      <div
        ref={bottomBarRef}
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400 tracking-[0.2em] uppercase"
      >
        {/* Bottom Left: Scroll to Explore */}
        <button
          type="button"
          onClick={onExploreClick}
          id="hero-scroll-down-btn"
          className="group flex items-center gap-2 text-[#DFBA73] hover:text-[#FFF] transition-colors focus:outline-none"
        >
          <span className="animate-pulse">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
        </button>

        {/* Center: Live Trade Desk Port Status */}
        <div className="flex items-center gap-3 text-neutral-300">
          <span className="inline-block w-2 h-2 rounded-full bg-[#DFBA73] animate-ping" />
          <span className="text-[10px] text-[#DFBA73] font-semibold tracking-[0.15em]">
            PORT MUNDRA & JNPT CARGO DESK ACTIVE
          </span>
        </div>

        {/* Bottom Right: Ahmedabad Location & Time */}
        <div className="flex items-center gap-2">
          <span>AHMEDABAD / INDIA</span>
          <span className="text-[#DFBA73] font-semibold">[{timeStr || 'IST'}]</span>
        </div>
      </div>
    </section>
  );
};
