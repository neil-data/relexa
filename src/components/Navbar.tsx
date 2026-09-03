import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Globe, FileText } from 'lucide-react';
import { RelexaLogo } from './RelexaLogo';

interface NavbarProps {
  onOpenBrochureModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrochureModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll locking and Escape key handling for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'COMPANY', href: '#company' },
    { label: 'SECTORS', href: '#sectors' },
    { label: 'PRODUCTS', href: '#products' },
    { label: 'GLOBAL REACH', href: '#global-reach' },
    { label: 'QUALITY', href: '#quality' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0C0E14]/85 backdrop-blur-md border-b border-[#DFBA73]/15 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-[#0C0E14]/80 via-[#0C0E14]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="nav-brand-logo-link"
            className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90 focus:outline-none"
            aria-label="Relexa Exports Home"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <RelexaLogo variant="horizontal" size={scrolled ? 'sm' : 'md'} />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[12px] font-sans font-medium tracking-[0.18em] text-[#C9CDD8] hover:text-[#DFBA73] transition-colors duration-300 relative py-1 group focus:outline-none"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#DFBA73] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Download Brochure Button - Direct PDF Download */}
            <a
              href="/relexa.pdf"
              download="Relexa-Exports-Brochure.pdf"
              id="nav-download-brochure-btn"
              className="download-brochure-button group relative inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.16em] uppercase text-[#0C0E14] bg-gradient-to-r from-[#F4DFB0] via-[#DFBA73] to-[#DFBA73] font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(223,186,115,0.4)] hover:brightness-110 active:scale-95 rounded-xs"
              title="Download Corporate Export Brochure (PDF)"
              aria-label="Download Relexa Exports brochure"
            >
              <span>DOWNLOAD BROCHURE</span>
              <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="/relexa.pdf"
              download="Relexa-Exports-Brochure.pdf"
              className="flex sm:hidden items-center justify-center p-2 text-[#DFBA73] border border-[#DFBA73]/30 rounded-sm"
              aria-label="Download Relexa Exports brochure"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              className="flex items-center justify-center w-11 h-11 text-[#F3F4F6] hover:text-[#DFBA73] focus:outline-none transition-colors rounded-sm"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-[#0C0E14]/98 backdrop-blur-xl flex flex-col pt-24 pb-10 px-6 sm:px-8 lg:hidden animate-in fade-in duration-300 overflow-y-auto"
        >
          <div className="flex flex-col space-y-6 min-h-full justify-between">
            <div className="text-[10px] font-mono text-[#DFBA73]/60 tracking-[0.25em] uppercase border-b border-[#DFBA73]/15 pb-3">
              NAVIGATION / SECTORS
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="flex items-center justify-between text-2xl font-display font-medium text-[#F3F4F6] hover:text-[#DFBA73] transition-colors py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#DFBA73]/50">0{idx + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col space-y-4 pt-6 border-t border-[#DFBA73]/20">
            <a
              href="/relexa.pdf"
              download="Relexa-Exports-Brochure.pdf"
              id="mobile-download-brochure-btn"
              className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#DFBA73] text-[#0C0E14] font-mono text-xs tracking-[0.16em] uppercase font-bold rounded-sm shadow-lg"
              aria-label="Download Relexa Exports brochure"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD BROCHURE (PDF)</span>
            </a>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2">
              <span>AHMEDABAD, INDIA</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
