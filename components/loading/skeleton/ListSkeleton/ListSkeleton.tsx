import React from 'react';
import './ListSkeleton.css';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const ListSkeleton: React.FC = () => {
  return (
    <section className="springs-options-scroll-skeleton">
      <div className="springs-options-container-skeleton">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  );
};

export default ListSkeleton;
