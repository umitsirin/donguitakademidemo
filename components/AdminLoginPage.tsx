
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AdminLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin, onBack }) => {
  const [key, setKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dbStatus, setDbStatus] = useState<string>('');

  // İzin verilen Hash'ler listesi (Hem noktalı hem noktasız versiyonu kabul eder)
  const VALID_HASHES = [
    '889a31f55a53530669250005232a514603337966955074258f44771775645352', 
    '6f9ef68b4740281df889c0eede876ab650a0dfb9460178353145c2efd60dc92b'
  ];

  // Hashleme fonksiyonu
  const hashPassword = async (password: string) => {
    // Doğrudan Hash girişi kontrolü (Kurtarma senaryosu)
    if (password.length === 64 && /^[0-9a-f]+$/i.test(password)) {
      return password.toLowerCase(); 
    }

    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess) return;

    setIsLoading(true);
    setDbStatus('Doğrulanıyor...');
    
    try {
      const cleanKey = key.trim();
      const inputHash = await hashPassword(cleanKey);
      
      console.log("Girilen:", cleanKey);
      // console.log("Hesaplanan Hash:", inputHash); // Güvenlik için logu kapattık

      let isAuthenticated = false;

      // 1. Yöntem: Local Hash Listesi Kontrolü (Hızlı Erişim)
      if (inputHash && VALID_HASHES.includes(inputHash)) {
          isAuthenticated = true;
          setDbStatus('Erişim izni verildi.');
      }

      // 2. Yöntem: Veritabanı Kontrolü (Yedek)
      if (!isAuthenticated && inputHash) {
        try {
          const { data, error: dbError } = await supabase
              .from('admin_access')
              .select('access_hash')
              .eq('access_hash', inputHash);

          if (!dbError && data && data.length > 0) {
              isAuthenticated = true;
              setDbStatus('Veritabanı onayı.');
          }
        } catch (err) {
          console.warn("Veritabanı bağlantı uyarısı:", err);
        }
      }

      if (isAuthenticated) {
        setIsSuccess(true);
        setDbStatus('Giriş başarılı! Yönlendiriliyorsunuz...');
        setTimeout(() => onLogin(), 1000);
      } else {
        setDbStatus('Şifre eşleşmedi.');
        throw new Error('Hatalı şifre');
      }

    } catch (err) {
      console.error(err);
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-2xl transition-all duration-500 ${isSuccess ? 'bg-green-500 scale-110 rotate-12' : 'gradient-bg'}`}>
             {isSuccess ? (
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             ) : 'D'}
           </div>
           <h1 className="text-2xl font-black text-white tracking-tight">Yönetim Paneli</h1>
           <p className="text-slate-500 text-sm mt-2 font-medium">Lütfen giriş anahtarını girin.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input 
              type={showPassword ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={isSuccess}
              placeholder="Anahtar"
              className={`w-full px-8 py-5 bg-white/5 border-2 rounded-2xl text-white font-mono outline-none transition-all text-center tracking-[0.2em] pr-12
                ${error ? 'border-red-500' : isSuccess ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-white/10 group-focus-within:border-brand-orange'}
              `}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" 
                strokeLinejoin="round"
                 strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"><path strokeLinecap="round" strokeLinejoin="round" 
                 strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </path>
                 </svg>
              )}
            </button>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full py-5 font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl transform active:scale-95 transition-all disabled:opacity-80 disabled:cursor-not-allowed
              ${isSuccess ? 'bg-green-500 text-white shadow-green-900/40' : 'gradient-bg text-white shadow-orange-900/40'}
            `}
          >
            {isSuccess ? 'GİRİŞ BAŞARILI' : isLoading ? 'DOĞRULANIYOR...' : 'GİRİŞ YAP'}
          </button>
          
          {dbStatus && (
            <p className={`text-center text-[10px] uppercase tracking-widest animate-pulse ${isSuccess ? 'text-green-500' : error ? 'text-red-500' : 'text-slate-500'}`}>
              {dbStatus}
            </p>
          )}
        </form>

        <button 
          onClick={onBack}
          className="w-full mt-10 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
        >
          ← SİTEYE GERİ DÖN
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
