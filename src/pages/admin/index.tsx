import { useState, useEffect } from 'react';
import { supabase, adminApi } from '../../lib/supabase';
import { DashboardStats, Ticket, RecentSale, Winner } from '../../types/admin';

const AdminPanel = () => {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchResult, setSearchResult] = useState<Ticket | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, salesData, winnersData] = await Promise.all([
        adminApi.obterEstatisticas(),
        adminApi.vendasRecentes(),
        adminApi.listarGanhadores()
      ]);

      setStats(statsData);
      setRecentSales(salesData);
      setWinners(winnersData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await adminApi.buscarBilhete(parseInt(searchNumber));
      setSearchResult(result);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };

  const handleMarkAsWinner = async (numero: number) => {
    try {
      await adminApi.marcarGanhador(numero);
      await loadDashboardData();
      alert('Bilhete marcado como ganhador!');
    } catch (error) {
      console.error('Erro ao marcar ganhador:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total de Bilhetes</h3>
          <p className="text-2xl font-bold">{stats?.total_bilhetes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total de Compradores</h3>
          <p className="text-2xl font-bold">{stats?.total_compradores}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Ganhadores</h3>
          <p className="text-2xl font-bold">{stats?.total_ganhadores}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium">Valor Total</h3>
          <p className="text-2xl font-bold">R$ {stats?.valor_total_vendas?.toFixed(2)}</p>
        </div>
      </div>

      {/* Busca de Bilhete */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Buscar Bilhete</h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="number"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            placeholder="Número do bilhete"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        {searchResult && (
          <div className="mt-4 p-4 border rounded">
            <h3 className="font-bold">{searchResult.nome}</h3>
            <p>Bilhete: {searchResult.bilhete}</p>
            <p>Telefone: {searchResult.telefone}</p>
            <p>Email: {searchResult.email}</p>
            <p>Status: {searchResult.status}</p>
            {searchResult.status !== '🏆 GANHADOR' && (
              <button
                onClick={() => handleMarkAsWinner(searchResult.bilhete)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Marcar como Ganhador
              </button>
            )}
          </div>
        )}
      </div>

      {/* Vendas Recentes */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Vendas Recentes (24h)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Bilhete</th>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Telefone</th>
                <th className="text-left p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.numero} className="border-b">
                  <td className="p-2">{sale.numero}</td>
                  <td className="p-2">{sale.usuarios.nome}</td>
                  <td className="p-2">{sale.usuarios.telefone}</td>
                  <td className="p-2">
                    {new Date(sale.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ganhadores */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Ganhadores</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Bilhete</th>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Telefone</th>
                <th className="text-left p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => (
                <tr key={winner.numero} className="border-b">
                  <td className="p-2">{winner.numero}</td>
                  <td className="p-2">{winner.nome}</td>
                  <td className="p-2">{winner.telefone}</td>
                  <td className="p-2">
                    {new Date(winner.data_compra).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 