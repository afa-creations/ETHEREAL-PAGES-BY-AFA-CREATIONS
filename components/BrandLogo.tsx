
import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative mb-2 group cursor-default`}>
        {/* Fine-line luxury aesthetic */}
        <div className="absolute inset-0 bg-stone-50 rounded-full scale-105 opacity-40 blur-md group-hover:opacity-60 transition-opacity"></div>
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-10"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract interlocking stroke - E and P merged into a single path */}
          <path 
            d="M30 35C30 35 60 25 70 40C80 55 60 65 40 60V80" 
            stroke="url(#luxuryStroke)" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            className="opacity-90 transition-all duration-1000"
          />
          <path 
            d="M35 50H65" 
            stroke="#1c1917" 
            strokeWidth="0.8" 
            strokeLinecap="round" 
            className="opacity-40"
          />
          <path 
            d="M50 20C65 20 80 35 80 50C80 65 65 80 50 80C35 80 20 65 20 50C20 35 35 20 50 20Z" 
            stroke="#e7e5e4" 
            strokeWidth="0.5" 
          />
          
          <defs>
            <linearGradient id="luxuryStroke" x1="30" y1="35" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1c1917" />
              <stop offset="1" stopColor="#78716c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {withText && (
        <div className="text-center">
          <h1 className={`${textClasses[size]} font-serif text-stone-900 tracking-[-0.04em] font-medium`}>
            ETHEREAL<span className="italic font-light text-stone-400 ml-1">PAGES</span>
          </h1>
          <div className="w-8 h-[1px] bg-stone-200 mx-auto mt-2"></div>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
