import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRaffleCode } from '../contexts/RaffleCodeContext';
import { CheckCircle, Copy, Share2, WhatsappIcon } from 'lucide-react';
import Countdown from '../components/ui/Countdown';

const ViewTicketsPage = () => {
  const { code } = useParams<{ code: string }>();
  const { getRaffleByCode } = useRaffleCode();
  const [raffle, setRaffle] = useState(code ? getRaffleByCode(code) : null);
  const [copied, setCopied] = useState(false);

  // Função para calcular a próxima quarta-feira às 19h
  const getNextWednesday = () => {
    const now = new Date();
    const nextWed = new Date();
    nextWed.setDate(now.getDate() + ((3 + 7 - now.getDay()) % 7));
    nextWed.setHours(19, 0, 0, 0);
    
    if (now > nextWed) {
      nextWed.setDate(nextWed.getDate() + 7);
    }
    
    return nextWed;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Olá! Comprei bilhetes para o sorteio de um BMW na WIL RIFAS! 🚗✨\nVeja meus números: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!raffle) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          Código de rifa não encontrado
        </div>
        <p className="text-gray-600">
          O código informado não existe ou já expirou.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Seus Bilhetes da Sorte</h1>
          <p className="text-gray-600">
            Código único: <span className="font-bold">{raffle.code}</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Status do Sorteio</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              raffle.status === 'drawn' ? 'bg-green-100 text-green-800' :
              raffle.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {raffle.status === 'drawn' ? 'Sorteado' :
               raffle.status === 'completed' ? 'Finalizado' :
               'Em Andamento'}
            </span>
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Próximo sorteio em:</p>
            <Countdown targetDate={getNextWednesday()} />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Seus Números</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {raffle.tickets.slice(0, 6).map((ticket, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <span className="block font-bold text-lg">{ticket}</span>
                <span className="text-xs text-gray-500">Bilhete #{index + 1}</span>
              </div>
            ))}
          </div>
          {raffle.tickets.length > 6 && (
            <p className="text-center text-gray-600 text-sm">
              + {raffle.tickets.length - 6} outros bilhetes
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Informações da Compra</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Nome:</p>
              <p className="font-medium">{raffle.buyerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data da compra:</p>
              <p className="font-medium">
                {raffle.purchaseDate.toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor total:</p>
              <p className="font-medium">R$ {raffle.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle size={20} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={20} />
                Copiar Link
              </>
            )}
          </button>
          
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Share2 size={20} />
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTicketsPage; 