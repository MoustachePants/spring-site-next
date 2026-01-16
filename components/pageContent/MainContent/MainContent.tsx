'use client';

import { useEffect } from 'react';
import { Spring } from '@/models/types/spring';
import { useDataContext } from '@/context/DataContext';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';

type MainContentProps = {
  initialSprings: Spring[];
}

const MainContent = ({ initialSprings }: MainContentProps) => {
  const {
    filteredSpringsList,
    isSpringsListLoading,
    isMapReady,
    setSelectedSpring,
    setSpringsList,
  } = useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
    if (initialSprings.length > 0) {
      setSpringsList(initialSprings);
    }
  }, [setSelectedSpring, initialSprings, setSpringsList]);

  const displaySprings = isMapReady ? filteredSpringsList : initialSprings;

  if (isSpringsListLoading && !initialSprings.length) return <ListSkeleton />;

  return <SpringsList springs={displaySprings} />;
};

export default MainContent;
