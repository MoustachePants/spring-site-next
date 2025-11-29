import React from 'react';
import Image from 'next/image';
import './ImageHeader.css';

type ImageHeaderProps = {
  imageSrc?: string;
  imageAlt?: string;
};

const ImageHeader: React.FC<ImageHeaderProps> = ({
  imageSrc = '/mock_image.jpeg', //TODO add the default image
  imageAlt = 'Header Image',
}) => {
  return (
    <header className="image-header">
      <Image src={imageSrc} alt={imageAlt} fill className="image-header-img" priority />
    </header>
  );
};

export default ImageHeader;
