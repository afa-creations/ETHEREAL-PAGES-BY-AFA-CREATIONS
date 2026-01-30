
import React, { useState } from 'react';
import { Article, BibliographyEntry } from '../types';
import SectionIcon from '../components/SectionIcon';

interface PhilosophySectionProps {
  articles: Article[];
  onAdd: (article: Article) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ articles, onAdd, onDelete, onBack }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [closingNote, setClosingNote] = useState('');
  const [bibliography, setBibliography] = useState<BibliographyEntry[]>([]);
  
  // Current Bib Entry
  const [bibTitle, setBibTitle] = useState('');
  const [bibAuthor, setBibAuthor] = useState('');
  const [bibPub, setBibPub] = useState('');

  const addBibEntry = () => {
    if (!bibTitle || !bibAuthor) return;
    const entry: BibliographyEntry = {
      id: Date.now().toString(),
      title: bibTitle,
      author: bibAuthor,
      publication: bibPub
    };
    setBibliography([...bibliography, entry]);
    setBibTitle('');
    setBibAuthor('');
    setBibPub('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      tagline,
      author,
      content,
      closingNote,
      bibliography,
      date: new Date().toLocaleDateString(),
      type: 'Philosophy'
    };
    onAdd(newArticle);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setTagline('');
    setAuthor('');
    setContent('');
    setClosingNote('');
    setBibliography([]);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-stone-800 fade-in py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-16 no-print">
            <button onClick={() => setSelectedArticle(null)} className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-all group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              <span className="text-sm font-medium">Back to Reflections</span>
            </button>
            <div className="flex space-x-4">
              <button onClick={() => window.print()} className="bg-white border border-stone-200 px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all shadow-sm">Export Insight</button>
              <button 
                onClick={() => { if(confirm('Delete reflection?')) { onDelete(selectedArticle.id); setSelectedArticle(null); } }} 
                className="text-stone-300 hover:text-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
              >Delete</button>
            </div>
          </div>

          <article>
            <header className="mb-20 text-center">
              <div className="flex justify-center mb-8">
                <SectionIcon type="Philosophy" className="w-16 h-16 opacity-10" />
              </div>
              <p className="text-indigo-400 text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Existential Inquiry</p>
              <h1 className="text-5xl lg:text-7xl font-serif text-stone-900 mb-8 leading-tight tracking-tight">{selectedArticle.title}</h1>
              <p className="text-xl italic text-stone-500 mb-10 font-body-serif leading-relaxed px-4">"{selectedArticle.tagline}"</p>
              <div className="flex items-center justify-center space-x-4 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                <span>By {selectedArticle.author}</span>
                <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                <span>{selectedArticle.date}</span>
              </div>
            </header>

            <div className="prose prose-stone lg:prose-xl mx-auto font-body-serif leading-[2] text-stone-700 whitespace-pre-wrap text-lg">
              {selectedArticle.content}
            </div>

            {selectedArticle.closingNote && (
              <div className="mt-20 p-12 bg-indigo-50/30 rounded-[3rem] border border-indigo-100/50 italic text-stone-600 font-body-serif text-lg leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <SectionIcon type="Philosophy" className="w-24 h-24" />
                </div>
                <span className="font-bold text-indigo-400 block mb-4 not-italic text-[10px] uppercase tracking-[0.3em]">Synthesized Reflection</span>
                {selectedArticle.closingNote}
              </div>
            )}

            {selectedArticle.bibliography.length > 0 && (
              <div className="mt-24 pt-16 border-t border-stone-100">
                <h3 className="text-xl font-serif text-stone-800 mb-10 tracking-widest uppercase text-[12px] font-bold">Academic Bibliography</h3>
                <ul className="space-y-6">
                  {selectedArticle.bibliography.map((bib, i) => (
                    <li key={bib.id} className="text-stone-500 text-sm italic font-body-serif">
                      <span className="text-indigo-200 mr-4 font-serif text-xl opacity-50">{i + 1}</span>
                      {bib.author}. <span className="text-stone-800 font-medium not-italic">"{bib.title}"</span>. {bib.publication}.
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-500 animate-float shadow-2xl shadow-indigo-100/50">
            <SectionIcon type="Philosophy" className="w-14 h-14" />
          </div>
          <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-colors mb-2 group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">To Sanctuary</span>
            </button>
            <h1 className="text-5xl font-serif text-stone-800">Philosophy</h1>
            <p className="text-stone-400 italic mt-1 font-body-serif">Existential musings on the nature of being.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95"
        >
          Draft Article
        </button>
      </header>

      {isCreating ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-md p-6 flex justify-center py-20">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 lg:p-14 shadow-2xl animate-fade-in relative h-fit border border-white/20">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-serif">Deep Reflections</h3>
              <button onClick={() => setIsCreating(false)} className="text-stone-300 hover:text-stone-600 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Article Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="The Ethics of Thought" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Author</label>
                  <input required value={author} onChange={e => setAuthor(e.target.value)} type="text" className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="Socrates Jr." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Tagline / Summary</label>
                <input required value={tagline} onChange={e => setTagline(e.target.value)} type="text" className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="A brief conceptual overview..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Main Content</label>
                <textarea required value={content} onChange={e => setContent(e.target.value)} className="w-full bg-stone-50/50 border border-stone-100 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all h-64 resize-none font-body-serif leading-relaxed" placeholder="Begin your inquiry..." />
              </div>
              
              <div className="border-t border-stone-100 pt-10">
                <h4 className="text-lg font-serif mb-6 text-stone-800">Citations</h4>
                <div className="flex flex-wrap gap-4 mb-6">
                  <input value={bibAuthor} onChange={e => setBibAuthor(e.target.value)} placeholder="Author" className="flex-1 min-w-[150px] bg-stone-50/50 border border-stone-100 px-4 py-3 rounded-xl text-sm outline-none" />
                  <input value={bibTitle} onChange={e => setBibTitle(e.target.value)} placeholder="Source Title" className="flex-1 min-w-[200px] bg-stone-50/50 border border-stone-100 px-4 py-3 rounded-xl text-sm outline-none" />
                  <button type="button" onClick={addBibEntry} className="bg-indigo-50 text-indigo-600 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-100 transition-all">Add Source</button>
                </div>
                <div className="space-y-3">
                  {bibliography.map((b, i) => (
                    <div key={b.id} className="flex items-center justify-between bg-stone-50 px-6 py-3 rounded-2xl text-xs italic text-stone-500 font-body-serif">
                      <span>{i + 1}. {b.author}, {b.title}</span>
                      <button type="button" onClick={() => setBibliography(bibliography.filter(x => x.id !== b.id))} className="text-stone-300 hover:text-rose-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 mt-10">
                Finalize Publication
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-10">
        {articles.length === 0 ? (
          <div className="py-32 text-center text-stone-400 italic bg-white/50 rounded-[3rem] border-2 border-dashed border-stone-100">
            <p className="font-serif text-2xl mb-2 text-stone-300">The library is silent.</p>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Share your first reflection</p>
          </div>
        ) : (
          articles.map(article => (
            <div 
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white rounded-[3rem] p-10 border border-stone-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between gap-10"
            >
              <div className="md:max-w-2xl">
                <div className="flex items-center space-x-3 text-indigo-400 text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">
                  <span>Reflection</span>
                  <span className="w-1 h-1 rounded-full bg-indigo-100"></span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-3xl font-serif text-stone-800 mb-4 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{article.title}</h3>
                <p className="text-stone-500 italic mb-6 font-body-serif leading-relaxed line-clamp-2">{article.tagline}</p>
                <div className="text-stone-400 text-[10px] flex items-center space-x-3 font-bold uppercase tracking-widest">
                  <span className="text-stone-700">By {article.author}</span>
                  <span className="opacity-30">•</span>
                  <span>{article.content.split(' ').length} Words</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex items-center space-x-4 text-indigo-400 font-bold uppercase text-[10px] tracking-[0.3em] group-hover:translate-x-3 transition-transform duration-500">
                <span>Enter Mind</span>
                <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhilosophySection;
