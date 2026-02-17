import React from 'react';

interface LoginPageProps {
  onNavigate: (page: 'home') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative bg-white dark:bg-brand-dark flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <button onClick={() => onNavigate('home')} className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-red transition-all mb-10 group">
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:bg-brand-red/5 group-hover:border-brand-red/10 transition-all shadow-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span>ANA SAYFAYA DÖN</span>
        </button>

        <div className="bg-white dark:bg-brand-darkCard rounded-[4rem] p-12 lg:p-14 shadow-2xl dark:shadow-none border border-slate-50 dark:border-white/5">
          <div className="text-center mb-12">
            <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center text-white font-black text-4xl shadow-2xl mx-auto mb-10 cursor-pointer transform hover:scale-110 transition-all" onClick={() => onNavigate('home')}>D</div>
            <h1 className="text-4xl lg:text-5xl font-black text-[#323236] dark:text-white tracking-tight">Tekrar Hoş Geldin</h1>
            <p className="text-slate-400 dark:text-slate-500 text-base font-medium mt-4">Kodlamaya kaldığın yerden devam et.</p>
          </div>

          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">E-Posta</label>
              <input type="email" placeholder="ad@ornek.com" className="input-premium" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Şifre</label>
                <button type="button" className="text-[10px] font-black text-brand-orange hover:text-brand-red uppercase transition-colors">Unuttum</button>
              </div>
              <input type="password" placeholder="••••••••" className="input-premium" required />
            </div>

            <button type="submit" className="btn-premium w-full py-6 mt-4">Giriş Yap</button>
          </form>

          <div className="mt-12 pt-12 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 leading-relaxed">
              Döngü Akademi Plus <br/> Güvenli Erişim Sistemi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;