import React from 'react';
import './MoreDetails.css';
import { SpringDetails as SpringDetailsType } from '@/models/types/spring';
import { detailsMapping } from '@/resources/mapDetails';
import { springSize, springDepth, springTemp } from '@/utils/springTranslators';

type MoreDetailsProps = {
  details: SpringDetailsType;
};

const MoreDetails: React.FC<MoreDetailsProps> = ({ details }) => {
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

  return (
    <section className="spring-details-section">
      <h2 className="spring-details-section-title">עוד פרטים:</h2>
      <div className="spring-details-grid">
        {renderDetailItem(detailsMapping.reserve, formatValue('reserve', details.reserve))}
        {renderDetailItem(detailsMapping.size, springSize(details.size))}
        {renderDetailItem(detailsMapping.howDeep, springDepth(details.howDeep))}
        {renderDetailItem(
          detailsMapping.hasSitingSpots,
          formatValue('hasSitingSpots', details.hasSitingSpots)
        )}
        {renderDetailItem(detailsMapping.temperature, springTemp(details.temperature))}
        {renderDetailItem(
          detailsMapping.hasClearWater,
          formatValue('hasClearWater', details.hasClearWater)
        )}
      </div>
    </section>
  );
};

export default MoreDetails;
