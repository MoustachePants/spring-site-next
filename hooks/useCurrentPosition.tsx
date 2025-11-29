'use client';

import { UserLocation } from '@/models/types/userLocation';
import { useEffect, useState } from 'react';

export const useCurrentPosition = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const getLocation = () => {
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
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { userLocation, getLocation };
};
