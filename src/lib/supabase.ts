import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zyvecayhvfilxwajhfdd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dmVjYXlodmZpbHh3YWpoZmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTg5OTcsImV4cCI6MjA2MjM5NDk5N30.d654CzEkmOS-09yHkZM_LDrd_s5mppydfU_bjyQdoXo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const adminApi = {
  async obterEstatisticas() {
    const { data, error } = await supabase
      .from('vw_dashboard')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async vendasRecentes() {
    const { data, error } = await supabase
      .from('bilhetes')
      .select(`
        numero,
        created_at,
        usuarios (
          nome,
          telefone
        )
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  },

  async listarGanhadores() {
    const { data, error } = await supabase
      .from('vw_ganhadores')
      .select('*')
      .order('data_compra', { ascending: false });

    if (error) throw error;
    return data;
  },

  async buscarBilhete(numero: number) {
    const { data, error } = await supabase
      .rpc('buscar_bilhete', { numero_busca: numero })
      .single();

    if (error) throw error;
    return data;
  },

  async marcarGanhador(numero: number) {
    const { error } = await supabase
      .rpc('marcar_ganhador', { numero_bilhete: numero });

    if (error) throw error;
    return true;
  }
}; 