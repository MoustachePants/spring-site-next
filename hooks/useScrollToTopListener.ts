import { useRef, useEffect } from 'react';
import { usePanelContext } from '@/context/PanelContext';

/**
 * Hook to track if a scrollable element is at the top.
 * Updates the PanelContext's isScrollAtTop state.
 * Returns a ref to be attached to the scrollable element.
 */
export const useScrollToTopListener = () => {
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
      } else {
        // Consider as "at top"
        setIsScrollAtTop(true);
      }
    };

    // Initial check
    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [setIsScrollAtTop]);

  return scrollRef;
};
