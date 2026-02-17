
import React, { useState } from 'react';
import { consultationService } from '../services/consultationService';

interface FooterProps {
  onAdminGateClick?: () => void;
  onNavigate?: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminGateClick, onNavigate }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await consultationService.submitRequest({
        full_name: formData.fullName,
        phone: formData.phone
      });
      setIsSuccess(true);
      setFormData({ fullName: '', phone: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg('Bir hata oluştu. Lütfen WhatsApp hattımızdan ulaşın.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sosyal Medya Linkleri
  const socialLinks = [
    { 
      name: 'INSTAGRAM', 
      link: 'https://www.instagram.com/dongu.akademi/', 
      icon: 'M7.8 2c-3.2 0-5.8 2.6-5.8 5.8v8.4c0 3.2 2.6 5.8 5.8 5.8h8.4c3.2 0 5.8-2.6 5.8-5.8V7.8c0-3.2-2.6-5.8-5.8-5.8H7.8zM7.6 4h8.8c2 0 3.6 1.6 3.6 3.6v8.8c0 2-1.6 3.6-3.6 3.6H7.6c-2 0-3.6-1.6-3.6-3.6V7.6c0-2 1.6-3.6 3.6-3.6zM17.25 5.5a1.25 1.25 0 0 1 1.25 1.25 1.25 1.25 0 0 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' 
    },
    { 
      name: 'FACEBOOK', 
      link: 'https://www.instagram.com/dongu.akademi/', 
      icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z' 
    },
    { 
      name: 'YOUTUBE', 
      link: 'https://www.youtube.com/@DonguAkademi', 
      icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' 
    },
    { 
      name: 'TIKTOK', 
      link: 'https://www.tiktok.com/@donguitakademi', 
      icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-1 13.6 6.84 6.84 0 0 0 6.45-6.38v-8.47a8.32 8.32 0 0 0 3.78 1.52v-3z' 
    },
    { 
      name: 'LINKEDIN', 
      link: 'https://www.linkedin.com/company/109678943/admin/dashboard/', 
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' 
    }
  ];

  return (
    <section className="relative pt-24 pb-12 overflow-hidden gradient-bg text-white shadow-inner">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="w-full lg:w-1/2 text-left space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter">
                Teknoloji serüvenine <br /> <span className="text-[#323236]">bugün başlayın.</span>
              </h2>
              <p className="text-white/80 text-lg font-medium max-w-lg">
                Alanında uzman eğitmenlerimizle, teknoloji yolculuğunuzda size rehberlik ediyoruz.
              </p>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-md">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Danışma Hattı</p>
                  <p className="text-xl font-black text-white">+90 (532) 723 66 48</p>
                  <p className="text-xl font-black text-white">+90 (532) 603 66 48</p>
                  <p className="text-xl font-black text-white">+90 (532) 573 66 48</p>
                  
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-white/20">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Bizi Takip Edin</p>
              <div className="flex items-center space-x-8 overflow-x-auto no-scrollbar pb-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center space-y-3 flex-shrink-0"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-[#323236] group-hover:border-[#323236] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-white">
                        <path d={social.icon} />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity uppercase">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[480px] scroll-mt-48" id="contact-form">
            <div className="bg-white dark:bg-brand-darkCard rounded-[3.5rem] p-10 lg:p-12 shadow-2xl shadow-orange-900/20 dark:shadow-none text-[#323236]">
              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#323236] dark:text-white mb-3">Talebiniz Alındı!</h3>
                  <p className="text-slate-500 font-medium text-sm">
                    Eğitim danışmanlarımız en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-[10px] font-black uppercase tracking-widest text-brand-orange hover:underline"
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black mb-10 tracking-tight dark:text-white">Ücretsiz Danışmanlık Alın</h3>
                  
                  <form className="space-y-6" onSubmit={handleConsultationSubmit}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Adınız Soyadınız</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Örn: Can Aksoy" 
                        className="input-premium" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Telefon Numaranız</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="0 (5__) ___ __ __" 
                        className="input-premium" 
                        required 
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-xs font-bold text-center">{errorMsg}</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#323236] dark:bg-white dark:text-brand-black text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-black dark:hover:bg-slate-200 transition-all shadow-xl shadow-black/10 transform active:scale-[0.98] mt-4 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>GÖNDERİLİYOR...</span>
                      ) : (
                        <>
                          <span>BİLGİ ALMAK İSTİYORUM</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center space-x-3">
            <img className="w-14" src="components/public/logoW.svg" alt="" />
            <span className="text-lg font-black tracking-tighter text-white">DÖNGÜ <span className="text-white">AKADEMİ</span></span>
          </div>
          <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
            © 2025 Döngü IT Akademi. Tüm hakları saklıdır.
            <br /> <span className="font-black text-white ">Yazılım ve içerik hakları Döngü Soft’a aittir.</span>
          </p>
          <div className="flex space-x-10 text-[10px] font-black uppercase tracking-widest text-white/60">
            <button 
              onClick={() => onNavigate && onNavigate('kvkk')} 
              className="hover:text-[#323236] dark:hover:text-white transition-colors"
            >
              KVKK
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('privacy')} 
              className="hover:text-[#323236] dark:hover:text-white transition-colors"
            >
              GİZLİLİK
            </button>
            <button 
              onClick={onAdminGateClick} 
              className="text-white/40 hover:text-white transition-colors border-l border-white/10 pl-10"
            >
              Kurumsal Giriş
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
