'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Video {
  id: number;
  title: string;
  link: string;
  tokens: number;
}

// Define the shape of the context state
interface BalanceContextType {
  accountAddress: string;
  totalBalance: number;
  viewSecCost: number;
  deductCost: (amount: number) => void;
  videos: Video[]; // Add videos to the context type
}

// Create the context with a default value
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Create a provider component
export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [totalBalance, setTotalBalance] = useState(1000); // Initial balance
  const viewSecCost = 1; // Cost per second
  const accountAddress = '0x1234567890123456789012345678901234567890';

  const videos: Video[] = [
    { id: 1, title: "Video 1", link: "/video-1", tokens: 45.233 },
    { id: 2, title: "Video 2", link: "/video-2", tokens: 11.233 },
    { id: 3, title: "Video 3", link: "/video-3", tokens: 4.213 },
    { id: 4, title: "Video 4", link: "/video-4", tokens: 5.133 },
  ];

  const deductCost = (amount: number) => {
    setTotalBalance((prevBalance) => prevBalance - amount);
  };

  const value = {
    accountAddress,
    totalBalance,
    viewSecCost,
    deductCost,
    videos,
  };

  return (
    <BalanceContext.Provider value={value}>
      {children}
    </BalanceContext.Provider>
  );
};

// Create a custom hook to use the balance context
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};