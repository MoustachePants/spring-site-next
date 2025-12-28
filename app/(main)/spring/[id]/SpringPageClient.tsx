'use client';

import React, { useEffect, useState } from 'react';
import ImageHeader from '@/components/panel/ImageHeader/ImageHeader';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import { useDataContext } from '@/context/DataContext';
import { Spring } from '@/models/types/spring';
import getSpring from '@/app/actions/getSpring';
import MapPanel from '@/components/ui/MapPanel/MapPanel';
import DetailsSkeleton from '@/components/loading/skeleton/DetailsSkeleton/DetailsSkeleton';
import ImagesDisplay from '@/components/panel/ImagesDisplay/ImagesDisplay';
import { useGalleryContext } from '@/context/GalleryContext';

interface SpringPageClientProps {
  id: string;
}

const SpringPageClient: React.FC<SpringPageClientProps> = ({ id }) => {
  const { setSelectedSpring } = useDataContext();
  const [spring, setSpring] = useState<Spring | undefined>(undefined);

  const { isOpen, currentSpring, closeGallery } = useGalleryContext();

  useEffect(() => {
    const fetchSpring = async () => {
      if (!id) return;

      try {
        const response = await getSpring(id);
        if (response.data) {
          setSpring(response.data);
          setSelectedSpring(response.data);
        }
      } catch (error) {
        console.error('Error fetching spring:', error);
      }
    };

    fetchSpring();
  }, [id, setSelectedSpring]);

  return (
    <>
      <MapPanel header={spring ? <ImageHeader spring={spring} /> : undefined}>
        {spring ? <SpringDetails spring={spring} /> : <DetailsSkeleton />}
      </MapPanel>
      {isOpen && currentSpring && (
        <ImagesDisplay images={currentSpring.images} onClose={closeGallery} />
      )}
    </>
  );
};

export default SpringPageClient;
