'use client';

import { NextPage } from 'next';

import dynamic from 'next/dynamic';
import SpringsOptions from '@/components/SpringsOptions/SpringsOptions';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const DashboardPage: NextPage = () => {
  return (
    <div className="h-screen w-full p-4 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="h-[600px] w-full border rounded-lg overflow-hidden">
          <Map />
        </div>
      </div>
      <SpringsOptions />
    </div>
  );
};

export default DashboardPage;
