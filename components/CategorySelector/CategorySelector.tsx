'use client';

import React from 'react';
import { Category, CATEGORIES, mapCategories } from '@/models/types/category';
import { useDataContext } from '@/context/DataContext';
import './CategorySelector.css';

const CategorySelector: React.FC = () => {
  const { selectedCategories, setSelectedCategories } = useDataContext();

  const handleOnChange = (category: Category) => {
    let newSelectedCategories: Category[];
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newSelectedCategories);
  };

  return (
    <section id="categorySelector" className="category-selector-section">
      <label htmlFor="categorySelector">קטגוריות</label>
      <div className="category-selector">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              className={`category-chip ${isSelected ? 'active' : ''}`}
              onClick={() => handleOnChange(category)}
            >
              {isSelected && <span className="remove-icon">✕</span>}
              {mapCategories[category]}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySelector;
