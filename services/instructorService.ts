import { supabase } from '../supabaseClient';

export interface InstructorApplication {
  id?: string; // Insert yaparken opsiyonel, okurken zorunlu
  full_name: string;
  phone: string;
  email: string;
  expertise: string;
  linkedin_url: string;
  bio: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export const instructorService = {
  submitApplication: async (application: InstructorApplication): Promise<void> => {
    // ID ve created_at hariç gönderim yapıyoruz
    const { id, created_at, status, ...payload } = application;
    
    const { error } = await supabase
      .from('instructor_applications')
      .insert([payload]);

    if (error) {
      console.error('Başvuru gönderilirken hata oluştu:', error.message);
      throw new Error(`Başvuru Hatası: ${error.message}`);
    }
  },

  getAllApplications: async (): Promise<InstructorApplication[]> => {
    const { data, error } = await supabase
      .from('instructor_applications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return (data as InstructorApplication[]) || [];
  },

  updateApplicationStatus: async (id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> => {
    const { error } = await supabase
      .from('instructor_applications')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw new Error(`Statü güncelleme hatası: ${error.message}`);
    }
  },

  deleteApplication: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('instructor_applications')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Silme hatası: ${error.message}`);
    }
  }
};