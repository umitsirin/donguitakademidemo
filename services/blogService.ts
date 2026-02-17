import { BlogPost } from '../types';
import { supabase } from '../supabaseClient';

export const blogService = {
  getAllBlogs: async (): Promise<BlogPost[]> => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as BlogPost[]) || [];
    } catch (error: any) {
      console.error('Bloglar çekilirken hata:', error.message);
      return [];
    }
  },

  addBlog: async (post: BlogPost): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blogs')
      .insert([post])
      .select();

    if (error) {
      console.error('Blog Ekleme Hatası:', error);
      throw new Error(`Blog Ekleme Hatası: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('Blog eklendi ancak geri dönmedi (RLS engeli).');
    }

    return data[0] as BlogPost;
  },

  updateBlog: async (updatedPost: BlogPost): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blogs')
      .update(updatedPost)
      .eq('id', updatedPost.id)
      .select();

    if (error) {
      throw new Error(`Güncelleme Hatası: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('Güncelleme başarısız.');
    }

    return data[0] as BlogPost;
  },

  deleteBlog: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Silme Hatası: ${error.message}`);
    }
  }
};