'use client';

import { NextPage } from 'next';
import { useEffect } from 'react';
import '../home.css';
import Panel from '@/components/ui/Panel/Panel';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import { useDataContext } from '@/context/DataContext';
import LoadingPanel from '@/components/loading/LoadingPanel/LoadingPanel';

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading, setSelectedSpring } = useDataContext();

  useEffect(() => {
    setSelectedSpring(undefined);
  }, [setSelectedSpring]);

  return (
    <Panel header={<Header />}>
      {isSpringsListLoading ? <LoadingPanel /> : <SpringsList springs={filteredSpringsList} />}
    </Panel>
  );
};

export default Home;
