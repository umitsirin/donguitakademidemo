
export interface CurriculumItem {
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: 'Başlangıç' | 'Orta' | 'İleri';
  price: string;
  image: string;
  rating: number;
  studentsCount: number;
  targetAudience: 'adult' | 'kids';
  ageGroup?: '7-8' | '9-12' | '13-15' | '15-17';
  programType?: '9-month' | 'modular';
  curriculum?: CurriculumItem[];
  careerPath?: string[];
  techStack?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Instructor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  type: 'Duyuru' | 'Etkinlik' | 'Kampanya' | 'Haber';
  description: string;
  content?: string; // Detay metni
  image?: string;   // Detay görseli
  link?: string;
}
