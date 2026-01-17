import React from 'react';
import './ScrollToTopButton.css';
import Icons from '@/style/icons';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopButtonProps {
  scrollRef: React.RefObject<HTMLElement | null>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollRef }) => {
  const { showButton, scrollToTop } = useScrollToTop(scrollRef);

  if (!showButton) return null;

  return (
    <button 
      className="scroll-to-top-btn" 
      onClick={scrollToTop} 
      aria-label="Scroll to top"
    >
      <Icons.arrowUp />
    </button>
  );
};

export default ScrollToTopButton;
