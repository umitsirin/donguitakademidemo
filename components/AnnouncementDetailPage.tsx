
import React, { useEffect } from 'react';
import { Announcement } from '../types';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

interface AnnouncementDetailPageProps {
  announcement: Announcement;
  onBack: () => void;
}

const AnnouncementDetailPage: React.FC<AnnouncementDetailPageProps> = ({ announcement, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [announcement]);

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-32 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700 relative overflow-hidden">
      
      {/* Background Effects */}
      <FallingCodeBackground 
        snippets={CODE_SNIPPETS.ANNOUNCEMENTS} 
        count={20} 
        colorClass="text-brand-orange/20 dark:text-white/5" 
      />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none"></div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-all group mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span>Ana Sayfaya Dön</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
                  announcement.type === 'Etkinlik' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' :
                  announcement.type === 'Kampanya' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-brand-orange/10 text-brand-orange'
            }`}>
              {announcement.type}
            </span>
            <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
              {announcement.date}
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-brand-black dark:text-white tracking-tighter leading-[1.1] mb-8">
            {announcement.title}
          </h1>
        </div>

        {announcement.image && (
          <div className="mb-16 relative group">
             <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-transparent dark:border-white/5">
                <img 
                  src={announcement.image} 
                  alt={announcement.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
             </div>
          </div>
        )}

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
           <p className="text-2xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              {announcement.description}
           </p>
           
           <div className="space-y-8 text-lg font-medium text-slate-600 dark:text-slate-400 leading-[1.8]">
              {announcement.content ? announcement.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              )) : <p>Detaylı bilgi için lütfen iletişime geçiniz.</p>}
           </div>
        </div>

        <div className="mt-24 border-t border-slate-100 dark:border-white/5 pt-12 flex justify-between items-center">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-2">İLETİŞİM</span>
              <span className="text-brand-black dark:text-white font-bold">+90 (532) 723 66 48</span>
              <span className="text-brand-black dark:text-white font-bold">+90 (532) 603 66 48</span>
              <span className="text-brand-black dark:text-white font-bold">+90 (532) 573 66 48</span>

           </div>
           
           <button 
             onClick={onBack}
             className="px-8 py-4 gradient-bg text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-100 dark:shadow-none hover:scale-105 transition-all"
           >
             TÜM DUYURULAR
           </button>
        </div>
      </article>
    </div>
  );
};

export default AnnouncementDetailPage;
