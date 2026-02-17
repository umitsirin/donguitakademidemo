
import React, { useState, useMemo, useEffect } from 'react';
import { Course, CurriculumItem, BlogPost, Announcement } from '../types';
import { instructorService, InstructorApplication } from '../services/instructorService';
import { consultationService, ConsultationRequest } from '../services/consultationService';
import CourseCard from './CourseCard';
import AdultCourseDetail from './AdultCourseDetail';
import KidsCourseDetail from './KidsCourseDetail';
import BlogDetailPage from './BlogDetailPage';
import AnnouncementDetailPage from './AnnouncementDetailPage';

interface AdminPanelProps {
  courses: Course[];
  blogPosts: BlogPost[];
  announcements: Announcement[];
  isSyncing: boolean;
  onAddCourse: (course: Course) => Promise<void>;
  onUpdateCourse: (course: Course) => Promise<void>;
  onDeleteCourse: (id: string) => Promise<void>;
  onAddBlog: (post: BlogPost) => Promise<void>;
  onUpdateBlog: (post: BlogPost) => Promise<void>;
  onDeleteBlog: (id: string) => Promise<void>;
  onAddAnnouncement: (announcement: Announcement) => Promise<void>;
  onUpdateAnnouncement: (announcement: Announcement) => Promise<void>;
  onDeleteAnnouncement: (id: string) => Promise<void>;
  onLogout: () => void;
}

