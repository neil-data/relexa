import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, CheckCircle2, Globe, TrendingUp, ArrowDownRight } from 'lucide-react';
import { COMPANY_FACTS } from '../data/companyData';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect on full-width story image
      if (imageBannerRef.current) {
        gsap.fromTo(
          imageBannerRef.current.querySelector('img'),
          { scale: 1.15, y: -20 },
          {
            scale: 1,
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: imageBannerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const corePillars = [
    {
      num: '01',
      title: 'QUALITY',
      desc: 'Pharmacopeial assays, cold-chain temperature stability, and certified mill tolerances.'
    },
    {
      num: '02',
      title: 'INNOVATION',
      desc: 'Fluidized bed IQF freezing, twin-screw extrusion, and cleanroom automation.'
    },
    {
      num: '03',
      title: 'RELIABILITY',
      desc: 'Direct container stuffing, pre-cleared Bill of Lading, and zero vessel rollover.'
    },
    {
      num: '04',
      title: 'CUSTOMER SERVICE',
      desc: 'Dedicated 24/7 trade desk with end-to-end milestone documentation.'
    },
    {
      num: '05',
      title: 'GLOBAL MARKETS',
      desc: 'Serving institutional buyers, distributors, and industries worldwide.'
    },
    {
      num: '06',
      title: 'EFFICIENT LOGISTICS',
      desc: 'Port Mundra and JNPT multimodal rail and maritime corridor orchestration.'
    },
    {
      num: '07',
      title: 'QUALITY CONTROL',
      desc: 'Multi-stage laboratory validation, batch assay release, and independent surveyor sealing.'
    }
  ];

  return (
    <section
      ref={containerRef}
      id="company"
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-[#0C0E14] text-[#F3F4F6] overflow-hidden border-t border-[#DFBA73]/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section 11: Company Story Layout (01 Left | Headline Center | Editorial Description Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 lg:mb-28">
          {/* LEFT: 01 */}
          <div className="lg:col-span-2">
            <div className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-[#DFBA73]/30 tracking-tighter">
              01
            </div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mt-2">
              COMPANY STORY
            </div>
          </div>

          {/* CENTER: BUILT ON TRUST. DRIVEN BY QUALITY. */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#DFBA73]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase font-semibold">
                GLOBAL EXPORT ENTERPRISE
              </span>
            </div>
            <h2
              ref={headingRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.02] text-[#FAF8F5]"
            >
              BUILT ON TRUST.
              <br />
              <span className="gold-gradient-text">DRIVEN BY QUALITY.</span>
            </h2>
          </div>

          {/* RIGHT: Short Editorial Company Description */}
          <div className="lg:col-span-4 space-y-4 text-xs sm:text-sm text-[#C4C8D6] font-sans font-light leading-relaxed lg:pt-2 border-l border-white/10 lg:pl-8">
            <p>
              Headquartered in Ahmedabad, India, <strong className="text-white font-medium">Relexa Exports</strong> is an emerging multi-sector export enterprise connecting high-yield manufacturing hubs to international markets.
            </p>
            <p>
              Operating across healthcare, frozen nutrition, companion animal nourishment, and heavy metallurgy, our business is founded on continuous quality control, transparent Incoterms, and efficient ocean freight.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#DFBA73]">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>FOUR DIVERSIFIED SECTORS • ONE GOVERNANCE</span>
            </div>
          </div>
        </div>

        {/* Large Full-Width Editorial Image */}
        <div
          ref={imageBannerRef}
          className="relative aspect-[21/9] sm:aspect-[21/8] w-full rounded-sm overflow-hidden border border-[#DFBA73]/30 shadow-2xl mb-24 group"
        >
          <img
            src="/images/global-logistics.jpg"
            alt="Relexa Exports Global Container Logistics & Maritime Fleet"
            className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-[#0C0E14]/30 to-transparent" />

          {/* Image Overlay Editorial Badges */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-1">
                INTEGRATED MARITIME EXPORT INFRASTRUCTURE
              </div>
              <div className="text-lg sm:text-2xl font-display font-bold text-[#FAF8F5]">
                Exporting Excellence from Port Mundra & JNPT to the World
              </div>
            </div>
            <div className="text-xs font-mono text-neutral-300 bg-[#0C0E14]/85 backdrop-blur-md px-4 py-2 border border-[#DFBA73]/30 rounded-xs">
              AHMEDABAD HQ • COLD-CHAIN • BULK METALLURGY
            </div>
          </div>
        </div>

        {/* Editorial Fragments: 7 Strategic Focus Areas */}
        <div className="mb-20">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-8 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#DFBA73]" />
            <span>CORE OPERATIONAL PILLARS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {corePillars.map((p) => (
              <div
                key={p.num}
                className="p-4 bg-[#121522] border border-white/5 hover:border-[#DFBA73]/40 transition-all rounded-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-mono text-[#DFBA73]/70 group-hover:text-[#DFBA73] font-bold mb-2">
                    {p.num}
                  </div>
                  <div className="text-xs font-display font-bold text-[#FAF8F5] uppercase tracking-wide mb-1.5">
                    {p.title}
                  </div>
                  <p className="text-[11px] text-[#A0A6B8] font-sans font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Four Worlds Teaser Quote */}
        <div className="pt-12 border-t border-[#DFBA73]/15 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-2">
              DIVERSIFIED GLOBAL REACH
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#FAF8F5] uppercase tracking-tight">
              FROM HEALTHCARE TO INDUSTRY.
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light max-w-md">
            Four specialized divisions delivering verified pharmaceutical medicines, IQF frozen nutrition, premium companion feeds, and structural steel.
          </p>
        </div>
      </div>
    </section>
  );
};
