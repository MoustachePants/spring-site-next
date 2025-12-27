import React, { useState } from 'react';
import Image from 'next/image';
import './ImageHeader.css';
import { Spring } from '@/models/types/spring';
import { getImage } from '@/utils/image';
import ImagesDisplay from '../ImagesDisplay/ImagesDisplay';

type ImageHeaderProps = {
  spring: Spring;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({ spring }) => {
  const [showGallery, setShowGallery] = useState(false);

  const handleImageClick = () => {
    if (spring.images.length > 0) {
      setShowGallery(true);
    }
  };

  const handleClose = () => {
    setShowGallery(false);
  };

  return (
    <header className="image-header" onClick={handleImageClick}>
      <Image
        src={getImage(spring)}
        alt={spring?.name || 'מעיין'}
        fill
        className="image-header-img"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {showGallery ? <ImagesDisplay images={spring.images} onClose={handleClose} /> : null}
    </header>
  );
};

export default ImageHeader;
