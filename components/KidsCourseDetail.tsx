
import React from 'react';
import { Course } from '../types';

interface KidsCourseDetailProps {
  course: Course;
  onBack: () => void;
}

const KidsCourseDetail: React.FC<KidsCourseDetailProps> = ({ course, onBack }) => {
  const is9Month = course.programType === '9-month';

  return (
    <div className="bg-slate-50 dark:bg-brand-dark min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-4 px-8 py-4 bg-white dark:bg-white/5 rounded-full shadow-sm text-brand-orange font-black text-[10px] uppercase tracking-widest hover:shadow-xl transition-all mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          <span>Çocuk Eğitimlerine Dön</span>
        </button>

        <div className="bg-white dark:bg-brand-darkCard rounded-[4rem] overflow-hidden shadow-2xl shadow-orange-100/50 dark:shadow-none border border-white dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/60 via-transparent to-transparent"></div>
               <div className="absolute top-10 left-10">
                  <div className="bg-white/95 dark:bg-black/80 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-2xl flex items-center space-x-3">
                     <span className="w-3 h-3 rounded-full bg-brand-orange animate-pulse"></span>
                     <span className="text-[10px] font-black text-brand-black dark:text-white uppercase tracking-[0.2em]">Sınırlı Kontenjan!</span>
                  </div>
               </div>
               {is9Month && (
                 <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem]">
                    <p className="text-white font-black text-xl mb-2">Keşif Odaklı Gelişim</p>
                    <p className="text-white/80 text-sm font-medium">9 ay boyunca çocuğunuz teknolojiyle tanışır, düşünmeyi ve üretmeyi öğrenir.</p>
                 </div>
               )}
            </div>

            <div className="p-12 lg:p-24 space-y-12">
               <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                     <span className="bg-brand-orange text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                        {course.ageGroup} Yaş Grubu
                     </span>
                     <span className="text-brand-orange font-black text-[10px] uppercase tracking-widest">{is9Month ? 'AKADEMİK PROGRAM' : 'MODÜLER EĞİTİM'}</span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black text-brand-black dark:text-white tracking-tight leading-[1.1]">
                    {course.title}
                  </h1>
                  <p className="text-slate-400 dark:text-slate-500 text-xl font-medium leading-relaxed">
                    {course.description} Ebeveynler için şeffaf, çocuklar için heyecan verici bir öğrenme süreci başlıyor.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Ders Yapısı', value: is9Month ? 'Hibrit Model' : 'Proje Odaklı', color: 'bg-orange-50 dark:bg-orange-900/10 text-brand-orange' },
                    { label: 'Katılım', value: 'Haftalık 2 Gün', color: 'bg-blue-50 dark:bg-blue-900/10 text-blue-500' },
                    { label: 'Zorluk', value: course.level, color: 'bg-purple-50 dark:bg-purple-900/10 text-purple-500' },
                    { label: 'Pedagoji', value: 'Yaş Uygun', color: 'bg-green-50 dark:bg-green-900/10 text-green-500' }
                  ].map((feat, i) => (
                    <div key={i} className={`${feat.color} p-8 rounded-[2.5rem] flex flex-col space-y-2 border border-current/5`}>
                       <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{feat.label}</span>
                       <span className="text-lg font-black">{feat.value}</span>
                    </div>
                  ))}
               </div>

               <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest mb-1">EĞİTİM BEDELİ</span>
                     <span className="text-4xl font-black text-brand-black dark:text-white">{course.price}</span>
                  </div>
                  <button 
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-12 py-7 gradient-bg text-white font-black rounded-[2rem] text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 hover:scale-[1.05] transition-all"
                  >
                    ÜCRETSİZ DENEME DERSİ
                  </button>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-32 space-y-20">
           <div className="text-center max-w-2xl mx-auto space-y-6">
              <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em]">KEŞİF ROTASI</span>
              <h2 className="text-5xl font-black text-brand-black dark:text-white tracking-tight">
                {is9Month ? '9 Aylık Gelişim Haritası' : 'Eğitim Modülleri'}
              </h2>
              <p className="text-slate-400 dark:text-slate-500 font-medium">Bu yolculukta çocuğunuzun hangi becerileri, hangi adımlarla kazanacağını birlikte keşfedin.</p>
           </div>

           {is9Month ? (
             <div className="relative space-y-12 before:absolute before:left-8 md:before:left-1/2 before:top-0 before:h-full before:w-1 before:bg-slate-100 dark:before:bg-white/5 before:-translate-x-1/2">
                {course.curriculum?.map((item, i) => (
                  <div key={i} className={`relative flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-[45%]"></div>
                    <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white dark:bg-brand-darkCard border-4 border-slate-50 dark:border-white/5 rounded-full z-20 -translate-x-1/2 flex items-center justify-center font-black text-brand-orange shadow-xl">
                      {i + 1}
                    </div>
                    <div className="w-full md:w-[45%] ml-20 md:ml-0 bg-white dark:bg-brand-darkCard p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-white/5 transition-all hover:scale-[1.02]">
                       <span className="text-brand-orange font-black text-[10px] uppercase tracking-widest mb-2 block">{i + 1}. AY EĞİTİMİ</span>
                       <h3 className="text-2xl font-black text-brand-black dark:text-white mb-4 tracking-tight">{item.title}</h3>
                       <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {course.curriculum?.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-brand-darkCard p-12 rounded-[3.5rem] shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-white/5 space-y-6 group hover:bg-brand-orange transition-all duration-500">
                     <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange font-black text-2xl group-hover:bg-white group-hover:text-brand-orange transition-all">
                        {i + 1}
                     </div>
                     <h3 className="text-2xl font-black text-brand-black dark:text-white group-hover:text-white transition-colors">{item.title}</h3>
                     <p className="text-slate-400 dark:text-slate-500 font-medium leading-relaxed group-hover:text-white/80 transition-colors">{item.description}</p>
                  </div>
                ))}
             </div>
           )}
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: 'Süreç Takibi', desc: 'Her modül veya ay sonunda velilerimize detaylı gelişim raporu sunulur.', icon: 'M9 12l2 2 4-4' },
             { title: 'Pedagojik Destek', desc: 'Programlar, yaş grubuna uygun ve pedagojik olarak onaylı içeriklerle ilerler.', icon: 'M12 4.354a4 4 0 110 5.292' },
             { title: 'Ders Telafisi', desc: 'Kaçırılan dersler için telafi oturumları veya kayıtlı içeriklerle destek sağlanır.', icon: 'M12 8v4l3 3' }
           ].map((benefit, i) => (
             <div key={i} className="bg-brand-black p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group hover:-translate-y-2 transition-all">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
                <div className="w-16 h-16 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={benefit.icon} /></svg>
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-black tracking-tight">{benefit.title}</h3>
                   <p className="text-white/50 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default KidsCourseDetail;
