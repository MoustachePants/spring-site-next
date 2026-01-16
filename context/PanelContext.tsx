'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

type PanelContextType = {
  isScrollAtTop: boolean;
  setIsScrollAtTop: (isAtTop: boolean) => void;
  currentSnapIndex: number;
  setCurrentSnapIndex: (index: number) => void;
  header: ReactNode;
  setHeader: (header: ReactNode) => void;
};

export const PanelContext = createContext<PanelContextType>({
  isScrollAtTop: true,
  setIsScrollAtTop: () => {},
  currentSnapIndex: 2,
  setCurrentSnapIndex: () => {},
  header: null,
  setHeader: () => {},
});

export function usePanelContext() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanelContext must be used within a PanelContextProvider');
  }
  return context;
}

export function PanelContextProvider({ children }: { children: ReactNode }) {
  const [isScrollAtTop, setIsScrollAtTop] = useState<boolean>(true);
  const [currentSnapIndex, setCurrentSnapIndex] = useState<number>(2);
  const [header, setHeader] = useState<ReactNode>(null);

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
    <PanelContext.Provider
      value={{
        isScrollAtTop,
        setIsScrollAtTop,
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
