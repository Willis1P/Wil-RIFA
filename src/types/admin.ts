export interface DashboardStats {
  total_bilhetes: number;
  total_compradores: number;
  total_ganhadores: number;
  valor_total_vendas: number;
}

export interface Ticket {
  bilhete: number;
  nome: string;
  telefone: string;
  email: string;
  status: string;
  nome_rifa: string;
  data_sorteio: string;
  data_compra: string;
}

export interface RecentSale {
  numero: number;
  created_at: string;
  usuarios: {
    nome: string;
    telefone: string;
  };
}

export interface Winner {
  numero: number;
  nome: string;
  telefone: string;
  data_compra: string;
} 