type Section = 'overview' | 'courses' | 'blogs' | 'applications' | 'consultations' | 'announcements';
type View = 'list' | 'add';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  courses, 
  blogPosts,
  announcements,
  isSyncing, 
  onAddCourse, 
  onUpdateCourse, 
  onDeleteCourse, 
  onAddBlog, 
  onUpdateBlog, 
  onDeleteBlog,
  onAddAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  onLogout 
}) => {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [view, setView] = useState<View>('list');
  const [targetAudience, setTargetAudience] = useState<'adult' | 'kids'>('adult');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'card' | 'page'>('page');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  // Applications & Consultations State
  const [applications, setApplications] = useState<InstructorApplication[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([{ title: '', description: '' }]);
  const [courseFormData, setCourseFormData] = useState({
    title: '', category: 'Yazılım', description: '', duration: '12 Hafta',
    level: 'Başlangıç' as any, price: '₺0.00', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    ageGroup: '9-12' as any, programType: '9-month' as any, techStack: '', careerPath: ''
  });

  const [blogFormData, setBlogFormData] = useState({
    title: '', excerpt: '', content: '', date: '', author: 'Yönetici', category: 'Teknoloji',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    readTime: '5 Dakika'
  });

  const [announcementFormData, setAnnouncementFormData] = useState({
    title: '', date: '', type: 'Duyuru' as any, description: '', content: '',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
  });

  // Verileri Admin Panel yüklendiğinde çek (Genel Bakış sayıları için)
  useEffect(() => {
    const initData = async () => {
      setLoadingList(true);
      try {
        const appsData = await instructorService.getAllApplications().catch(() => []);
        const consultsData = await consultationService.getAllRequests().catch(() => []);
        setApplications(appsData);
        setConsultations(consultsData);
      } catch (error) {
        console.error("Init data error:", error);
      } finally {
        setLoadingList(false);
      }
    };
    initData();
  }, []);

  const handleAppStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await instructorService.updateApplicationStatus(id, status);
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    } catch (error) {
      setErrorMessage("Durum güncellenemedi.");
    }
  };

  const handleAppDelete = async (id: string) => {
    if (!window.confirm("Bu başvuruyu kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      await instructorService.deleteApplication(id);
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (error: any) {
      alert(`Silme başarısız: ${error.message}`);
    }
  };

  const handleConsultationStatusChange = async (id: string, status: 'contacted' | 'archived') => {
    try {
      await consultationService.updateStatus(id, status);
      setConsultations(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    } catch (error) {
      setErrorMessage("Durum güncellenemedi.");
    }
  };

  useEffect(() => {
    setImageError(false);
  }, [courseFormData.image, blogFormData.image, announcementFormData.image]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const previewCourseData = useMemo((): Course => ({
    id: editingId || 'onizleme-id',
    title: courseFormData.title || 'Yeni Eğitim Başlığı',
    category: courseFormData.category,
    description: courseFormData.description || 'Eğitim detaylı açıklaması buraya gelecek.',
    duration: courseFormData.duration,
    level: courseFormData.level,
    price: courseFormData.price,
    image: courseFormData.image,
    rating: 5.0,
    studentsCount: 0,
    targetAudience,
    ageGroup: targetAudience === 'kids' ? courseFormData.ageGroup : undefined,
    programType: targetAudience === 'kids' ? courseFormData.programType : undefined,
    curriculum: curriculum.filter(item => item.title.trim()),
    techStack: targetAudience === 'adult' ? courseFormData.techStack.split(',').map(s => s.trim()).filter(s => s) : undefined,
    careerPath: targetAudience === 'adult' ? courseFormData.careerPath.split(',').map(s => s.trim()).filter(s => s) : undefined,
  }), [courseFormData, targetAudience, curriculum, editingId]);

  const previewBlogData = useMemo((): BlogPost => ({
    id: editingId || 'onizleme-blog-id',
    ...blogFormData,
    date: blogFormData.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  }), [blogFormData, editingId]);

  const previewAnnouncementData = useMemo((): Announcement => ({
    id: editingId || 'onizleme-duyuru-id',
    ...announcementFormData,
    date: announcementFormData.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  }), [announcementFormData, editingId]);

  const handleEditCourse = (course: Course) => {
    setEditingId(course.id);
    setTargetAudience(course.targetAudience);
    setCurriculum(course.curriculum && course.curriculum.length > 0 ? course.curriculum : [{ title: '', description: '' }]);
    setCourseFormData({
      title: course.title, category: course.category, description: course.description,
      duration: course.duration, level: course.level, price: course.price, image: course.image,
      ageGroup: course.ageGroup || '9-12', programType: course.programType || '9-month',
      techStack: course.techStack?.join(', ') || '', careerPath: course.careerPath?.join(', ') || ''
    });
    setView('add');
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingId(post.id);
    setBlogFormData({
      title: post.title, excerpt: post.excerpt, content: post.content,
      date: post.date, author: post.author, category: post.category,
      image: post.image, readTime: post.readTime
    });
    setView('add');
  };

  const handleEditAnnouncement = (item: Announcement) => {
    setEditingId(item.id);
    setAnnouncementFormData({
      title: item.title, date: item.date, type: item.type,
      description: item.description, content: item.content || '',
      image: item.image || ''
    });
    setView('add');
  };

  const resetForms = () => {
    setEditingId(null);
    setErrorMessage(null);
    setImageError(false);
    setCourseFormData({
      title: '', category: 'Yazılım', description: '', duration: '12 Hafta',
      level: 'Başlangıç', price: '₺0.00', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      ageGroup: '9-12', programType: '9-month', techStack: '', careerPath: ''
    });
    setBlogFormData({
      title: '', excerpt: '', content: '', date: '', author: 'Yönetici', category: 'Teknoloji',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', readTime: '5 Dakika'
    });
    setAnnouncementFormData({
      title: '', date: '', type: 'Duyuru', description: '', content: '',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
    });
    setCurriculum([{ title: '', description: '' }]);
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalCourse = { ...previewCourseData, id: editingId || Date.now().toString() };
      if (editingId) await onUpdateCourse(finalCourse);
      else await onAddCourse(finalCourse);
      resetForms();
      setView('list');
    } catch (err: any) {
      setErrorMessage(err.message || 'Bir hata oluştu.');
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalBlog = { ...previewBlogData, id: editingId || Date.now().toString() };
      if (editingId) await onUpdateBlog(finalBlog);
      else await onAddBlog(finalBlog);
      resetForms();
      setView('list');
    } catch (err: any) {
      setErrorMessage(err.message || 'Bir hata oluştu.');
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalAnnouncement = { ...previewAnnouncementData, id: editingId || Date.now().toString() };
      if (editingId) await onUpdateAnnouncement(finalAnnouncement);
      else await onAddAnnouncement(finalAnnouncement);
      resetForms();
      setView('list');
    } catch (err: any) {
      setErrorMessage(err.message || 'Bir hata oluştu.');
    }
  };

  const handleCurriculumChange = (index: number, field: keyof CurriculumItem, value: string) => {
    const updated = [...curriculum];
    updated[index] = { ...updated[index], [field]: value };
    setCurriculum(updated);
  };

  const addCurriculumItem = () => {
    let nextTitle = '';
    // Otomatik başlık önerisi (1. Ay, 2. Ay... veya Modül 1, Modül 2...)
    if (targetAudience === 'kids') {
        const nextIndex = curriculum.length + 1;
        if (courseFormData.programType === '9-month') {
            nextTitle = `${nextIndex}. Ay: `;
        } else {
            nextTitle = `Modül ${nextIndex}: `;
        }
    }
    setCurriculum([...curriculum, { title: nextTitle, description: '' }]);
  };

  const removeCurriculumItem = (index: number) => {
    const updated = curriculum.filter((_, i) => i !== index);
    setCurriculum(updated);
  };

  const isDirectLink = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null || url.includes('i.hizliresim') || url.includes('images.unsplash');
  };

  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;
  const pendingConsultsCount = consultations.filter(c => c.status === 'pending').length;

  return (
    <div className="bg-[#fcfcfd] dark:bg-brand-dark min-h-screen flex selection:bg-[#ea5438]/20 relative">
      {errorMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[110] bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 animate-in slide-in-from-top duration-300">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest">Hata</span>
            <span className="text-sm font-bold">{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="ml-4 opacity-50 hover:opacity-100">✕</button>
        </div>
      )}

      {isSyncing && (
        <div className="fixed inset-0 z-[100] bg-white/40 dark:bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-wait">
          <div className="bg-brand-black text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center space-x-4 animate-in zoom-in duration-300">
            <div className="w-4 h-4 border-2 border-white/20 border-t-[#ea5438] rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Senkronize Ediliyor...</span>
          </div>
        </div>
      )}

      <aside className="w-72 bg-brand-black text-white p-8 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center font-black shadow-lg">D</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase gradient-text">Döngü Akademi</span>
            <span className="text-xs font-bold text-white/40 tracking-tight">Merkezi Yönetim</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => { setActiveSection('overview'); setView('list'); resetForms(); }} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeSection === 'overview' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-16zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-16z" /></svg>
            <span className="text-[9px] font-black uppercase tracking-widest">Genel Bakış</span>
          </button>
          
          <div className="pt-8 pb-2 px-6 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">İçerik Yönetimi</div>
          
          <button onClick={() => { setActiveSection('courses'); setView('list'); resetForms(); }} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeSection === 'courses' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-[9px] font-black uppercase tracking-widest">Eğitimler</span>
          </button>

          <button onClick={() => { setActiveSection('blogs'); setView('list'); resetForms(); }} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeSection === 'blogs' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v4h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12h10M7 16h10" /></svg>
            <span className="text-[9px] font-black uppercase tracking-widest">Yazılar</span>
          </button>

          <button onClick={() => { setActiveSection('announcements'); setView('list'); resetForms(); }} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeSection === 'announcements' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            <span className="text-[9px] font-black uppercase tracking-widest">Duyurular</span>
          </button>

          <div className="pt-8 pb-2 px-6 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Gelen Kutusu</div>

          <button onClick={() => { setActiveSection('applications'); setView('list'); resetForms(); }} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${activeSection === 'applications' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center space-x-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span className="text-[9px] font-black uppercase tracking-widest">Başvurular</span>
            </div>
            {pendingAppsCount > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
          </button>

          <button onClick={() => { setActiveSection('consultations'); setView('list'); resetForms(); }} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${activeSection === 'consultations' ? 'bg-white/10 text-[#ea5538]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center space-x-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span className="text-[9px] font-black uppercase tracking-widest">Danışmanlık</span>
            </div>
            {pendingConsultsCount > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
          </button>
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center space-x-4 px-6 py-4 text-white/20 hover:text-brand-red transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span className="text-[9px] font-black uppercase tracking-widest">Güvenli Çıkış</span>
        </button>
      </aside>

      <main className="ml-72 flex-grow min-h-screen bg-[#fcfcfd] dark:bg-brand-dark transition-colors duration-300">
        {view === 'list' ? (
          <div className="p-12 lg:p-20 space-y-12 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
               <div>
                  <h1 className="text-4xl font-black text-brand-black dark:text-white tracking-tighter">
                    {activeSection === 'overview' && 'Sistem Özeti'}
                    {activeSection === 'courses' && 'Eğitim Kataloğu'}
                    {activeSection === 'blogs' && 'Blog Yönetimi'}
                    {activeSection === 'announcements' && 'Duyuru Yönetimi'}
                    {activeSection === 'applications' && 'Eğitmen Başvuruları'}
                    {activeSection === 'consultations' && 'Danışmanlık Talepleri'}
                  </h1>
                  <p className="text-slate-400 dark:text-slate-500 font-medium mt-1">Bulut üzerinden içerik senkronizasyonu aktif.</p>
               </div>
               {activeSection !== 'overview' && activeSection !== 'applications' && activeSection !== 'consultations' && (
                 <button 
                  onClick={() => { setView('add'); resetForms(); }}
                  className="px-10 py-5 gradient-bg text-white font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-xl shadow-orange-100 dark:shadow-none transition-all hover:scale-105"
                 >
                   + YENİ {activeSection === 'courses' ? 'EĞİTİM' : activeSection === 'blogs' ? 'BLOG' : 'DUYURU'} EKLE
                 </button>
               )}
            </header>

            {activeSection === 'overview' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Yayındaki Eğitimler', val: courses.length, color: 'text-[#ea5538]', bg: 'bg-orange-50/50 dark:bg-brand-darkCard dark:border-brand-red/20' },
                    { label: 'Aktif Blog Yazıları', val: blogPosts.length, color: 'text-brand-black dark:text-white', bg: 'bg-slate-50 dark:bg-brand-darkCard dark:border-brand-red/20' },
                    { label: 'Aktif Duyurular', val: announcements.length, color: 'text-brand-orange', bg: 'bg-white dark:bg-brand-darkCard border border-brand-orange/20' },
                    { 
                      label: 'Bekleyen Başvurular', 
                      val: pendingAppsCount, 
                      color: 'text-blue-600 dark:text-blue-400', 
                      bg: 'bg-blue-50/50 dark:bg-brand-darkCard dark:border-brand-red/20',
                      alert: pendingAppsCount > 0 
                    },
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-10 rounded-[3rem] border border-slate-100 dark:border-brand-red/20 shadow-sm relative group`}>
                        {stat.alert && (
                          <div className="absolute top-6 right-6 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-md"></span>
                          </div>
                        )}
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4 block">{stat.label}</span>
                        <span className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.val}</span>
                    </div>
                  ))}
               </div>
            )}

            {(activeSection === 'courses' || activeSection === 'blogs' || activeSection === 'announcements') && (
              <div className="bg-white dark:bg-brand-darkCard rounded-[4rem] p-12 border border-slate-100 dark:border-brand-red/20 shadow-sm">
                 <div className="space-y-4">
                    {(activeSection === 'courses' ? courses : activeSection === 'blogs' ? blogPosts : announcements).map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 rounded-[2.5rem] transition-all border border-transparent hover:border-slate-100 dark:hover:border-brand-red/20 group">
                         <div className="flex items-center space-x-6">
                            <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                            <div>
                               <p className="text-lg font-black text-brand-black dark:text-white">{item.title}</p>
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                                 {activeSection === 'courses' 
                                    ? `${item.category} • ${item.duration}` 
                                    : activeSection === 'blogs' 
                                      ? `${item.category} • ${item.date}`
                                      : `${item.type} • ${item.date}`}
                               </span>
                            </div>
                         </div>
                         <div className="flex space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if(activeSection === 'courses') handleEditCourse(item);
                                else if(activeSection === 'blogs') handleEditBlog(item);
                                else handleEditAnnouncement(item);
                              }} 
                              className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all"
                            >
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if(activeSection === 'courses') onDeleteCourse(item.id);
                                else if(activeSection === 'blogs') onDeleteBlog(item.id);
                                else onDeleteAnnouncement(item.id);
                              }} 
                              className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            >
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeSection === 'applications' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {applications.map((app) => (
                    <div key={app.id} className="relative bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-white/5 flex flex-col h-full">
                      {/* Existing Application Card Content */}
                      <div className={`absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full ${app.status === 'pending' ? 'bg-yellow-400' : app.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div className="pl-6 mb-6 flex justify-between items-start">
                         <div>
                            <h3 className="text-2xl font-black text-brand-black dark:text-white leading-tight tracking-tight">{app.full_name}</h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                              {new Date(app.created_at || '').toLocaleDateString('tr-TR')}
                            </span>
                         </div>
                         <div className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : app.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {app.status === 'pending' ? 'BEKLİYOR' : app.status === 'approved' ? 'ONAYLANDI' : 'REDDEDİLDİ'}
                         </div>
                      </div>
                      <button onClick={() => app.id && handleAppDelete(app.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 bg-white dark:bg-black/20 rounded-full p-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      <div className="pl-6 flex-grow space-y-6">
                         <div className="space-y-3 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                            <div className="flex items-center space-x-3 text-sm font-medium text-slate-600 dark:text-slate-300"><span className="text-brand-orange">✉️</span> <a href={`mailto:${app.email}`}>{app.email}</a></div>
                            <div className="flex items-center space-x-3 text-sm font-medium text-slate-600 dark:text-slate-300"><span className="text-brand-orange">📞</span> <a href={`tel:${app.phone}`}>{app.phone}</a></div>
                         </div>
                         <div><span className="inline-block px-4 py-2 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-widest rounded-xl">{app.expertise}</span></div>
                         <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic border border-slate-100 dark:border-white/5"><p>"{app.bio}"</p></div>
                      </div>
                      {app.status === 'pending' && (
                         <div className="pl-6 pt-6 mt-auto grid grid-cols-2 gap-4">
                            <button onClick={() => app.id && handleAppStatusChange(app.id, 'approved')} className="py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">ONAYLA</button>
                            <button onClick={() => app.id && handleAppStatusChange(app.id, 'rejected')} className="py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">REDDET</button>
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'consultations' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {consultations.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-brand-darkCard p-6 rounded-[2rem] shadow-lg border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'pending' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'}`}>{item.status === 'pending' ? 'YENİ' : 'ARŞİV'}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{new Date(item.created_at || '').toLocaleDateString('tr-TR')}</span>
                        </div>
                        <h3 className="text-xl font-black text-brand-black dark:text-white mb-2">{item.full_name}</h3>
                        <a href={`tel:${item.phone}`} className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-brand-orange">{item.phone}</a>
                      </div>
                      {item.status === 'pending' && (
                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex space-x-2">
                          <button onClick={() => item.id && handleConsultationStatusChange(item.id, 'contacted')} className="flex-1 py-2 bg-green-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">ARANDI</button>
                          <button onClick={() => item.id && handleConsultationStatusChange(item.id, 'archived')} className="flex-1 py-2 bg-slate-200 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest">ARŞİVLE</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-screen overflow-hidden animate-in slide-in-from-right duration-500">
             <div className="w-[450px] lg:w-[600px] h-full overflow-y-auto bg-white dark:bg-brand-darkCard border-r border-slate-100 dark:border-brand-red/20 p-12 lg:p-16 no-scrollbar shadow-2xl">
                <button onClick={() => { setView('list'); resetForms(); }} className="text-slate-400 dark:text-slate-600 font-black text-[9px] uppercase tracking-widest mb-8 hover:text-brand-black dark:hover:text-white transition-colors flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                  <span>Geri Dön</span>
                </button>
                <h2 className="text-4xl font-black text-brand-black dark:text-white tracking-tighter mb-4">
                  {editingId ? 'İçeriği Güncelle' : (activeSection === 'courses' ? 'Eğitim Tasarla' : activeSection === 'blogs' ? 'Yazı Oluştur' : 'Duyuru Ekle')}
                </h2>
                
                {activeSection === 'courses' && (
                  <form onSubmit={handleCourseSubmit} className="space-y-10 pb-32">
                     <div className="space-y-4">
                        <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl w-full border border-slate-200 dark:border-brand-red/30">
                            <button type="button" onClick={() => setTargetAudience('adult')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${targetAudience === 'adult' ? 'bg-white dark:bg-brand-dark text-brand-black dark:text-white shadow-sm' : 'text-slate-400'}`}>Yetişkin</button>
                            <button type="button" onClick={() => setTargetAudience('kids')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${targetAudience === 'kids' ? 'bg-white dark:bg-brand-dark text-[#ea5538] shadow-sm' : 'text-slate-400'}`}>Çocuk</button>
                        </div>

                        {/* Çocuk Eğitimi İçin Özel Program Türü Seçimi */}
                        {targetAudience === 'kids' && (
                          <div className="flex p-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl w-full border border-blue-100 dark:border-blue-500/20">
                             <button 
                                type="button" 
                                onClick={() => setCourseFormData({...courseFormData, programType: '9-month', category: 'Akademik Program', price: '₺1.200 / Ay'})} 
                                className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${courseFormData.programType === '9-month' ? 'bg-white dark:bg-blue-500 text-blue-600 dark:text-white shadow-sm' : 'text-blue-400 dark:text-blue-300'}`}
                             >
                               Akademik (9 Ay)
                             </button>
                             <button 
                                type="button" 
                                onClick={() => setCourseFormData({...courseFormData, programType: 'modular', category: 'Robotik', price: '₺4.500'})} 
                                className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${courseFormData.programType === 'modular' ? 'bg-white dark:bg-blue-500 text-blue-600 dark:text-white shadow-sm' : 'text-blue-400 dark:text-blue-300'}`}
                             >
                               Modüler (Atölye)
                             </button>
                          </div>
                        )}
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Başlık</label><input required value={courseFormData.title} onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})} className="input-premium" /></div>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Kategori</label>
                              <select 
                                value={courseFormData.category} 
                                onChange={(e) => setCourseFormData({...courseFormData, category: e.target.value})} 
                                className="input-premium"
                              >
                                {targetAudience === 'kids' ? (
                                   courseFormData.programType === '9-month' ? (
                                      <option value="Akademik Program">Akademik Program</option>
                                   ) : (
                                      <>
                                        <option value="Robotik">Robotik</option>
                                        <option value="Kodlama">Kodlama</option>
                                        <option value="Oyun Tasarımı">Oyun Tasarımı</option>
                                        <option value="3D Tasarım">3D Tasarım</option>
                                        <option value="Maker">Maker</option>
                                      </>
                                   )
                                ) : (
                                  <>
                                    <option value="Yazılım">Yazılım</option>
                                    <option value="Veri & Yapay Zeka">Veri & Yapay Zeka</option>
                                    <option value="Siber Güvenlik">Siber Güvenlik</option>
                                    <option value="Mobil">Mobil</option>
                                    <option value="Tasarım & Oyun Geliştirme">Tasarım & Oyun Geliştirme</option>
                                  </>
                                )}
                              </select>
                           </div>
                           <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Ücret</label><input placeholder={courseFormData.programType === '9-month' && targetAudience === 'kids' ? "₺1.200 / Ay" : "₺4.500"} value={courseFormData.price} onChange={(e) => setCourseFormData({...courseFormData, price: e.target.value})} className="input-premium" /></div>
                        </div>

                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Süre</label><input placeholder={courseFormData.programType === '9-month' && targetAudience === 'kids' ? "9 Ay" : "12 Hafta"} value={courseFormData.duration} onChange={(e) => setCourseFormData({...courseFormData, duration: e.target.value})} className="input-premium" /></div>
                        
                        {targetAudience === 'kids' && (
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Yaş Grubu</label>
                              <select value={courseFormData.ageGroup} onChange={(e) => setCourseFormData({...courseFormData, ageGroup: e.target.value as any})} className="input-premium">
                                 <option value="7-8">7-8 Yaş</option>
                                 <option value="9-12">9-12 Yaş</option>
                                 <option value="13-15">13-15 Yaş</option>
                                 <option value="15-17">15-17 Yaş</option>
                              </select>
                           </div>
                        )}

                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Açıklama</label><textarea required value={courseFormData.description} onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})} rows={4} className="input-premium" /></div>
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Görsel URL</label><input value={courseFormData.image} onChange={(e) => setCourseFormData({...courseFormData, image: e.target.value})} className="input-premium font-mono text-xs" /></div>
                        
                        {/* Dynamic Curriculum Section */}
                        <div className="pt-8 border-t border-slate-100 dark:border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">
                                    {targetAudience === 'kids' && courseFormData.programType === '9-month' 
                                        ? 'AYLIK MÜFREDAT PLANLAMASI' 
                                        : 'MODÜLER İÇERİK YAPISI'}
                                </label>
                                <button 
                                    type="button" 
                                    onClick={addCurriculumItem}
                                    className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white hover:bg-brand-orange px-4 py-2 rounded-lg transition-all"
                                >
                                    + YENİ BÖLÜM EKLE
                                </button>
                            </div>

                            <div className="space-y-4">
                                {curriculum.map((item, index) => (
                                    <div key={index} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 relative group">
                                        <button 
                                            type="button" 
                                            onClick={() => removeCurriculumItem(index)}
                                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                                            title="Bu bölümü sil"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bölüm Başlığı</label>
                                                <input 
                                                    value={item.title} 
                                                    placeholder={targetAudience === 'kids' && courseFormData.programType === '9-month' ? `${index + 1}. Ay: Konu Başlığı` : `Modül ${index + 1}: Konu Başlığı`}
                                                    onChange={(e) => handleCurriculumChange(index, 'title', e.target.value)} 
                                                    className="input-premium bg-white dark:bg-black/20" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">İçerik Detayı</label>
                                                <textarea 
                                                    value={item.description} 
                                                    placeholder="Bu bölümde neler öğrenilecek?"
                                                    onChange={(e) => handleCurriculumChange(index, 'description', e.target.value)} 
                                                    rows={2} 
                                                    className="input-premium bg-white dark:bg-black/20" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>
                     <button type="submit" className="w-full py-6 gradient-bg text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] shadow-2xl dark:shadow-none transition-all transform hover:-translate-y-1">{editingId ? 'GÜNCELLE' : 'YAYINLA'}</button>
                  </form>
                )}

                {activeSection === 'blogs' && (
                  <form onSubmit={handleBlogSubmit} className="space-y-10 pb-32">
                     <div className="space-y-8">
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Başlık</label><input required value={blogFormData.title} onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})} className="input-premium" /></div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Kategori</label><select value={blogFormData.category} onChange={(e) => setBlogFormData({...blogFormData, category: e.target.value})} className="input-premium"><option>Teknoloji</option><option>Rehber</option><option>Yapay Zeka</option></select></div>
                           <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Okuma Süresi</label><input value={blogFormData.readTime} onChange={(e) => setBlogFormData({...blogFormData, readTime: e.target.value})} className="input-premium" /></div>
                        </div>
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Özet</label><textarea value={blogFormData.excerpt} onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})} rows={3} className="input-premium" /></div>
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">İçerik</label><textarea required value={blogFormData.content} onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})} rows={12} className="input-premium" /></div>
                        <div className="space-y-3"><label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Görsel URL</label><input value={blogFormData.image} onChange={(e) => setBlogFormData({...blogFormData, image: e.target.value})} className="input-premium font-mono text-xs" /></div>
                     </div>
                     <button type="submit" className="w-full py-6 gradient-bg text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] shadow-2xl dark:shadow-none transition-all transform hover:-translate-y-1">{editingId ? 'GÜNCELLE' : 'PAYLAŞ'}</button>
                  </form>
                )}

                {activeSection === 'announcements' && (
                  <form onSubmit={handleAnnouncementSubmit} className="space-y-10 pb-32">
                     <div className="space-y-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Duyuru Başlığı</label>
                           <input required value={announcementFormData.title} onChange={(e) => setAnnouncementFormData({...announcementFormData, title: e.target.value})} className="input-premium" placeholder="Örn: Yeni Dönem Kayıtları" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Tür</label>
                              <select value={announcementFormData.type} onChange={(e) => setAnnouncementFormData({...announcementFormData, type: e.target.value as any})} className="input-premium">
                                 <option value="Duyuru">Duyuru</option>
                                 <option value="Etkinlik">Etkinlik</option>
                                 <option value="Kampanya">Kampanya</option>
                                 <option value="Haber">Haber</option>
                              </select>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Tarih</label>
                              <input 
                                placeholder="25 Ekim 2024"
                                value={announcementFormData.date} 
                                onChange={(e) => setAnnouncementFormData({...announcementFormData, date: e.target.value})} 
                                className="input-premium" 
                              />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Kısa Açıklama (Liste Görünümü)</label>
                           <textarea required value={announcementFormData.description} onChange={(e) => setAnnouncementFormData({...announcementFormData, description: e.target.value})} rows={3} className="input-premium" placeholder="Kart üzerinde görünecek kısa metin..." />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Detaylı İçerik (Sayfa Görünümü)</label>
                           <textarea value={announcementFormData.content} onChange={(e) => setAnnouncementFormData({...announcementFormData, content: e.target.value})} rows={10} className="input-premium" placeholder="Duyurunun tüm detaylarını buraya yazın..." />
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600">Görsel URL</label>
                           <input 
                             value={announcementFormData.image} 
                             onChange={(e) => setAnnouncementFormData({...announcementFormData, image: e.target.value})} 
                             className={`input-premium font-mono text-xs ${announcementFormData.image && !isDirectLink(announcementFormData.image) ? 'border-red-400' : ''}`} 
                           />
                           {announcementFormData.image && !isDirectLink(announcementFormData.image) && (
                             <p className="text-[9px] font-bold text-red-500 mt-2">Hatalı Format: Resim dosyası linki giriniz.</p>
                           )}
                        </div>
                     </div>

                     <button type="submit" className="w-full py-6 gradient-bg text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] shadow-2xl dark:shadow-none transition-all transform hover:-translate-y-1">
                        {editingId ? 'GÜNCELLE' : 'YAYINLA'}
                     </button>
                  </form>
                )}
             </div>

             <div className="flex-grow bg-[#0c0c0e] overflow-y-auto no-scrollbar p-12 lg:p-24">
                <div className="sticky top-0 z-30 mb-12 flex justify-center">
                   <div className="bg-white/10 backdrop-blur-3xl border border-white/5 p-1.5 rounded-full flex shadow-2xl">
                      <button onClick={() => setPreviewMode('page')} className={`px-10 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${previewMode === 'page' ? 'bg-white text-brand-black' : 'text-white/40 hover:text-white'}`}>Tam Sayfa</button>
                      {activeSection === 'courses' && (
                        <button onClick={() => setPreviewMode('card')} className={`px-10 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${previewMode === 'card' ? 'bg-white text-brand-black' : 'text-white/40 hover:text-white'}`}>Kart Görünümü</button>
                      )}
                   </div>
                </div>

                <div className="w-full max-w-4xl mx-auto bg-white dark:bg-brand-dark rounded-[4rem] overflow-hidden shadow-2xl border border-transparent dark:border-brand-red/30 relative">
                    {activeSection === 'courses' ? (
                       previewMode === 'card' ? <div className="p-10 max-w-sm mx-auto"><CourseCard course={previewCourseData} onImageError={() => setImageError(true)} /></div> :
                       targetAudience === 'kids' ? <KidsCourseDetail course={previewCourseData} onBack={() => {}} /> : <AdultCourseDetail course={previewCourseData} onBack={() => {}} />
                    ) : activeSection === 'blogs' ? (
                       <BlogDetailPage post={previewBlogData} onBack={() => {}} />
                    ) : activeSection === 'announcements' ? (
                       <AnnouncementDetailPage announcement={previewAnnouncementData} onBack={() => {}} />
                    ) : (
                       <div className="p-20 text-center">
                          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                             <svg className="w-10 h-10 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          </div>
                          <h3 className="text-2xl font-black text-white mb-2">Detay Görünümü</h3>
                          <p className="text-slate-400">Soldaki listeden bir öğe seçerek detayları burada görüntüleyebilirsiniz.</p>
                       </div>
                    )}
                </div>
                <div className="h-40 w-full"></div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
