import React, { useEffect } from 'react';

interface KvkkPageProps {
  onBack: () => void;
}

const KvkkPage: React.FC<KvkkPageProps> = ({ onBack }) => {
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
              Kişisel Verilerin Korunması <br/> Aydınlatma Metni
            </h1>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
              Son Güncelleme: 24 Ekim 2024
            </p>
          </header>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium leading-relaxed space-y-8">
            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">1. Veri Sorumlusu</h3>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Döngü Akademi Plus ("Şirket") olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işleyebilecek, kaydedebilecek, saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere açıklayabilecek/devredebileceğiz.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">2. Kişisel Verilerinizin İşlenme Amacı</h3>
              <p>Toplanan kişisel verileriniz (Ad-soyad, iletişim bilgileri, eğitim durumu vb.);</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-brand-orange">
                <li>Eğitim hizmetlerimizin sunulabilmesi ve süreçlerin yürütülmesi,</li>
                <li>Akademik gelişiminizin takip edilmesi ve raporlanması,</li>
                <li>Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması,</li>
                <li>Hukuki ve ticari güvenliğin temini amaçlarıyla işlenmektedir.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">3. Kişisel Verilerin Aktarılması</h3>
              <p>
                Kişisel verileriniz; kanunen yetkili kamu kurumlarına, yargı mercilerine ve iş ortaklarımıza, Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
              <p>
                Kişisel verileriniz, internet sitemiz, başvuru formlarımız, mobil uygulamalarımız ve fiziki kanallar aracılığıyla elektronik veya fiziki ortamda toplanmaktadır. Bu toplama faaliyeti, sözleşmenin ifası ve kanunlarda öngörülen hukuki sebeplerle gerçekleştirilmektedir.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-black text-brand-black dark:text-white mb-4">5. Veri Sahibinin Hakları (Madde 11)</h3>
              <p>KVKK'nın 11. maddesi uyarınca veri sahipleri;</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-brand-orange">
                <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir.</li>
              </ul>
            </section>

            <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl mt-8 border border-slate-100 dark:border-white/10">
              <p className="text-sm font-bold text-brand-black dark:text-white mb-2">İletişim</p>
              <p className="text-xs">
                Haklarınız kapsamındaki taleplerinizi, yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da daha önce bize bildirdiğiniz e-posta adresini kullanmak suretiyle <span className="text-brand-orange">info@donguakademi.com</span> adresine iletebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KvkkPage;