
import React, { useState } from 'react';
import { UserProfile } from '../types';
import BrandLogo from '../components/BrandLogo';

interface IntroViewProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile: UserProfile;
}

const IntroView: React.FC<IntroViewProps> = ({ onComplete, initialProfile }) => {
  const [name, setName] = useState(initialProfile.name);
  const [bio, setBio] = useState(initialProfile.bio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onComplete({ name, bio, isInitialised: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf9f6] px-6 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-rose-50 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-white/50 fade-in relative z-10">
        <div className="flex justify-center mb-10 animate-float">
          <BrandLogo size="lg" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-serif text-stone-800">Welcome to your Sanctuary</h2>
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] mt-2">Begin your literary journey</p>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2">Your Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-stone-50/50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none transition-all placeholder:text-stone-300"
              placeholder="How shall we address you?"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2">A Short Bio (Optional)</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-5 py-4 bg-stone-50/50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none transition-all h-28 resize-none placeholder:text-stone-300"
              placeholder="Tell us a little about your journey..."
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-stone-800 text-white py-4 rounded-2xl font-medium hover:bg-stone-700 transition-all shadow-xl shadow-stone-200 active:scale-[0.98]"
          >
            Enter Sanctuary
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntroView;
