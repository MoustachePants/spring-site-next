import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook to manage scroll-to-top logic.
 * @param scrollRef - Ref of the scrollable container.
 * @param threshold - Pixels scrolled before showing the button.
 */
export const useScrollToTop = (
  scrollRef: RefObject<HTMLElement | null>,
  threshold: number = 300
) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        if (scrollRef.current) {
          setShowButton(scrollRef.current.scrollTop > threshold);
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
  }, [scrollRef, threshold]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { showButton, scrollToTop };
};
