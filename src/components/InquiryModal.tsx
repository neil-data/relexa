import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Building, Mail, Phone, MapPin, Package, Container } from 'lucide-react';
import { SECTORS, PRODUCTS_CATALOG, COMPANY_FACTS } from '../data/companyData';
import { SectorId, RfqFormData } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSector?: SectorId;
  initialProduct?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialSector = 'healthcare',
  initialProduct = '',
}) => {
  const [formData, setFormData] = useState<RfqFormData>({
    sector: initialSector,
    products: initialProduct ? [initialProduct] : [],
    containerType: '40ft HC FCL',
    estimatedVolume: '1 x 40ft FCL',
    destinationCountry: '',
    destinationPort: '',
    incoterm: 'CIF',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryDocketId, setInquiryDocketId] = useState('');

  useEffect(() => {
    if (initialSector) {
      setFormData((prev) => ({
        ...prev,
        sector: initialSector,
        products: initialProduct ? [initialProduct] : prev.products
      }));
    }
  }, [initialSector, initialProduct]);

  if (!isOpen) return null;

  const handleProductToggle = (prodName: string) => {
    setFormData((prev) => {
      const exists = prev.products.includes(prodName);
      if (exists) {
        return { ...prev, products: prev.products.filter((p) => p !== prodName) };
      } else {
        return { ...prev, products: [...prev.products, prodName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docket = 'RLX-' + Math.floor(100000 + Math.random() * 900000);
    setInquiryDocketId(docket);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const sectorProducts = PRODUCTS_CATALOG.filter((p) => p.sectorId === formData.sector);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121522] border border-[#DFBA73]/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative p-6 sm:p-10 text-[#F3F4F6]">
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          id="close-inquiry-modal-btn"
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-[#DFBA73]/20 border border-[#DFBA73] rounded-full flex items-center justify-center text-[#DFBA73] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FAF8F5]">
              Trade Inquiry Docket Issued
            </h3>

            <div className="p-4 bg-[#0C0E14] border border-[#DFBA73]/30 rounded-xs max-w-md mx-auto font-mono text-sm">
              <div className="text-neutral-400 text-xs uppercase tracking-widest">DOCKET REFERENCE NUMBER</div>
              <div className="text-xl font-bold text-[#DFBA73] mt-1">{inquiryDocketId}</div>
            </div>

            <p className="text-sm text-[#C5C9D6] max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.contactPerson || 'Procurement Executive'}</strong>. Your commercial quotation request for <strong className="text-[#DFBA73]">{formData.sector.toUpperCase()}</strong> has been routed to our Ahmedabad Central Trade Desk. A Senior Export Trade Specialist will transmit full Proforma & FOB/CIF pricing within 4 business hours.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-8 py-3 bg-[#DFBA73] text-[#0C0E14] font-mono text-xs tracking-[0.16em] uppercase font-bold rounded-xs"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="pb-6 border-b border-[#DFBA73]/20">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#DFBA73] uppercase">
                EXPORT TRADE DESK / COMMERCIAL INQUIRY
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#FAF8F5] mt-1">
                Request Export Quotation (RFQ)
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Direct factory pricing, technical dossier requests, and container freight estimates from Ahmedabad.
              </p>
            </div>

            {/* Step 1: Select Sector */}
            <div>
              <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-2">
                1. SELECT EXPORT SECTOR *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SECTORS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, sector: s.id, products: [] })}
                    className={`p-3 text-left border rounded-xs transition-all text-xs font-mono ${
                      formData.sector === s.id
                        ? 'bg-[#DFBA73] text-[#0C0E14] font-bold border-[#DFBA73]'
                        : 'bg-[#0C0E14] text-neutral-300 border-white/10 hover:border-[#DFBA73]/40'
                    }`}
                  >
                    {s.title.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Products in this Sector */}
            {sectorProducts.length > 0 && (
              <div>
                <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-2">
                  2. SELECT TARGET PRODUCTS (OPTIONAL)
                </label>
                <div className="space-y-2">
                  {sectorProducts.map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-3 p-3 bg-[#0C0E14] border border-white/5 hover:border-[#DFBA73]/30 rounded-xs cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={formData.products.includes(p.name)}
                        onChange={() => handleProductToggle(p.name)}
                        className="accent-[#DFBA73] w-4 h-4 rounded"
                      />
                      <span className="font-sans text-neutral-200 font-medium">{p.name}</span>
                      <span className="text-[10px] font-mono text-neutral-500 ml-auto">[{p.category}]</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Shipping & Logistics Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-1.5">
                  3. CONTAINER CAPACITY TYPE *
                </label>
                <select
                  value={formData.containerType}
                  onChange={(e) => setFormData({ ...formData, containerType: e.target.value as any })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs font-sans text-white focus:border-[#DFBA73] focus:outline-none"
                >
                  <option value="40ft HC FCL">40ft High Cube (FCL)</option>
                  <option value="20ft FCL">20ft Heavy Duty (FCL)</option>
                  <option value="40ft Reefer">40ft Controlled Atmosphere Reefer (-18°C)</option>
                  <option value="Break Bulk / LCL">Break Bulk / Bulk Vessel Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-1.5">
                  4. PREFERRED INCOTERMS *
                </label>
                <select
                  value={formData.incoterm}
                  onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as any })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs font-sans text-white focus:border-[#DFBA73] focus:outline-none"
                >
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB (Mundra / JNPT)">FOB (Port Mundra / JNPT India)</option>
                  <option value="CFR">CFR (Cost & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Destination & Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-1.5">
                  DESTINATION COUNTRY *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Germany, UAE, United States, Japan"
                  value={formData.destinationCountry}
                  onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs font-sans text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.16em] text-[#DFBA73] uppercase mb-1.5">
                  DISCHARGE PORT OF ENTRY *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rotterdam, Jebel Ali, New York, Singapore"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs font-sans text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
                />
              </div>
            </div>

            {/* Step 5: Contact Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-mono tracking-[0.14em] text-neutral-300 uppercase mb-1">
                  COMPANY NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise / Importer Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.14em] text-neutral-300 uppercase mb-1">
                  OFFICIAL BUSINESS EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.14em] text-neutral-300 uppercase mb-1">
                  CONTACT NUMBER / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="+1 / +44 / +971..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
                />
              </div>
            </div>

            {/* Additional Trade Notes */}
            <div>
              <label className="block text-xs font-mono tracking-[0.14em] text-neutral-300 uppercase mb-1">
                TECHNICAL REQUIREMENTS / PACKAGING SPECIFICATIONS
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific pharmacopeia (USP/BP), cut size, coating grams, heat treatment, or delivery timeline..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2.5 bg-[#0C0E14] border border-white/10 rounded-xs text-xs text-white placeholder-neutral-500 focus:border-[#DFBA73] focus:outline-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#DFBA73]" />
                <span>NDA & Confidential Commercial Inquiry Protected</span>
              </div>

              <button
                type="submit"
                id="submit-rfq-form-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#F4DFB0] via-[#DFBA73] to-[#C8A25D] text-[#0C0E14] font-mono text-xs tracking-[0.18em] uppercase font-bold hover:brightness-110 active:scale-98 transition-all rounded-xs shadow-lg"
              >
                <span>TRANSMIT TRADE INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
