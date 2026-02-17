
import React from 'react';
import { Course } from '../types';

interface AdultCourseDetailProps {
  course: Course;
  onBack: () => void;
}

const AdultCourseDetail: React.FC<AdultCourseDetailProps> = ({ course, onBack }) => {
  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <button 
            onClick={onBack}
            className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-all group font-display"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span>Tüm Eğitimlere Dön</span>
          </button>
          <div className="flex items-center space-x-3">
             <div className="px-5 py-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full">
                <span className="text-brand-orange font-black text-[10px] uppercase tracking-widest font-display">Kayıtlar Açık</span>
             </div>
             <div className="px-5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-full">
                <span className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest font-display">Yeni</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black text-brand-black dark:text-white tracking-tight leading-[1.2] font-display">
                  {course.title}
                </h1>
                <p className="text-slate-400 dark:text-slate-500 text-2xl font-medium tracking-tight font-display">Kariyerinizi global standartlara taşıyın.</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
                {course.description} Bu program, bireyleri güncel teknolojilerle donatarak iş dünyasında yetkin, üretken ve sürdürülebilir bir kariyere hazırlamak amacıyla tasarlanmıştır.
              </p>
            </div>

            {course.techStack && (
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700 font-display">ÖĞRENECEĞİNİZ TEKNOLOJİLER</h4>
                 <div className="flex flex-wrap gap-3">
                    {course.techStack.map(tech => (
                      <span key={tech} className="px-6 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold text-brand-black dark:text-white hover:border-brand-orange/30 transition-all cursor-default font-display">
                        {tech}
                      </span>
                    ))}
                 </div>
              </div>
            )}

            {/* ROADMAP STYLE CURRICULUM START */}
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-brand-black dark:text-white tracking-tight font-display">Eğitim Yolculuğu</h2>
              
              <div className="relative pl-4">
                {/* Dikey Yol Çizgisi */}
                <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-orange via-slate-200 dark:via-white/10 to-transparent"></div>

                <div className="space-y-10">
                  {course.curriculum?.map((item, i) => (
                    <div key={i} className="relative pl-12 group">
                      {/* Nokta İşaretçisi */}
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-brand-dark border-4 border-slate-200 dark:border-white/20 group-hover:border-brand-orange group-hover:scale-125 transition-all duration-300 z-10 shadow-sm"></div>
                      
                      {/* İçerik Kutusu */}
                      <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-brand-orange/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                         <div className="flex flex-col space-y-3">
                            <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] mb-1">
                               {i + 1}. MODÜL
                            </span>
                            <h3 className="text-2xl font-black text-brand-black dark:text-white leading-tight font-display break-words">
                               {item.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-lg pt-2 border-t border-slate-100 dark:border-white/5 mt-3 break-words">
                               {item.description}
                            </p>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ROADMAP STYLE CURRICULUM END */}

            {course.careerPath && (
              <div className="p-12 bg-brand-black rounded-[4rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px]"></div>
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl font-black tracking-tight font-display">Bu eğitimle kazanacağınız bilgi ve beceriler, <br/>farklı sektörlerde ve pozisyonlarda çalışma imkânı sunar.</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.careerPath.map(role => (
                      <div key={role} className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                        <span className="text-lg font-bold text-white/80 font-display">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
               <div className="bg-white dark:bg-brand-darkCard rounded-[3rem] p-10 shadow-2xl shadow-black/5 border border-slate-50 dark:border-white/5 flex flex-col">
                  <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-1 font-display">PROGRAM ÜCRETİ</span>
                          <span className="text-4xl font-black text-brand-black dark:text-white tracking-tighter font-display">{course.price}</span>
                       </div>
                       <div className="flex flex-col text-right">
                          <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-1 font-display">PUAN</span>
                          <span className="text-xl font-black text-brand-orange font-display">★ {course.rating}</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <button 
                        onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full py-6 gradient-bg text-white font-black rounded-3xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-all font-display"
                      >
                        HEMEN BAŞVUR
                      </button>
                    </div>

                    <div className="pt-8 border-t border-slate-50 dark:border-white/5">
                      <ul className="space-y-4">
                        {[
                          { label: 'Süre', value: course.duration },
                          { label: 'Erişim', value: 'Ömür Boyu' },
                          { label: 'Destek', value: 'Birebir Mentorluk' },
                          { label: 'Sertifika', value: 'Onaylı Diploma' }
                        ].map((item, i) => (
                          <li key={i} className="flex items-center justify-between text-sm font-bold">
                            <span className="text-slate-400 dark:text-slate-500 font-display">{item.label}</span>
                            <span className="text-brand-black dark:text-white font-display">{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>

               <div className="bg-slate-50 dark:bg-brand-darkCard/50 rounded-[2.5rem] p-8 text-center space-y-4 border border-slate-100 dark:border-white/5">
                  <p className="text-xs font-bold text-slate-400">Yardıma mı ihtiyacınız var?</p>
                  <p className="text-lg font-black text-brand-black dark:text-white font-display">+90 (532) 723 66 48</p>
                  <p className="text-lg font-black text-brand-black dark:text-white font-display">+90 (532) 603 66 48</p>
                  <button className="text-brand-orange font-black text-[10px] uppercase tracking-widest hover:underline font-display">WhatsApp ile Sorun</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultCourseDetail;
