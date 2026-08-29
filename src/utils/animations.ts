import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable animation utilities for GSAP & ScrollTrigger with automatic cleanup
 */

export const revealImage = (
  target: HTMLElement | string,
  trigger?: HTMLElement | string,
  options: gsap.TweenVars = {}
) => {
  const scrollConfig = trigger
    ? {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(typeof options.scrollTrigger === 'object' && options.scrollTrigger !== null
          ? options.scrollTrigger
          : {})
      }
    : undefined;

  return gsap.fromTo(
    target,
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      scale: 1.15,
      opacity: 0
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: 'power3.out',
      ...(scrollConfig ? { scrollTrigger: scrollConfig } : {}),
      ...options
    }
  );
};

export const splitTextReveal = (
  target: HTMLElement | string,
  trigger?: HTMLElement | string,
  options: gsap.TweenVars = {}
) => {
  const scrollConfig = trigger
    ? {
        trigger: trigger,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
        ...(typeof options.scrollTrigger === 'object' && options.scrollTrigger !== null
          ? options.scrollTrigger
          : {})
      }
    : undefined;

  return gsap.fromTo(
    target,
    {
      y: 40,
      opacity: 0,
      rotateX: 10
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.1,
      ease: 'power4.out',
      ...(scrollConfig ? { scrollTrigger: scrollConfig } : {}),
      ...options
    }
  );
};

export const fadeUp = (
  target: HTMLElement | string | Element[],
  trigger?: HTMLElement | string,
  delay: number = 0,
  options: gsap.TweenVars = {}
) => {
  const scrollConfig = trigger
    ? {
        trigger: trigger,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
        ...(typeof options.scrollTrigger === 'object' && options.scrollTrigger !== null
          ? options.scrollTrigger
          : {})
      }
    : undefined;

  return gsap.fromTo(
    target,
    {
      y: 30,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      ...(scrollConfig ? { scrollTrigger: scrollConfig } : {}),
      ...options
    }
  );
};

export const parallaxImage = (
  imageTarget: HTMLElement | string,
  containerTarget: HTMLElement | string,
  speed: number = 0.2
) => {
  return gsap.to(imageTarget, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: containerTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

export const horizontalScroll = (
  container: HTMLElement | string,
  panels: HTMLElement | string,
  totalPanelsCount: number
) => {
  return gsap.to(panels, {
    xPercent: -100 * (totalPanelsCount - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (totalPanelsCount - 1),
      end: () => `+=${window.innerWidth * (totalPanelsCount - 1)}`
    }
  });
};

export const staggerReveal = (
  elements: HTMLElement[] | string,
  trigger?: HTMLElement | string,
  staggerTime: number = 0.1,
  options: gsap.TweenVars = {}
) => {
  const scrollConfig = trigger
    ? {
        trigger: trigger,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...(typeof options.scrollTrigger === 'object' && options.scrollTrigger !== null
          ? options.scrollTrigger
          : {})
      }
    : undefined;

  return gsap.fromTo(
    elements,
    {
      y: 25,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerTime,
      ease: 'power3.out',
      ...(scrollConfig ? { scrollTrigger: scrollConfig } : {}),
      ...options
    }
  );
};
