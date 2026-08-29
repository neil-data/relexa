import React from 'react';
import { Download, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { COMPANY_FACTS } from '../data/companyData';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  onOpenBrochureModal?: () => void;
  onOpenRfqModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBrochureModal,
  onOpenRfqModal,
}) => {
  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-40 lg:py-52 bg-[#080A0F] text-[#F3F4F6] border-t border-[#DFBA73]/20 overflow-hidden"
    >
      {/* Dramatic Cinematic Background Real Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-port.jpg"
          alt="Relexa Exports Deepwater Port Maritime Hub"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/80 to-[#080A0F]/90" />
        <div className="absolute inset-0 bg-radial-glow opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[#DFBA73]" />
          <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
            08 / FINAL CALL TO ACTION
          </span>
        </div>

        {/* Section 23: Film Conclusion Callout */}
        <div className="mb-20 sm:mb-28">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] font-display font-black tracking-tight uppercase leading-[0.88] text-[#FAF8F5] mb-6">
            LET'S
            <br />
            <span className="gold-gradient-text">CONNECT.</span>
          </h2>

          <div className="text-lg sm:text-2xl lg:text-3xl font-display font-bold text-[#E5E9F0] uppercase tracking-wide max-w-2xl mb-12">
            BUILD THE NEXT GLOBAL SUPPLY CHAIN.
          </div>

          {/* Primary & Secondary CTAs with Magnetic Precision */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
            {/* Primary CTA: START A CONVERSATION → */}
            <MagneticButton
              id="cta-start-conversation-btn"
              onClick={onOpenRfqModal}
              dataCursor="cta"
              strength={0.25}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#F4DFB0] via-[#DFBA73] to-[#C8A25D] text-[#0C0E14] font-mono text-xs sm:text-sm tracking-[0.18em] uppercase font-black rounded-xs shadow-[0_10px_40px_rgba(223,186,115,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            {/* Secondary CTA: DOWNLOAD COMPANY BROCHURE → (downloads /brochure.pdf) */}
            <a
              href="/brochure.pdf"
              download="Relexa-Exports-Brochure.pdf"
              id="cta-download-brochure-btn"
              data-cursor="cta"
              aria-label="Download Relexa Exports brochure"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#121522]/90 hover:bg-[#181C2E] border border-[#DFBA73]/40 hover:border-[#DFBA73] text-[#FAF8F5] hover:text-[#DFBA73] font-mono text-xs sm:text-sm tracking-[0.18em] uppercase font-bold rounded-xs transition-all shadow-xl backdrop-blur-md"
            >
              <span>DOWNLOAD COMPANY BROCHURE</span>
              <ArrowRight className="w-4 h-4 text-[#DFBA73]" />
            </a>
          </div>
        </div>

        {/* Section 24: Strict Verified Contact Information Only */}
        <div className="pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="p-8 bg-[#0E1119]/80 border border-white/10 rounded-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xs bg-[#DFBA73]/10 text-[#DFBA73] flex items-center justify-center mb-6">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-2">
              DIRECT EMAIL
            </div>
            <h3 className="text-xl font-display font-bold text-[#FAF8F5] mb-3">
              Official Correspondence
            </h3>
            <a
              href={`mailto:${COMPANY_FACTS.email}`}
              className="text-sm font-mono text-[#DFBA73] hover:underline block break-all"
            >
              {COMPANY_FACTS.email}
            </a>
          </div>

          {/* Phones */}
          <div className="p-8 bg-[#0E1119]/80 border border-white/10 rounded-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xs bg-[#DFBA73]/10 text-[#DFBA73] flex items-center justify-center mb-6">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-2">
              TELEPHONE & TRADE DESK
            </div>
            <h3 className="text-xl font-display font-bold text-[#FAF8F5] mb-3">
              Direct Phone Lines
            </h3>
            <div className="space-y-1.5 text-sm font-mono">
              <div>
                <a
                  href={`tel:${COMPANY_FACTS.primaryPhone}`}
                  className="text-neutral-200 hover:text-[#DFBA73] transition-colors"
                >
                  {COMPANY_FACTS.primaryPhone}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_FACTS.secondaryPhone}`}
                  className="text-neutral-200 hover:text-[#DFBA73] transition-colors"
                >
                  {COMPANY_FACTS.secondaryPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-8 bg-[#0E1119]/80 border border-white/10 rounded-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xs bg-[#DFBA73]/10 text-[#DFBA73] flex items-center justify-center mb-6">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-2">
              LOCATION & ORIGIN
            </div>
            <h3 className="text-xl font-display font-bold text-[#FAF8F5] mb-3">
              Headquarters Address
            </h3>
            <p className="text-sm font-sans text-neutral-300 leading-relaxed">
              {COMPANY_FACTS.fullAddress}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
