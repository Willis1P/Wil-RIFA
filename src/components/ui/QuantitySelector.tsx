import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 100
}: QuantitySelectorProps) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className={`p-2 ${
          value <= min
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:text-black'
        }`}
      >
        <Minus size={20} />
      </button>
      
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-14 text-center border-0 focus:ring-0"
      />
      
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className={`p-2 ${
          value >= max
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:text-black'
        }`}
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default QuantitySelector;