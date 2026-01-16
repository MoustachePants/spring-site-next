import React from 'react';
import './DetailsSkeleton.css';

const DetailsSkeleton: React.FC = () => {
  return (
    <>
      <section className="spring-img-header-skeleton skeleton-wave" />

      <section className="spring-details-skeleton">
        <header className="spring-details-header-skeleton">
          <div className="spring-details-header-back-skeleton" />
          <div className="spring-details-header-actions-skeleton">
            <div className="spring-details-header-action-skeleton" />
            <div className="spring-details-header-action-skeleton" />
            <div className="spring-details-header-action-skeleton" />
          </div>
        </header>

        <section className="spring-details-content-skeleton">
          <section className="spring-details-top-details-skeleton">
            <h1 className="spring-details-title-skeleton" />
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

          <section className="spring-details-description-skeleton">
            <div className="spring-details-line-skeleton" style={{ width: 240 }} />
            <div className="spring-details-line-skeleton" style={{ width: 280 }} />
            <div className="spring-details-line-skeleton" style={{ width: 200 }} />
          </section>

          <section className="spring-details-bottom-sections-skeleton">
            <section className="spring-details-section-skeleton">
              <h2 className="spring-details-section-title-skeleton" />
              <div className="spring-details-grid-skeleton">
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
                <div className="spring-details-grid-item-skeleton">
                  <div className="spring-detail-label-skeleton" />
                  <div className="spring-detail-value-skeleton" />
                </div>
              </div>
            </section>
            <section className="spring-details-section-skeleton">
              <h2 className="spring-details-section-title-skeleton" />
              <div className="spring-details-arrival-description-skeleton" />
              <div className="spring-details-arrival-skeleton" />
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default DetailsSkeleton;
