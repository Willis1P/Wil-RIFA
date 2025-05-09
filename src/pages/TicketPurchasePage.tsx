import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffleCode } from '../contexts/RaffleCodeContext';
import { ArrowRight, Minus, Plus } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: '100',
    quantity: 100,
    price: 10.00,
    isPopular: true
  },
  {
    id: 2,
    title: '400',
    quantity: 400,
    price: 40.00,
    isPopular: false
  },
  {
    id: 3,
    title: '1000',
    quantity: 1000,
    price: 100.00,
    isPopular: false
  },
  {
    id: 4,
    title: '5000',
    quantity: 5000,
    price: 500.00,
    isPopular: false
  },
  {
    id: 5,
    title: '7000',
    quantity: 7000,
    price: 700.00,
    isPopular: false
  },
  {
    id: 6,
    title: '10000',
    quantity: 10000,
    price: 1000.00,
    isPopular: false
  }
];

const TicketPurchasePage = () => {
  const navigate = useNavigate();
  const { setSelectedPackage } = useRaffleCode();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(100);

  const handlePackageSelect = (packageId: number) => {
    const selectedPackage = packages.find(pkg => pkg.id === packageId);
    if (selectedPackage) {
      // Soma a quantidade do pacote ao contador atual
      const newQuantity = quantity + selectedPackage.quantity;
      setQuantity(newQuantity);
    }
    setSelectedId(packageId);
  };

  const handleProceedToCheckout = () => {
    setSelectedPackage({
      id: 1,
      title: `${quantity} Bilhetes`,
      quantity: quantity,
      price: (quantity * 0.10) // R$ 0,10 por bilhete
    });
    navigate('/checkout');
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 100);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 100, 100)); // Mínimo de 100 bilhetes
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 100 : parseInt(e.target.value);
    if (value >= 100) {
      setQuantity(value);
    } else {
      setQuantity(100); // Define para 100 se o valor for menor que o mínimo
    }
  };

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

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">BMW DOS SONHOS</h1>
            <p className="text-xl">IMAGEM: Sugestão de uso do prêmio principal</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="bg-gray-800 text-white p-4 rounded-xl inline-block mb-4">
            <h2 className="text-xl font-bold">
              SORTEIO {getNextWednesday().toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase()} ÀS 19H
            </h2>
          </div>
          <p className="text-gray-600">
            Por apenas <span className="font-bold text-gray-800">R$ 0,10</span> por bilhete
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 border-2 ${
                selectedId === pkg.id ? 'border-green-500' : 'border-gray-200'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              )}
              <div className="text-4xl font-bold text-gray-800 mb-2">+{pkg.quantity}</div>
              <div className="text-sm text-gray-500 mb-4">TÍTULOS</div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                R$ {pkg.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 text-center border-0 focus:ring-0 text-xl font-medium"
              min="100"
              step="100"
            />
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
            >
              <Plus size={20} />
            </button>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg font-medium transition-colors bg-green-500 text-white hover:bg-green-600"
          >
            Comprar {quantity} bilhetes por R$ {(quantity * 0.10).toFixed(2)}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchasePage;