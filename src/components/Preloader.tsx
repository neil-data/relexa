import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { RelexaLogo } from './RelexaLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Safety fallback timeout to prevent preloader from getting stuck
    const safetyTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    const ctx = gsap.context(() => {
      // Progress increment
      const progressObj = { value: 0 };
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Final curtain reveal
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.1,
            ease: 'power4.inOut',
            onComplete: () => {
              clearTimeout(safetyTimer);
              onComplete();
            }
          });
        }
      });

      // 1. Initial states
      gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 20 });
      gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 15 });

      // 2. Logo emerges smoothly
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      // 3. Thin gold line expands horizontally
      .to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.9,
        ease: 'power2.inOut'
      }, '-=0.5')
      // 4. Supporting text fades in & counter accelerates
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .to(progressObj, {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(progressObj.value).toString().padStart(3, '0')}%`;
          }
        }
      }, '-=0.8')
      // 5. Brief hold for luxury cinematic pacing
      .to(logoRef.current, {
        scale: 1.05,
        duration: 0.6,
        ease: 'power1.out'
      })
      .to([logoRef.current, textRef.current, lineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power3.in'
      });
    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      id="preloader-overlay"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0E14] text-[#F3F4F6] pointer-events-auto select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.08)_0%,rgba(12,14,20,1)_70%)] pointer-events-none" />

      {/* Top corner coordinates */}
      <div className="absolute top-8 left-8 text-[11px] font-mono text-[#DFBA73]/60 tracking-[0.2em] hidden sm:block">
        23.0225° N, 72.5714° E / AHMEDABAD
      </div>
      <div className="absolute top-8 right-8 text-[11px] font-mono text-[#DFBA73]/60 tracking-[0.2em] hidden sm:block">
        GLOBAL EXPORTS INITIATIVE
      </div>

      {/* Center lockup */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full">
        <div ref={logoRef} className="w-48 sm:w-56 mb-8">
          <RelexaLogo variant="full" size="custom" animated />
        </div>

        {/* Thin expanding line */}
        <div
          ref={lineRef}
          className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#DFBA73] to-transparent origin-center mb-6"
        />

        {/* Subtext and percentage counter */}
        <div
          ref={textRef}
          className="flex items-center justify-between w-48 sm:w-64 text-[10px] font-mono tracking-[0.25em] text-[#DFBA73]/80 uppercase"
        >
          <span>FOUR WORLDS</span>
          <span ref={counterRef} className="text-[#F3F4F6] font-semibold">
            000%
          </span>
          <span>ONE STANDARD</span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
        CONNECTING QUALITY WITH GLOBAL MARKETS
      </div>
    </div>
  );
};
