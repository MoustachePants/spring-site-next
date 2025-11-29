import React from 'react';
import './SmallPreviewCard.css';
import Image from 'next/image';
import { Spring } from '@/models/types/spring';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';

type SmallPreviewCardProps = {
  spring: Spring;
};

const SmallPreviewCard: React.FC<SmallPreviewCardProps> = ({ spring }) => {
  return (
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
  );
};

export default SmallPreviewCard;
