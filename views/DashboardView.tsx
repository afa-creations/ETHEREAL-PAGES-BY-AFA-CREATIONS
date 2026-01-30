
import React from 'react';
import { Section, UserProfile } from '../types';
import BrandLogo from '../components/BrandLogo';
import SectionIcon from '../components/SectionIcon';

interface DashboardViewProps {
  profile: UserProfile;
  onNavigate: (section: Section) => void;
  onLogout: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ profile, onNavigate, onLogout }) => {
  const categories = [
    {
      id: 'Poetry',
      title: 'Poetry',
      description: 'Verse and rhymes that touch the soul.',
      color: 'bg-[#FCF8F7] text-stone-800',
      iconType: 'Poetry' as const
    },
    {
      id: 'Philosophy',
      title: 'Philosophy',
      description: 'Theological reflections and existential musings.',
      color: 'bg-[#F7F8FC] text-stone-800',
      iconType: 'Philosophy' as const
    },
    {
      id: 'History',
      title: 'History',
      description: 'Chronicles of time and heritage.',
      color: 'bg-[#F9F9F7] text-stone-800',
      iconType: 'History' as const
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 fade-in">
      <header className="mb-32 flex flex-col items-center text-center">
        <div className="mb-12 animate-float">
          <BrandLogo size="xl" />
        </div>
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-serif text-stone-900 mb-8 tracking-tight">{profile.name}'s Sanctuary</h1>
          {profile.bio && (
            <p className="text-xl text-stone-400 leading-relaxed italic font-body-serif border-stone-200 border-l-2 pl-8 mx-auto inline-block text-left">
              "{profile.bio}"
            </p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigate(cat.id as Section)}
            className={`${cat.color} group relative overflow-hidden p-12 rounded-[4rem] transition-all duration-1000 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-4 text-left border border-white shadow-xl shadow-stone-200/20`}
          >
            <div className="mb-20 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out">
              <SectionIcon type={cat.iconType} className="w-20 h-20 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <h3 className="text-3xl font-serif mb-4 tracking-tight group-hover:text-stone-900 transition-colors">{cat.title}</h3>
            <p className="opacity-40 group-hover:opacity-70 transition-opacity leading-relaxed font-medium text-sm max-w-[80%]">
              {cat.description}
            </p>
            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-20 transition-all translate-x-10 group-hover:translate-x-0 duration-700">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </button>
        ))}
      </div>

      <footer className="mt-48 pt-16 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-stone-400 text-[9px] gap-6 uppercase tracking-[0.5em] font-bold">
        <div className="flex items-center gap-4">
          <div className="w-6 h-[1px] bg-stone-200"></div>
          <p>&copy; {new Date().getFullYear()} Ethereal Pages • Sanctuary for the Mind</p>
        </div>
        <div className="flex space-x-12">
          <button className="hover:text-stone-900 transition-all duration-500 hover:tracking-[0.6em]">Digital Archive</button>
          <button className="hover:text-stone-900 transition-all duration-500 hover:tracking-[0.6em]">Curation Settings</button>
          <button 
            onClick={onLogout}
            className="text-stone-500 hover:text-rose-600 transition-all duration-500 hover:tracking-[0.6em] group flex items-center gap-2"
          >
            Exit Sanctuary
            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardView;
