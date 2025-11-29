'use client';

import getSpring from '@/app/actions/getSpring';
import listSprings from '@/app/actions/listSprings';
import { Spring } from '@/models/types/spring';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

type DataContextType = {
  springsList: Spring[];
  isSpringsListLoading: boolean;
  selectedSpring: Spring | undefined;
  getSpringById: (springId: string) => Promise<void>;
};

export const DataContext = createContext<DataContextType>({
  springsList: [],
  isSpringsListLoading: true,
  selectedSpring: undefined,
  getSpringById: async () => {},
});

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
  const [selectedSpring, setSelectedSpring] = useState<Spring | undefined>();

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    const loadSpringsList = async () => {
      setIsSpringsListLoading(true);
      try {
        const response = await listSprings();
        if (!response || response.data?.length === 0) {
          return;
        }
        setSpringsList(response.data || []);
      } catch (error) {
        console.error('Error loading springs list:', error);
      } finally {
        setIsSpringsListLoading(false);
      }
    };
    if (blockRef.current) loadSpringsList();
  }, []);

  const getSpringById = async (springId: string) => {
    setIsSpringsListLoading(true);
    try {
      if (springId) {
        const response = await getSpring(springId);
        if (!response.data) {
          return;
        }
        setSelectedSpring(response.data);
      }
    } catch (error) {
      console.error('Error loading springs list:', error);
    } finally {
      setIsSpringsListLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        springsList,
        isSpringsListLoading,
        selectedSpring,
        getSpringById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
