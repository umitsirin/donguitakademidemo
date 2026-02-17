
import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onNavigate: (page: any, ageGroup?: string) => void;
  currentPage: string;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, isDarkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobil menü durumu
  const dropdownTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (dropdownTimeoutRef.current) window.clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Mobil menü açıkken scroll'u engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) window.clearTimeout(dropdownTimeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  const logo = (
    <div 
      className="flex items-center space-x-4 cursor-pointer group z-50 relative" 
      onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
    >
      <img className="w-14" src="components/public/logo.svg" alt="" />
      <span className="text-2xl font-black tracking-tighter text-[#323236] dark:text-white">DÖNGÜ <span className="gradient-text">AKADEMİ</span></span>
    </div>
  );

  const getLinkClass = (page: string) => {
    const isActive = currentPage === page || (page === 'courses' && (currentPage === 'courses' || currentPage === 'kids-courses' || currentPage === 'course-detail'));
    return `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative px-6 py-2.5 rounded-full flex items-center justify-center h-10 ${
      isActive 
      ? 'gradient-bg text-white shadow-lg shadow-orange-200/40' 
      : 'text-[#323236]/60 dark:text-slate-400 hover:text-[#ea5438] dark:hover:text-white'
    }`;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${scrolled || currentPage !== 'home' ? 'bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl py-4 shadow-md border-b border-slate-100 dark:border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {logo}
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <button onClick={() => onNavigate('home')} className={getLinkClass('home')}>
              Ana Sayfa
            </button>
            
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={getLinkClass('courses')}>
                <span>Eğitimler</span>
                <svg className={`w-3 h-3 ml-2 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 pt-4 transition-all duration-300 transform origin-top ${showDropdown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-white dark:bg-brand-darkCard border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] p-3 overflow-hidden">
                  <button 
                    onClick={() => { onNavigate('courses'); setShowDropdown(false); }}
                    className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all flex items-center justify-between group/item"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#323236] dark:text-white">Yetişkin</span>
                      <span className="text-[10px] text-slate-400 font-medium">Kariyer Odaklı</span>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover/item:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <button 
                    onClick={() => { onNavigate('kids-courses'); setShowDropdown(false); }}
                    className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all flex items-center justify-between group/item"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#323236] dark:text-white">Çocuk</span>
                      <span className="text-[10px] text-slate-400 font-medium">Gelecek Vizyonu</span>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover/item:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('instructors')} className={getLinkClass('instructors')}>
              Eğitmenler
            </button>
            <button onClick={() => onNavigate('blog')} className={getLinkClass('blog')}>
              Blog
            </button>
            <button onClick={() => onNavigate('about')} className={getLinkClass('about')}>
              Hakkımızda
            </button>

            <div className="w-px h-6 bg-slate-100 dark:bg-white/10 mx-4"></div>

            <button 
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#323236] dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
              aria-label="Gece/Gündüz Modu"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-brand-orange fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#323236] dark:text-white z-50 relative"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 dark:bg-[#0f0f11]/95 backdrop-blur-xl z-[998] overflow-y-auto transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="min-h-full w-full flex flex-col items-center justify-center py-24 space-y-12">
          <nav className="flex flex-col items-center space-y-6">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-3xl font-black text-brand-black dark:text-white tracking-tighter hover:text-brand-orange transition-colors">ANA SAYFA</button>
            <button onClick={() => { onNavigate('courses'); setMobileMenuOpen(false); }} className="text-3xl font-black text-brand-black dark:text-white tracking-tighter hover:text-brand-orange transition-colors">EĞİTİMLER</button>
            <button onClick={() => { onNavigate('kids-courses'); setMobileMenuOpen(false); }} className="text-xl font-bold text-slate-500 dark:text-slate-400 tracking-widest hover:text-brand-orange transition-colors">ÇOCUK AKADEMİSİ</button>
            <button onClick={() => { onNavigate('instructors'); setMobileMenuOpen(false); }} className="text-3xl font-black text-brand-black dark:text-white tracking-tighter hover:text-brand-orange transition-colors">EĞİTMENLER</button>
            <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-3xl font-black text-brand-black dark:text-white tracking-tighter hover:text-brand-orange transition-colors">BLOG</button>
            <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="text-3xl font-black text-brand-black dark:text-white tracking-tighter hover:text-brand-orange transition-colors">HAKKIMIZDA</button>
          </nav>

          <div className="flex flex-col items-center space-y-8">
            <button onClick={() => { toggleDarkMode?.(); setMobileMenuOpen(false); }} className="flex items-center space-x-3 px-6 py-3 bg-slate-100 dark:bg-white/10 rounded-full">
              {isDarkMode ? (
                  <>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Gece Modu</span>
                  </>
              ) : (
                  <>
                    <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                    <span className="text-xs font-bold text-brand-black uppercase tracking-widest">Gündüz Modu</span>
                  </>
              )}
            </button>
            
            <button 
              onClick={() => { onNavigate('admin-login'); setMobileMenuOpen(false); }}
              className="text-[10px] font-black text-slate-400 hover:text-brand-orange uppercase tracking-[0.2em] transition-colors pb-4"
            >
              Yönetici Girişi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
