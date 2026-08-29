import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Activity, 
  Snowflake, 
  Heart, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Thermometer,
  Gauge,
  Weight,
  Maximize2
} from 'lucide-react';
import { SectorId } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface FourWorldsSectionProps {
  onSelectSectorProducts: (sectorId: SectorId) => void;
  onOpenRfqWithSector: (sectorId: SectorId) => void;
}

export const FourWorldsSection: React.FC<FourWorldsSectionProps> = ({
  onSelectSectorProducts,
  onOpenRfqWithSector,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);

  const worlds = [
    {
      id: 'healthcare' as SectorId,
      number: '01',
      title: 'HEALTHCARE',
      subtitle: 'Precision Therapeutics & Dental Solutions',
      statement: 'QUALITY. PRECISION. INTEGRITY.',
      copy: 'Trusted medicines, healthcare solutions and dental care products designed around quality, reliability and better everyday care.',
      heroImage: '/images/healthcare.jpg',
      secondaryImage: '/images/pharmaceutical-lab.jpg',
      mood: 'CLEAN / PRECISE',
      atmosphere: 'linear-gradient(135deg, #0A1128 0%, #0C0E14 100%)',
      accentColor: '#DFBA73',
      products: [
        'RABEZ-D',
        'FERO + D3',
        'DVAAND-P',
        'REALVITA',
        'DEVDENT-D',
        'DSENS PASTE',
        'MOCPAIN',
        'DEVDENT',
        'DECHLOR',
        'SENSYSURE',
        'ACUKETO-DT',
        'ACUKETO-SP',
        'AEMOD-CV 625'
      ],
      highlights: [
        'US-FDA & WHO-GMP Sterile Cleanroom Formulations',
        'HPLC Chemical Assay Batch Purity Validation',
        'Precision Swiss-Machined Diamond Dental Burs'
      ]
    },
    {
      id: 'frozen-foods' as SectorId,
      number: '02',
      title: 'FROZEN FOODS',
      subtitle: 'IQF Agro-Produce & Gourmet Potato Innovations',
      statement: 'FRESHNESS.\nENGINEERED FOR\nGLOBAL MARKETS.',
      copy: 'Cultivated in fertile Indian agricultural heartlands and processed within hours of harvest at -38°C to lock in cellular crispness, natural moisture, and vital nutrients.',
      heroImage: '/images/french-fries.jpg',
      secondaryImage: '/images/frozen-food.jpg',
      mood: 'FRESH / ENERGETIC',
      atmosphere: 'linear-gradient(135deg, #1C1306 0%, #0C0E14 100%)',
      accentColor: '#E29A38',
      products: [
        'FRENCH FRIES — STRAIGHT CUT',
        'CRINKLE FRIES',
        'COATED FLAVOURED FRIES',
        'ALOO TIKKI',
        'CHILLI GARLIC SHOTZ'
      ],
      highlights: [
        'Fluidized Bed IQF Freezing at -38°C in <12 Minutes',
        'Continuous -18°C IoT Cold-Chain Reefers to Port',
        'BRCGS AA & ISO 22000 Export Certification'
      ]
    },
    {
      id: 'pet-nutrition' as SectorId,
      number: '03',
      title: 'PET\nNUTRITION',
      subtitle: 'Complete Biological Nutrition & Functional Rewards',
      statement: 'BETTER NUTRITION.\nHAPPIER COMPANIONS.',
      copy: 'Formulated with veterinary nutritionists using human-grade single-source animal proteins and dehydrated real meat treats without artificial preservatives or cheap fillers.',
      heroImage: '/images/pet-nutrition.jpg',
      secondaryImage: '/images/dog-food.jpg',
      mood: 'WARM / ORGANIC',
      atmosphere: 'linear-gradient(135deg, #1A0D0D 0%, #0C0E14 100%)',
      accentColor: '#F59E0B',
      products: [
        'DOG FOOD',
        'CAT FOOD',
        'HORSE FOOD',
        'HAMSTER FOOD',
        'DOG TREATS',
        'CAT TREATS'
      ],
      highlights: [
        '100% Real Protein with 0.0% Chemical Binders',
        'Twin-Screw Low-Temperature Extrusion Digestibility',
        'Global Biosecurity & HACCP Quarantine Approved'
      ]
    },
    {
      id: 'steel' as SectorId,
      number: '04',
      title: 'STEEL',
      subtitle: 'High-Yield Heavy Metallurgy & Structural Profiles',
      statement: 'BUILT FOR\nWHAT COMES NEXT.',
      copy: 'Heavy metallurgical exports manufactured for rigorous international civil engineering, shipbuilding, renewable infrastructure, and heavy mechanical fabrication.',
      heroImage: '/images/steel.jpg',
      secondaryImage: '/images/steel-coil.jpg',
      mood: 'DARK / MONUMENTAL',
      atmosphere: 'linear-gradient(135deg, #10141D 0%, #06080C 100%)',
      accentColor: '#C4C8D6',
      products: [
        'HR COIL',
        'FLAT BAR',
        'MS ANGLE'
      ],
      techSpecs: [
        { label: 'WIDTH', value: '1000 / 1250 / 1500 / 2000 MM' },
        { label: 'THICKNESS', value: '1.2 — 25.4 MM' },
        { label: 'COIL WEIGHT', value: '5 — 36 MT' },
        { label: 'I.D.', value: '580 — 610 MM' }
      ],
      highlights: [
        'EN 10204 3.1 Certified Mill Test Certificates',
        'ASTM A36 & S355JR Tensile Yield Strength Compliance',
        'Direct Container & Break-Bulk Vessel Berthing at Mundra'
      ]
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    // Desktop Horizontal Pinned Scroll
    mm.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.world-panel');
      const totalWidth = panels.length * 100;

      const tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          id: 'four-worlds-trigger',
          trigger: container,
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut'
          },
          end: () => `+=${container.offsetWidth * 3.2}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1));
            setActiveWorldIndex(index);
          }
        }
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="sectors"
      className="relative w-full bg-[#0C0E14] text-[#F3F4F6] border-t border-[#DFBA73]/15 overflow-hidden"
    >
      {/* Signature Section Header Bar */}
      <div className="w-full bg-[#0E1119] border-b border-[#DFBA73]/20 py-6 px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20 relative">
        <div className="flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#DFBA73]" />
          <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
            02 / THE SIGNATURE SECTION
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#FAF8F5] tracking-tight uppercase">
            FOUR WORLDS. <span className="gold-gradient-text">ONE GLOBAL STANDARD.</span>
          </h2>
        </div>

        {/* Desktop World Jump Indicators */}
        <div className="hidden lg:flex items-center gap-2">
          {worlds.map((w, idx) => (
            <button
              key={w.id}
              type="button"
              onClick={() => {
                setActiveWorldIndex(idx);
                const panels = gsap.utils.toArray<HTMLElement>('.world-panel');
                if (panels.length > 0 && containerRef.current) {
                  const trigger = ScrollTrigger.getById('four-worlds-trigger');
                  if (trigger) {
                    const targetScroll = trigger.start + (idx / (panels.length - 1)) * (trigger.end - trigger.start);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs font-mono transition-all duration-300 cursor-pointer ${
                activeWorldIndex === idx
                  ? 'bg-[#DFBA73] text-[#0C0E14] font-bold border-[#DFBA73] shadow-md scale-105'
                  : 'bg-[#121522] text-neutral-400 border-white/5 hover:border-[#DFBA73]/40 hover:text-white'
              }`}
            >
              <span>{w.number}</span>
              <span className="uppercase">{w.title.replace('\n', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Track (Desktop) / Vertical Stack (Mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] lg:h-[calc(100vh-80px)]"
      >
        {worlds.map((world, idx) => (
          <div
            key={world.id}
            id={`world-${world.id}`}
            className="world-panel w-full lg:w-[100vw] lg:h-full shrink-0 relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#DFBA73]/15 overflow-y-auto lg:overflow-hidden"
            style={{ background: world.atmosphere }}
          >
            {/* Background Watermark World Number */}
            <div className="absolute right-4 bottom-2 text-[22vw] lg:text-[26vw] font-display font-black text-white/[0.03] select-none pointer-events-none leading-none">
              {world.number}
            </div>

            {/* Top Bar for this World */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#DFBA73] tracking-tighter">
                  {world.number}
                </span>
                <div>
                  <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase">
                    SECTOR {world.number} • {world.mood}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#FAF8F5] tracking-tight uppercase whitespace-pre-line">
                    {world.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectSectorProducts(world.id)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#DFBA73]/10 hover:bg-[#DFBA73] border border-[#DFBA73]/40 text-[#DFBA73] hover:text-[#0C0E14] font-mono text-xs tracking-[0.16em] uppercase font-semibold transition-all rounded-xs"
              >
                <span>EXPLORE PRODUCTS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main World Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6 relative z-10 items-center">
              {/* Left Editorial Narrative & Statement */}
              <div className="lg:col-span-6 space-y-6">
                {/* Statement */}
                <div className="p-6 bg-[#0C0E14]/80 border border-[#DFBA73]/30 rounded-sm">
                  <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-2">
                    DIVISION STATEMENT
                  </div>
                  <h4 className="text-xl sm:text-3xl font-display font-extrabold text-[#FAF8F5] uppercase tracking-tight leading-snug whitespace-pre-line">
                    {world.statement}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-[#C8CCD9] font-sans font-light leading-relaxed">
                  {world.copy}
                </p>

                {/* Technical Specs for Steel or Key Highlights for others */}
                {world.techSpecs ? (
                  <div className="p-5 bg-[#080A0F] border border-[#DFBA73]/30 rounded-sm">
                    <div className="text-[11px] font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-3 flex items-center justify-between">
                      <span>HR COIL TECHNICAL SPECIFICATIONS</span>
                      <span className="text-[9px] text-neutral-400">ASTM / JIS / EN</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {world.techSpecs.map((spec) => (
                        <div key={spec.label} className="p-2.5 bg-[#121522] border border-white/5 rounded-xs">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">
                            {spec.label}
                          </div>
                          <div className="text-xs sm:text-sm font-mono font-bold text-[#FAF8F5] mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {world.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-sans text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Media & Subtle Products Showcase */}
              <div className="lg:col-span-6 space-y-6">
                {/* Real Photography Asset */}
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={world.heroImage}
                    alt={world.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = world.secondaryImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                    <span className="bg-[#0C0E14]/85 backdrop-blur-md px-3 py-1 border border-[#DFBA73]/30 rounded-xs text-[10px] uppercase tracking-widest text-[#DFBA73]">
                      AUTHENTIC VERIFIED EXPORT PRODUCTION
                    </span>
                  </div>
                </div>

                {/* Subtle Editorial Product Tags (No tacky ecommerce grid) */}
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-2.5">
                    CORE EXPORT LINES & FORMULATIONS
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {world.products.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => onSelectSectorProducts(world.id)}
                        className="px-2.5 py-1.5 bg-[#0C0E14]/90 hover:bg-[#DFBA73] border border-white/10 hover:border-[#DFBA73] text-neutral-300 hover:text-[#0C0E14] text-[11px] font-mono tracking-wider uppercase rounded-xs transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs font-mono">
              <div className="flex items-center gap-4 text-neutral-400">
                <span>PORT MUNDRA / JNPT ORIGIN</span>
                <span>•</span>
                <span className="text-[#DFBA73]">ZERO DEFECT GOVERNANCE</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onSelectSectorProducts(world.id)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-[#DFBA73] text-[#0C0E14] font-mono text-xs font-bold tracking-[0.14em] uppercase rounded-xs shadow-md"
                >
                  VIEW ALL {world.title.replace('\n', ' ')}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenRfqWithSector(world.id)}
                  className="flex-1 sm:flex-none px-4 py-2.5 border border-[#DFBA73]/40 hover:bg-[#DFBA73]/10 text-[#DFBA73] font-mono text-xs tracking-[0.14em] uppercase rounded-xs transition-colors"
                >
                  REQUEST RFQ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
