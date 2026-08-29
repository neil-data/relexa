import React, { useEffect, useState, useRef } from 'react';

type CursorType = 'default' | 'view' | 'explore' | 'cta';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device has touch primary
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth RAF cursor positioning loop (Lerp for silky-smooth motion)
    let animationFrameId: number;
    const render = () => {
      posRef.current.x += (targetPosRef.current.x - posRef.current.x) * 0.2;
      posRef.current.y += (targetPosRef.current.y - posRef.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    // Event delegation for contextual hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor') as CursorType;
        if (val === 'view' || val === 'explore' || val === 'cta') {
          setCursorType(val);
          return;
        }
      }

      // Check contextual elements
      if (target.closest('button') || target.closest('a') || target.tagName === 'BUTTON' || target.tagName === 'A') {
        setCursorType('cta');
      } else if (target.tagName === 'IMG' || target.closest('.cursor-view')) {
        setCursorType('view');
      } else if (target.closest('.cursor-explore')) {
        setCursorType('explore');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,background-color,border-color,opacity] duration-200 ease-out flex items-center justify-center font-mono select-none ${
        !isVisible ? 'opacity-0' : 'opacity-100'
      } ${
        cursorType === 'default'
          ? 'w-3 h-3 rounded-full bg-[#DFBA73] shadow-[0_0_10px_rgba(223,186,115,0.4)]'
          : cursorType === 'cta'
          ? 'w-10 h-10 rounded-full bg-[#DFBA73] text-[#0C0E14] font-bold text-sm shadow-[0_0_20px_rgba(223,186,115,0.6)]'
          : cursorType === 'view'
          ? 'w-14 h-14 rounded-full bg-[#FAF8F5]/90 text-[#0C0E14] text-[10px] tracking-[0.15em] uppercase font-bold backdrop-blur-sm border border-white/20 shadow-2xl'
          : 'w-16 h-16 rounded-full bg-[#DFBA73]/95 text-[#0C0E14] text-[10px] tracking-[0.15em] uppercase font-extrabold shadow-2xl backdrop-blur-sm'
      }`}
      style={{
        willChange: 'transform',
      }}
    >
      {cursorType === 'view' && <span>VIEW</span>}
      {cursorType === 'explore' && <span>EXPLORE</span>}
      {cursorType === 'cta' && <span>→</span>}
    </div>
  );
};
