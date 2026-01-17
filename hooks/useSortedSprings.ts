import { useMemo } from 'react';
import { Spring } from '@/models/types/spring';
import { useDataContext } from '@/context/DataContext';
import { calculateDistanceBetweenCoords } from '@/utils/distance';

/**
 * Custom hook to sort springs based on user location or image availability.
 * If user location is available, sorts by distance.
 * Otherwise, sorts springs with images to the top.
 */
export const useSortedSprings = (springs: Spring[]) => {
  const { userLocation } = useDataContext();

  const sortedSprings = useMemo(() => {
    return [...springs].sort((a, b) => {
      if (!userLocation) {
        const aHasImages = a.images && a.images.length > 0;
        const bHasImages = b.images && b.images.length > 0;

        if (aHasImages && !bHasImages) return -1;
        if (!aHasImages && bHasImages) return 1;
        return 0;
      }

      const distanceA = calculateDistanceBetweenCoords(
        userLocation.latitude,
        userLocation.longitude,
        a.location.coordinates.pool[0],
        a.location.coordinates.pool[1]
      );

      const distanceB = calculateDistanceBetweenCoords(
        userLocation.latitude,
        userLocation.longitude,
        b.location.coordinates.pool[0],
        b.location.coordinates.pool[1]
      );

      return distanceA - distanceB;
    });
  }, [springs, userLocation]);

  return sortedSprings;
};
