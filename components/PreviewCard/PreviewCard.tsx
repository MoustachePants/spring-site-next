import React from 'react';
import './PreviewCard.css';
import { Spring } from '@/models/types/spring';
import Image from 'next/image';
import Link from 'next/link';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';
import TagsList from '../TagsList/TagsList';
import { getImage } from '@/utils/image';

type PreviewCardProps = {
  spring: Spring;
};

const PreviewCard: React.FC<PreviewCardProps> = ({ spring }) => {
  return (
    <Link href={`/spring/${spring._id}`} className="preview-card">
      <Image
        className="preview-card-image"
        width={400}
        height={230}
        src={getImage(spring)}
        alt={spring?.name || 'מעיין'}
      />
      <section className="preview-card-info">
        <h3>{spring?.name || 'מעיין'}</h3>
        <SpringPositionTag position={spring.subRegion} />
        <TagsList spring={spring} limit={3} />
      </section>
    </Link>
  );
};

export default PreviewCard;
