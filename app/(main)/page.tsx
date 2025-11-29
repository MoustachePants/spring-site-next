'use client';

import { NextPage } from 'next';
import React, { useEffect } from 'react';
import '../home.css';
import Panel from '@/components/ui/Panel/Panel';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import Loading from '@/components/loading/Loading/Loading';
import { useDataContext } from '@/context/DataContext';

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading, setSelectedSpring } = useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
  }, [setSelectedSpring]);

  return (
    <Panel header={<Header />}>
      {isSpringsListLoading ? <Loading /> : <SpringsList springs={filteredSpringsList} />}
    </Panel>
  );
};

export default Home;
