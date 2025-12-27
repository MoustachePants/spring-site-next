import React, { useMemo, useRef, useEffect } from 'react';
import { Spring } from '@/models/types/spring';
import './SpringsList.css';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import { useDataContext } from '@/context/DataContext';
import { usePanelContext } from '@/context/PanelContext';
import { calculateDistanceBetweenCoords } from '@/utils/distance';

const SpringsList: React.FC<{
  springs: Spring[];
}> = ({ springs }) => {
  const { userLocation } = useDataContext();
  const { setIsScrollAtTop } = usePanelContext();
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      const hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
      const isAtTop = scrollTop === 0;

      if (hasScroll) {
        setIsScrollAtTop(isAtTop);
        if (isAtTop) {
          // Scroll reached the top
          console.log('Scroll reached the top - no more scroll up available');
        }
      } else {
        setIsScrollAtTop(true);
      }
    };

    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [setIsScrollAtTop]);

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

  return (
    <section ref={scrollRef} className="springs-options-scroll">
      <div className="springs-options-container">
        {sortedSprings.map((spring, index) => (
          <PreviewCard spring={spring} key={spring._id} priority={index < 2} />
        ))}
      </div>
    </section>
  );
};

export default SpringsList;
