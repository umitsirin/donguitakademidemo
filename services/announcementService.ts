
import { Announcement } from '../types';
import { supabase } from '../supabaseClient';

export const announcementService = {
  getAllAnnouncements: async (): Promise<Announcement[]> => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as Announcement[]) || [];
    } catch (error: any) {
      console.error('Duyurular çekilirken hata:', error.message);
      return [];
    }
  },

  addAnnouncement: async (announcement: Announcement): Promise<Announcement> => {
    const { id, ...payload } = announcement; 
    
    // Geçerli bir UUID formatı kontrolü (8-4-4-4-12 hex karakter)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    // Eğer ID geçerli bir UUID değilse (örn: timestamp string ise), ID'siz gönder ki DB kendi UUID'sini üretsin.
    // Eğer geçerli bir UUID ise (örn: daha önce oluşturulmuşsa veya biz elle uuid verdiysek) ID ile gönder.
    const dataToSend = isUUID ? announcement : payload;

    const { data, error } = await supabase
      .from('announcements')
      .insert([dataToSend])
      .select();

    if (error) {
      console.error('Duyuru Ekleme Hatası:', error);
      throw new Error(`Duyuru Ekleme Hatası: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('Duyuru eklendi ancak geri dönmedi.');
    }

    return data[0] as Announcement;
  },

  updateAnnouncement: async (updatedAnnouncement: Announcement): Promise<Announcement> => {
    const { data, error } = await supabase
      .from('announcements')
      .update(updatedAnnouncement)
      .eq('id', updatedAnnouncement.id)
      .select();

    if (error) {
      throw new Error(`Güncelleme Hatası: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('Güncelleme başarısız.');
    }

    return data[0] as Announcement;
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Silme Hatası: ${error.message}`);
    }
  }
};
