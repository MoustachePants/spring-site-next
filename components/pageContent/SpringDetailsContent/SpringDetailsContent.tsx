'use client';

import { useEffect } from 'react';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import { useDataContext } from '@/context/DataContext';
import { Spring } from '@/models/types/spring';
import ImagesDisplay from '@/components/panel/ImagesDisplay/ImagesDisplay';
import { useGalleryContext } from '@/context/GalleryContext';

type SpringDetailsContentProps = {
  spring: Spring;
}

const SpringDetailsContent = ({ spring }: SpringDetailsContentProps) => {
  const { setSelectedSpring } = useDataContext();
  const { isOpen, currentSpring, closeGallery } = useGalleryContext();

  useEffect(() => {
    setSelectedSpring(spring);
  }, [spring, setSelectedSpring]);

  return (
    <>
      <SpringDetails spring={spring} />
      {isOpen && currentSpring && <ImagesDisplay spring={currentSpring} onClose={closeGallery} />}
    </>
  );
};

export default SpringDetailsContent;
