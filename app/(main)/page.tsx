'use client';

import { NextPage } from 'next';
import { useEffect } from 'react';
import '../home.css';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import { useDataContext } from '@/context/DataContext';
import LoadingPanel from '@/components/loading/LoadingPanel/LoadingPanel';
import MapPanel from '@/components/ui/MapPanel/MapPanel';
import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading, setSelectedSpring } = useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
  }, [setSelectedSpring]);

  return (
    <MapPanel header={<Header />}>
      {isSpringsListLoading ? <ListSkeleton /> : <SpringsList springs={filteredSpringsList} />}
    </MapPanel>
  );
};

export default Home;
