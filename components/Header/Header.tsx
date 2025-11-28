import React from 'react';
import './Header.css';
import Logo from '../ui/Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import CategorySelector from '../CategorySelector/CategorySelector';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Logo size="M" />
        <div className="header-content">
          <SearchInput />
          <CategorySelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
