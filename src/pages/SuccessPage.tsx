import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffleCode } from '../contexts/RaffleCodeContext';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { raffleCode, selectedPackage } = useRaffleCode();
  const [tickets] = useState(() => 
    Array.from({ length: 3 }, () => 
      Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    )
  );

  useEffect(() => {
    if (!raffleCode || !selectedPackage) {
      navigate('/comprar');
      return;
    }

    // Dispara o efeito de confete
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [raffleCode, selectedPackage, navigate]);

  // Função para calcular a próxima quarta-feira às 19h
  const getNextWednesday = () => {
    const now = new Date();
    const nextWed = new Date();
    nextWed.setDate(now.getDate() + ((3 + 7 - now.getDay()) % 7));
    nextWed.setHours(19, 0, 0, 0);
    
    // Se já passou das 19h de quarta, adiciona 7 dias
    if (now > nextWed) {
      nextWed.setDate(nextWed.getDate() + 7);
    }
    
    return nextWed;
  };

  if (!raffleCode || !selectedPackage) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Compra Realizada com Sucesso!</h1>
        <p className="text-gray-600 mb-8">
          Seus bilhetes foram gerados e o código da sua rifa é: <span className="font-bold">{raffleCode}</span>
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Seus Bilhetes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tickets.map((ticket, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <span className="block font-bold text-xl mb-1">{ticket}</span>
                <span className="text-sm text-gray-500">Bilhete #{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            E mais {selectedPackage.quantity - 3} bilhetes foram gerados...
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Detalhes da Compra</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Pacote:</span> {selectedPackage.title}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Quantidade de bilhetes:</span> {selectedPackage.quantity}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Valor total:</span> R$ {selectedPackage.price.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Data do sorteio:</span>{' '}
              {getNextWednesday().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })} às 19h
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/meus-bilhetes')}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ver Todos os Bilhetes
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;