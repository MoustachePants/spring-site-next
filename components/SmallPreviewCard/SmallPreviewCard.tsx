import React from 'react';
import './SmallPreviewCard.css';
import Image from 'next/image';
import { Spring } from '@/models/types/spring';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';
import Link from 'next/link';
import { getSpringImage } from '@/utils/springImage';

type SmallPreviewCardProps = {
  spring: Spring;
};

const SmallPreviewCard: React.FC<SmallPreviewCardProps> = ({ spring }) => {
  return (
    <Link href={`/spring/${spring._id}`} key={spring._id} className="nearby-springs-card">
      <Image
        src={getSpringImage(spring)}
        className="nearby-springs-card-image"
        alt={spring.name}
        width={150}
        height={150}
        sizes="150px"
      />
      <div className="nearby-springs-card-info">
        <h3>{spring.name}</h3>
        <SpringPositionTag position={spring.subRegion} />
      </div>
    </Link>
  );
};

export default SmallPreviewCard;
