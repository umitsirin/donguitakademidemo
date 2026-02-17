
import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

interface KidsCoursesPageProps {
  courses: Course[];
  initialAgeGroup?: string;
  onCourseClick?: (course: Course) => void;
}

const KidsCoursesPage: React.FC<KidsCoursesPageProps> = ({ courses, initialAgeGroup, onCourseClick }) => {
  const [activeAgeGroup, setActiveAgeGroup] = useState(initialAgeGroup || 'Tümü');
  const ageGroups = ['Tümü', '7-8', '9-12', '13-15', '15-17'];

  useEffect(() => {
    if (initialAgeGroup) setActiveAgeGroup(initialAgeGroup);
  }, [initialAgeGroup]);

  const longTermCourses = useMemo(() => {
    return courses.filter(course => 
      course.targetAudience === 'kids' && course.programType === '9-month' &&
      (activeAgeGroup === 'Tümü' || course.ageGroup === activeAgeGroup)
    );
  }, [activeAgeGroup, courses]);

  const modularCourses = useMemo(() => {
    return courses.filter(course => 
      course.targetAudience === 'kids' && course.programType === 'modular' &&
      (activeAgeGroup === 'Tümü' || course.ageGroup === activeAgeGroup)
    );
  }, [activeAgeGroup, courses]);

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen">
      <section className="pt-40 pb-20 relative overflow-hidden bg-slate-50 dark:bg-brand-darkCard/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="bg-white dark:bg-white/5 px-5 py-2 rounded-full shadow-sm text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mb-6 inline-block">GELECEĞİN KAŞİFLERİ</span>
            <h1 className="text-5xl lg:text-7xl font-black text-[#323236] dark:text-white mb-6 tracking-tight">Genç <br /> <span className="gradient-text">Kaşiflerin Evreni</span></h1>
            
            <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Merak eden zihinler için tasarlanmış eğlenceli ve öğretici bir evren.
Hayal gücüyle başlayan, teknolojiyle devam eden bir yolculuk.
            </p>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl border-y border-slate-100 dark:border-white/5 py-8 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {ageGroups.map(age => (
              <button key={age} onClick={() => setActiveAgeGroup(age)} className={`px-8 py-4 rounded-2xl text-sm font-black transition-all ${activeAgeGroup === age ? 'gradient-bg text-white shadow-xl' : 'bg-white dark:bg-white/5 text-brand-black dark:text-white border-2 border-slate-100 dark:border-brand-red/30'}`}>{age === 'Tümü' ? 'Tümü' : `${age} Yaş`}</button>
            ))}
          </div>
      </section>

      <section className="py-24 bg-white dark:bg-brand-dark relative overflow-hidden">
        <FallingCodeBackground snippets={CODE_SNIPPETS.KIDS} count={25} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-black text-brand-black dark:text-white tracking-tight mb-16">Akademik Programlar <span className="text-brand-orange">(9 Ay)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {longTermCourses.map(course => (
              <CourseDetailCard key={course.id} course={course} onClick={() => onCourseClick?.(course)} isFeatured />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-brand-darkCard/20 relative overflow-hidden">
        <FallingCodeBackground snippets={CODE_SNIPPETS.KIDS} count={25} colorClass="text-blue-500 dark:text-white/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-black text-brand-black dark:text-white tracking-tight mb-16">Yetenek Atölyeleri <span className="text-slate-400 dark:text-slate-600">(Modüler)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {modularCourses.map(course => (
              <CourseDetailCard key={course.id} course={course} onClick={() => onCourseClick?.(course)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CourseDetailCard: React.FC<{ course: Course; onClick: () => void; isFeatured?: boolean }> = ({ 
  course, onClick, isFeatured = false 
}) => (
  <div 
    onClick={onClick} 
    className={`group relative ${isFeatured ? 'w-full' : 'h-full'} rounded-[3.5rem] p-[2px] bg-gradient-to-br from-brand-orange to-brand-red shadow-xl hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer transform-gpu`}
  >
    <div className={`relative w-full h-full bg-white dark:bg-brand-darkCard rounded-[calc(3.5rem-2px)] overflow-hidden flex flex-col ${isFeatured ? 'md:flex-row gap-8 lg:gap-12 p-6 lg:p-10' : 'p-6'}`}>
      
      <div className={`relative overflow-hidden rounded-[2.5rem] flex-shrink-0 ${isFeatured ? 'md:w-1/2 aspect-video' : 'aspect-[4/3] mb-8 w-full'}`}>
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent opacity-70"></div>
        <div className="absolute top-6 left-6 bg-white/95 dark:bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black text-brand-orange uppercase tracking-widest shadow-xl">
          {course.ageGroup} Yaş
        </div>
      </div>

      <div className={`flex-grow flex flex-col justify-center ${isFeatured ? 'md:w-1/2 py-4' : ''}`}>
        <span className={`text-[10px] font-black uppercase mb-4 ${isFeatured ? 'text-brand-orange' : 'text-blue-500'}`}>
          {course.category}
        </span>
        <h3 className={`${isFeatured ? 'text-3xl lg:text-4xl' : 'text-2xl'} font-black text-brand-black dark:text-white mb-4 group-hover:gradient-text transition-colors leading-tight`}>
          {course.title}
        </h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-8 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
           <button className="w-full py-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-brand-red group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors relative z-10">Detayları Gör</span>
              <svg className="w-5 h-5 text-brand-orange group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
           </button>
        </div>
      </div>
    </div>
  </div>
);

export default KidsCoursesPage;
