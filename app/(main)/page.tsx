'use client';

import { NextPage } from 'next';
import { useEffect } from 'react';
import '../home.css';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import { useDataContext } from '@/context/DataContext';
import MapPanel from '@/components/ui/MapPanel/MapPanel';
import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading, isMapReady, setSelectedSpring } =
    useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
  }, [setSelectedSpring]);

  return (
    <MapPanel header={<Header />}>
      {!isMapReady || isSpringsListLoading ? (
        <ListSkeleton />
      ) : (
        <SpringsList springs={filteredSpringsList} />
      )}
    </MapPanel>
  );
};

export default Home;
