'use client';

import { NextPage } from 'next';
import { useEffect } from 'react';
import '../home.css';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import { useDataContext } from '@/context/DataContext';
import Panel from '@/components/ui/Panel/Panel';
import ListSkeleton from '@/components/loading/skeleton/ListSkeleton/ListSkeleton';

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading, isMapReady, setSelectedSpring } =
    useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
  }, [setSelectedSpring]);

  return (
    <Panel header={<Header />}>
      {!isMapReady || isSpringsListLoading ? (
        <ListSkeleton />
      ) : (
        <SpringsList springs={filteredSpringsList} />
      )}
    </Panel>
  );
};

export default Home;
