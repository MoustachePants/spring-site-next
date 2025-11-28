'use client';

import { Spring } from '@/models/types/spring';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

type DataContextType = {
  springsList: Spring[];
  isSpringsListLoading: boolean;
};

const initialDataContext: DataContextType = {
  springsList: [],
  isSpringsListLoading: true,
};

export const DataContext = createContext<DataContextType | undefined>(initialDataContext);

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [springsList, setSpringsList] = useState<Spring[]>([]);
  const [isSpringsListLoading, setIsSpringsListLoading] = useState<boolean>(true);

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadSpringsList = async () => {
      setIsSpringsListLoading(true);
      try {
        // const result = await fetchGetAllSprings();
        // if (result.status === 'success' && result.data) {
        //   setSpringsList(result.data);
        // }
      } catch (error) {
        console.error('Error loading springs list:', error);
      } finally {
        setIsSpringsListLoading(false);
      }
    };
    if (blockRef.current) loadSpringsList();
    // if (blockRef.current) loadMockData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        springsList,
        isSpringsListLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
