
import React, { useRef } from 'react';
import { Announcement } from '../types';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

interface AnnouncementsProps {
  announcements?: Announcement[];
  onAnnouncementClick?: (announcement: Announcement) => void;
}

const Announcements: React.FC<AnnouncementsProps> = ({ announcements = [], onAnnouncementClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Kart genişliği kadar kaydır
      const container = scrollContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (announcements.length === 0) {
    return null; // Duyuru yoksa bölümü gösterme
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0c0c0e] relative overflow-hidden border-b border-slate-100 dark:border-white/5 transition-colors duration-500">
      
      {/* 1. Kayan Kodlar */}
      <FallingCodeBackground 
        snippets={CODE_SNIPPETS.ANNOUNCEMENTS} 
        count={25} 
        colorClass="text-brand-orange/30 dark:text-white/5" 
      />
      
      {/* 2. Turuncu Işık Efektleri (Ambient Lighting) - Gece modunda belirginleştirildi */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         {/* Merkez Ambiyans Işığı */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-orange/10 dark:bg-brand-orange/20 rounded-full blur-[120px] dark:blur-[150px] opacity-100 dark:opacity-60 transition-all duration-700"></div>
         
         {/* Sağ Üst Spot Işık */}
         <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-brand-orange/20 dark:bg-brand-orange/15 rounded-full blur-[100px] animate-pulse dark:opacity-50"></div>
         
         {/* Sol Alt Işık - Dengeli */}
         <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 dark:bg-brand-orange/10 rounded-full blur-[100px] dark:opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-orange blur-lg opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-[#1a1a1c] border border-slate-100 dark:border-white/10 flex items-center justify-center text-brand-orange shadow-xl transition-transform transform group-hover:scale-105">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-brand-black dark:text-white tracking-tighter transition-colors duration-300">
                Duyurular & <span className="gradient-text">Güncel</span>
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Döngü Akademi'den Haberler</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/80 dark:bg-[#1a1a1c] backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 shadow-sm group active:scale-95"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/80 dark:bg-[#1a1a1c] backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 shadow-sm group active:scale-95"
            >
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-8 pb-12 no-scrollbar snap-x snap-mandatory px-4"
        >
          {announcements.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onAnnouncementClick?.(item)}
              className="snap-center flex-shrink-0 w-[350px] md:w-[400px] group cursor-pointer relative"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl"></div>
              
              {/* Card Container - Gece modunda background rengi koyulaştırıldı */}
              <div className="relative h-full bg-white/80 dark:bg-[#18181b] backdrop-blur-xl border border-white/60 dark:border-white/10 p-5 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden">
                
                {/* Image Section */}
                <div className="relative h-52 rounded-[2rem] overflow-hidden mb-6 group-hover:shadow-lg transition-all duration-500">
                   <img 
                    src={item.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                   
                   {/* Badges on Image */}
                   <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-lg ${
                        item.type === 'Etkinlik' ? 'bg-purple-600/90 text-white' :
                        item.type === 'Kampanya' ? 'bg-green-600/90 text-white' :
                        'bg-brand-orange/90 text-white'
                      }`}>
                        {item.type}
                      </span>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block text-white text-[10px] font-bold uppercase tracking-widest bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10 mb-2">
                        {item.date}
                      </span>
                   </div>
                </div>

                {/* Content Section */}
                <div className="px-2 flex-grow flex flex-col">
                  <h3 className="text-xl font-black text-brand-black dark:text-white mb-3 leading-tight group-hover:text-brand-orange transition-colors line-clamp-2 min-h-[3.5rem]">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center group/btn">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 group-hover:text-brand-orange transition-colors uppercase tracking-widest flex items-center">
                      Detayları İncele
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm border border-transparent group-hover:border-brand-orange">
                       <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Announcements;
