import React, { useEffect } from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Dekoratif Arka Plan */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-all group mb-12"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span>Ana Sayfaya Dön</span>
        </button>

        <div className="bg-white dark:bg-brand-darkCard rounded-[3rem] p-10 lg:p-16 shadow-2xl dark:shadow-none border border-slate-100 dark:border-white/5">
          <header className="mb-12 border-b border-slate-100 dark:border-white/5 pb-8">
            <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">YASAL BİLGİLENDİRME</span>
            <h1 className="text-3xl lg:text-5xl font-black text-brand-black dark:text-white tracking-tight leading-tight">
              Gizlilik Politikası
            </h1>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
              Son Güncelleme: 24 Ekim 2024
            </p>
          </header>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium leading-relaxed space-y-8">
            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">1. Giriş ve Kapsam</h3>
              <p>
                Döngü Akademi Plus olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde, eğitimlerimize kayıt olduğunuzda veya hizmetlerimizden yararlandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">2. Toplanan Bilgiler</h3>
              <p>Hizmetlerimizi sunabilmek adına aşağıdaki bilgileri toplayabiliriz:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-brand-orange">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (sertifikasyon süreçleri için).</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres.</li>
                <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, tarayıcı bilgileri, web sitesi trafik verileri.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">3. Bilgilerin Kullanımı</h3>
              <p>
                Topladığımız veriler; eğitim süreçlerinin yönetilmesi, size özel tekliflerin sunulması, yasal yükümlülüklerin yerine getirilmesi ve platform güvenliğinin sağlanması amacıyla kullanılır. Verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">4. Çerezler (Cookies)</h3>
              <p>
                Kullanıcı deneyimini geliştirmek için çerezler kullanmaktayız. Çerezler, tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">5. Veri Güvenliği</h3>
              <p>
                Kişisel verileriniz, yetkisiz erişim, kayıp veya ifşaya karşı endüstri standardı güvenlik önlemleri (SSL şifreleme, güvenlik duvarları vb.) ile korunmaktadır.
              </p>
            </section>

            <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl mt-8 border border-slate-100 dark:border-white/10">
              <p className="text-sm font-bold text-brand-black dark:text-white mb-2">Gizlilik İle İlgili Sorularınız İçin</p>
              <p className="text-xs">
                Gizlilik politikamızla ilgili her türlü soru ve görüşünüzü <span className="text-brand-orange">privacy@donguakademi.com</span> adresine iletebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;