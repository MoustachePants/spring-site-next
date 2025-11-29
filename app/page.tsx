'use client';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import './home.css';
import DetailsPanel from '@/components/DetailsPanel/DetailsPanel';
import { useDataContext } from '@/context/DataContext';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const Home: NextPage = () => {
  const { springsList, selectedSpring } = useDataContext();

  return (
    <main className="dashboard-container">
      <DetailsPanel />
      <section className="map-wrapper">
        <Map springs={springsList} selectedSpring={selectedSpring} />
      </section>
    </main>
  );
};

export default Home;
