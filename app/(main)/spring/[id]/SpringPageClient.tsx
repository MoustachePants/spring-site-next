'use client';

import React, { useEffect, useState } from 'react';
import ImageHeader from '@/components/panel/ImageHeader/ImageHeader';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import { useDataContext } from '@/context/DataContext';
import { Spring } from '@/models/types/spring';
import getSpring from '@/app/actions/getSpring';
import LoadingPanel from '@/components/loading/LoadingPanel/LoadingPanel';
import MapPanel from '@/components/ui/MapPanel/MapPanel';

interface SpringPageClientProps {
  id: string;
}

const SpringPageClient: React.FC<SpringPageClientProps> = ({ id }) => {
  const { setSelectedSpring } = useDataContext();
  const [spring, setSpring] = useState<Spring | undefined>(undefined);

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
    <MapPanel
      header={spring && spring.images.length > 0 ? <ImageHeader spring={spring} /> : undefined}
    >
      {spring ? <SpringDetails spring={spring} /> : <LoadingPanel />}
    </MapPanel>
  );
};

export default SpringPageClient;

