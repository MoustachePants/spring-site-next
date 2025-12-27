import React, { useRef } from 'react';
import './SpringDetails.css';
import { Spring } from '@/models/types/spring';
import DetailsHeader from '../DetailsHeader/DetailsHeader';
import SpringUpdates from '@/components/panel/details/SpringUpdates/SpringUpdates';
import TagsList from '@/components/TagsList/TagsList';
import MoreDetails from '../MoreDetails/MoreDetails';
import { useDataContext } from '@/context/DataContext';
import SpringPositionTag from '../../../SpringPositionTag/SpringPositionTag';
import NearbySprings from '../NearbySprings/NearbySprings';

type SpringDetailsProps = {
  spring: Spring;
};

const SpringDetails: React.FC<SpringDetailsProps> = ({ spring }) => {
  const { springsList } = useDataContext();
  const springDetailsRef = useRef<HTMLElement | null>(null);
  const springUpdatesRef = useRef<HTMLElement | null>(null);

  const nearbySpringList = springsList
    .filter((nearbySpring) => nearbySpring.name !== spring.name)
    .filter((nearbySpring) => nearbySpring.subRegion === spring.subRegion)
    .slice(0, 5);

  return (
    <section className="spring-details" ref={springDetailsRef}>
      <DetailsHeader springUpdatesRef={springUpdatesRef} />
      <section className="spring-details-content">
        <section className="spring-details-top-details">
          <h1 className="spring-details-title">{spring.name}</h1>
          <SpringPositionTag position={spring.subRegion} />
          <TagsList spring={spring} />
        </section>

        <div className="spring-details-description">{spring.description}</div>

        <div className="spring-details-separator">--</div>

        <section className="spring-details-bottom-sections">
          <MoreDetails details={spring.springDetails} />
          <section className="spring-details-section">
            <h2 className="spring-details-section-title">דרכי הגעה:</h2>
            <div className="spring-details-arrival">{spring.location.directions}</div>
          </section>
          <SpringUpdates updates={spring.updates} springId={spring._id} ref={springUpdatesRef} />
          {nearbySpringList.length > 0 && <NearbySprings springs={nearbySpringList} />}
        </section>
      </section>
    </section>
  );
};

export default SpringDetails;
