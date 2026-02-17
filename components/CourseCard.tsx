
import React, { useState } from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  className?: string; 
  onImageError?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isFavorite, onToggleFavorite, className = "", onImageError }) => {
  const [imgSrc, setImgSrc] = useState(course.image);

  const handleError = () => {
    // Hata durumunda yedek bir görsel koyuyoruz
    setImgSrc('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop');
    if (onImageError) onImageError();
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative bg-white dark:bg-brand-darkCard rounded-[3.5rem] p-4 transition-all duration-700 flex flex-col h-full ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative h-64 overflow-hidden rounded-[2.5rem]">
        <img 
          src={imgSrc} 
          alt={course.title} 
          onError={handleError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent opacity-70"></div>
        
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <span className="glass-frosted border-white/20 text-[#323236] dark:text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-lg">
            {course.category}
          </span>
          
          {onToggleFavorite && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isFavorite ? 'bg-[#ea5438] text-white shadow-lg' : 'bg-white/80 dark:bg-black/50 backdrop-blur-md text-[#ea5438] hover:bg-white dark:hover:bg-black'}`}
            >
              <svg className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="absolute bottom-5 left-5 flex items-center space-x-3">
           <div className="bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl flex items-center space-x-1.5">
              <svg className="w-3.5 h-3.5 text-[#ea5438] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-[10px] font-black text-brand-black dark:text-white">{course.rating}</span>
           </div>
           <span className="glass-frosted border-white/20 px-3 py-1.5 rounded-xl text-[8px] font-black text-[#323236] dark:text-white uppercase tracking-widest">{course.level}</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl lg:text-3xl font-black text-brand-black dark:text-white mb-4 leading-tight tracking-tight group-hover:gradient-text transition-all duration-500 font-display">
          {course.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium line-clamp-3 mb-8 leading-relaxed flex-grow">
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
  );
};

export default CourseCard;
