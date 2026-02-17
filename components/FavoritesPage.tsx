
import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface FavoritesPageProps {
  courses: Course[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onCourseClick: (course: Course) => void;
  onNavigate: (page: any) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ 
  courses, 
  favorites, 
  onToggleFavorite, 
  onCourseClick,
  onNavigate 
}) => {
  const favoriteCourses = courses.filter(c => favorites.includes(c.id));

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start max-w-4xl mb-16">
          <nav className="flex mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span onClick={() => onNavigate('home')} className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</span>
            <span className="mx-4 text-slate-200">/</span>
            <span className="text-[#323236]">Favorilerim</span>
          </nav>
          <h1 className="text-5xl lg:text-6xl font-black text-[#323236] mb-8 tracking-tighter leading-none">
            Kaydettiğim <br/><span className="gradient-text">Eğitimler.</span>
          </h1>
          <div className="w-24 h-2 gradient-bg rounded-full"></div>
        </div>

        {favoriteCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {favoriteCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(course.id)}
                onClick={() => onCourseClick(course)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-slate-200/50">
              <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#323236] mb-4 tracking-tight">Henüz bir eğitim kaydetmediniz</h3>
            <p className="text-slate-400 font-medium mb-10 max-w-xs">İlginizi çeken eğitimleri favorilerinize ekleyerek buradan kolayca ulaşabilirsiniz.</p>
            <button 
              onClick={() => onNavigate('courses')}
              className="px-12 py-5 gradient-bg text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-105 transition-all"
            >
              EĞİTİMLERİ KEŞFET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
