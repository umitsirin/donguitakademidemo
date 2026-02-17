
import { Course, Feature, Instructor, BlogPost, Announcement } from './types';

// --- Visual Effect Snippets ---
export const CODE_SNIPPETS = {
  HOME: [
    "const future = 'Döngü';", "await success();", "import { Skills }", 
    "while(alive) { learn() }", "git commit -m 'new_career'", "npm install dream"
  ],
  KIDS: [
    "const kids = 'Future';", "function play() {", "return coding;", "await fun();", 
    "npm install imagination", "while(growing) {", "robot.move('forward')", "game.score += 100"
  ],
  ABOUT_MAIN: [
    "import { Vision } from 'Döngü';", "class Future extends Academy", "const mission = 'Excellence';", 
    "await transformation();", "System.upgrade('human_capital')", "git commit -m 'evolution'", 
    "010110110", "new Leader();", "npm install success", "while(learning) { thrive(); }",
    "export default Innovation;", "const [impact, setImpact] = useState(100)", "docker.run('academy')"
  ],
  ABOUT_MANIFESTO: [
    "Culture.define()", "Values.set('Trust')", "Vision.expand()", "Community.build()", 
    "return passion;", "if(dream) { build() }", "const future = true;", "Agile.mindset()",
    "Team.collaborate()", "deploy('dreams')", "404: Limit Not Found", "sudo apt-get install skills"
  ],
  COURSES: [
    "const Döngü = 'Future';", "function build() {", "return coding;", "await progress();", 
    "npm install success", "while(learning) {", "010110110", "System.init()", "new Vision();", 
    "import { AI } from 'Döngü';", "git push origin master", "export const Tech = () =>"
  ],
  BLOG: [
    "read(article);", "update(knowledge);", "console.log('insight');", 
    "import { News }", "await innovation();", "const learn = true;",
    "git push origin master", "npm install success"
  ],
  ANNOUNCEMENTS: [
    "System.broadcast(msg);", "event.init()", "Update available", "News.fetch()", 
    "await launch();", "community.grow()", "new Date()", "notification.push()",
    "alert('New Course');", "if(event) handle()", "return true;"
  ]
};

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Modern Web Geliştirme (React & Next.js)',
    category: 'Yazılım',
    description: 'Sıfırdan ileri seviyeye React, Next.js ve TypeScript ile modern web uygulamaları geliştirmeyi öğrenin.',
    duration: '12 Hafta',
    level: 'Orta',
    price: '₺4.500',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    studentsCount: 1250,
    targetAudience: 'adult',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
    careerPath: ['Frontend Developer', 'Full-stack Engineer', 'Web Architect'],
    curriculum: [
      { title: 'Modern JavaScript & TS Temelleri', description: 'ES6+ özellikleri ve TypeScript tip güvenliği temelleri.' },
      { title: 'React Hooks & State Yönetimi', description: 'Functional components, hooks ve kompleks state mimarileri.' },
      { title: 'Next.js 14 App Router', description: 'SSR, SSG ve Server Components ile yüksek performanslı sayfalar.' }
    ]
  },
  {
    id: 'k78-long',
    title: 'Minik Kaşifler: 9 Aylık Teknoloji Temelleri',
    category: 'Akademik Program',
    description: '7-8 yaş grubu için oyunlaştırılmış, ekran süresi dengeli ilk teknoloji tanışma programı.',
    duration: '9 Ay',
    level: 'Başlangıç',
    price: '₺1.100 / Ay',
    image: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    studentsCount: 85,
    targetAudience: 'kids',
    ageGroup: '7-8',
    programType: '9-month',
    curriculum: [
      { title: '1. Ay: Bilgisayarsız Kodlama (Unplugged)', description: 'Fiziksel oyunlarla algoritma mantığını kavrama.' },
      { title: '2. Ay: Scratch Jr. ile Hikayeleştirme', description: 'Kendi dijital masalını oluşturma.' },
      { title: '3. Ay: Renklerle Robot Kontrolü', description: 'Ozobot ile temel robotik komutlar.' },
      { title: '4. Ay: Dijital Vatandaşlık', description: 'İnternet dünyasında güvenli ve nazik olma.' },
      { title: '5-9. Ay: Yaratıcı Tasarım ve Final', description: 'Tinkercad ile 3D modelleme ve bitirme şenliği.' }
    ]
  },
  {
    id: 'k912-long',
    title: 'Geleceğin Mühendisi: 9 Aylık Kodlama Akademisi',
    category: 'Akademik Program',
    description: 'Analitik düşünme becerisini Scratch\'ten Python\'a geçişle harmanlayan kapsamlı gelişim yolu.',
    duration: '9 Ay',
    level: 'Başlangıç',
    price: '₺1.250 / Ay',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    studentsCount: 140,
    targetAudience: 'kids',
    ageGroup: '9-12',
    programType: '9-month',
    curriculum: [
      { title: '1-3. Ay: İleri Scratch Mekanikleri', description: 'Değişkenler ve listelerle kompleks oyunlar.' },
      { title: '4-6. Ay: Robotik ve Sensörler', description: 'Micro:bit ile akıllı ev sistemleri tasarlama.' },
      { title: '7-9. Ay: Python\'a Geçiş', description: 'Bloklardan kod yazımına profesyonel köprü.' }
    ]
  },
  {
    id: 'k1315-long',
    title: 'Yazılım Mimarı Yolculuğu (9 Ay)',
    category: 'Akademik Program',
    description: 'Üniversite öncesi en güçlü temel. Python, Veri Bilimi ve Yapay Zeka temelleri.',
    duration: '9 Ay',
    level: 'Orta',
    price: '₺1.400 / Ay',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    studentsCount: 95,
    targetAudience: 'kids',
    ageGroup: '13-15',
    programType: '9-month',
    curriculum: [
      { title: '1-4. Ay: Python ile Algoritma Ustalığı', description: 'Veri yapıları ve algoritma optimizasyonu.' },
      { title: '5-7. Ay: Veri Görselleştirme', description: 'Büyük verileri anlamlandırma sanatı.' },
      { title: '8-9. Ay: AI & Machine Learning', description: 'Kendi yapay zeka modelini eğitme.' }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Yazılım Dünyasına Giriş: Hangi Dilden Başlamalı?',
    excerpt: 'Kodlama yolculuğuna yeni başlayanlar için en popüler diller ve kariyer fırsatları üzerine bir rehber.',
    content: 'Yazılım dünyasına adım atarken en çok sorulan soru "Hangi dilden başlamalıyım?" sorusudur. Günümüzde Python, esnek yapısı ve geniş kütüphaneleriyle başlangıç için en ideal adaylardan biridir...',
    date: '12 Mayıs 2024',
    author: 'Can Aksoy',
    category: 'Rehber',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    readTime: '5 Dakika'
  },
  {
    id: '2',
    title: 'Yapay Zeka Eğitimde Nasıl Devrim Yaratıyor?',
    excerpt: 'Gemini ve GPT gibi modellerin öğrenme süreçlerini nasıl kişiselleştirdiğini keşfedin.',
    content: 'Yapay zeka sadece bir araç değil, artık bir mentor haline geldi. Kişiselleştirilmiş öğrenme yolları sayesinde her öğrenci kendi hızında ilerleyebiliyor...',
    date: '20 Haziran 2024',
    author: 'Deniz Yılmaz',
    category: 'Yapay Zeka',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    readTime: '8 Dakika'
  },
  {
    id: '3',
    title: 'Çocuklar İçin Algoritmik Düşünmenin Önemi',
    excerpt: 'Kodlamanın ötesinde, çocuklara problem çözme yetisi kazandırmanın yolları.',
    content: 'Algoritmik düşünme, sadece bilgisayar başında değil, günlük hayattaki problemleri çözerken de çocukların en büyük yardımcısıdır...',
    date: '05 Temmuz 2024',
    author: 'Mert Demir',
    category: 'Çocuk Eğitimi',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    readTime: '6 Dakika'
  }
];

