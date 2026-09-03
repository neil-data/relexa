import React, { useState, type FormEvent } from 'react';
import { Download, Mail, Phone, MapPin, ArrowRight, Globe, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { COMPANY_FACTS } from '../data/companyData';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  onOpenBrochureModal?: () => void;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const inputClasses =
  'w-full bg-[#0C0E14]/60 border border-white/10 focus:border-[#DFBA73]/60 rounded-xs px-4 py-3 text-sm font-sans text-[#F3F4F6] placeholder-neutral-500 focus:outline-none transition-colors';

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBrochureModal,
}) => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Anti-spam countdown timer
  React.useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setTimeout(() => setCooldownSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldownSeconds]);

  // Shared state for the form fields so we can reset after a successful send.
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Enquiry',
    message: '',
    botcheck: '', // hidden honeypot — must stay empty
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownSeconds > 0) {
      setStatus('error');
      setMessage(`Please wait ${cooldownSeconds}s before submitting another enquiry.`);
      return;
    }
    setStatus('sending');
    setMessage('');

    // Honeypot anti-spam check: bots fill this hidden field
    if (form.botcheck && form.botcheck.trim() !== '') {
      setStatus('success');
      setMessage('Thank you! Your enquiry has been received.');
      return;
    }

    if (!form.name.trim() || form.name.trim().length < 2) {
      setStatus('error');
      setMessage('Please enter your full name.');
      return;
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!form.message.trim() || form.message.trim().length < 5) {
      setStatus('error');
      setMessage('Please enter a message (at least 5 characters).');
      return;
    }

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      '7bebe87d-afeb-4529-9045-c29f21948a98';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          company: form.company.trim() || undefined,
          subject: form.subject
            ? `${form.subject} — Enquiry from ${form.name.trim()}`
            : `New enquiry from ${form.name.trim()} (Relexa Exports)`,
          message: form.message.trim(),
          from_name: form.name.trim(),
          replyto: form.email.trim(),
          botcheck: '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you! Your message has been sent. We will get back to you shortly.');
        setCooldownSeconds(30);
        // Clear the form on success.
        setForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: 'General Enquiry',
          message: '',
          botcheck: '',
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'We could not send your message. Please try again or email us directly.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again or email us directly.');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-40 lg:py-52 bg-[#080A0F] text-[#F3F4F6] border-t border-[#DFBA73]/20 overflow-hidden"
    >
      {/* Dramatic Cinematic Background Real Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Relexa_Product_Images/Dog-Food.jpeg"
          alt="Relexa Exports Deepwater Port Maritime Hub"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#0E1119]/80 to-[#0E1119]/90" />
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
          <h2 className="text-[clamp(2.4rem,8vw,9.5rem)] sm:text-[clamp(3rem,8vw,9.5rem)] font-display font-black tracking-tight uppercase leading-[0.88] text-[#F3F4F6] mb-6">
            LET'S
            <br />
            <span className="gold-gradient-text">CONNECT.</span>
          </h2>

          <div className="text-lg sm:text-2xl lg:text-3xl font-display font-bold text-[#E5E9F0] uppercase tracking-wide max-w-2xl mb-12">
            BUILD THE NEXT GLOBAL SUPPLY CHAIN.
          </div>

          {/* Primary & Secondary CTAs with Magnetic Precision */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
            {/* Secondary CTA: DOWNLOAD COMPANY BROCHURE → (downloads /relexa.pdf) */}
            <a
              href="/relexa.pdf"
              download="Relexa-Exports-Brochure.pdf"
              id="cta-download-brochure-btn"
              data-cursor="cta"
              aria-label="Download Relexa Exports brochure"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#121522]/90 hover:bg-[#121522] border border-[#DFBA73]/40 hover:border-[#DFBA73] text-[#F3F4F6] hover:text-[#DFBA73] font-mono text-xs sm:text-sm tracking-[0.18em] uppercase font-bold rounded-xs transition-all shadow-xl backdrop-blur-md"
            >
              <span>DOWNLOAD COMPANY BROCHURE</span>
              <ArrowRight className="w-4 h-4 text-[#DFBA73]" />
            </a>
          </div>
        </div>

        {/* Contact Enquiry Form — submitted via server-side proxy (key stays on server) */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#DFBA73]" />
            <span className="text-xs font-mono tracking-[0.3em] text-[#DFBA73] uppercase font-semibold">
              SEND AN ENQUIRY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 bg-[#0E1119]/80 border border-white/10 rounded-xs backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} noValidate>
                {/* Hidden honeypot field — bots fill this, real users never see it */}
                <input
                  type="text"
                  name="botcheck"
                  value={form.botcheck}
                  onChange={update('botcheck')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      maxLength={100}
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@company.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      maxLength={30}
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 ..."
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      maxLength={100}
                      value={form.company}
                      onChange={update('company')}
                      placeholder="Company / Organisation"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-subject" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                    Topic of Interest
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={update('subject')}
                    className={inputClasses}
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Healthcare & Dental">Healthcare &amp; Dental</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Pet Nutrition">Pet Nutrition</option>
                    <option value="Steel & Industrial">Steel &amp; Industrial</option>
                    <option value="Partnership / Distribution">Partnership / Distribution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="block text-[11px] font-mono tracking-[0.18em] text-[#DFBA73]/70 uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={3000}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your requirements, quantities, destination port..."
                    rows={5}
                    className={`${inputClasses} resize-y`}
                  />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending' || cooldownSeconds > 0}
                    id="contact-form-submit-btn"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F4DFB0] via-[#DFBA73] to-[#DFBA73] text-[#0C0E14] font-mono text-xs sm:text-sm tracking-[0.18em] uppercase font-bold rounded-xs transition-all shadow-lg hover:shadow-[0_0_20px_rgba(223,186,115,0.4)] hover:brightness-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : cooldownSeconds > 0 ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>WAIT {cooldownSeconds}S</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT ENQUIRY</span>
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-[#7FD1A0]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{message}</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-[#F4A9A9]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{message}</span>
                    </div>
                  )}
                </div>

                <p className="mt-5 text-[11px] font-mono text-neutral-500">
                  Prefer email? Write to us directly at{' '}
                  <a href={`mailto:${COMPANY_FACTS.email}`} className="text-[#DFBA73] hover:underline">
                    {COMPANY_FACTS.email}
                  </a>
                </p>
              </form>
            </div>

            {/* Side context: why to contact + direct channels */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-8 bg-[#0E1119]/80 border border-white/10 rounded-xs backdrop-blur-sm">
                <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-3">
                  WHAT HAPPENS NEXT
                </div>
                <ul className="space-y-3 text-sm text-neutral-300 font-sans font-light leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-[#DFBA73] font-mono">01</span>
                    <span>Your enquiry is sent securely to our export trade desk.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#DFBA73] font-mono">02</span>
                    <span>Our team responds within one business day with specifications &amp; logistics.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#DFBA73] font-mono">03</span>
                    <span>We prepare a tailored commercial offer and FCL/reefer quotation.</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-[#0E1119]/80 border border-[#DFBA73]/20 rounded-xs">
                <div className="text-xs font-mono tracking-[0.2em] text-[#DFBA73] uppercase mb-4">
                  DIRECT TRADE DESK
                </div>
                <div className="space-y-3">
                  <a href={`mailto:${COMPANY_FACTS.email}`} className="flex items-center gap-3 text-sm font-mono text-[#F3F4F6] hover:text-[#DFBA73] transition-colors">
                    <Mail className="w-4 h-4 text-[#DFBA73]" />
                    {COMPANY_FACTS.email}
                  </a>
                  <a href={`tel:${COMPANY_FACTS.primaryPhone}`} className="flex items-center gap-3 text-sm font-mono text-[#F3F4F6] hover:text-[#DFBA73] transition-colors">
                    <Phone className="w-4 h-4 text-[#DFBA73]" />
                    {COMPANY_FACTS.primaryPhone}
                  </a>
                </div>
              </div>
            </div>
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
            <h3 className="text-xl font-display font-bold text-[#F3F4F6] mb-3">
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
            <h3 className="text-xl font-display font-bold text-[#F3F4F6] mb-3">
              Direct Phone Lines
            </h3>
            <div className="space-y-1.5 text-sm font-mono">
              <div>
                <a
                  href={`tel:${COMPANY_FACTS.primaryPhone}`}
                  className="text-[#F3F4F6] hover:text-[#DFBA73] transition-colors"
                >
                  {COMPANY_FACTS.primaryPhone}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_FACTS.secondaryPhone}`}
                  className="text-[#F3F4F6] hover:text-[#DFBA73] transition-colors"
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
            <h3 className="text-xl font-display font-bold text-[#F3F4F6] mb-3">
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
