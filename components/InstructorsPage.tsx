import React from 'react';
import { INSTRUCTORS } from '../constants';

interface InstructorsPageProps {
  onNavigate?: (page: any) => void;
}

const InstructorsPage: React.FC<InstructorsPageProps> = ({ onNavigate }) => {
  const socialIcons = {
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
  };

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen">
      <section className="pt-40 pb-20 bg-white dark:bg-brand-dark relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start max-w-4xl">
            <nav className="flex mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span onClick={() => onNavigate && onNavigate('home')} className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</span>
              <span className="mx-4 text-slate-200 dark:text-slate-800">/</span>
              <span className="text-[#323236] dark:text-white">Eğitmenlerimiz</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-black text-[#323236] dark:text-white mb-8 tracking-tighter leading-none">
              Uzman <span className="gradient-text">Eğitmenlerimiz</span>
            </h1>
            <div className="w-24 h-2 gradient-bg rounded-full mb-10"></div>
            <p className="text-[#323236]/70 dark:text-slate-400 text-xl leading-relaxed font-medium max-w-2xl">
              Sektör tecrübesi olan, alanında uzman ve profesyonel eğitmen kadromuzla yanınızdayız. Geleceğinizi inşa ederken en iyilerden öğrenin.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#fafafa] dark:bg-brand-darkCard/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {INSTRUCTORS.map((instructor) => (
              <div 
                key={instructor.id} 
                className="group relative bg-white dark:bg-brand-darkCard rounded-[3rem] p-8 gradient-border-orange premium-card-shadow flex flex-col h-full transition-all duration-500 hover:-translate-y-2"
              >
                {/* Profile Image Area */}
                <div className="relative mb-8 flex justify-center">
                  <div className="w-40 h-40 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-red rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700 animate-pulse-soft"></div>
                    <div className="relative w-full h-full rounded-full p-1.5 gradient-bg shadow-xl">
                       <img 
                        src={instructor.image} 
                        alt={instructor.name} 
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-brand-darkCard"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center flex flex-col flex-grow">
                  <span className="inline-block mx-auto px-4 py-1.5 rounded-full bg-brand-orange/10 dark:bg-white/5 text-brand-orange font-black text-[9px] uppercase tracking-[0.2em] mb-4 border border-brand-orange/20">
                    {instructor.role}
                  </span>
                  
                  <h3 className="text-2xl font-black text-[#323236] dark:text-white mb-4 tracking-tight">
                    {instructor.name}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-4">
                    {instructor.bio}
                  </p>

                  {/* Social & Action */}
                  <div className="mt-auto space-y-6">
                     <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {['linkedin', 'x', 'instagram'].map((social, i) => (
                           <button key={i} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange dark:hover:text-white text-slate-400 flex items-center justify-center transition-all shadow-sm">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                 <path d={socialIcons[social as keyof typeof socialIcons]} />
                              </svg>
                           </button>
                        ))}
                     </div>

                     <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                        <button 
                           onClick={() => onNavigate && onNavigate('courses')}
                           className="w-full py-4 gradient-bg text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                        >
                           <span>Eğitimlerini İncele</span>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white dark:bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/5 clip-path-slant-left opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#1a1a1c] dark:bg-brand-darkCard p-16 lg:p-24 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10 max-w-2xl text-center lg:text-left text-white">
              <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">KARİYER FIRSATI</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                Siz de uzman kadromuza <br /> katılmak ister misiniz?
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Tecrübelerinizi yeni nesillere aktarmak ve dinamik ekibimizin bir parçası olmak için başvurunuzu bekliyoruz.
              </p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('instructor-apply')}
              className="relative z-10 px-12 py-6 bg-white text-brand-black font-black rounded-2xl text-sm uppercase tracking-widest hover:scale-105 hover:bg-brand-orange hover:text-white transition-all shadow-2xl"
            >
              BAŞVURU YAP
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsPage;