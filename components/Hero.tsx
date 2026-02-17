
import React from 'react';

// 1. Adım: Bileşenin onNavigate fonksiyonunu kabul etmesi için interface tanımlıyoruz
interface HeroProps {
  onNavigate: (page: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-white dark:bg-brand-dark transition-colors duration-500">
      {/* Modern Grid Pattern - Hem gece hem gündüz uyumlu */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="absolute inset-0 pointer-events-none">
        {/* Dekoratif Arka Plan Elemanları - Geçişler yumuşatıldı */}
        <div className="absolute top-[-25%] right-[-15%] w-[1100px] h-[1100px] magical-glow animate-blob opacity-60 dark:opacity-20 transition-opacity duration-500"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#ea5438]/5 rounded-full blur-[180px] animate-blob animation-delay-4000 transition-colors duration-500"></div>
        
        {/* Geometrik Şekiller */}
        <div className="absolute top-40 right-[10%] w-64 h-64 border border-brand-orange/10 rounded-full animate-spin-slow transition-colors duration-500"></div>
        <div className="absolute top-60 right-[15%] w-32 h-32 border-2 border-brand-red/5 rounded-full animate-pulse-soft transition-colors duration-500"></div>
        
        <div className="absolute top-48 left-[8%] opacity-[0.04] dark:opacity-[0.03] text-8xl font-black select-none pointer-events-none tracking-tighter text-[#ea5438] transition-opacity duration-500">DÖNÜŞÜM</div>
        <div className="absolute bottom-48 right-[8%] opacity-[0.04] dark:opacity-[0.03] text-8xl font-black select-none pointer-events-none tracking-tighter text-[#ea5438] transition-opacity duration-500">TASARIM</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="flex-[1.5] text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-[#ea5438]/10 px-6 py-2.5 rounded-2xl mb-10 shadow-sm relative overflow-hidden group transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea5438] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ea5438]"></span>
              </span>
              <span className="text-[10px] font-black text-[#323236] dark:text-slate-300 uppercase tracking-[0.4em] transition-colors duration-500">Yeni Nesil Eğitim Yaklaşımı</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[6.8rem] font-black text-[#323236] dark:text-white leading-[1.2] tracking-[-0.03em] mb-10 relative transition-colors duration-500">
              EĞİTİMİN <br />
              <span className="gradient-text text-[0.93em]">YENİ</span> <br />
              TANIMI
              <div className="absolute -bottom-4 left-0 w-24 h-2 gradient-bg rounded-full hidden lg:block"></div>
            </h1>
            
            <p className="max-w-xl mx-auto lg:mx-0 text-lg lg:text-xl text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-12 px-4 lg:px-0 transition-colors duration-500">
              Klasik eğitim anlayışının ötesine geçerek, uygulamalı ve proje tabanlı bir yaklaşımla bireyleri geleceğin teknolojilerine hazırlıyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              {/* "Yolculuğa Başla" butonu Yetişkin Eğitimleri (courses) sayfasına yönlendirir */}
              <button 
                onClick={() => onNavigate('courses')} 
                className="btn-premium px-14 py-6"
              >
                Yolculuğa Başla
              </button>
              
              {/* "Kursları Gör" butonu Çocuk Eğitimleri (kids-courses) sayfasına yönlendirir */}
              <button 
                onClick={() => onNavigate('kids-courses')} 
                className="btn-outline px-14 py-6 group"
              >
                EĞİTİMLERİ İNCELE
                <svg className="ml-4 w-6 h-6 transition-all text-brand-orange group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full group perspective-1000">
            <div className="absolute -inset-10 border-2 border-dashed border-brand-orange/10 rounded-[5rem] animate-spin-slow transition-colors duration-500"></div>
            
            <div className="relative z-20 space-y-6 transform-gpu group-hover:rotate-y-6 transition-transform duration-1000">
               <div className="relative overflow-hidden rounded-[4rem] aspect-[4/5] shadow-[0_80px_100px_-40px_rgba(0,0,0,0.2)] border-[10px] border-white dark:border-white/5 group-hover:shadow-[#ea5438]/20 transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1770801135275-98bbeffd452f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-120 transition-transform duration-[2s]" 
                    alt="Eğitim Deneyimi" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ea5438]/40 via-transparent to-transparent"></div>
               </div>
               <div className="absolute -bottom-10 -left-10 z-30 glass-frosted p-6 rounded-[2.5rem] shadow-2xl animate-float border-[#ea5438]/20 hidden md:block transition-all duration-500">
                  <pre className="text-[10px] text-brand-black dark:text-slate-300 font-mono font-bold transition-colors duration-500">
                     <span className="text-[#ea5438]">inşa_et</span>(<span className="text-[#323236] dark:text-white transition-colors duration-500">"YeniNesil"</span>);<br/>
                     <span className="text-[#ea5438]">başarılı</span> = true;<br/>
                  </pre>
               </div>
            </div>
            <div className="absolute inset-0 bg-[#ea5438]/25 blur-[120px] -z-10 rounded-full scale-110 opacity-60 dark:opacity-40 group-hover:opacity-100 transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
