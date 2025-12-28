import React from 'react';
import Image from 'next/image';
import './ImageHeader.css';
import { Spring } from '@/models/types/spring';
import { getImage } from '@/utils/image';
import { useGalleryContext } from '@/context/GalleryContext';

type ImageHeaderProps = {
  spring: Spring;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({ spring }) => {
  const { openGallery } = useGalleryContext();

  const handleImageClick = () => {
    if (spring.images.length > 0) {
      openGallery(spring);
    }
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
    </header>
  );
};

export default ImageHeader;
