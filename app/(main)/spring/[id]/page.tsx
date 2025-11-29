'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Panel from '@/components/ui/Panel/Panel';
import ImageHeader from '@/components/panel/ImageHeader/ImageHeader';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import { useDataContext } from '@/context/DataContext';
import '../../../home.css';
import { Spring } from '@/models/types/spring';
import getSpring from '@/app/actions/getSpring';
import LoadingPanel from '@/components/loading/LoadingPanel/LoadingPanel';

const SpringPage: React.FC = () => {
  const params = useParams();
  const { filteredSpringsList, springsList, setSelectedSpring } = useDataContext();
  const id = params.id as string;
  const [spring, setSpring] = useState<Spring | undefined>(undefined);

  useEffect(() => {
    const fetchSpring = async () => {
      if (!id) return;

      // // First try to find in loaded list
      // const found = springsList.find((s) => s._id === id);
      // if (found) {
      //   setSpring(found);
      //   return;
      // }

      // If not found, fetch from API
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
  }, [id, springsList, setSelectedSpring]);

  return (
    <Panel
      header={spring && spring.images.length > 0 ? <ImageHeader spring={spring} /> : undefined}
    >
      {spring ? <SpringDetails spring={spring} /> : <LoadingPanel />}
    </Panel>
  );
};

export default SpringPage;
