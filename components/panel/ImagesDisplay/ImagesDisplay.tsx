import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import './ImagesDisplay.css';
import Icons from '@/style/icons';
import { Spring } from '@/models/types/spring';
import { getSpringImage } from '@/utils/springImage';

type ImagesDisplayProps = {
  spring: Spring;
  initialIndex?: number;
  onClose: () => void;
};

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ spring, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % spring.images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + spring.images.length) % spring.images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % spring.images.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + spring.images.length) % spring.images.length);
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!mounted || !spring.images || spring.images.length === 0) return null;

  return createPortal(
    <div
      className="images-display-overlay"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="images-display-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Icons.close />
      </button>

      <div className="images-display-content" onClick={(e) => e.stopPropagation()}>
        <button className="images-display-nav prev" onClick={handlePrev}>
          <Icons.prev />
        </button>

        <div className="images-display-image-container">
          <Image
            src={getSpringImage(spring, currentIndex)}
            alt={`Spring image ${currentIndex + 1}`}
            fill
            className="images-display-image"
            sizes="100vw"
            loading="eager"
          />
        </div>

        <button className="images-display-nav next" onClick={handleNext}>
          <Icons.next />
        </button>
      </div>

      <div className="images-display-counter">
        {currentIndex + 1} / {spring.images.length}
      </div>

      {spring.images[currentIndex].credit && (
        <div className="images-display-credit">
          <span>צילום: </span>
          {spring.images[currentIndex].link ? (
            <a
              href={spring.images[currentIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {spring.images[currentIndex].credit}
            </a>
          ) : (
            <span>{spring.images[currentIndex].credit}</span>
          )}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImagesDisplay;
