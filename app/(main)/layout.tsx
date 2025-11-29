'use client';

import dynamic from 'next/dynamic';
import '../home.css';
import MapFooter from '@/components/MapFooter/MapFooter';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="main-container">
      {children}
      <section className="map-wrapper">
        <Map />
        <MapFooter />
      </section>
    </main>
  );
}
