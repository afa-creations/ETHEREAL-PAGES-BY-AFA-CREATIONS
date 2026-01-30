
import React, { useState } from 'react';
import { Article, BibliographyEntry } from '../types';
import SectionIcon from '../components/SectionIcon';

interface HistorySectionProps {
  articles: Article[];
  onAdd: (article: Article) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ articles, onAdd, onDelete, onBack }) => {
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
      type: 'History'
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
      <div className="min-h-screen bg-[#f4f1ea] text-stone-800 fade-in py-20 px-6">
        <div className="max-w-4xl mx-auto bg-[#faf9f6] p-12 lg:p-24 rounded-[3rem] shadow-2xl shadow-stone-200/50 border border-stone-200/50 relative overflow-hidden">
          {/* Subtle background icon watermark */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <SectionIcon type="History" className="w-96 h-96" />
          </div>

          <div className="flex justify-between items-center mb-20 no-print relative z-10">
            <button onClick={() => setSelectedArticle(null)} className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-all group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              <span className="text-xs font-bold uppercase tracking-widest">Archive List</span>
            </button>
            <div className="flex space-x-6 items-center">
              <button 
                onClick={() => { if(confirm('Purge this record from archives?')) { onDelete(selectedArticle.id); setSelectedArticle(null); } }} 
                className="text-stone-300 hover:text-rose-600 transition-colors text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                Expunge Record
              </button>
              <button onClick={() => window.print()} className="bg-stone-900 text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-95">Seal & Export</button>
            </div>
          </div>

          <article className="relative z-10">
            <header className="mb-20 border-b border-stone-100 pb-16 text-center">
              <p className="text-stone-400 text-[10px] tracking-[0.5em] uppercase mb-8 font-bold">Historical Documentation</p>
              <h1 className="text-4xl lg:text-6xl font-serif text-stone-900 mb-8 leading-[1.1] tracking-tight">{selectedArticle.title}</h1>
              <p className="text-xl text-stone-600 mb-10 font-body-serif italic opacity-80 leading-relaxed px-8">"{selectedArticle.tagline}"</p>
              <div className="flex items-center justify-center space-x-4 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                <span>Compiled by {selectedArticle.author}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-200"></span>
                <span>Chronicle Date: {selectedArticle.date}</span>
              </div>
            </header>

            <div className="prose prose-stone lg:prose-xl mx-auto font-body-serif leading-[2.1] text-stone-800 whitespace-pre-wrap text-lg">
              {selectedArticle.content}
            </div>

            {selectedArticle.closingNote && (
              <div className="mt-20 p-12 bg-stone-100/50 rounded-[2.5rem] italic text-stone-600 font-body-serif border-l-8 border-stone-200 text-lg leading-relaxed">
                <span className="font-bold text-stone-400 block mb-4 not-italic text-[10px] uppercase tracking-[0.4em]">Post-Scriptum Observations</span>
                {selectedArticle.closingNote}
              </div>
            )}

            {selectedArticle.bibliography.length > 0 && (
              <div className="mt-24 pt-16 border-t border-stone-100">
                <h3 className="text-[10px] font-bold text-stone-400 mb-10 uppercase tracking-[0.5em]">Primary & Secondary Sources</h3>
                <ul className="space-y-6">
                  {selectedArticle.bibliography.map((bib, i) => (
                    <li key={bib.id} className="text-stone-500 text-sm font-body-serif flex items-start">
                      <span className="font-serif text-stone-300 mr-6 text-2xl tabular-nums opacity-60">0{i + 1}</span>
                      <div className="pt-1">
                        {bib.author}, <span className="text-stone-800 font-bold italic">"{bib.title}"</span>. <span className="opacity-70">{bib.publication}</span>.
                      </div>
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
          <div className="w-28 h-28 bg-stone-100 rounded-[2.5rem] flex items-center justify-center text-stone-600 animate-float shadow-2xl shadow-stone-200/50">
            <SectionIcon type="History" className="w-14 h-14" />
          </div>
          <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-colors mb-2 group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">To Sanctuary</span>
            </button>
            <h1 className="text-5xl font-serif text-stone-800">History Archive</h1>
            <p className="text-stone-400 italic mt-1 font-body-serif">Chronicles of human heritage and the passage of time.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 active:scale-95"
        >
          Add New Record
        </button>
      </header>

      {isCreating ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md p-6 flex justify-center py-20">
          <div className="bg-[#faf9f6] w-full max-w-4xl rounded-[3rem] p-10 lg:p-14 shadow-2xl animate-fade-in h-fit border border-stone-200/50">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-serif">Historical Documentation</h3>
              <button onClick={() => setIsCreating(false)} className="text-stone-300 hover:text-stone-600 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Title of Work</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none transition-all font-medium" placeholder="The Rise of Antiquity" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Chronicle Author</label>
                  <input required value={author} onChange={e => setAuthor(e.target.value)} type="text" className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none transition-all font-medium" placeholder="Herodotus II" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Contextual Tagline</label>
                <input required value={tagline} onChange={e => setTagline(e.target.value)} type="text" className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none transition-all font-medium" placeholder="Exploring the intersection of myth and reality..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Main Chronicle</label>
                <textarea required value={content} onChange={e => setContent(e.target.value)} className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-stone-200 outline-none h-64 resize-none font-body-serif leading-relaxed" placeholder="Record the events of time..." />
              </div>
              
              <div className="border-t border-stone-200 pt-10">
                <h4 className="text-lg font-serif mb-6 text-stone-800">Archival References</h4>
                <div className="flex flex-wrap gap-4 mb-6">
                  <input value={bibAuthor} onChange={e => setBibAuthor(e.target.value)} placeholder="Author" className="flex-1 min-w-[150px] bg-white border border-stone-100 px-4 py-3 rounded-xl text-sm outline-none" />
                  <input value={bibTitle} onChange={e => setBibTitle(e.target.value)} placeholder="Source Title" className="flex-1 min-w-[200px] bg-white border border-stone-100 px-4 py-3 rounded-xl text-sm outline-none" />
                  <button type="button" onClick={addBibEntry} className="bg-stone-200 text-stone-700 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-300 transition-all">Add Citation</button>
                </div>
                <div className="space-y-3">
                  {bibliography.map((b, i) => (
                    <div key={b.id} className="flex items-center justify-between bg-stone-100/50 px-6 py-3 rounded-2xl text-xs font-body-serif text-stone-600 italic">
                      <span>{i + 1}. {b.author}, {b.title}</span>
                      <button type="button" onClick={() => setBibliography(bibliography.filter(x => x.id !== b.id))} className="text-stone-300 hover:text-rose-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 mt-10">
                Archive Permanent Record
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {articles.length === 0 ? (
          <div className="col-span-full py-32 text-center text-stone-400 italic bg-white/50 rounded-[3rem] border-2 border-dashed border-stone-100">
            <p className="font-serif text-2xl mb-2 text-stone-300">The archive is vacant.</p>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Begin your first chronicle</p>
          </div>
        ) : (
          articles.map(article => (
            <div 
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white rounded-[3rem] p-10 border border-stone-100 hover:border-stone-400 transition-all duration-700 flex flex-col justify-between shadow-sm hover:shadow-2xl"
            >
              <div>
                <div className="mb-6 text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-3">
                  <SectionIcon type="History" className="w-5 h-5 opacity-30" />
                  <span>Record • {article.date}</span>
                </div>
                <h3 className="text-3xl font-serif text-stone-900 mb-4 tracking-tight leading-tight group-hover:text-stone-600 transition-colors">{article.title}</h3>
                <p className="text-stone-500 text-sm mb-8 italic line-clamp-2 font-body-serif leading-relaxed opacity-80">{article.tagline}</p>
              </div>
              <div className="flex justify-between items-center mt-6 pt-8 border-t border-stone-50">
                <span className="text-stone-400 text-[10px] uppercase font-bold tracking-widest">By {article.author}</span>
                <span className="text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:underline flex items-center gap-2">
                  Access Scroll 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySection;
