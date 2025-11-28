import React from 'react';
import './SearchInput.css';
import Icons from '@/style/icons';

const SearchInput: React.FC = () => {
  return (
    <div className="search-input-container">
      <Icons.search />
      <input type="text" className="search-input" placeholder="חיפוש מעיין" />
    </div>
  );
};

export default SearchInput;
