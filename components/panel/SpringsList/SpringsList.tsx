import React, { useRef } from 'react';
import { Spring } from '@/models/types/spring';
import './SpringsList.css';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import { useSortedSprings } from '@/hooks/useSortedSprings';
import { useCloseFiltersOnScroll } from '@/hooks/useCloseFiltersOnScroll';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton/ScrollToTopButton';

const SpringsList: React.FC<{
  springs: Spring[];
}> = ({ springs }) => {
  const scrollRef = useRef<HTMLElement>(null);
  useCloseFiltersOnScroll(scrollRef);
  const sortedSprings = useSortedSprings(springs);

  return (
    <section
      ref={scrollRef}
      className="springs-options"
    >
      <div className="springs-options-container">
        {sortedSprings.map((spring, index) => (
          <PreviewCard spring={spring} key={spring._id} priority={index < 2} />
        ))}
      </div>
      <ScrollToTopButton scrollRef={scrollRef} />
    </section>
  );
};

export default SpringsList;
