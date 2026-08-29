import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  CheckCircle, 
  Microscope, 
  Scale, 
  Check, 
  ThermometerSnowflake,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { CERTIFICATIONS_LIST } from '../data/companyData';

export const QualityStandards: React.FC = () => {
  const auditStages = [
    {
      step: '01',
      name: 'Raw Input Chromatography',
      desc: 'HPLC & GC-MS chemical assay validation for APIs, Brix scoring for potato crops, and spectral optical emission testing for raw steel billets.'
    },
    {
      step: '02',
      name: 'Environmental Quarantine',
      desc: 'Class 100 sterile cleanrooms, fluidized bed IQF freezing tunnels at -38°C, and closed-loop hydraulic roll forming calibration.'
    },
    {
      step: '03',
      name: 'Non-Destructive & Pathogen Assay',
      desc: 'Zero-pathogen swab cultivation (Salmonella/Listeria), dissolution kinetic profiling, and ultrasonic internal structural crack inspection.'
    },
    {
      step: '04',
      name: 'Pre-Shipment Surveyor Sealing',
      desc: 'Independent inspection surveyor sealing (SGS / Bureau Veritas), tamper-evident customs seals, and real-time IoT temperature data-logger tracking.'
    }
  ];

  return (
    <section
      id="quality"
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-[#0C0E14] text-[#F3F4F6] border-t border-[#DFBA73]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section 19: Minimal Striking Typography Headline */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#DFBA73]" />
            <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
              05 / QUALITY ARCHITECTURE
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase leading-[0.95] text-[#FAF8F5]">
            QUALITY IS NOT
            <br />
            <span className="text-stroke hover:text-[#DFBA73] transition-colors duration-500">A DEPARTMENT.</span>
            <br />
            <span className="gold-gradient-text">IT IS THE STANDARD.</span>
          </h2>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <span>CERTIFIED LABORATORY ASSAYS • COLD-CHAIN LOCKING • METALLURGICAL MILL TESTS</span>
            <span className="text-[#DFBA73]">ZERO DEFECT GOVERNANCE</span>
          </div>
        </div>

        {/* 4-Stage Zero-Defect Inspection Pipeline */}
        <div className="bg-[#0E1119] border border-white/10 p-6 sm:p-10 lg:p-12 rounded-xs mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/5 gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-1">
                ZERO-DEFECT PIPELINE
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FAF8F5]">
                4-Stage Technical Validation Protocol
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-sans font-light max-w-sm">
              Every export consignment is validated through end-to-end laboratory and physical inspection before departure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditStages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 bg-[#131622] border border-white/5 rounded-xs relative group hover:border-[#DFBA73]/40 transition-colors"
              >
                <div className="text-3xl font-display font-extrabold text-[#DFBA73]/40 group-hover:text-[#DFBA73] transition-colors mb-3">
                  {stage.step}
                </div>
                <h4 className="text-base font-display font-bold text-[#FAF8F5] mb-2">
                  {stage.name}
                </h4>
                <p className="text-xs text-[#9DA3B4] font-sans font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Regulatory Certifications Matrix */}
        <div className="mb-12">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase mb-8 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#DFBA73]" />
            <span>INTERNATIONAL ACCREDITATIONS & GOVERNANCE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS_LIST.map((cert) => (
              <div
                key={cert.code}
                className="p-6 sm:p-8 bg-[#121522] border border-[#DFBA73]/20 hover:border-[#DFBA73]/60 transition-all duration-300 rounded-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-[#DFBA73]/10 border border-[#DFBA73]/30 text-[#DFBA73] text-xs font-mono font-bold tracking-[0.16em] uppercase rounded-xs">
                      {cert.code}
                    </span>
                    <Award className="w-5 h-5 text-[#DFBA73]/50 group-hover:text-[#DFBA73] transition-colors" />
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#FAF8F5] mb-1">
                    {cert.name}
                  </h3>
                  <div className="text-[11px] font-mono text-[#DFBA73]/80 uppercase mb-3">
                    {cert.authority} • <span className="text-neutral-400">{cert.sector}</span>
                  </div>
                  <p className="text-xs text-[#A3AABF] font-sans font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#DFBA73]">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    AUDIT COMPLIANT
                  </span>
                  <span className="text-neutral-500 font-sans text-[10px]">Annual Verification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
