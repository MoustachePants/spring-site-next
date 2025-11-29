import React from 'react';
import Image from 'next/image';
import './ImageHeader.css';

type ImageHeaderProps = {
  src?: string;
  alt?: string;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({
  src = '/mock_image.jpeg',
  alt = 'Header Image',
}) => {
  return (
    <header className="image-header">
      <Image src={'/mock_image.jpeg'} alt={alt} fill className="image-header-img" priority />
    </header>
  );
};

export default ImageHeader;
