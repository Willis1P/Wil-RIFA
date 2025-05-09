import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useRaffleCode } from '../contexts/RaffleCodeContext';

// Mock data for demo purposes
const MOCK_TICKETS = [
  {
    id: 1,
    orderNumber: 'BMW-5439',
    purchaseDate: '2023-10-15',
    raffleTitle: 'BMW Série 3 2025',
    drawDate: '2025-12-31',
    totalTickets: 100,
    tickets: Array.from({ length: 100 }, (_, i) => ({
      number: Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
      status: 'active'
    }))
  },
  {
    id: 2,
    orderNumber: 'BMW-5372',
    purchaseDate: '2023-09-28',
    raffleTitle: 'BMW Série 3 2025',
    drawDate: '2025-12-31',
    totalTickets: 400,
    tickets: Array.from({ length: 400 }, (_, i) => ({
      number: Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
      status: 'active'
    }))
  }
];

interface Ticket {
  code: string;
  purchaseDate: string;
  tickets: string[];
  totalAmount: number;
  status: string;
}

const MyTicketsPage = () => {
  const navigate = useNavigate();
  const { raffleCode } = useRaffleCode();
  const [cpf, setCpf] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [tickets, setTickets] = useState<Ticket | null>(null);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4').substring(0, 14);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);

    // Aqui você implementaria a busca real dos bilhetes
    // Por enquanto, vamos usar dados mockados
    if (cpf === '123.456.789-00') {
      setTickets({
        code: raffleCode || 'ABC123',
        purchaseDate: new Date().toLocaleDateString(),
        tickets: ['A123', 'A124', 'A125'],
        totalAmount: 150.0,
        status: 'Pago'
      });
    } else {
      setTickets(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Meus Bilhetes</h1>
        <p className="text-gray-600">
          Digite seu CPF para visualizar todos os seus bilhetes
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-6">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
              Digite seu CPF para consultar seus bilhetes
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleCPFChange}
                placeholder="000.000.000-00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                maxLength={14}
                required
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Search size={20} />
                Buscar
              </button>
            </div>
          </div>
        </form>

        {searchPerformed && (
          <div>
            {tickets ? (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Código da Rifa</h3>
                      <p className="text-lg font-bold">{tickets.code}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Data da Compra</h3>
                      <p className="text-lg">{tickets.purchaseDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {tickets.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
                      <p className="text-lg">R$ {tickets.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Seus Números</h3>
                    <div className="flex flex-wrap gap-2">
                      {tickets.tickets.map((ticket: string) => (
                        <span
                          key={ticket}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                        >
                          {ticket}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Acompanhe o resultado do sorteio através do link abaixo:
                  </p>
                  <a
                    href={`/bilhetes/${tickets.code}`}
                    className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Ver Resultado
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Nenhum bilhete encontrado para este CPF.
                </p>
                <button
                  onClick={() => navigate('/comprar')}
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Comprar Bilhetes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;