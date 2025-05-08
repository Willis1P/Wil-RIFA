import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import TicketPackageCard from '../components/ui/TicketPackageCard';
import QuantitySelector from '../components/ui/QuantitySelector';
import Countdown from '../components/ui/Countdown';
import { Share2, ShoppingCart } from 'lucide-react';

const TicketPurchasePage = () => {
  const { availablePackages, selectPackage, cart, updateQuantity, totalPrice, totalTickets, drawDate } = useRaffle();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (cart) {
      setSelectedPackageId(cart.packageId);
      setQuantity(cart.quantity);
    }
  }, [cart]);

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackageId(packageId);
    selectPackage(packageId);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateQuantity(newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Comprar Bilhetes</h1>
        <p className="text-xl text-gray-600 mb-6">
          Escolha o pacote que mais se adequa a você e aumente suas chances de ganhar!
        </p>
        <Countdown targetDate={getNextWednesday()} className="mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {availablePackages.map((pkg) => (
          <TicketPackageCard
            key={pkg.id}
            packageData={pkg}
            selected={selectedPackageId === pkg.id}
            onSelect={() => handleSelectPackage(pkg.id)}
          />
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
        <h2 className="text-2xl font-bold mb-6 text-white">Resumo do pedido</h2>
        
        {selectedPackageId ? (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <p className="font-medium mb-2 text-gray-300">Quantidade de pacotes:</p>
                <QuantitySelector
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={Math.ceil(100 / (availablePackages.find(pkg => pkg.id === selectedPackageId)?.quantity || 100))}
                  max={10}
                />
              </div>
              
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-300 mb-1">Total de bilhetes:</p>
                <p className="text-xl font-bold text-white">{totalTickets} bilhetes</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-300 mb-1">Valor total:</p>
                <p className="text-2xl font-bold text-white">R$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button 
                className="flex items-center justify-center text-gray-300 hover:text-white"
                onClick={() => {
                  // In a real implementation, this would open a share dialog
                  alert('Compartilhar com amigos');
                }}
              >
                <Share2 size={20} className="mr-2" />
                Compartilhar com amigos
              </button>
              
              <button
                onClick={handleCheckout}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 flex items-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Finalizar compra
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-300">
            Selecione um pacote de bilhetes para continuar
          </p>
        )}
      </div>

      <div className="bg-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Informações importantes:</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• O sorteio será realizado {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às 19h ao vivo nas nossas redes sociais.</li>
          <li>• O valor de cada bilhete é de R$ 0,10 (dez centavos).</li>
          <li>• Os bilhetes são gerados aleatoriamente após a confirmação do pagamento.</li>
          <li>• Você receberá os números dos seus bilhetes por e-mail e poderá consultar na sua conta.</li>
          <li>• Em caso de dúvidas, entre em contato com o nosso suporte.</li>
        </ul>
      </div>
    </div>
  );
};

export default TicketPurchasePage;