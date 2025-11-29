import React from 'react';
import './NearbySprings.css';
import { Spring } from '@/models/types/spring';
import SmallPreviewCard from '../SmallPreviewCard/SmallPreviewCard';

type NearbySpringsProps = {
  springs: Spring[];
};

const NearbySprings: React.FC<NearbySpringsProps> = ({ springs }) => {
  return (
    <section className="nearby-springs-container">
      <h2 className="spring-details-section-title">מעיינות נוספים באיזור זה:</h2>
      <div className="nearby-springs-cards-container">
        {springs.map((spring) => (
          <SmallPreviewCard key={spring._id} spring={spring} />
        ))}
      </div>
    </section>
  );
};

export default NearbySprings;
