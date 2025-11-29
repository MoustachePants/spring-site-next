'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import './home.css';
import { Spring } from '@/models/types/spring';
import { UserLocation } from '@/models/types/userLocation';
import listSprings from '@/app/actions/listSprings';
import getSpring from '@/app/actions/getSpring';
import DetailsPanel from '@/components/DetailsPanel/DetailsPanel';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const Home: NextPage = () => {
  const [springs, setSprings] = useState<Spring[]>([]);
  const [selectedSpring, setSelectedSpring] = useState<Spring>();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const fetchSpring = async () => {
      if (selectedSpring?._id) {
        const spring = await getSpring(selectedSpring?._id);
        console.log('spring:', spring);
      }
    };

    fetchSpring();
  }, [selectedSpring]);

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
    <main className="dashboard-container">
      <DetailsPanel springs={springs} setSelectedSpring={setSelectedSpring} />
      <section className="map-wrapper">
        <Map springs={springs} selectedSpring={selectedSpring} userLocation={userLocation} />
      </section>
    </main>
  );
};

export default Home;
