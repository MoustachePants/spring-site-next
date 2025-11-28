'use client';

import React, { useState } from 'react';
import { Category, CATEGORIES } from '@/models/types/category';
import './CategorySelector.css';

const CategorySelector: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleOnChange = (category: Category) => {
    let newSelectedCategories: Category[];
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newSelectedCategories);
    console.log('Selected Categories:', newSelectedCategories);
  };

  return (
    <div className="category-selector">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`category-chip ${selectedCategories.includes(category) ? 'active' : ''}`}
          onClick={() => handleOnChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
