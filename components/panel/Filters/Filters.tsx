import React from 'react';
import './Filters.css';
import CategorySelector from '../CategorySelector/CategorySelector';
import PlacesSelector from '../PlacesSelector/PlacesSelector';

const Filters: React.FC = () => {
  return (
    <section className="filters">
      <PlacesSelector />
      <CategorySelector />
    </section>
  );
};

export default Filters;
