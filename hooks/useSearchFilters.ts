import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Category, Place } from '@/models/types/category';

export const useSearchFilters = () => {
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
    updateSearchParams('search', term || null);
  };

  return {
    selectedCategories,
    selectedPlaces,
    searchTerm,
    setSelectedCategories,
    setSelectedPlaces,
    setSearchTerm,
  };
};
