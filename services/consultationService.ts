import { supabase } from '../supabaseClient';

export interface ConsultationRequest {
  id?: string;
  full_name: string;
  phone: string;
  status?: 'pending' | 'contacted' | 'archived';
  created_at?: string;
}

export const consultationService = {
  submitRequest: async (request: ConsultationRequest): Promise<void> => {
    // ID ve created_at hariç gönderim
    const { id, created_at, status, ...payload } = request;
    
    const { error } = await supabase
      .from('consultation_requests')
      .insert([payload]);

    if (error) {
      console.error('Danışmanlık talebi hatası:', error.message);
      throw new Error(`Talep Hatası: ${error.message}`);
    }
  },

  getAllRequests: async (): Promise<ConsultationRequest[]> => {
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return (data as ConsultationRequest[]) || [];
  },

  updateStatus: async (id: string, status: 'pending' | 'contacted' | 'archived'): Promise<void> => {
    const { error } = await supabase
      .from('consultation_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw new Error(`Statü güncelleme hatası: ${error.message}`);
    }
  }
};