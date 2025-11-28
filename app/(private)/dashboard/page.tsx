'use client';

import { useState } from 'react';
import { NextPage } from 'next';

import dynamic from 'next/dynamic';
import SpringsOptions from '@/components/SpringsOptions/SpringsOptions';
import SlidePanel from '@/components/ui/SlidePanel/SlidePanel';
import './dashboard.css';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const DashboardPage: NextPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="map-wrapper">
        <Map />
      </div>

      {/*<div className="absolute top-4 left-4 z-[1000]">*/}
      {/*  <button*/}
      {/*    onClick={() => setIsPanelOpen(true)}*/}
      {/*    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"*/}
      {/*  >*/}
      {/*    Open Springs Options*/}
      {/*  </button>*/}
      {/*</div>*/}

      <SlidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onOpen={() => setIsPanelOpen(true)}
        title="Springs Options"
      >
        <SpringsOptions />
      </SlidePanel>
    </div>
  );
};

export default DashboardPage;
