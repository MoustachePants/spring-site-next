import React from 'react';
import './PreviewCard.css';
import { Spring } from '@/models/types/spring';
import Image from 'next/image';
import Icons from '@/style/icons';

type PreviewCardProps = {
  spring: Spring;
  onClick: (springId: string) => Promise<void>;
};

const PreviewCard: React.FC<PreviewCardProps> = ({ spring, onClick }) => {
  return (
    <section className="preview-card" onClick={() => onClick(spring._id)}>
      <Image
        className="preview-card-image"
        width={346}
        height={200}
        src={'/mock_image.jpeg'}
        alt={spring.name}
      />
      <section className="preview-card-info">
        <h3>{spring.name}</h3>
        <div className="preview-card-subregion">
          <Icons.map />
          {spring.subRegion}
        </div>
        <section className="preview-card-tags">
          <div className="preview-card-tag">
            <Icons.water />
            צלול
          </div>
          <div className="preview-card-tag">
            <Icons.clock />
            להכנס כולי
          </div>
        </section>
      </section>
    </section>
  );
};

export default PreviewCard;
