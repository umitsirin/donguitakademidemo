
import React, { useEffect } from 'react';
import { FallingCodeBackground } from './VisualEffects';
import { CODE_SNIPPETS } from '../constants';

const AboutPage: React.FC = () => {
  // SEO Metadata Update
  useEffect(() => {
    document.title = "Hakkımızda | Döngü Akademi Plus - Teknoloji ve Gelecek Vizyonu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Döngü Akademi, Trabzon merkezli dünya standartlarında yazılım ve teknoloji eğitimi sunan bir yetenek fabrikasıdır. Vizyonumuz, geleceğin teknoloji liderlerini yetiştirmektir.");
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Döngü Akademi Plus",
      "url": window.location.origin,
      "logo": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop",
      "description": "Trabzon'un teknoloji üssü. Profesyonel yazılım ve çocuk kodlama eğitimleri.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Yavuz Selim Blv. No:96 Kat:2 Ofis:10",
        "addressLocality": "Trabzon",
        "postalCode": "61050",
        "addressCountry": "TR"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const manifestos = [
    { title: 'Sürekli Öğrenme ve Merak', text: 'Teknolojide güncel kalmanın tek yolu merakı canlı tutmaktır.Döngü Akademi’de eğitim, tek seferlik değil; hayat boyu süren bir gelişim yolculuğudur.' },
    { title: 'Üretim Odaklı Eğitim', text: 'Mezun ağımız, sadece bir iletişim listesi değil; sektördeki en güçlü destek mekanizmanızdır.' },
    { title: '03. Sonuç Odaklılık', text: 'Bilgi tüketmek yeterli değildir. Her öğrenme süreci, somut bir proje ve gerçek bir çıktıyla tamamlanır.' },
    { title: 'Mentorluk ve Rehberlik', text: 'Eğitim yalnızca anlatmak değil, yol göstermektir. Öğrencilerimiz birebir destekle güçlü yönlerini keşfeder ve geliştirir.' },
    { title: 'Etik ve Bilinçli Teknoloji Kullanımı', text: 'Teknoloji bir güçtür, sorumluluk ister. Öğrencilerimizi güvenli, etik ve topluma fayda sağlayan teknoloji üreticileri olarak yetiştiririz.' },
    { title: 'Toplumsal Fayda ve Sorumluluk', text: 'Bilgi paylaşılmadıkça değer kazanmaz. Üretilen her beceri, topluma katkı sağlama bilinciyle şekillenir.' },
    { title: 'Yerelden Evrensele Vizyon', text: 'Trabzon’dan başlayan bu yolculuk, küresel standartlara uzanır. Öğrencilerimiz yalnızca bugüne değil, yarının dünyasına hazırlanır.' },
    { title: 'Disiplinli Üretim Kültürü', text: 'Başarı tesadüf değildir. Planlı çalışma, sürdürülebilir disiplin ve düzenli geri bildirimle öğrenmeyi kalıcı hale getiririz.' },
    { title: 'Geleceğe Uyum Yeteneği', text: 'Değişen teknolojiye ayak uyduran değil, değişimi anlayan ve yön verebilen bireyler yetiştiririz. Adaptasyon, eğitim modelimizin merkezindedir.' },
    { title: 'Gerçek Dünya Bağlantısı', text: 'Eğitim süreci, gerçek sektör ihtiyaçlarıyla paralel ilerler. Öğrencilerimiz yalnızca öğrenmez; gerçek problemler üzerinde çalışarak deneyim kazanır.' }
  ];

  return (
    <main className="bg-white dark:bg-brand-dark min-h-screen relative overflow-hidden">
      <FallingCodeBackground snippets={CODE_SNIPPETS.ABOUT_MAIN} count={20} />

      <header className="relative pt-48 pb-32 z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full gradient-bg opacity-[0.03] -skew-x-12 transform origin-top"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start max-w-4xl">
            <nav className="flex mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span className="hover:text-brand-orange cursor-pointer transition-colors">Ana Sayfa</span>
              <span className="mx-4 text-slate-200 dark:text-slate-800">/</span>
              <span className="text-brand-red">Hakkımızda</span>
            </nav>
            <h1 className="text-6xl lg:text-8xl font-black text-brand-black dark:text-white mb-10 tracking-tighter leading-[0.9]">
              Geleceği <br /> <span className="gradient-text">İnşa Ediyoruz</span>
            </h1>
            <div className="w-32 h-3 gradient-bg rounded-full mb-12 shadow-xl shadow-orange-500/20"></div>
            <p className="text-slate-600 dark:text-slate-400 text-2xl leading-relaxed font-medium max-w-3xl">
              Döngü Akademi, yalnızca bir eğitim kurumu değil; teknolojiyi tutku, disiplin ve üretimle birleştiren, <span className="text-brand-orange font-black">Trabzon’dan dünyaya uzanan bir yetenek ekosistemidir.</span>
            </p>
          </div>
        </div>
      </header>

      <section className="py-32 bg-slate-50/50 dark:bg-brand-darkCard/30 relative z-10 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 gradient-bg rounded-full opacity-[0.05] blur-3xl animate-blob"></div>
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl group border-[12px] border-white dark:border-white/5">
                <img src="https://images.unsplash.com/photo-1770807188136-6c90c0859f66?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Döngü Akademi" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-brand-darkCard p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5">
                <div className="flex flex-col text-center">
                  <span className="text-4xl font-black text-brand-orange tracking-tighter">10+</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Yıllık Tecrübe</span>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <span className="inline-block px-5 py-2 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Vizyoner Yaklaşım</span>
              <h2 className="text-5xl font-black text-brand-black dark:text-white tracking-tight leading-tight"> <span className="gradient-text">Teknoloji Eğitiminde</span> <br />Standartları Yeniden Tanımlıyoruz</h2>
              <div className="space-y-8 text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                <p> <span className="gradient-text">Trabzon’da</span> filizlenen vizyonumuz, bugün Türkiye genelinde binlerce öğrenciye dokunan güçlü bir eğitim ekosistemine dönüştü. Eğitim modelimiz, global teknoloji standartlarını yerel ihtiyaçlarla birleştirerek sürdürülebilir gelişimi merkeze alır.</p>
              </div>
              <div className="grid grid-cols-2 gap-10 pt-6">
                <div><h4 className="text-3xl font-black text-brand-black dark:text-white mb-2 tracking-tighter">%94</h4><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">İşe Yerleştirme</p></div>
                <div><h4 className="text-3xl font-black text-brand-black dark:text-white mb-2 tracking-tighter">100+</h4><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Başarılı Mezun</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 bg-white dark:bg-brand-dark relative z-10 overflow-hidden">
        {/* Section Specific Falling Code */}
        <FallingCodeBackground 
          snippets={CODE_SNIPPETS.ABOUT_MANIFESTO} 
          count={25} 
          colorClass="text-brand-orange/20 dark:text-white/10" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Sticky Left Side */}
            <div className="lg:col-span-4 sticky top-32">
               <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">KÜLTÜRÜMÜZ</span>
               <h2 className="text-5xl lg:text-7xl font-black text-brand-black dark:text-white tracking-tighter leading-none mb-10">Dijital Bir <br /> <span className="text-slate-200 dark:text-white/20">Ekosistem.</span></h2>
               <div className="space-y-6 text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
                 <p>Döngü Akademi, teknolojiyi yalnızca öğreten değil; öğrenen, üreten ve paylaşan bir topluluğun Trabzon’daki buluşma noktasıdır.</p>
                 <p className="border-l-4 border-brand-orange pl-6 italic text-slate-400 text-lg">"Teknoloji, merakla başladığında geleceğe dönüşür."</p>
               </div>
            </div>

            {/* Scrollable Right Side - 10 Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
               {manifestos.map((manifesto, i) => (
                 <div key={i} className="p-10 bg-white dark:bg-brand-darkCard rounded-[2.5rem] gradient-border-orange hover:bg-slate-50 dark:hover:bg-white/[0.02] shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-black text-brand-black dark:text-white mb-4 group-hover:text-brand-orange transition-colors">{manifesto.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{manifesto.text}</p>
                    </div>
                    <div className="mt-6 w-8 h-1 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-brand-orange transition-colors"></div>
                 </div>
               ))}
            </div>

          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 bg-slate-50 dark:bg-brand-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-brand-darkCard rounded-[4rem] overflow-hidden shadow-2xl gradient-border-orange dark:border-brand-red/30">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 p-12 lg:p-20 space-y-10 flex flex-col justify-center">
                <div className="space-y-4">
                  <span className="inline-block px-5 py-2 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Konumumuz</span>
                  <h2 className="text-4xl font-black text-brand-black dark:text-white tracking-tighter">Bizi Ziyaret Edin</h2>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl gradient-bg flex-shrink-0 flex items-center justify-center text-white shadow-lg"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                    <div className="space-y-2"><h4 className="text-sm font-black text-brand-black dark:text-white uppercase tracking-widest">ADRES</h4><p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Köstereli İş Merkezi, Gazipaşa, Yavuz Selim Blv. No:96 Kat:2 Ofis:10, 61050 Ortahisar/Trabzon</p></div>
                  </div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Köstereli+İş+Merkezi+Trabzon+Döngü+Akademi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 text-xs font-black text-brand-orange uppercase tracking-widest hover:underline">
                  <span>YOL TARİFİ AL</span><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
              <div className="lg:col-span-7 h-[500px] lg:h-auto min-h-[400px] relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.1838849434942!2d39.72895702099741!3d41.004639178170976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40643d002692a07f%3A0x33995616201c70c1!2zS8O2c3RlcmVsaSDEsMWfIE1lcmtlemk!5e0!3m2!1str!2str!4v1770634979445!5m2!1str!2str" className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Harita"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
