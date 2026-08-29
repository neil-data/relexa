import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StageItem {
  id: string;
  step: string;
  name: string;
  headline: string;
  description: string;
  specs: string[];
  image: string;
  tag: string;
}

const STAGES: StageItem[] = [
  {
    id: 'source',
    step: '01',
    name: 'SOURCE',
    headline: 'DIRECT ORIGIN CONVERGENCE',
    description: 'Contracted agricultural farming zones in Gujarat, vetted primary API chemical synthesizers, and blast-furnace metallurgical billet mills. We eliminate intermediaries at the source.',
    specs: ['Direct Contract Farming', 'cGMP Chemical Synthesizers', 'Certified Primary Steel Billets'],
    image: '/images/warehouse.jpg',
    tag: 'ORIGIN PROTOCOL'
  },
  {
    id: 'quality',
    step: '02',
    name: 'QUALITY',
    headline: 'ZERO-DEFECT ASSAY & AUDIT',
    description: 'Triple-point chromatographic purity assay (HPLC/GC-MS), microbiological pathogen clearance, and ultrasonic non-destructive steel integrity inspection before production release.',
    specs: ['99.98% Chemical Purity Assays', 'ISO & BRCGS Grade AA Verification', 'EN 10204 3.1 Mill Inspection'],
    image: '/images/pharmaceutical-lab.jpg',
    tag: 'LABORATORY GOVERNANCE'
  },
  {
    id: 'process',
    step: '03',
    name: 'PROCESS',
    headline: 'ENGINEERED VALUE ADDITION',
    description: 'Class 100 sterile cleanrooms for human dosages, -38°C fluidized IQF freezing tunnels for agricultural produce, and computer-calibrated heavy hydraulic roll forming for HR steel coils.',
    specs: ['Class 100 Sterile Cleanrooms', '-38°C Cryogenic Blast IQF', 'Hydraulic Tension Leveling'],
    image: '/images/frozen-food.jpg',
    tag: 'MANUFACTURING INTEGRATION'
  },
  {
    id: 'logistics',
    step: '04',
    name: 'LOGISTICS',
    headline: 'DEEP-WATER MARITIME DISPATCH',
    description: 'Seamless intermodal rail freight to Port Mundra & JNPT (Mumbai). Direct container stowage, real-time IoT reefer data-logging, and tamper-evident customs sealing.',
    specs: ['Port Mundra & JNPT Deep-Water Access', 'Continuous IoT Reefer Telemetry', 'Tamper-Evident Surveyor Seals'],
    image: '/images/cargo-ship.jpg',
    tag: 'MARITIME ARTERY'
  },
  {
    id: 'delivery',
    step: '05',
    name: 'DELIVERY',
    headline: 'GLOBAL GATEWAY RELEASE',
    description: 'Discharged across international ports with verified phytosanitary certificates, CTD pharmaceutical dossiers, and seamless customs clearance in 65+ destination countries.',
    specs: ['Full Regulatory Customs Cleared', 'Direct Distributor Handoff', '65+ Country Ingress Networks'],
    image: '/images/hero-port.jpg',
    tag: 'GLOBAL REACH'
  }
];

