'use client';

import React from 'react';
import './SearchInput.css';
import Icons from '@/style/icons';
import { useDataContext } from '@/context/DataContext';

const SearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm } = useDataContext();

  const handleDeleteTermOnClick = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-input-container">
      <Icons.search />
      {/*<div className="search-input-icons-container">*/}
      {/*</div>*/}
      <input
        type="text"
        className="search-input"
        placeholder="חיפוש מעיין"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && <Icons.close onClick={handleDeleteTermOnClick} />}
    </div>
  );
};

export default SearchInput;
