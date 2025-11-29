'use client';

import React, { useState } from 'react';
import { Place, PLACES, mapPlaces } from '@/models/types/category';
import './PlacesSelector.css';

const PlacesSelector: React.FC = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

  const handleOnChange = (place: Place) => {
    let newSelectedPlaces: Place[];
    if (selectedPlaces.includes(place)) {
      newSelectedPlaces = selectedPlaces.filter((p) => p !== place);
    } else {
      newSelectedPlaces = [...selectedPlaces, place];
    }

    setSelectedPlaces(newSelectedPlaces);
    console.log('Selected Places:', newSelectedPlaces);
  };

  return (
    <section id="placesSelector" className="places-selector-section">
      <label htmlFor="placesSelector">אזורים</label>
      <div className="places-selector">
        {PLACES.map((place) => {
          const isSelected = selectedPlaces.includes(place);
          return (
            <button
              key={place}
              className={`place-chip ${isSelected ? 'active' : ''}`}
              onClick={() => handleOnChange(place)}
            >
              {isSelected && <span className="remove-icon">✕</span>}
              {mapPlaces[place]}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PlacesSelector;
