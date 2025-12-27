'use client';

import listSprings from '@/app/actions/listSprings';
import { Category, mapPlaces, Place } from '@/models/types/category';
import { Spring } from '@/models/types/spring';
import { UserLocation } from '@/models/types/userLocation';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  setSelectedCategories: (categories: Category[]) => void;
  setSelectedPlaces: (places: Place[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedSpring: (spring: Spring | undefined) => void;
  setUserLocation: (location: UserLocation | null) => void;
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
  setSelectedCategories: () => {},
  setSelectedPlaces: () => {},
  setSearchTerm: () => {},
  setSelectedSpring: () => {},
  setUserLocation: () => {},
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategories = useMemo(() => {
    const param = searchParams.get('categories');
    return param ? (param.split(',') as Category[]) : [];
  }, [searchParams]);

  const selectedPlaces = useMemo(() => {
    const param = searchParams.get('places');
    return param ? (param.split(',') as Place[]) : [];
  }, [searchParams]);

  const searchTerm = searchParams.get('search') || '';

  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  const setSelectedCategories = (categories: Category[]) => {
    updateSearchParams('categories', categories.length > 0 ? categories.join(',') : null);
  };

  const setSelectedPlaces = (places: Place[]) => {
    updateSearchParams('places', places.length > 0 ? places.join(',') : null);
  };

  const setSearchTerm = (term: string) => {
    console.log('setSearchTerm called with:', term);
    updateSearchParams('search', term || null);
  };

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
        selectedCategories,
        selectedPlaces,
        searchTerm,
        selectedSpring,
        userLocation,
        setSelectedCategories,
        setSelectedPlaces,
        setSearchTerm,
        setSelectedSpring,
        setUserLocation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
