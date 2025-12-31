'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageHeader from '@/components/panel/ImageHeader/ImageHeader';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import { useDataContext } from '@/context/DataContext';
import { Spring } from '@/models/types/spring';
import getSpring from '@/app/actions/getSpring';
import MapPanel from '@/components/ui/MapPanel/MapPanel';
import DetailsSkeleton from '@/components/loading/skeleton/DetailsSkeleton/DetailsSkeleton';
import ImagesDisplay from '@/components/panel/ImagesDisplay/ImagesDisplay';
import { useGalleryContext } from '@/context/GalleryContext';
import ImgHeaderSkeleton from '@/components/loading/skeleton/ImgHeaderSkeleton/ImgHeaderSkeleton';

export default function SpringPage() {
  const params = useParams();
  const id = params?.id as string;
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
      <MapPanel header={spring ? <ImageHeader spring={spring} /> : <ImgHeaderSkeleton />}>
        {spring ? <SpringDetails spring={spring} /> : <DetailsSkeleton />}
      </MapPanel>
      {isOpen && currentSpring && (
        <ImagesDisplay images={currentSpring.images} onClose={closeGallery} />
      )}
    </>
  );
}
