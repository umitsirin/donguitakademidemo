
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CoursesPage from './components/CoursesPage';
import KidsCoursesPage from './components/KidsCoursesPage';
import CourseDetailPage from './components/CourseDetailPage';
import InstructorsPage from './components/InstructorsPage';
import InstructorApplyPage from './components/InstructorApplyPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import AboutPage from './components/AboutPage';
import KvkkPage from './components/KvkkPage';
import PrivacyPage from './components/PrivacyPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import WhatsAppButton from './components/WhatsAppButton';
import FavoritesPage from './components/FavoritesPage';
import HomeCourseCard from './components/HomeCourseCard';
import Announcements from './components/Announcements';
import AnnouncementDetailPage from './components/AnnouncementDetailPage';
import { FallingCodeBackground, GalaxyBackground } from './components/VisualEffects';

import { COURSES, BLOG_POSTS, ANNOUNCEMENTS, CODE_SNIPPETS } from './constants';
import { Course, BlogPost, Announcement } from './types';
import { courseService } from './services/courseService';
import { blogService } from './services/blogService';
import { announcementService } from './services/announcementService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
     const fetchData = async () => {
         try {
            const fetchedCourses = await courseService.getAllCourses();
            if (fetchedCourses.length > 0) setCourses(fetchedCourses);
            
            const fetchedBlogs = await blogService.getAllBlogs();
            if (fetchedBlogs.length > 0) setBlogPosts(fetchedBlogs);

            const fetchedAnnouncements = await announcementService.getAllAnnouncements();
            if (fetchedAnnouncements.length > 0) setAnnouncements(fetchedAnnouncements);

         } catch (e) { console.error(e); }
     };
     fetchData();
  }, []);

  const handleNavigation = (page: string, data?: any) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    if (page === 'course-detail' && data) setSelectedCourse(data);
    if (page === 'blog-detail' && data) setSelectedPost(data);
    if (page === 'announcement-detail' && data) setSelectedAnnouncement(data);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleAddCourse = async (c: Course) => { setIsSyncing(true); await courseService.addCourse(c); setCourses(await courseService.getAllCourses()); setIsSyncing(false); };
  const handleUpdateCourse = async (c: Course) => { setIsSyncing(true); await courseService.updateCourse(c); setCourses(await courseService.getAllCourses()); setIsSyncing(false); };
  const handleDeleteCourse = async (id: string) => { setIsSyncing(true); await courseService.deleteCourse(id); setCourses(await courseService.getAllCourses()); setIsSyncing(false); };

  const handleAddBlog = async (p: BlogPost) => { setIsSyncing(true); await blogService.addBlog(p); setBlogPosts(await blogService.getAllBlogs()); setIsSyncing(false); };
  const handleUpdateBlog = async (p: BlogPost) => { setIsSyncing(true); await blogService.updateBlog(p); setBlogPosts(await blogService.getAllBlogs()); setIsSyncing(false); };
  const handleDeleteBlog = async (id: string) => { setIsSyncing(true); await blogService.deleteBlog(id); setBlogPosts(await blogService.getAllBlogs()); setIsSyncing(false); };

  const handleAddAnnouncement = async (a: Announcement) => { setIsSyncing(true); await announcementService.addAnnouncement(a); setAnnouncements(await announcementService.getAllAnnouncements()); setIsSyncing(false); };
  const handleUpdateAnnouncement = async (a: Announcement) => { setIsSyncing(true); await announcementService.updateAnnouncement(a); setAnnouncements(await announcementService.getAllAnnouncements()); setIsSyncing(false); };
  const handleDeleteAnnouncement = async (id: string) => { setIsSyncing(true); await announcementService.deleteAnnouncement(id); setAnnouncements(await announcementService.getAllAnnouncements()); setIsSyncing(false); };

  const adultHomeCourses = courses.filter(c => c.targetAudience === 'adult').slice(0, 4);
  const kidsHomeCourses = courses.filter(c => c.targetAudience === 'kids').slice(0, 3);

  const renderPage = () => {
    switch(currentPage) {
        case 'home':
            return (
                <>
                    {/* 1. HERO SECTION */}
                    <Hero onNavigate={handleNavigation} />

                    {/* 2. ANNOUNCEMENTS SECTION (Moved Up) */}
                    <Announcements announcements={announcements} onAnnouncementClick={(a) => handleNavigation('announcement-detail', a)} />

                    {/* 3. PROFESSIONAL DEVELOPMENT SECTION */}
                    <section className="py-32 bg-white dark:bg-brand-dark reveal-on-scroll relative overflow-hidden transition-colors duration-500">
                      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-orange/[0.12] to-transparent pointer-events-none z-0"></div>
                      <FallingCodeBackground count={30} snippets={CODE_SNIPPETS.HOME} />
                      <div className="absolute top-40 right-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full"></div>
                      <div className="absolute left-10 top-20 text-[10rem] font-black text-slate-100 dark:text-white/[0.02] select-none pointer-events-none font-display">01</div>
                      
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                          <div className="max-w-2xl">
                            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">PROFESYONEL GELİŞİM</span>
                            <h2 className="text-5xl lg:text-7xl font-black text-brand-black dark:text-white tracking-[-0.05em] leading-none font-display mb-10">
                              Profesyonel <br/><span className="gradient-text">Gelişim Programları</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                              Uygulamalı eğitimlerle yetkinlik kazan, portföy oluştur, kariyerini güçlendir.
                            </p>
                          </div>
                          <button 
                            onClick={() => handleNavigation('courses')} 
                            className="px-10 py-5 bg-transparent border-2 border-brand-orange text-brand-orange font-black text-[10px] uppercase tracking-widest rounded-3xl hover:bg-brand-orange hover:text-white transition-all shadow-[0_10px_30px_-10px_rgba(241,153,28,0.3)] whitespace-nowrap"
                          >
                            TÜMÜNÜ GÖR
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {adultHomeCourses.map(course => (
                            <HomeCourseCard 
                              key={course.id} 
                              course={course} 
                              onClick={() => handleNavigation('course-detail', course)} 
                            />
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* 4. KIDS ACADEMY SECTION (New with Rocket Theme) */}
                    <section className="py-32 relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0c0c0e]">
                      {/* Rocket Theme Background */}
                      <GalaxyBackground />
                      
                      <div className="absolute left-10 top-20 text-[10rem] font-black text-slate-200 dark:text-white/[0.02] select-none pointer-events-none font-display z-0">02</div>

                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
                          <div className="max-w-2xl">
                            <span className="text-blue-500 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">GELECEĞİN KAŞİFLERİ</span>
                            <h2 className="text-5xl lg:text-7xl font-black text-brand-black dark:text-white tracking-[-0.05em] leading-none font-display mb-10">
                              Genç Kaşifler <br/><span className="text-blue-500 dark:text-blue-400">Programları</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                              Hayal güçlerini kod satırlarına dönüştürüyoruz. Oyunlaştırılmış müfredatımızla algoritmik düşünme becerisi kazandırıyor, geleceğin mühendislerini bugünden yetiştiriyoruz.
                            </p>
                          </div>
                          <button 
                            onClick={() => handleNavigation('kids-courses')} 
                            className="px-10 py-5 bg-transparent border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest rounded-3xl hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-black transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] whitespace-nowrap"
                          >
                            TÜMÜNÜ GÖR
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                          {kidsHomeCourses.map(course => (
                            <HomeCourseCard 
                              key={course.id} 
                              course={course} 
                              onClick={() => handleNavigation('course-detail', course)} 
                            />
                          ))}
                        </div>
                      </div>
                    </section>
                </>
            );
        case 'courses': return <CoursesPage courses={courses} onCourseClick={(c) => handleNavigation('course-detail', c)} />;
        case 'kids-courses': return <KidsCoursesPage courses={courses} onCourseClick={(c) => handleNavigation('course-detail', c)} />;
        case 'course-detail': return selectedCourse ? <CourseDetailPage course={selectedCourse} onBack={() => handleNavigation('home')} /> : null;
        case 'blog': return <BlogPage blogPosts={blogPosts} onPostClick={(p) => handleNavigation('blog-detail', p)} />;
        case 'blog-detail': return selectedPost ? <BlogDetailPage post={selectedPost} onBack={() => handleNavigation('blog')} /> : null;
        case 'announcement-detail': return selectedAnnouncement ? <AnnouncementDetailPage announcement={selectedAnnouncement} onBack={() => handleNavigation('home')} /> : null;
        case 'about': return <AboutPage />;
        case 'instructors': return <InstructorsPage onNavigate={handleNavigation} />;
        case 'instructor-apply': return <InstructorApplyPage onBack={() => handleNavigation('instructors')} />;
        case 'kvkk': return <KvkkPage onBack={() => handleNavigation('home')} />;
        case 'privacy': return <PrivacyPage onBack={() => handleNavigation('home')} />;
        case 'favorites': return <FavoritesPage courses={courses} favorites={favorites} onToggleFavorite={handleToggleFavorite} onCourseClick={(c) => handleNavigation('course-detail', c)} onNavigate={handleNavigation} />;
        case 'login': return <LoginPage onNavigate={(p) => handleNavigation(p)} />;
        case 'register': return <RegisterPage onNavigate={(p) => handleNavigation(p)} />;
        case 'admin-login': return <AdminLoginPage onLogin={() => { setIsAdmin(true); setCurrentPage('admin-panel'); }} onBack={() => handleNavigation('home')} />;
        case 'admin-panel': return isAdmin ? (
            <AdminPanel 
                courses={courses} 
                blogPosts={blogPosts}
                announcements={announcements}
                isSyncing={isSyncing}
                onAddCourse={handleAddCourse}
                onUpdateCourse={handleUpdateCourse}
                onDeleteCourse={handleDeleteCourse}
                onAddBlog={handleAddBlog}
                onUpdateBlog={handleUpdateBlog}
                onDeleteBlog={handleDeleteBlog}
                onAddAnnouncement={handleAddAnnouncement}
                onUpdateAnnouncement={handleUpdateAnnouncement}
                onDeleteAnnouncement={handleDeleteAnnouncement}
                onLogout={() => { setIsAdmin(false); setCurrentPage('home'); }}
            />
        ) : <AdminLoginPage onLogin={() => { setIsAdmin(true); setCurrentPage('admin-panel'); }} onBack={() => handleNavigation('home')} />;
        default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
       {!['admin-login', 'admin-panel', 'login', 'register'].includes(currentPage) && (
          <Navbar onNavigate={handleNavigation} currentPage={currentPage} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
       )}
       
       {renderPage()}
       
       {!['admin-login', 'admin-panel', 'login', 'register'].includes(currentPage) && (
         <>
           <Footer onNavigate={handleNavigation} onAdminGateClick={() => handleNavigation('admin-login')} />
           <WhatsAppButton />
         </>
       )}
    </div>
  );
};

export default App;