export const FEATURES: Feature[] = [
  { id: 1, title: 'Uygulamalı Eğitim', description: 'Sadece teorik bilgi değil, gerçek projeler üzerinde çalışarak deneyim kazanırsınız.', icon: 'code' },
  { id: 2, title: 'Uzman Eğitmenler', description: 'Sektörün içinde aktif olarak çalışan deneyimli profesyonellerden eğitim alırsınız.', icon: 'users' },
  { id: 3, title: 'Sertifikasyon', description: 'Eğitim sonunda uluslararası geçerliliğe sahip başarı sertifikası alırsınız.', icon: 'award' },
  { id: 4, title: 'Kariyer Desteği', description: 'Özgeçmiş hazırlama ve mülakat teknikleri konusunda mentorluk alırsınız.', icon: 'briefcase' }
];

export const INSTRUCTORS: Instructor[] = [
  { id: 1, name: 'Ümit Şirin', role: 'Yetişkin Eğitim Uzmanı', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', bio: 'Döngü IT Akademi bünyesinde yetişkinlere yönelik teknik eğitimler veriyorum. Yazılımı sadece kod yazmak değil, problem çözme disiplini olarak görüyorum.' },
  { id: 2, name: 'Sefer Han Çakıroğlu', role: 'Kurum Müdürü', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', bio: 'Eğitim yönetimi ve bilişim alanındaki tecrübemle Döngü IT Akademi’nin akademik ve operasyonel süreçlerini yönetiyorum. Kaliteli, disiplinli ve proje odaklı bir eğitim modeli oluşturmayı öncelik olarak görüyorum.' },
  { id: 3, name: 'Zafer Akpınar', role: 'Çocuk Yazılım ve Robotik Eğitmeni', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', bio: 'Çocuklara teknolojiyi sevdiren, öğrenmeyi eğlenceli hale getiren bir eğitmenim. Robotik, kodlama ve proje tabanlı çalışmalarla öğrencilerin üretmesini ve özgüven kazanmasını destekliyorum.' }
];

export const STATS = [
  { label: 'Mezun Öğrenci', value: '5000+' },
  { label: 'Aktif Kurs', value: '45' },
  { label: 'Eğitmen', value: '25+' },
  { label: 'Yerleştirme Oranı', value: '%94' }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Yeni Dönem Yazılım ve Yapay Zeka Kayıtları Başladı!',
    date: '25 Ekim 2024',
    type: 'Kampanya',
    description: 'Erken kayıt avantajlarından yararlanarak geleceğin teknolojilerine bugünden adım atın. Sınırlı kontenjan için hemen başvurun.',
    content: 'Döngü Akademi Plus olarak yeni dönem kayıtlarımızı açmış bulunmaktayız. Yazılım Mühendisliği, Veri Bilimi ve Yapay Zeka alanlarında uzmanlaşmak isteyenler için hazırladığımız bu özel program, %100 proje odaklı müfredatıyla dikkat çekiyor. Erken kayıt dönemine özel %20 indirim fırsatından yararlanmak için son gün 1 Kasım. Kontenjanlarımız her sınıf için 15 kişi ile sınırlıdır.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    link: '/courses'
  },
  {
    id: '2',
    title: 'Hackathon 2024: Trabzon Kodluyor Etkinliği',
    date: '10 Kasım 2024',
    type: 'Etkinlik',
    description: '48 saat sürecek maratonda ekipler yarışıyor, projeler konuşuyor. Büyük ödül ve yatırımcı sunumu fırsatı sizi bekliyor.',
    content: 'Trabzon Teknoloji Parkı iş birliği ile düzenlediğimiz Hackathon 2024, bölgenin en yetenekli yazılımcılarını bir araya getiriyor. "Akıllı Şehir Çözümleri" temasında gerçekleşecek olan yarışmada, takımlar 48 saat boyunca aralıksız kod yazacak. Jüri üyeleri arasında Silikon Vadisi\'nden mentorlar ve yerel yatırımcılar bulunuyor. Büyük ödül: 50.000 TL ve Kuluçka Merkezi desteği.',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '3',
    title: 'Sektör Buluşmaları: Google GDE Söyleşisi',
    date: '15 Kasım 2024',
    type: 'Etkinlik',
    description: 'Global teknoloji liderleri deneyimlerini aktarmak için Döngü Akademi\'de buluşuyor. Katılım ücretsizdir.',
    content: 'Google Developer Expert (GDE) unvanına sahip konuklarımızla gerçekleştireceğimiz bu söyleşide, global teknoloji trendlerini, yapay zekanın geleceğini ve yazılım dünyasında kariyer basamaklarını konuşacağız. Etkinlik sonrası networking kokteyli düzenlenecektir. Katılım tamamen ücretsizdir ancak kayıt zorunludur.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '4',
    title: 'Çocuklar İçin Kış Okulu Programı Açıklandı',
    date: '01 Aralık 2024',
    type: 'Duyuru',
    description: 'Sömestr tatilinde çocuklar hem eğlensin hem öğrensin. Robotik kodlama ve oyun tasarımı atölyelerimiz için kayıtlar açıldı.',
    content: 'Sömestr tatilini verimli geçirmek isteyen minik kaşifler için Kış Okulu programımız hazır! 2 haftalık yoğunlaştırılmış programda çocuklar Minecraft ile kodlama, Lego Spike ile robotik ve 3D tasarım atölyelerine katılacaklar. Her gün 4 saat süren atölyelerimizde çocuklar hem sosyalleşecek hem de analitik düşünme becerilerini geliştirecekler.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    link: '/kids-courses'
  }
];
