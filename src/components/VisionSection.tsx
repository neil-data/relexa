import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Handshake, CheckCircle2, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      // Slow cinematic zoom & parallax movement on scroll
      gsap.fromTo(
        img,
        { scale: 1, y: 0 },
        {
          scale: 1.15,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const corePillars = [
    {
      title: 'INNOVATION',
      desc: 'Advancing product formulations, cold-chain cryogenics, and metallurgical rolling precision.'
    },
    {
      title: 'INTEGRITY',
      desc: 'Transparent assay certifications, ethical trade governance, and unwavering contractual compliance.'
    },
    {
      title: 'LONG-TERM PARTNERSHIPS',
      desc: 'Building generational international alliances across 65+ countries with mutual growth horizons.'
    },
    {
      title: 'RELIABLE PRODUCTS',
      desc: 'Zero-defect manufacturing protocols ensuring consistent high-purity specifications on every shipment.'
    },
    {
      title: 'CONSISTENT SERVICE',
      desc: 'Predictable vessel scheduling, uninterrupted multi-modal freight, and dedicated trade desk response.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative w-full py-32 sm:py-48 lg:py-60 bg-[#0A0C12] text-[#F3F4F6] border-t border-[#DFBA73]/15 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-black text-white/[0.012] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        GLOBAL HORIZON
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[1px] bg-[#DFBA73]" />
          <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
            07 / VISION & EXPANSION
          </span>
        </div>

        {/* Massive Statement with generous whitespace */}
        <div ref={textRef} className="mb-24 sm:mb-36">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-display font-black tracking-tight uppercase leading-[0.9] text-[#FAF8F5]">
            EXPANDING
            <br />
            <span className="text-stroke hover:text-[#DFBA73] transition-colors duration-700">THE GLOBAL</span>
            <br />
            <span className="gold-gradient-text">FOOTPRINT.</span>
          </h2>
        </div>

        {/* Slow Cinematic Parallax Photography Showcase */}
        <div className="relative aspect-[21/9] w-full rounded-xs overflow-hidden border border-[#DFBA73]/30 mb-24 sm:mb-32 shadow-2xl bg-[#121522]">
          <img
            ref={imageRef}
            src="/images/cargo-ship.jpg"
            alt="Relexa Exports Maritime Vessel"
            className="w-full h-full object-cover filter brightness-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-[#0A0C12]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C12]/50 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-1">
                SEAMLESS MARITIME CONTINUITY
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-[#FAF8F5]">
                Connecting India's Industrial Capabilities to Global Markets
              </div>
            </div>
            <div className="text-xs font-mono text-neutral-400 bg-[#0A0C12]/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xs">
              MUNDRA • JNPT • 65+ DESTINATIONS
            </div>
          </div>
        </div>

        {/* Supporting Message Matrix */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-10">
            THE ARCHITECTURE OF SUSTAINED EXCELLENCE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {corePillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-6 bg-[#111420]/60 border border-white/5 hover:border-[#DFBA73]/40 rounded-xs transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-mono text-[#DFBA73]/60 group-hover:text-[#DFBA73] mb-4 font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-display font-bold text-[#FAF8F5] mb-2 group-hover:text-[#DFBA73] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#A1A7BA] font-sans font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
