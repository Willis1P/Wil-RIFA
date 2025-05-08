import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Share2 } from 'lucide-react';

const SuccessPage = () => {
  // Mock ticket numbers for demo
  const ticketNumbers = Array.from({ length: 3 }, () => 
    Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
  );

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Parabéns! Seus bilhetes foram gerados e estão concorrendo ao sorteio.
        </p>
        
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Seus números da sorte</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {ticketNumbers.map((number, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                <span className="block font-bold text-lg">{number}</span>
                <span className="text-xs text-gray-500">Bilhete #{index + 1}</span>
              </div>
            ))}
            
            <div className="sm:col-span-3 text-center text-gray-500 text-sm">
              E mais {Math.floor(Math.random() * 90) + 10} bilhetes...
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Estes são apenas alguns dos seus bilhetes. Veja a lista completa na área "Meus Bilhetes".
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link
            to="/meus-bilhetes"
            className="btn btn-primary flex items-center justify-center"
          >
            Ver todos os bilhetes
            <ArrowRight size={18} className="ml-2" />
          </Link>
          
          <button 
            onClick={() => {
              // In a real implementation, this would open a share dialog
              alert('Compartilhar com amigos');
            }}
            className="btn btn-outline flex items-center justify-center"
          >
            <Share2 size={18} className="mr-2" />
            Compartilhar com amigos
          </button>
        </div>
        
        <div className="text-gray-600">
          <p className="mb-2">
            Você receberá um e-mail de confirmação com todos os detalhes.
          </p>
          <p className="text-sm">
            O sorteio será realizado {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às 19h ao vivo nas nossas redes sociais.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">E agora?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h3 className="font-bold mb-2">Aguarde o sorteio</h3>
            <p className="text-sm text-gray-600">
              O sorteio será realizado conforme o cronograma e transmitido ao vivo.
            </p>
          </div>
          
          <div className="p-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h3 className="font-bold mb-2">Fique atento</h3>
            <p className="text-sm text-gray-600">
              Acompanhe nossas redes sociais para novidades e informações sobre o sorteio.
            </p>
          </div>
          
          <div className="p-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="font-bold mb-2">Participe novamente</h3>
            <p className="text-sm text-gray-600">
              Quanto mais bilhetes você tiver, maiores são suas chances de ganhar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;