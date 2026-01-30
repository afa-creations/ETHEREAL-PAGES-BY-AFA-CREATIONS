
import React, { useState } from 'react';
import { Poem } from '../types';
import { generatePoemBackground, editPoemImage } from '../services/geminiService';
import SectionIcon from '../components/SectionIcon';

interface PoetrySectionProps {
  poems: Poem[];
  onAdd: (poem: Poem) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const PoetrySection: React.FC<PoetrySectionProps> = ({ poems, onAdd, onDelete, onBack }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-generate background using AI
    const bg = await generatePoemBackground(title, content);
    
    const newPoem: Poem = {
      id: Date.now().toString(),
      title,
      author,
      content,
      date: new Date().toLocaleDateString(),
      type: 'Poetry',
      backgroundImage: bg || undefined
    };

    onAdd(newPoem);
    setLoading(false);
    setIsCreating(false);
    setTitle('');
    setAuthor('');
    setContent('');
    setSelectedPoem(newPoem);
  };

  const handleEditImage = async () => {
    if (!selectedPoem?.backgroundImage || !editPrompt) return;
    setLoading(true);
    const newBg = await editPoemImage(selectedPoem.backgroundImage, editPrompt);
    if (newBg) {
      setSelectedPoem({ ...selectedPoem, backgroundImage: newBg });
    }
    setLoading(false);
    setEditPrompt('');
  };

  if (selectedPoem) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900 text-white animate-fade-in">
        <div className="relative min-h-screen flex flex-col">
          {selectedPoem.backgroundImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ backgroundImage: `url(${selectedPoem.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-indigo-100 opacity-50"></div>
          )}

          <div className="relative z-10 p-8 lg:p-20 flex flex-col min-h-screen">
            <div className="flex justify-between items-center mb-12 no-print">
              <button onClick={() => setSelectedPoem(null)} className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full transition-all border border-white/20 backdrop-blur-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="flex space-x-4">
                <button onClick={() => window.print()} className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full transition-all border border-white/20 backdrop-blur-md text-sm">Print Verse</button>
                <button 
                  onClick={() => { if(confirm('Delete this poem?')) { onDelete(selectedPoem.id); setSelectedPoem(null); } }} 
                  className="bg-rose-500/20 hover:bg-rose-500/40 px-6 py-2.5 rounded-full text-rose-100 transition-all border border-rose-500/20 backdrop-blur-md text-sm"
                >Delete</button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto">
              <h1 className="text-6xl lg:text-8xl font-serif mb-10 drop-shadow-2xl leading-tight">{selectedPoem.title}</h1>
              <div className="w-24 h-[1px] bg-white/30 mb-12"></div>
              <p className="text-2xl lg:text-3xl font-body-serif leading-[1.8] whitespace-pre-wrap drop-shadow-xl font-light">
                {selectedPoem.content}
              </p>
              <p className="mt-16 text-xl italic opacity-70 tracking-widest">— {selectedPoem.author}</p>
            </div>

            <div className="mt-20 no-print flex flex-col items-center">
               <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-6">Refine Aesthetic with AI</p>
               <div className="flex space-x-3 max-w-lg w-full">
                  <input 
                    type="text"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="Describe changes (e.g. 'Golden hour glow', 'Starry night')"
                    className="flex-1 bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:bg-black/40 focus:border-white/30 transition-all text-sm backdrop-blur-md"
                  />
                  <button 
                    onClick={handleEditImage}
                    disabled={loading}
                    className="bg-white text-stone-900 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Enhance'}
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-rose-500 animate-float shadow-2xl shadow-rose-100/50">
            <SectionIcon type="Poetry" className="w-14 h-14" />
          </div>
          <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-colors mb-2 group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">To Sanctuary</span>
            </button>
            <h1 className="text-5xl font-serif text-stone-800">Poetry</h1>
            <p className="text-stone-400 italic mt-1 font-body-serif">Verse and rhymes that touch the soul.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 active:scale-95"
        >
          Compose Verse
        </button>
      </header>

      {isCreating ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-6">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 lg:p-14 shadow-2xl animate-fade-in relative overflow-hidden border border-white/20">
            {loading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-[1px] border-rose-200 border-t-rose-500 rounded-full animate-spin mb-6"></div>
                <p className="text-rose-600 font-serif text-xl italic">Painting your aesthetic canvas...</p>
                <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-4 font-bold">AI Generation Active</p>
              </div>
            )}
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-serif">New Verse</h3>
              <button onClick={() => setIsCreating(false)} className="text-stone-300 hover:text-stone-600 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Poem Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 transition-all font-medium" placeholder="Untitled" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Author Name</label>
                  <input required value={author} onChange={e => setAuthor(e.target.value)} type="text" className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 transition-all font-medium" placeholder="Anonymous" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Content</label>
                <textarea required value={content} onChange={e => setContent(e.target.value)} className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100 transition-all h-52 resize-none font-body-serif leading-relaxed" placeholder="Start your poem here..." />
              </div>
              <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200">
                Save & Generate Background
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {poems.length === 0 ? (
          <div className="col-span-full py-32 text-center text-stone-400 italic bg-white/50 rounded-[3rem] border-2 border-dashed border-stone-100">
            <p className="font-serif text-2xl mb-2 text-stone-300">The page remains blank.</p>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Awaiting your first verse</p>
          </div>
        ) : (
          poems.map(poem => (
            <div 
              key={poem.id}
              onClick={() => setSelectedPoem(poem)}
              className="group cursor-pointer bg-white rounded-[3rem] p-8 border border-stone-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
            >
              <div className="aspect-[3/4] rounded-[2rem] bg-stone-100 mb-8 overflow-hidden relative border border-stone-100/50 shadow-inner">
                {poem.backgroundImage ? (
                  <img src={poem.backgroundImage} alt={poem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-200">
                    <SectionIcon type="Poetry" className="w-20 h-20 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-2 group-hover:text-rose-600 transition-colors tracking-tight">{poem.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{poem.author}</p>
                <p className="text-[10px] text-stone-300 font-medium tracking-tighter">{poem.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PoetrySection;
