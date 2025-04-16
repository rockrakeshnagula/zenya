import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextProps {
  isTransparent: boolean;
  setIsTransparent: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransparent, setIsTransparent] = useState(true);

  return (
    <HeaderContext.Provider value={{ isTransparent, setIsTransparent }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextProps => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};