
import React, { useEffect } from 'react';
import { BlogPost } from '../types';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-32 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-all group mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span>Blog Listesine Dön</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              {post.category}
            </span>
            <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
              {post.readTime} OKUMA
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-brand-black dark:text-white tracking-tighter leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-white/5 pb-12">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-100">
              {post.author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-brand-black dark:text-white">{post.author}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{post.date}</span>
            </div>
          </div>
        </div>

        <div className="mb-16 relative group">
           <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-transparent dark:border-white/5">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
              />
           </div>
           
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
           <p className="text-2xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-brand-orange first-letter:mr-3 first-letter:float-left">
              {post.excerpt}
           </p>
           
           <div className="space-y-8 text-lg font-medium text-slate-600 dark:text-slate-400 leading-[1.8]">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              
              <div className="p-10 bg-slate-50 dark:bg-brand-darkCard rounded-[3rem] border border-slate-100 dark:border-white/5 my-16">
                 <h4 className="text-xl font-black text-brand-black dark:text-white mb-4">Öne Çıkan Başlıklar</h4>
                 <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                       <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 flex-shrink-0"></div>
                       <span>Teknoloji adaptasyonu ve sürekli öğrenme stratejileri.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                       <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 flex-shrink-0"></div>
                       <span>Yazılım dünyasında kariyer basamaklarını hızlı tırmanmanın yolları.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                       <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 flex-shrink-0"></div>
                       <span>Döngü Akademi ekosisteminin sunduğu network avantajları.</span>
                    </li>
                 </ul>
              </div>

              <p>
                 Makalenin devamında, bu süreçlerin nasıl optimize edileceği ve teknoloji liderlerinin bakış açıları incelenmeye devam edilecektir. Bizimle kalın ve geleceği birlikte kodlayalım.
              </p>
           </div>
        </div>

        <div className="mt-24 p-12 bg-brand-black rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 rounded-[2rem] gradient-bg flex items-center justify-center text-white font-black text-3xl shadow-2xl">
              {post.author.charAt(0)}
           </div>
           <div className="flex-grow text-center md:text-left">
              <h4 className="text-2xl font-black mb-2">{post.author}</h4>
              <p className="text-white/60 font-medium leading-relaxed">
                 Döngü Akademi bünyesinde kıdemli yazar ve teknoloji mentorudur. Geleceğin teknolojileri ve yazılım kültürü üzerine makaleler üretmektedir.
              </p>
              <div className="mt-6 flex items-center justify-center md:justify-start space-x-6">
                 <button className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">Tüm Yazıları</button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">İletişime Geç</button>
              </div>
           </div>
        </div>

        <div className="mt-24 border-t border-slate-100 dark:border-white/5 pt-16">
           <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest text-center mb-12"></p>
           <div className="group cursor-pointer text-center max-w-2xl mx-auto" onClick={onBack}>
              <h3 className="text-3xl font-black text-brand-black dark:text-white group-hover:text-brand-orange transition-colors tracking-tight">
              
              </h3>
              <div className="mt-6 flex items-center justify-center space-x-2 text-brand-orange font-black text-xs uppercase tracking-widest">
                 <span>OKUMAYA DEVAM ET</span>
                 <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
           </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
