import { createContext, useState, useContext, ReactNode } from 'react';

export interface TicketPackage {
  id: number;
  quantity: number;
  price: number;
  pricePerTicket: number;
  popular?: boolean;
}

interface CartItem {
  packageId: number;
  quantity: number;
  price: number;
}

interface RaffleContextType {
  availablePackages: TicketPackage[];
  cart: CartItem | null;
  selectPackage: (packageId: number) => void;
  clearCart: () => void;
  updateQuantity: (quantity: number) => void;
  totalPrice: number;
  totalTickets: number;
  drawDate: Date;
}

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const [availablePackages] = useState<TicketPackage[]>([
    { id: 1, quantity: 100, price: 10, pricePerTicket: 0.10 },
    { id: 2, quantity: 400, price: 38, pricePerTicket: 0.095 },
    { id: 3, quantity: 1000, price: 90, pricePerTicket: 0.09, popular: true },
    { id: 4, quantity: 4000, price: 340, pricePerTicket: 0.085 },
    { id: 5, quantity: 5000, price: 400, pricePerTicket: 0.08 },
    { id: 6, quantity: 7000, price: 525, pricePerTicket: 0.075 }
  ]);

  const [cart, setCart] = useState<CartItem | null>(null);
  const [drawDate] = useState<Date>(new Date('2025-12-31T23:59:59'));

  const selectPackage = (packageId: number) => {
    const selectedPackage = availablePackages.find(pkg => pkg.id === packageId);
    if (selectedPackage) {
      setCart({
        packageId,
        quantity: 1,
        price: selectedPackage.price
      });
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const updateQuantity = (quantity: number) => {
    if (!cart) return;
    
    const selectedPackage = availablePackages.find(pkg => pkg.id === cart.packageId);
    if (selectedPackage) {
      setCart({
        ...cart,
        quantity: quantity,
        price: selectedPackage.price * quantity
      });
    }
  };

  const totalPrice = cart ? cart.price : 0;
  
  const totalTickets = cart 
    ? availablePackages.find(pkg => pkg.id === cart.packageId)?.quantity * cart.quantity || 0
    : 0;

  return (
    <RaffleContext.Provider value={{
      availablePackages,
      cart,
      selectPackage,
      clearCart,
      updateQuantity,
      totalPrice,
      totalTickets,
      drawDate
    }}>
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = (): RaffleContextType => {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error('useRaffle must be used within a RaffleProvider');
  }
  return context;
};