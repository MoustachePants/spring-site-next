import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './ImagesDisplay.css';
import Icons from '@/style/icons';
import { SpringImage } from '@/models/types/spring';

type ImagesDisplayProps = {
  images: SpringImage[];
  initialIndex?: number;
  onClose: () => void;
};

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="images-display-overlay">
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
            src={`/springImages/${images[currentIndex].image}`}
            alt={`Spring image ${currentIndex + 1}`}
            fill
            className="images-display-image"
            priority
          />
        </div>

        <button className="images-display-nav next" onClick={handleNext}>
          <Icons.next />
        </button>
      </div>

      <div className="images-display-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImagesDisplay;
