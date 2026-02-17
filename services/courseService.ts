import { Course } from '../types';
import { supabase } from '../supabaseClient';

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as Course[]) || [];
    } catch (error: any) {
      console.error('Kurslar çekilirken hata:', error.message);
      return [];
    }
  },

  addCourse: async (course: Course): Promise<Course> => {
    console.log('Supabase\'e gönderiliyor:', course);
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select();

    if (error) {
      console.error('Ekleme Hatası Detayı:', error);
      throw new Error(`Ekleme Hatası: ${error.message}. Lütfen SQL Editor'den tabloları oluşturduğunuzdan ve RLS'yi kapattığınızdan emin olun.`);
    }
    
    if (!data || data.length === 0) {
      throw new Error('Veri eklendi ancak geri dönmedi. RLS politikalarını kontrol edin.');
    }

    return data[0] as Course;
  },

  updateCourse: async (updatedCourse: Course): Promise<Course> => {
    const { data, error } = await supabase
      .from('courses')
      .update(updatedCourse)
      .eq('id', updatedCourse.id)
      .select();

    if (error) {
      console.error('Güncelleme Hatası:', error.message);
      throw new Error(`Güncelleme Hatası: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
       throw new Error('Güncelleme başarısız veya yetki yetersiz.');
    }

    return data[0] as Course;
  },

  deleteCourse: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Silme Hatası:', error.message);
      throw new Error(`Silme Hatası: ${error.message}`);
    }
  }
};