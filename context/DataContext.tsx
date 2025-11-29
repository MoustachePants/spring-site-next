'use client';

import getSpring from '@/app/actions/getSpring';
import listSprings from '@/app/actions/listSprings';
import { Category, mapPlaces, Place } from '@/models/types/category';
import { Spring } from '@/models/types/spring';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

type DataContextType = {
  springsList: Spring[];
  filteredSpringsList: Spring[];
  isSpringsListLoading: boolean;
  selectedSpring: Spring | undefined;
  selectedCategories: Category[];
  selectedPlaces: Place[];
  searchTerm: string;
  getSpringById: (springId: string) => Promise<void>;
  setSelectedCategories: (categories: Category[]) => void;
  setSelectedPlaces: (places: Place[]) => void;
  setSearchTerm: (term: string) => void;
};

export const DataContext = createContext<DataContextType>({
  springsList: [],
  filteredSpringsList: [],
  isSpringsListLoading: true,
  selectedSpring: undefined,
  selectedCategories: [],
  selectedPlaces: [],
  searchTerm: '',
  getSpringById: async () => {},
  setSelectedCategories: () => {},
  setSelectedPlaces: () => {},
  setSearchTerm: () => {},
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

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredSpringsList = useMemo(() => {
    return springsList.filter((spring) => {
      // Filter by search term
      if (searchTerm && !spring.name.includes(searchTerm)) {
        return false;
      }

      // Filter by places (regions)
      if (selectedPlaces.length > 0) {
        const placeValues = selectedPlaces.map((p) => mapPlaces[p]);
        if (!placeValues.includes(spring.mainRegion as any)) return false;
      }

      // Filter by categories
      if (selectedCategories.length > 0) {
        const matchesAllCategories = selectedCategories.every((category) => {
          switch (category) {
            case 'deep':
              return spring.springDetails.isDeep;
            case 'hot':
              return spring.springDetails.isHotSpring;
            case 'accsessible':
              return spring.springDetails.IsAccessible;
            case 'shadow':
              return spring.springDetails.hasShadow;
            case 'view':
              return spring.springDetails.hasView;
            case 'nearCar':
              // Assuming near car means <= 10 minutes walk
              return spring.location.minutesByFoot <= 10;
            case 'sitSpot':
              return spring.springDetails.hasSitingSpots;
            case 'shallow':
              return spring.springDetails.isShallow;
            default:
              return true;
          }
        });
        if (!matchesAllCategories) return false;
      }

      return true;
    });
  }, [springsList, searchTerm, selectedPlaces, selectedCategories]);

  return (
    <DataContext.Provider
      value={{
        springsList,
        filteredSpringsList,
        isSpringsListLoading,
        selectedSpring,
        selectedCategories,
        selectedPlaces,
        searchTerm,
        getSpringById,
        setSelectedCategories,
        setSelectedPlaces,
        setSearchTerm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
