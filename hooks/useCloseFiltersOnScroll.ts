import { useEffect, RefObject } from 'react';
import { useMainPageContext } from '@/context/MainPageContext';

/**
 * Hook to automatically close the filters section when the user scrolls down.
 * @param scrollRef - The ref of the scrollable container to monitor.
 * @param threshold - The number of pixels to scroll before closing (default: 10).
 */
export const useCloseFiltersOnScroll = (
  scrollRef: RefObject<HTMLElement | null>,
  threshold: number = 10
) => {
  const { isFiltersOpen, setIsFiltersOpen } = useMainPageContext();

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        if (isFiltersOpen && scrollRef.current && scrollRef.current.scrollTop > threshold) {
          setIsFiltersOpen(false);
        }
      });
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(timeoutId);
    };
  }, [isFiltersOpen, setIsFiltersOpen, scrollRef, threshold]);
};
