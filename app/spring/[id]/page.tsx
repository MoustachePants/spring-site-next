'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Panel from '@/components/ui/Panel/Panel';
import ImageHeader from '@/components/panel/ImageHeader/ImageHeader';
import SpringDetails from '@/components/panel/details/SpringDetails/SpringDetails';
import Loading from '@/components/loading/Loading/Loading';
import { useDataContext } from '@/context/DataContext';
import dynamic from 'next/dynamic';
import '../../home.css';
import { Spring } from '@/models/types/spring';
import getSpring from '@/app/actions/getSpring';

const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false });

const SpringPage = () => {
  const params = useParams();
  const { filteredSpringsList, springsList } = useDataContext();
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
        }
      } catch (error) {
        console.error('Error fetching spring:', error);
      }
    };

    fetchSpring();
  }, [id, springsList]);

  return (
    <main className="dashboard-container">
      <Panel
        header={
          spring && spring.images.length > 0 ? (
            <ImageHeader
              imageSrc={
                spring.images[0].image
                  ? `/springImages/${spring.images[0].image}`
                  : '/water_texture.jpg'
              }
              imageAlt={spring.name}
            />
          ) : undefined
        }
      >
        {spring ? <SpringDetails spring={spring} /> : <Loading />}
      </Panel>
      <section className="map-wrapper">
        <Map springs={filteredSpringsList} selectedSpring={spring} />
      </section>
    </main>
  );
};

export default SpringPage;
