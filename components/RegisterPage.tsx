
import React from 'react';

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'login') => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative bg-white dark:bg-brand-dark flex items-center justify-center p-6 overflow-hidden py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
        <div className="absolute top-40 right-10 w-96 h-96 bg-brand-orange/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-brand-red/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-red transition-all mb-10 group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:bg-brand-red/5 group-hover:border-brand-red/10 transition-all shadow-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span>ANA SAYFAYA DÖN</span>
        </button>

        <div className="bg-white dark:bg-brand-darkCard rounded-[4rem] p-12 lg:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] dark:shadow-none border border-slate-50 dark:border-white/5">
          <div className="text-center mb-14">
            <div 
              className="w-20 h-20 gradient-bg rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-orange-200 mx-auto mb-8 cursor-pointer transform hover:scale-110 transition-all"
              onClick={() => onNavigate('home')}
            >
              D
            </div>
            <div className="inline-block px-5 py-2 bg-orange-50 dark:bg-orange-900/20 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">Aramıza Katılın</div>
            <h1 className="text-4xl font-black text-[#323236] dark:text-white tracking-tight leading-tight">Geleceğinizi <br /> <span className="gradient-text">Kodlamaya Başlayın</span></h1>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-4 max-w-sm mx-auto">Döngü Akademi ailesine katılarak yeni nesil eğitim dünyasında yerinizi alın.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Ad Soyad</label>
                <input 
                  type="text" 
                  placeholder="Can Aksoy" 
                  className="input-premium"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Telefon No</label>
                <input 
                  type="tel" 
                  placeholder="+90 (5__) ___ __ __" 
                  className="input-premium"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">E-Posta Adresi</label>
              <input 
                type="email" 
                placeholder="ad@ornek.com" 
                className="input-premium"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Şifre Oluştur</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input-premium"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Şifre Tekrar</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input-premium"
                  required 
                />
              </div>
            </div>

            <div className="space-y-5 pt-4">
              <label className="flex items-start space-x-4 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-5 h-5 text-brand-orange rounded-lg border-slate-200 dark:border-white/10 dark:bg-white/5 focus:ring-brand-orange/20 transition-all" required />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-[#323236] dark:group-hover:text-white">
                  <button type="button" className="text-brand-orange hover:underline decoration-2 underline-offset-4">Kullanım Koşullarını</button> ve {' '}
                  <button type="button" className="text-brand-orange hover:underline decoration-2 underline-offset-4">KVKK Metnini</button> okudum, kabul ediyorum.
                </span>
              </label>
              <label className="flex items-start space-x-4 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-5 h-5 text-brand-orange rounded-lg border-slate-200 dark:border-white/10 dark:bg-white/5 focus:ring-brand-orange/20 transition-all" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-[#323236] dark:group-hover:text-white">
                  Eğitimler, duyurular ve özel fırsatlar hakkında haberdar olmak istiyorum.
                </span>
              </label>
            </div>

            <button type="submit" className="btn-premium w-full py-6 mt-8">
              Kaydımı Tamamla
            </button>
          </form>

          <div className="mt-16 pt-14 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
              Zaten hesabın var mı? {' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-brand-orange font-black hover:text-brand-red transition-colors underline decoration-2 underline-offset-4 decoration-orange-100 dark:decoration-orange-900"
              >
                Hemen Giriş Yap
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
