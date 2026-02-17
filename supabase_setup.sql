
-- BU KODLARI SUPABASE SQL EDITOR KISMINA YAPIŞTIRIP "RUN" TUŞUNA BASINIZ --

-- 1. COURSES (EĞİTİMLER) TABLOSU
create table if not exists courses (
  id text primary key,
  title text not null,
  category text,
  description text,
  duration text,
  level text,
  price text,
  image text,
  rating numeric default 5.0,
  "studentsCount" numeric default 0,
  "targetAudience" text,
  "ageGroup" text,
  "programType" text,
  curriculum jsonb,
  "careerPath" text[],
  "techStack" text[],
  created_at timestamptz default now()
);

-- Check constraint ekleyerek programType alanının sadece belirli değerleri almasını sağlıyoruz (Veri bütünlüğü)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_program_type') THEN
        ALTER TABLE courses ADD CONSTRAINT check_program_type CHECK ("programType" IN ('9-month', 'modular', null));
    END IF;
END $$;

-- 2. BLOGS (YAZILAR) TABLOSU
create table if not exists blogs (
  id text primary key,
  title text not null,
  excerpt text,
  content text,
  date text,
  author text,
  category text,
  image text,
  "readTime" text,
  created_at timestamptz default now()
);

-- 3. INSTRUCTOR APPLICATIONS (EĞİTMEN BAŞVURULARI) TABLOSU
create table if not exists instructor_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  expertise text NOT NULL,
  linkedin_url text,
  bio text NOT NULL,
  status text DEFAULT 'pending', -- pending, approved, rejected
  created_at timestamptz DEFAULT now()
);

-- 4. CONSULTATION REQUESTS (ÜCRETSİZ DANIŞMANLIK) TABLOSU
create table if not exists consultation_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  phone text NOT NULL,
  status text DEFAULT 'pending', -- pending (bekliyor), contacted (aranıldı), archived (arşiv)
  created_at timestamptz DEFAULT now()
);

-- 5. ANNOUNCEMENTS (DUYURULAR) TABLOSU -- YENİ EKLENDİ
create table if not exists announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date text,
  type text, -- 'Duyuru', 'Etkinlik', 'Kampanya', 'Haber'
  description text,
  content text,
  image text,
  link text,
  created_at timestamptz DEFAULT now()
);

-- 6. İZİNLERİ SIFIRLA VE YENİDEN AYARLA

alter table courses enable row level security;
alter table blogs enable row level security;
alter table instructor_applications enable row level security;
alter table consultation_requests enable row level security;
alter table announcements enable row level security;

-- Courses Politikaları
drop policy if exists "Public courses are viewable by everyone" on courses;
drop policy if exists "Enable insert for anon" on courses;
drop policy if exists "Enable update for anon" on courses;
drop policy if exists "Enable delete for anon" on courses;

create policy "Public courses are viewable by everyone" on courses for select using (true);
create policy "Enable insert for anon" on courses for insert with check (true);
create policy "Enable update for anon" on courses for update using (true);
create policy "Enable delete for anon" on courses for delete using (true);

-- Blogs Politikaları
drop policy if exists "Public blogs are viewable by everyone" on blogs;
drop policy if exists "Enable insert for anon" on blogs;
drop policy if exists "Enable update for anon" on blogs;
drop policy if exists "Enable delete for anon" on blogs;

create policy "Public blogs are viewable by everyone" on blogs for select using (true);
create policy "Enable insert for anon" on blogs for insert with check (true);
create policy "Enable update for anon" on blogs for update using (true);
create policy "Enable delete for anon" on blogs for delete using (true);

-- Announcements Politikaları -- YENİ EKLENDİ
drop policy if exists "Public announcements are viewable by everyone" on announcements;
drop policy if exists "Enable insert for anon" on announcements;
drop policy if exists "Enable update for anon" on announcements;
drop policy if exists "Enable delete for anon" on announcements;

create policy "Public announcements are viewable by everyone" on announcements for select using (true);
create policy "Enable insert for anon" on announcements for insert with check (true);
create policy "Enable update for anon" on announcements for update using (true);
create policy "Enable delete for anon" on announcements for delete using (true);

-- Instructor Applications Politikaları
drop policy if exists "Enable insert for everyone" on instructor_applications;
drop policy if exists "Enable select for everyone" on instructor_applications;

create policy "Enable insert for everyone" on instructor_applications for insert with check (true);
create policy "Enable select for everyone" on instructor_applications for select using (true);

-- Consultation Requests Politikaları
drop policy if exists "Enable insert for everyone" on consultation_requests;
drop policy if exists "Enable select for everyone" on consultation_requests;
drop policy if exists "Enable update for everyone" on consultation_requests;

create policy "Enable insert for everyone" on consultation_requests for insert with check (true);
create policy "Enable select for everyone" on consultation_requests for select using (true);
create policy "Enable update for everyone" on consultation_requests for update using (true);


-- 7. ADMIN ACCESS (YÖNETİCİ GİRİŞİ) TABLOSU
DROP TABLE IF EXISTS admin_access;

CREATE TABLE admin_access (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  access_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for login" 
ON admin_access FOR SELECT 
TO anon 
USING (true);

INSERT INTO admin_access (access_hash)
VALUES ('889a31f55a53530669250005232a514603337966955074258f44771775645352');

-- 8. KATEGORİ GÜNCELLEMELERİ (MİGRASYON)
-- Bu komutlar, mevcut veritabanında eski kategori isimlerini yenileriyle değiştirir.
UPDATE courses SET category = 'Veri & Yapay Zeka' WHERE category = 'Veri Bilimi';
UPDATE courses SET category = 'Tasarım & Oyun Geliştirme' WHERE category = 'Tasarım';
UPDATE courses SET category = 'Veri & Yapay Zeka' WHERE category = 'Yapay Zeka'; -- Varsa
-- Diğer kategoriler (Yazılım, Mobil, Siber Güvenlik) zaten uyumlu olabilir veya yeni eklendiği için güncelleme gerektirmez.
