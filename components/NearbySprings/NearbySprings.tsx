import React from 'react';
import './NearbySprings.css';
import Image from 'next/image';
import { Spring } from '@/models/types/spring';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';

type NearbySpringsProps = {
  springs: Spring[];
};

const NearbySprings: React.FC<NearbySpringsProps> = ({ springs }) => {
  return (
    <section className="nearby-springs-container">
      <h2 className="spring-details-section-title">מעיינות נוספים באיזור זה:</h2>
      <div className="nearby-springs-cards-container">
        {springs.map((spring) => (
          <div key={spring._id} className="nearby-springs-card">
            <Image
              src={'/mock_image.jpeg'}
              className="nearby-springs-card-image"
              alt={spring.name}
              width={150}
              height={150}
            />
            <div className="nearby-springs-card-info">
              <h3>{spring.name}</h3>
              <SpringPositionTag position={spring.subRegion} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbySprings;
