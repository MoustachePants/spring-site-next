import React from 'react';
import './Header.css';
import Logo from '../ui/Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import CategorySelector from '../CategorySelector/CategorySelector';
import Icons from '@/style/icons';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-hamburger">
        <Icons.hamburger />
      </div>
      <Logo size="M" />
      <SearchInput />
      <CategorySelector />
    </header>
  );
};

export default Header;
