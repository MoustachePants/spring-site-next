'use client';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import './home.css';
import Panel from '@/components/ui/Panel/Panel';
import Header from '@/components/panel/Header/Header';
import SpringsList from '@/components/panel/SpringsList/SpringsList';
import Loading from '@/components/loading/Loading/Loading';
import { useDataContext } from '@/context/DataContext';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const Home: NextPage = () => {
  const { filteredSpringsList, isSpringsListLoading } = useDataContext();

  return (
    <main className="dashboard-container">
      <Panel header={<Header />}>
        {isSpringsListLoading ? <Loading /> : <SpringsList springs={filteredSpringsList} />}
      </Panel>
      <section className="map-wrapper">
        <Map springs={filteredSpringsList} />
      </section>
    </main>
  );
};

export default Home;
