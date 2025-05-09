import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Package {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

interface RaffleCode {
  code: string;
  tickets: string[];
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  purchaseDate: Date;
  status: 'pending' | 'completed' | 'drawn';
  totalAmount: number;
}

interface RaffleCodeContextType {
  generateRaffleCode: (buyerInfo: {
    name: string;
    phone: string;
    email: string;
    tickets: string[];
    totalAmount: number;
  }) => string;
  getRaffleByCode: (code: string) => RaffleCode | null;
  raffleCode: string | null;
  setRaffleCode: (code: string) => void;
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
}

const RaffleCodeContext = createContext<RaffleCodeContextType | undefined>(undefined);

export const useRaffleCode = () => {
  const context = useContext(RaffleCodeContext);
  if (context === undefined) {
    throw new Error('useRaffleCode must be used within a RaffleCodeProvider');
  }
  return context;
};

export const RaffleCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [raffles, setRaffles] = useState<Record<string, RaffleCode>>({});
  const [raffleCode, setRaffleCode] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const generateUniqueCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const generateRaffleCode = (buyerInfo: {
    name: string;
    phone: string;
    email: string;
    tickets: string[];
    totalAmount: number;
  }) => {
    let code = generateUniqueCode();
    while (raffles[code]) {
      code = generateUniqueCode();
    }

    const newRaffle: RaffleCode = {
      code,
      tickets: buyerInfo.tickets,
      buyerName: buyerInfo.name,
      buyerPhone: buyerInfo.phone,
      buyerEmail: buyerInfo.email,
      purchaseDate: new Date(),
      status: 'pending',
      totalAmount: buyerInfo.totalAmount,
    };

    setRaffles(prev => ({
      ...prev,
      [code]: newRaffle
    }));

    return code;
  };

  const getRaffleByCode = (code: string): RaffleCode | null => {
    return raffles[code] || null;
  };

  return (
    <RaffleCodeContext.Provider value={{
      generateRaffleCode,
      getRaffleByCode,
      raffleCode,
      setRaffleCode,
      selectedPackage,
      setSelectedPackage
    }}>
      {children}
    </RaffleCodeContext.Provider>
  );
}; 