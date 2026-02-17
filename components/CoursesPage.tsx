
import React, { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import { Course } from '../types';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

interface CoursesPageProps {
  courses: Course[];
  onCourseClick?: (course: Course) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ courses, onCourseClick }) => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  // Yetişkin eğitimleri için güncellenmiş kategoriler (Görünen isim vs Veritabanı değeri)
  // 'label' ekranda görünen, 'value' ise veritabanındaki ve filtrelemedeki değerdir.
  const categories = [
    { label: 'Tümü', value: 'Tümü' },
    { label: 'Yazılım', value: 'Yazılım' },
    { label: 'Veri & Yapay Zeka', value: 'Veri & Yapay Zeka' },
    { label: 'Siber Güvenlik', value: 'Siber Güvenlik' },
    { label: 'Mobil', value: 'Mobil' },
    { label: 'Tasarım & Oyun', value: 'Tasarım & Oyun Geliştirme' } // Ekranda sığması için optimize edildi
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const isAdult = course.targetAudience === 'adult';
      const matchesCategory = activeCategory === 'Tümü' || course.category === activeCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return isAdult && matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, courses]);

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen">
      <section className="pt-40 pb-20 bg-white dark:bg-brand-dark relative overflow-hidden">
        {/* Arka Plan Grafikleri - Kariyer Odaklı */}
        <div className="absolute inset-0 pointer-events-none">
           {/* Yükselen Grafik Çizgisi */}
           <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] opacity-[0.08] text-brand-orange transform -rotate-12">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                 <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
           </div>
           
           {/* Hedef/Target İkonu */}
           <div className="absolute bottom-10 left-10 w-64 h-64 opacity-[0.02] dark:opacity-[0.015] text-brand-orange">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
              </svg>
           </div>

           {/* Soyut Dekoratif Çemberler */}
           <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full border-4 border-brand-orange/5 animate-pulse"></div>
           <div className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-brand-red/5 blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start max-w-4xl">
             <nav className="flex mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</span>
              <span className="mx-4 text-slate-200 dark:text-slate-800">/</span>
              <span className="text-[#323236] dark:text-white">Yetişkin Eğitimleri</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-black text-[#323236] dark:text-white mb-6 tracking-tighter leading-none">Tüm Eğitimlerimiz</h1>
            
            {/* Slogan */}
            <p className="text-2xl font-bold text-slate-400 dark:text-slate-500 mb-4 tracking-tight">
              Kariyerini Zirveye Taşıyın
            </p>

            {/* Yeni Eklenen Açıklama Metni */}
            <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-8">
             Kariyer hedeflerinize uygun, uygulamalı ve proje tabanlı eğitim programları.
            </p>

            <div className="w-24 h-2 gradient-bg rounded-full mb-10"></div>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-xl border-y border-slate-100 dark:border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-white/5 rounded-2xl overflow-x-auto no-scrollbar w-full lg:w-auto gap-2">
            {categories.map((cat) => (
              <button 
                key={cat.value} 
                onClick={() => setActiveCategory(cat.value)} 
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-[11px] font-black tracking-wide uppercase transition-all whitespace-nowrap ${activeCategory === cat.value ? 'bg-white dark:bg-brand-orange text-[#323236] dark:text-white shadow-sm' : 'text-slate-500 hover:text-[#323236] dark:hover:text-white'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-96 group">
            <input type="text" placeholder="Eğitim ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border-2 border-transparent rounded-2xl text-sm font-semibold outline-none focus:border-brand-orange/30 transition-all" />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#fafafa] dark:bg-brand-dark relative overflow-hidden">
        <FallingCodeBackground snippets={CODE_SNIPPETS.COURSES} count={35} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} onClick={() => onCourseClick?.(course)} className="gradient-border-orange premium-card premium-card-shadow" />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center bg-white dark:bg-brand-darkCard rounded-[4rem] border border-slate-100 shadow-sm"><h3 className="text-3xl font-black text-[#323236] dark:text-white">Eğitim Bulunamadı</h3></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
