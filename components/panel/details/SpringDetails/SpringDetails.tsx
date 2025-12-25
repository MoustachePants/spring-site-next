import React, { useRef } from 'react';
import './SpringDetails.css';
import { Spring } from '@/models/types/spring';
import Icons from '@/style/icons';
import SpringPositionTag from '../../../SpringPositionTag/SpringPositionTag';
import { useDataContext } from '@/context/DataContext';
import TopDetailsActions from '../TopDetailsActions/TopDetailsActions';
import Link from 'next/link';
import NearbySprings from '../NearbySprings/NearbySprings';
import SpringUpdates from '@/components/panel/details/SpringUpdates/SpringUpdates';
import TagsList from '@/components/TagsList/TagsList';
import { springSize, springDepth, springTemp } from '@/utils/springTranslators';

type SpringDetailsProps = {
  spring: Spring;
};

const SpringDetails: React.FC<SpringDetailsProps> = ({ spring }) => {
  const { springsList } = useDataContext();
  const springDetailsRef = useRef<HTMLElement | null>(null);
  const springUpdatesRef = useRef<HTMLElement | null>(null);

  const detailsMapping: { [key: string]: string } = {
    reserve: 'שמורה',
    howDeep: 'עומק',
    temperature: 'טמפרטורה',
    size: 'גודל',
    hasShadow: 'צל',
    hasSitingSpots: 'ישיבה',
    IsAccessible: 'נגישות',
    hasClearWater: 'מים צלולים',
    hasView: 'נוף',
  };

  const nearbySpringList = springsList
    .filter((nearbySpring) => nearbySpring.name !== spring.name)
    .filter((nearbySpring) => nearbySpring.subRegion === spring.subRegion)
    .slice(0, 5);

  const formatValue = (key: string, value: any): string => {
    if (typeof value === 'boolean') {
      return value ? 'כן' : 'לא';
    }
    if (key === 'reserve' && typeof value === 'object') {
      return value.ifReserve ? 'כן' : 'לא';
    }
    return value;
  };

  const renderDetailItem = (label: string, value: any) => (
    <div className="spring-detail-item" key={label}>
      <span className="spring-detail-label">{label}:</span>
      <span className="spring-detail-value">{value}</span>
    </div>
  );

  const scrollToUpdates = () => {
    if (springUpdatesRef.current) {
      springUpdatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="spring-details" ref={springDetailsRef}>
      <header className="spring-details-header">
        <Link
          href="/"
          className="spring-details-back"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Icons.arrowRight />
          <span>לדף הראשי</span>
        </Link>
        <TopDetailsActions scrollToUpdates={scrollToUpdates} />
      </header>
      <section className="spring-details-top-details">
        <h1 className="spring-details-title">{spring.name}</h1>
        <SpringPositionTag position={spring.subRegion} />
        <TagsList spring={spring} />
      </section>

      <div className="spring-details-description">{spring.description}</div>

      <div className="spring-details-separator">--</div>

      <section className="spring-details-bottom-sections">
        <section className="spring-details-section">
          <h2 className="spring-details-section-title">עוד פרטים:</h2>
          <div className="spring-details-grid">
            {renderDetailItem(
              detailsMapping.reserve,
              formatValue('reserve', spring.springDetails.reserve)
            )}
            {renderDetailItem(detailsMapping.size, springSize(spring.springDetails.size))}
            {renderDetailItem(detailsMapping.howDeep, springDepth(spring.springDetails.howDeep))}
            {renderDetailItem(
              detailsMapping.hasSitingSpots,
              formatValue('hasSitingSpots', spring.springDetails.hasSitingSpots)
            )}
            {renderDetailItem(detailsMapping.temperature, springTemp(spring.springDetails.temperature))}
            {renderDetailItem(
              detailsMapping.hasClearWater,
              formatValue('hasClearWater', spring.springDetails.hasClearWater)
            )}
          </div>
        </section>
        <section className="spring-details-section">
          <h2 className="spring-details-section-title">דרכי הגעה:</h2>
          <div className="spring-details-arrival">{spring.location.directions}</div>
        </section>
        <SpringUpdates updates={spring.updates} springId={spring._id} ref={springUpdatesRef} />
        {nearbySpringList.length > 0 && <NearbySprings springs={nearbySpringList} />}
      </section>
    </section>
  );
};

export default SpringDetails;
