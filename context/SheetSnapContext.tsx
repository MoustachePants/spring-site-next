'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

type SheetSnapContextType = {
  currentSnapIndex: number;
  setCurrentSnapIndex: (index: number) => void;
};

const SheetSnapContext = createContext<SheetSnapContextType | undefined>(undefined);

export function useSheetSnapContext() {
  const context = useContext(SheetSnapContext);
  if (context === undefined) {
    throw new Error('useSheetSnapContext must be used within a SheetSnapContextProvider');
  }
  return context;
}

export function SheetSnapContextProvider({ children }: { children: ReactNode }) {
  const [currentSnapIndex, setCurrentSnapIndex] = useState<number>(2);

  useEffect(() => {
    const savedSnapIndex = sessionStorage.getItem('sheetSnapIndex');
    if (savedSnapIndex !== null) {
      setCurrentSnapIndex(parseInt(savedSnapIndex, 10));
    }
  }, []);

  const updateSnapIndex = (index: number) => {
    setCurrentSnapIndex(index);
    sessionStorage.setItem('sheetSnapIndex', index.toString());
  };

  return (
    <SheetSnapContext.Provider
      value={{
        currentSnapIndex,
        setCurrentSnapIndex: updateSnapIndex,
      }}
    >
      {children}
    </SheetSnapContext.Provider>
  );
}
