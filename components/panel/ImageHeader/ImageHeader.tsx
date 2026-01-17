import React from 'react';
import Image from 'next/image';
import './ImageHeader.css';
import { Spring } from '@/models/types/spring';
import { getSpringImage } from '@/utils/springImage';
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
    <header
      className={`image-header ${spring.images.length === 0 ? 'no-images' : ''}`}
      onClick={handleImageClick}
    >
      <Image
        src={getSpringImage(spring)}
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
