import React from 'react';
import './Filters.css';
import PlacesSelector from '@/components/PlacesSelector/PlacesSelector';
import CategorySelector from '@/components/CategorySelector/CategorySelector';

const Filters: React.FC = () => {
  return (
    <section className="filters">
      <PlacesSelector />
      <CategorySelector />
    </section>
  );
};

export default Filters;
