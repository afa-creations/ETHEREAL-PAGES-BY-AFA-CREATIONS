
import React, { useState, useEffect } from 'react';
import { Section, AppState, UserProfile, Poem, Article } from './types';
import IntroView from './views/IntroView';
import DashboardView from './views/DashboardView';
import PoetrySection from './views/PoetrySection';
import PhilosophySection from './views/PhilosophySection';
import HistorySection from './views/HistorySection';

const STORAGE_KEY = 'soul_chronicles_v1';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('Intro');
  const [state, setState] = useState<AppState>({
    profile: { name: '', bio: '', isInitialised: false },
    poems: [],
    philosophy: [],
    history: []
  });

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
        if (parsed.profile.isInitialised) {
          setCurrentSection('Dashboard');
        }
      } catch (e) {
        console.error("Failed to load local storage", e);
      }
    }
  }, []);

  // Sync data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile }));
    setCurrentSection('Dashboard');
  };

  const handleLogout = () => {
    const resetProfile = { name: '', bio: '', isInitialised: false };
    setState(prev => ({ ...prev, profile: resetProfile }));
    setCurrentSection('Intro');
    // We don't necessarily clear the data (poems/articles) unless you want a full wipe,
    // but the session effectively starts over.
  };

  const addPoem = (poem: Poem) => {
    setState(prev => ({ ...prev, poems: [poem, ...prev.poems] }));
  };

  const addPhilosophy = (article: Article) => {
    setState(prev => ({ ...prev, philosophy: [article, ...prev.philosophy] }));
  };

  const addHistory = (article: Article) => {
    setState(prev => ({ ...prev, history: [article, ...prev.history] }));
  };

  const deleteEntry = (type: Section, id: string) => {
    setState(prev => {
      if (type === 'Poetry') return { ...prev, poems: prev.poems.filter(p => p.id !== id) };
      if (type === 'Philosophy') return { ...prev, philosophy: prev.philosophy.filter(p => p.id !== id) };
      if (type === 'History') return { ...prev, history: prev.history.filter(p => p.id !== id) };
      return prev;
    });
  };

  const renderView = () => {
    switch (currentSection) {
      case 'Intro':
        return <IntroView onComplete={updateProfile} initialProfile={state.profile} />;
      case 'Dashboard':
        return <DashboardView profile={state.profile} onNavigate={setCurrentSection} onLogout={handleLogout} />;
      case 'Poetry':
        return <PoetrySection 
          poems={state.poems} 
          onAdd={addPoem} 
          onDelete={(id) => deleteEntry('Poetry', id)}
          onBack={() => setCurrentSection('Dashboard')} 
        />;
      case 'Philosophy':
        return <PhilosophySection 
          articles={state.philosophy} 
          onAdd={addPhilosophy} 
          onDelete={(id) => deleteEntry('Philosophy', id)}
          onBack={() => setCurrentSection('Dashboard')} 
        />;
      case 'History':
        return <HistorySection 
          articles={state.history} 
          onAdd={addHistory} 
          onDelete={(id) => deleteEntry('History', id)}
          onBack={() => setCurrentSection('Dashboard')} 
        />;
      default:
        return <DashboardView profile={state.profile} onNavigate={setCurrentSection} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
