import React, { useState } from 'react';
import { instructorService, InstructorApplication } from '../services/instructorService';

interface InstructorApplyPageProps {
  onBack: () => void;
}

const InstructorApplyPage: React.FC<InstructorApplyPageProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<InstructorApplication>({
    full_name: '',
    phone: '',
    email: '',
    expertise: '',
    linkedin_url: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await instructorService.submitApplication(formData);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-brand-dark flex items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="max-w-2xl w-full bg-white dark:bg-brand-darkCard rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 gradient-bg"></div>
          <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-black dark:text-white mb-6 tracking-tight">Başvurunuz Alındı!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            Döngü Akademi eğitmen ailesine katılma isteğiniz bizi çok heyecanlandırdı. Başvurunuz veritabanımıza güvenle kaydedildi. Ekibimiz başvurunuzu inceleyip en kısa sürede sizinle iletişime geçecektir.
          </p>
          <button 
            onClick={onBack}
            className="px-12 py-5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-brand-black dark:text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all"
          >
            ANA SAYFAYA DÖN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-all group mb-12"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span>Geri Dön</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">KARİYER</span>
              <h1 className="text-4xl lg:text-5xl font-black text-brand-black dark:text-white tracking-tight leading-[1.1] mb-6">
                Bilgini <br/> <span className="gradient-text">Geleceğe Aktar.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Sektör deneyimini yeni nesillerle paylaşmak, dinamik bir ekibin parçası olmak ve eğitim dünyasında fark yaratmak istiyorsan, seni aramızda görmek istiyoruz.
              </p>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-brand-darkCard/50 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
              <h3 className="text-lg font-black text-brand-black dark:text-white">Aradığımız Nitelikler</h3>
              <ul className="space-y-4">
                {[
                  'İlgili alanda en az 3 yıl sektör deneyimi',
                  'Güçlü iletişim ve sunum becerileri',
                  'Sürekli öğrenmeye ve gelişime açıklık',
                  'Mentörlük yapma tutkusu'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <svg className="w-5 h-5 text-brand-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-brand-darkCard rounded-[3.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-white/5 relative">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {errorMsg && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold mb-4">
                    ⚠️ {errorMsg}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Ad Soyad</label>
                    <input 
                      type="text" 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Örn: Can Aksoy" 
                      className="input-premium" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Telefon</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0 (5__) ___ __ __" 
                      className="input-premium" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">E-Posta</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="iletisim@ornek.com" 
                    className="input-premium" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Uzmanlık Alanı</label>
                  <select 
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="input-premium" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Mobile Development">Mobil Uygulama (iOS/Android)</option>
                    <option value="Data Science & AI">Veri Bilimi & AI</option>
                    <option value="Cyber Security">Siber Güvenlik</option>
                    <option value="UI/UX Design">UI/UX Tasarım</option>
                    <option value="Kids Coding">Çocuklar İçin Kodlama (Robotik)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">LinkedIn / Portfolio URL</label>
                  <input 
                    type="url" 
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..." 
                    className="input-premium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 ml-1">Kısaca Kendinizden Bahsedin</label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4} 
                    className="input-premium" 
                    placeholder="Tecrübeleriniz ve motivasyonunuz..." 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-6 gradient-bg text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-xl shadow-orange-100 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>GÖNDERİLİYOR...</span>
                    </>
                  ) : (
                    <span>BAŞVURUYU GÖNDER</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorApplyPage;