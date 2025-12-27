import React from 'react';
import './CardSkeleton.css';

const CardSkeleton: React.FC = () => {
  return (
    <div className="preview-card-skeleton">
      <section className="preview-card-info-skeleton">
        <div className="preview-card-title-skeleton" />
        <div className="preview-card-position-skeleton">
          <div className="preview-card-position-icon-skeleton" />
          <div className="preview-card-position-text-skeleton" />
        </div>
        <div className="preview-card-tags-skeleton">
          <div className="preview-card-tag-skeleton" />
          <div className="preview-card-tag-skeleton" />
          <div className="preview-card-tag-skeleton" />
        </div>
      </section>
    </div>
  );
};

export default CardSkeleton;
