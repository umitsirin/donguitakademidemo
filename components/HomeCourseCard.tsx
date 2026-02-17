
import React, { useState } from 'react';
import { Course } from '../types';

interface HomeCourseCardProps {
  course: Course;
  onClick?: () => void;
  className?: string;
}

const HomeCourseCard: React.FC<HomeCourseCardProps> = ({ course, onClick, className = "" }) => {
  const [imgSrc, setImgSrc] = useState(course.image);

  return (
    <div
      onClick={onClick}
      // Wrapper for Gradient Border: Uses a full gradient from Orange to Red for a solid frame
      className={`group relative h-full rounded-[2.5rem] p-[2px] bg-gradient-to-br from-brand-orange to-brand-red shadow-lg hover:shadow-2xl hover:shadow-brand-orange/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer transform-gpu ${className}`}
    >
      {/* Inner Container: Content with calculated radius to fit inside border perfectly */}
      <div className="relative h-full w-full bg-white dark:bg-[#1a1a1c] rounded-[2.35rem] overflow-hidden flex flex-col isolate">
        
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden flex-shrink-0">
          <img
            src={imgSrc}
            alt={course.title}
            onError={() => setImgSrc('https://images.unsplash.com/photo-1550745165-9bc0b252726f')}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          
          {/* Category Badge */}
          <div className="absolute top-5 left-5 z-10">
            <span className="px-3 py-1.5 bg-white/95 dark:bg-black/80 backdrop-blur-md rounded-xl text-[9px] font-black text-brand-black dark:text-white uppercase tracking-[0.15em] shadow-sm">
              {course.category}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-5 flex items-center space-x-2 z-10">
             <div className="flex items-center space-x-1 bg-brand-orange text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span>{course.rating}</span>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7 flex flex-col flex-grow relative bg-white dark:bg-[#1a1a1c]">
          {/* Meta Info */}
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 dark:border-white/5 pb-3">
             <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{course.level} Seviye</span>
             </div>
             <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{course.duration}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-brand-black dark:text-white leading-tight mb-3 group-hover:text-brand-orange transition-colors duration-300 font-display line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed line-clamp-3 mb-6 flex-grow">
            {course.description}
          </p>

          {/* Footer / Action Button */}
          <div className="mt-auto">
             <button className="w-full py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:bg-gradient-to-r group-hover:from-brand-orange group-hover:to-brand-red group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors relative z-10">Detayları Gör</span>
                <svg className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCourseCard;
