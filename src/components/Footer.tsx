import React from 'react';
import { ArrowUp, Download, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_FACTS } from '../data/companyData';
import { RelexaLogo } from './RelexaLogo';

interface FooterProps {
  onOpenBrochureModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06080C] text-[#F3F4F6] border-t border-white/10 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Large Brand Presentation with Official Logo */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-[12vw] sm:text-[10vw] lg:text-[8.5vw] font-display font-black tracking-tight leading-[0.82] uppercase text-[#FAF8F5]">
            RELEXA
            <br />
            <span className="gold-gradient-text">EXPORTS</span>
          </div>

          <div className="pb-2">
            <RelexaLogo variant="full" size="lg" id="footer-brand-logo" />
          </div>
        </div>

        {/* Navigation & Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/10">
          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono tracking-[0.25em] text-[#DFBA73] uppercase font-semibold">
              NAVIGATION
            </div>
            <ul className="space-y-3 font-mono text-xs sm:text-sm tracking-wider uppercase">
              <li>
                <a href="#company" className="hover:text-[#DFBA73] transition-colors">
                  COMPANY
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-[#DFBA73] transition-colors">
                  SECTORS
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#DFBA73] transition-colors">
                  PRODUCTS
                </a>
              </li>
              <li>
                <a href="#global-reach" className="hover:text-[#DFBA73] transition-colors">
                  GLOBAL REACH
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#DFBA73] transition-colors">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Brochure CTA */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono tracking-[0.25em] text-[#DFBA73] uppercase font-semibold">
              CORPORATE LITERATURE
            </div>
            <p className="text-xs text-[#A1A7BA] font-sans font-light leading-relaxed max-w-xs">
              Complete export dossiers, certifications, and product specifications.
            </p>
            <a
              href="/relexa.pdf"
              download="Relexa-Exports-Brochure.pdf"
              data-cursor="cta"
              aria-label="Download Relexa Exports brochure"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#DFBA73]/10 hover:bg-[#DFBA73] border border-[#DFBA73]/30 text-[#DFBA73] hover:text-[#FAF8F5] font-mono text-xs tracking-[0.16em] uppercase font-bold rounded-xs transition-all"
            >
              <span>DOWNLOAD BROCHURE</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Verified Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono tracking-[0.25em] text-[#DFBA73] uppercase font-semibold">
              CONTACT INFORMATION
            </div>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-[#DFBA73]" />
                <a href={`mailto:${COMPANY_FACTS.email}`} className="text-[#DFBA73] hover:underline">
                  {COMPANY_FACTS.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>{COMPANY_FACTS.primaryPhone} / {COMPANY_FACTS.secondaryPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>{COMPANY_FACTS.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: © RELEXA EXPORTS & QUALITY. CONNECTED GLOBALLY. */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} RELEXA EXPORTS.
          </div>

          <div className="text-[#DFBA73] tracking-[0.2em] uppercase font-semibold">
            QUALITY. CONNECTED GLOBALLY.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
