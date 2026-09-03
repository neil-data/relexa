import React from 'react';

interface RelexaLogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'horizontal' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  animated?: boolean;
  monochrome?: boolean;
  lightMode?: boolean;
  id?: string;
}

export const RelexaLogo: React.FC<RelexaLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  id = 'relexa-brand-logo'
}) => {
  // Height configurations for crisp presentation
  const heightClass = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12 md:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-32',
    custom: 'h-auto max-h-full'
  }[size];

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`} id={id}>
        <img
          src="/logo.png"
          alt="Relexa Exports Logo"
          className={`${heightClass} w-auto object-contain rounded-lg drop-shadow-[0_2px_12px_rgba(223,186,115,0.3)] transition-transform duration-300 hover:scale-105`}
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className}`} id={id}>
        <img
          src="/logo.png"
          alt="Relexa Exports Official Logo"
          className={`${heightClass} w-auto object-contain rounded-lg drop-shadow-[0_4px_20px_rgba(223,186,115,0.35)] transition-transform duration-300 hover:scale-105`}
        />
      </div>
    );
  }

  // Default / Horizontal: Shows the crisp authentic logo directly
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`} id={id}>
      <img
        src="/logo.png"
        alt="Relexa Exports"
        className={`${heightClass} w-auto object-contain rounded-lg drop-shadow-[0_2px_10px_rgba(223,186,115,0.25)] transition-transform duration-300 hover:brightness-110`}
      />
    </div>
  );
};
