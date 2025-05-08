import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Search, Ticket, Download, ChevronRight, ArrowRight } from 'lucide-react';

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

const MyTicketsPage = () => {
  const { isAuthenticated, user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Acesso restrito</h1>
        <p className="text-xl text-gray-600 mb-6">
          Você precisa estar logado para acessar seus bilhetes.
        </p>
        <Link to="/login" className="btn btn-primary">
          Fazer login
        </Link>
      </div>
    );
  }
  
  const toggleOrder = (orderId: number) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  const filteredOrders = MOCK_TICKETS.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.tickets.some(ticket => ticket.number.includes(searchTerm))
  );
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Meus bilhetes</h1>
      <p className="text-gray-600 mb-8">
        Visualize todos os seus bilhetes e acompanhe os sorteios.
      </p>
      
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Buscar por número do pedido ou bilhete..."
          className="form-input pl-10 pr-4 py-3 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket size={24} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Nenhum bilhete encontrado</h2>
          <p className="text-gray-600 mb-6">
            Não encontramos bilhetes com os critérios de busca informados.
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-outline"
            >
              Limpar busca
            </button>
          ) : (
            <Link to="/comprar" className="btn btn-primary">
              Comprar bilhetes
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleOrder(order.id)}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold">Pedido #{order.orderNumber}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.purchaseDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-lg">{order.raffleTitle}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {order.totalTickets} bilhetes
                    </span>
                  </div>
                </div>
                
                <ChevronRight 
                  className={`transform transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} 
                  size={20} 
                />
              </div>
              
              {expandedOrder === order.id && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Lista de bilhetes</h3>
                    <button className="text-sm flex items-center text-gray-600 hover:text-black">
                      <Download size={16} className="mr-1" />
                      Exportar PDF
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                    {order.tickets.slice(0, 20).map((ticket, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                        <span className="block text-sm font-medium">{ticket.number}</span>
                      </div>
                    ))}
                    
                    {order.tickets.length > 20 && (
                      <div className="col-span-full text-center text-gray-500 text-sm py-2">
                        Exibindo 20 de {order.tickets.length} bilhetes
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">Data do sorteio</h4>
                        <p>{new Date(order.drawDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <Link 
                        to="/comprar" 
                        className="text-sm flex items-center text-black hover:underline font-medium"
                      >
                        Aumentar minhas chances
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;