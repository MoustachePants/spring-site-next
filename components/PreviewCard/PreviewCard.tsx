import React from 'react';
import './PreviewCard.css';
import { Spring } from '@/models/types/spring';
import Image from 'next/image';
import Link from 'next/link';
import SpringPositionTag from '../SpringPositionTag/SpringPositionTag';
import TagsList from '../TagsList/TagsList';
import { getSpringImage } from '@/utils/springImage';

type PreviewCardProps = {
  spring: Spring;
  priority?: boolean;
};

const PreviewCard: React.FC<PreviewCardProps> = ({ spring, priority = false }) => {
  return (
    <Link href={`/spring/${spring._id}`} className="preview-card">
      <Image
        className="preview-card-image"
        width={400}
        height={230}
        src={getSpringImage(spring)}
        alt={spring?.name || 'מעיין'}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        priority={priority}
      />
      <section className="preview-card-info">
        <h2>{spring?.name || 'מעיין'}</h2>
        <SpringPositionTag position={spring.subRegion} />
        <TagsList spring={spring} limit={3} />
      </section>
    </Link>
  );
};

export default PreviewCard;
