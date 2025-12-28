'use client';

import { Dispatch, SetStateAction } from 'react';
import listSprings from '@/app/actions/listSprings';
import { Category, mapPlaces, Place } from '@/models/types/category';
import { Spring } from '@/models/types/spring';
import { UserLocation } from '@/models/types/userLocation';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { checkSpringByCategory } from '@/utils/category';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

type DataContextType = {
  springsList: Spring[];
  filteredSpringsList: Spring[];
  isSpringsListLoading: boolean;
  selectedCategories: Category[];
  selectedPlaces: Place[];
  searchTerm: string;
  selectedSpring: Spring | undefined;
  userLocation: UserLocation | null;
  isMapReady: boolean;
  setSelectedCategories: (categories: Category[]) => void;
  setSelectedPlaces: (places: Place[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedSpring: (spring: Spring | undefined) => void;
  setUserLocation: (location: UserLocation | null) => void;
  setIsMapReady: Dispatch<SetStateAction<boolean>>;
  getLocation: () => void;
};

export const DataContext = createContext<DataContextType>({
  springsList: [],
  filteredSpringsList: [],
  isSpringsListLoading: true,
  selectedCategories: [],
  selectedPlaces: [],
  searchTerm: '',
  selectedSpring: undefined,
  userLocation: null,
  isMapReady: false,
  setSelectedCategories: () => {},
  setSelectedPlaces: () => {},
  setSearchTerm: () => {},
  setSelectedSpring: () => {},
  setUserLocation: () => {},
  setIsMapReady: () => {},
  getLocation: () => {},
});

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}

export function DataContextProvider({
  children,
  initialSprings,
}: {
  children: ReactNode;
  initialSprings?: Spring[];
}) {
  const [springsList, setSpringsList] = useState<Spring[]>(initialSprings || []);
  const [isSpringsListLoading, setIsSpringsListLoading] = useState<boolean>(!initialSprings);
  const [selectedSpring, setSelectedSpring] = useState<Spring | undefined>(undefined);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  const {
    selectedCategories,
    selectedPlaces,
    searchTerm,
    setSelectedCategories,
    setSelectedPlaces,
    setSearchTerm,
  } = useSearchFilters();

  const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    if (initialSprings && initialSprings.length > 0) {
      return;
    }

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
  }, [initialSprings]);

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
          return checkSpringByCategory(spring, category);
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
        selectedCategories,
        selectedPlaces,
        searchTerm,
        selectedSpring,
        userLocation,
        isMapReady,
        setSelectedCategories,
        setSelectedPlaces,
        setSearchTerm,
        setSelectedSpring,
        setUserLocation,
        setIsMapReady,
        getLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
