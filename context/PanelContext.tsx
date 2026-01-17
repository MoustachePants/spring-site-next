'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { getSessionItem, setSessionItem, STORAGE_KEYS } from '@/lib/storage';

type PanelContextType = {
  currentSnapIndex: number;
  setCurrentSnapIndex: (index: number) => void;
  header: ReactNode;
  setHeader: (header: ReactNode) => void;
};

export const PanelContext = createContext<PanelContextType>({
  currentSnapIndex: 2,
  setCurrentSnapIndex: () => { },
  header: null,
  setHeader: () => { },
});

export function usePanelContext() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanelContext must be used within a PanelContextProvider');
  }
  return context;
}

export function PanelContextProvider({ children }: { children: ReactNode }) {
  const [currentSnapIndex, setCurrentSnapIndex] = useState<number>(2);
  const [header, setHeader] = useState<ReactNode>(null);

  useEffect(() => {
    const savedSnapIndex = getSessionItem(STORAGE_KEYS.SHEET_SNAP_INDEX);
    if (savedSnapIndex !== null) {
      setCurrentSnapIndex(parseInt(savedSnapIndex, 10));
    }
  }, []);

  const updateSnapIndex = (index: number) => {
    setCurrentSnapIndex(index);
    setSessionItem(STORAGE_KEYS.SHEET_SNAP_INDEX, index.toString());
  };

  return (
    <PanelContext.Provider
      value={{
        currentSnapIndex,
        setCurrentSnapIndex: updateSnapIndex,
        header,
        setHeader,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
