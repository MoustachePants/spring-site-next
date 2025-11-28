'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';

import dynamic from 'next/dynamic';
import SpringsOptions from '@/components/SpringsOptions/SpringsOptions';
import './dashboard.css';
import { Spring } from '@/models/types/spring';
import { UserLocation } from '@/models/types/userLocation';
import listSprings from '@/app/actions/listSprings';
import Header from '@/components/Header/Header';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const DashboardPage: NextPage = () => {
  const [springs, setSprings] = useState<Spring[]>([]);
  const [selectedSpring, setSelectedSpring] = useState<Spring>();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const fetchSprings = async () => {
      const springResponse = await listSprings();
      if (!springResponse || springResponse.data?.length === 0) {
        return;
      }

      console.log(springResponse.data);
      setSprings(springResponse.data || []);
    };

    fetchSprings();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Optionally handle error (e.g., show a toast notification)
        }
      );
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Header />
        <SpringsOptions springs={springs} setSelectedSpring={setSelectedSpring} />
      </div>
      <div className="map-wrapper">
        <Map springs={springs} selectedSpring={selectedSpring} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default DashboardPage;