export const LogisticsExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinning with controlled bounds
    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${window.innerHeight * 2.2}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const stageIndex = Math.min(
            STAGES.length - 1,
            Math.floor(progress * STAGES.length)
          );
          setActiveStageIndex(stageIndex);
        }
      });

      return () => {
        st.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const currentStage = STAGES[activeStageIndex];

  return (
    <section
      ref={containerRef}
      id="logistics-experience"
      className="relative w-full min-h-screen bg-[#090B10] text-[#F3F4F6] border-t border-[#DFBA73]/15 overflow-hidden flex flex-col justify-between py-12 lg:py-0"
    >
      {/* Background subtle noise and glow */}
      <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#DFBA73]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 pt-4 lg:pt-8 pb-4 flex items-center justify-between z-20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#DFBA73]" />
          <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
            06 / LOGISTICS EXPERIENCE
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="hidden sm:inline">THE FIVE-STAGE SUPPLY CONTINUUM</span>
          <span className="text-[#DFBA73]">[{activeStageIndex + 1}/05]</span>
        </div>
      </div>

      {/* Main Content Stage Viewport */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-6 lg:py-8 z-10 my-auto">
        {/* Left: Interactive Stages Navigation & Typography Scale */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-6">
          <div className="text-[11px] font-mono tracking-[0.2em] text-[#DFBA73] uppercase">
            END-TO-END SUPPLY ARCHITECTURE
          </div>

          {/* 5 Stages Vertical Typography Selector / Interactive Buttons */}
          <div className="relative pl-6 space-y-2 sm:space-y-3">
            {/* Progress Track Line */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-white/10 rounded-full">
              <div
                className="w-full bg-gradient-to-b from-[#DFBA73] to-[#F4DFB0] transition-all duration-300 rounded-full"
                style={{
                  height: `${((activeStageIndex + 1) / STAGES.length) * 100}%`
                }}
              />
            </div>

            {STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`transition-all duration-300 flex items-center gap-3 sm:gap-4 cursor-pointer select-none py-1 ${
                    isActive
                      ? 'scale-105 translate-x-2 text-[#FAF8F5]'
                      : isPast
                      ? 'text-[#DFBA73]/60 hover:text-[#DFBA73]'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <span
                    className={`font-mono text-xs tracking-widest transition-colors ${
                      isActive ? 'text-[#DFBA73] font-bold' : 'text-neutral-500'
                    }`}
                  >
                    {stage.step} —
                  </span>

                  <span
                    className={`font-display font-black tracking-tight transition-all duration-300 ${
                      isActive
                        ? 'text-2xl sm:text-4xl text-[#FAF8F5]'
                        : 'text-base sm:text-xl text-neutral-500'
                    }`}
                  >
                    {stage.name}
                  </span>

                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-ping" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Stage Narrative Description */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase font-bold">
              {currentStage.headline}
            </div>
            <p className="text-xs sm:text-sm text-[#C2C7D6] font-sans font-light leading-relaxed">
              {currentStage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
              {currentStage.specs.map((sp, i) => (
                <div key={i} className="flex items-center gap-2 text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                  <span className="truncate">{sp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Cinematic Photography Frame */}
        <div className="w-full lg:w-7/12 flex items-center justify-center">
          <div className="relative w-full aspect-[16/10] max-h-[45vh] sm:max-h-[55vh] lg:max-h-[60vh] rounded-xs overflow-hidden border border-[#DFBA73]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#121522] group">
            {/* Smooth Crossfade Images */}
            {STAGES.map((st, i) => (
              <img
                key={st.id}
                src={st.image}
                alt={st.name}
                className={`absolute inset-0 w-full h-full object-cover filter brightness-90 transition-all duration-500 transform ${
                  i === activeStageIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              />
            ))}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E14] via-[#0C0E14]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0E14]/60 via-transparent to-transparent" />

            {/* Bottom Meta Bar on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="px-3 py-1.5 bg-[#0C0E14]/85 backdrop-blur-md border border-[#DFBA73]/40 text-[#DFBA73] font-mono text-[10px] sm:text-xs tracking-[0.16em] uppercase rounded-xs">
                STAGE {currentStage.step} // {currentStage.tag}
              </div>
              <div className="px-3 py-1.5 bg-[#0C0E14]/85 backdrop-blur-md border border-white/10 text-neutral-300 font-mono text-[10px] sm:text-xs tracking-wider rounded-xs">
                VERIFIED CONTINUUM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Callout */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-4 z-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-2">
        <span className="text-center sm:text-left">
          RELEXA CONNECTS SOURCING, PURITY TESTING, ADVANCED PROCESSING & MARITIME FREIGHT.
        </span>
        <span className="text-[#DFBA73] tracking-widest uppercase">
          CLICK OR SCROLL TO PROGRESS CONTINUUM →
        </span>
      </div>
    </section>
  );
};
