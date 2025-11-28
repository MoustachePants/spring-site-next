'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';

import dynamic from 'next/dynamic';
import SpringsOptions from '@/components/SpringsOptions/SpringsOptions';
import SlidePanel from '@/components/ui/SlidePanel/SlidePanel';
import './dashboard.css';
import { Spring } from '@/models/types/spring';
import listSprings from '@/app/actions/listSprings';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const DashboardPage: NextPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [springs, setSprings] = useState<Spring[]>([]);

  useEffect(() => {
    const fetchSprings = async () => {
      const springResponse = await listSprings();
      if (!springResponse || springResponse.data?.length === 0) {
        return;
      }

      setSprings(springResponse.data || []);
    };

    fetchSprings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="map-wrapper">
        <Map springs={springs} />
      </div>

      <SlidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onOpen={() => setIsPanelOpen(true)}
        title="Springs Options"
      >
        <SpringsOptions springs={springs} />
      </SlidePanel>
    </div>
  );
};

export default DashboardPage;
