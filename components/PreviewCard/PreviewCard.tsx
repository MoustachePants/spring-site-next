import React from 'react';
import './PreviewCard.css';
import { Spring } from '@/models/types/spring';
import Image from 'next/image';
import Link from 'next/link';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';
import TagsList from '../TagsList/TagsList';

type PreviewCardProps = {
  spring: Spring;
};

const PreviewCard: React.FC<PreviewCardProps> = ({ spring }) => {
  return (
    <Link href={`/spring/${spring._id}`} className="preview-card">
      <Image
        className="preview-card-image"
        width={346}
        height={200}
        src={'/mock_image.jpeg'}
        alt={spring.name}
      />
      <section className="preview-card-info">
        <h3>{spring.name}</h3>
        <SpringPositionTag position={spring.subRegion} />
        <TagsList spring={spring} />
      </section>
    </Link>
  );
};

export default PreviewCard;
