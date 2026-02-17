
import React from 'react';
import { BlogPost } from '../types';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

interface BlogPageProps {
  blogPosts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts, onPostClick }) => {
  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-40 pb-24 relative overflow-hidden">
      <FallingCodeBackground snippets={CODE_SNIPPETS.BLOG} count={25} colorClass="text-brand-orange/20 dark:text-white/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start max-w-4xl mb-16">
          <nav className="flex mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</span>
            <span className="mx-4 text-slate-200 dark:text-slate-800">/</span>
            <span className="text-[#323236] dark:text-white">Blog</span>
          </nav>
          <h1 className="text-5xl lg:text-6xl font-black text-[#323236] dark:text-white mb-8 tracking-tighter leading-none">
            Teknoloji ve <br/><span className="gradient-text">Gelecek Vizyonu.</span>
          </h1>
          <div className="w-24 h-2 gradient-bg rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="group cursor-pointer p-4 rounded-[3.5rem] gradient-border-orange bg-white/50 dark:bg-brand-darkCard/50 backdrop-blur-sm transition-all hover:border-brand-orange/30"
              onClick={() => onPostClick?.(post)}
            >
              <div className="relative h-80 overflow-hidden rounded-[3rem] mb-8 shadow-xl shadow-slate-100 dark:shadow-none transition-all group-hover:shadow-orange-100 dark:group-hover:bg-white/5 group-hover:-translate-y-2">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute top-6 left-6">
                  <span className="glass-frosted border-white/20 text-[#323236] dark:text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center space-x-4 mb-4 text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span>{post.readTime} OKUMA</span>
                </div>
                <h3 className="text-2xl font-black text-[#323236] dark:text-white mb-4 leading-tight group-hover:gradient-text transition-all">
                  {post.title}
                </h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-[10px]">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-[#323236] dark:text-slate-300">{post.author}</span>
                  </div>
                  <button className="text-[10px] font-black text-[#ea5438] uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform">
                    OKU <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
