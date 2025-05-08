import { useState } from 'react';
import { CheckCircle, Ticket } from 'lucide-react';

interface TicketPackageCardProps {
  packageData: {
    id: number;
    quantity: number;
    price: number;
    pricePerTicket: number;
    popular?: boolean;
  };
  selected: boolean;
  onSelect: () => void;
}

const TicketPackageCard = ({
  packageData,
  selected,
  onSelect
}: TicketPackageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { quantity, price, pricePerTicket, popular } = packageData;
  
  // Format price per ticket to show in centavos
  const formattedPricePerTicket = (pricePerTicket * 100).toFixed(0);

  return (
    <div
      className={`bg-gray-800 border border-gray-700 p-6 rounded-xl cursor-pointer transition-all duration-300 ${
        selected ? 'ring-2 ring-white' : ''
      } ${isHovered ? 'bg-gray-700' : ''}`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="absolute -top-3 -right-3 bg-white text-gray-800 text-xs font-bold py-1 px-3 rounded-full z-10">
          Mais Popular
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-3xl font-bold text-white">+{quantity}</h3>
          <p className="text-sm font-medium uppercase text-gray-300">Bilhetes</p>
        </div>
        
        {selected ? (
          <CheckCircle className="text-green-500" size={24} />
        ) : (
          <div className={`w-6 h-6 rounded-full border-2 ${isHovered ? 'border-white' : 'border-gray-300'}`}></div>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center">
            <Ticket size={18} className="mr-2 text-gray-300" />
            <span className="text-sm text-gray-300">R$ {formattedPricePerTicket} centavos/bilhete</span>
          </div>
          <span className="text-2xl font-bold text-white">R$ {price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketPackageCard;