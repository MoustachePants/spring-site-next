import React from 'react';
import './Header.css';
import Logo from '../ui/Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Logo size="M" />
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
