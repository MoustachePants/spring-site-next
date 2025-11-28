'use client';

import { NextPage } from 'next';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const DashboardPage: NextPage = () => {
  return (
    <div className="h-screen w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="h-[600px] w-full border rounded-lg overflow-hidden">
        <Map />
      </div>
    </div>
  );
};

export default DashboardPage;
