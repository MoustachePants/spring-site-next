'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MainPageContextType {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
  toggleFilters: () => void;
}

const MainPageContext = createContext<MainPageContextType | undefined>(undefined);

export const MainPageContextProvider = ({ children }: { children: ReactNode }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => setIsFiltersOpen((prev) => !prev);

  return (
    <MainPageContext.Provider
      value={{
        isFiltersOpen,
        setIsFiltersOpen,
        toggleFilters,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};

export const useMainPageContext = () => {
  const context = useContext(MainPageContext);
  if (context === undefined) {
    throw new Error('useMainPageContext must be used within a MainPageContextProvider');
  }
  return context;
};
