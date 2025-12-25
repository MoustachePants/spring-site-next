'use client';

import { useDataContext } from '@/context/DataContext';
import { useEffect } from 'react';

export const useCurrentPosition = () => {
  const { userLocation, setUserLocation } = useDataContext();

  const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { userLocation, getLocation };
};
