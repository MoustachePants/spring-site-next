'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type PanelContextType = {
  isScrollAtTop: boolean;
  setIsScrollAtTop: (isAtTop: boolean) => void;
};

export const PanelContext = createContext<PanelContextType>({
  isScrollAtTop: true,
  setIsScrollAtTop: () => {},
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

  return (
    <PanelContext.Provider
      value={{
        isScrollAtTop,
        setIsScrollAtTop,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
