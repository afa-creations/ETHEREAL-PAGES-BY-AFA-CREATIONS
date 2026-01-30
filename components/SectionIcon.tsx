
import React from 'react';

interface SectionIconProps {
  type: 'Poetry' | 'Philosophy' | 'History';
  className?: string;
  variant?: 'light' | 'dark';
}

const SectionIcon: React.FC<SectionIconProps> = ({ type, className = "w-12 h-12", variant = 'dark' }) => {
  const colorClass = variant === 'dark' ? 'text-stone-800' : 'text-white';
  
  const icons = {
    Poetry: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Single Line Quill Feather */}
        <path d="M80 20C80 20 60 25 50 45C40 65 45 85 45 85" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M45 85L42 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M52 43L65 35M55 55L72 45M52 68L68 60" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
        <path d="M48 43L35 38M45 55L30 52M42 68L28 66" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    Philosophy: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Pillars of Thought / Abstract Portal */}
        <path d="M30 80V30C30 25 35 20 40 20H60C65 20 70 25 70 30V80" stroke="currentColor" strokeWidth="1.5" />
        <path d="M25 80H75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 40H70M30 55H70M30 70H70" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="45" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 45V65" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    History: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Celestial Chronometer */}
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
        <path d="M50 15V35M50 65V85M15 50H35M65 50H85" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M50 50L65 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 50L50 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    )
  };

  return <div className={`flex items-center justify-center ${colorClass}`}>{icons[type]}</div>;
};

export default SectionIcon;
