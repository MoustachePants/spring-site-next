import React from 'react';
import './Header.css';
import Logo from '../ui/Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import CategorySelector from '../CategorySelector/CategorySelector';
import Icons from '@/style/icons';

type HeaderProps = {
  onCloseSlidePanel: () => void;
};

const Header: React.FC<HeaderProps> = ({ onCloseSlidePanel }) => {
  return (
    <header className="header">
      <div className="header-hamburger" onClick={onCloseSlidePanel}>
        <Icons.hamburger />
      </div>
      <Logo size="M" />
      <section className="header-filters">
        <SearchInput />
        <CategorySelector />
      </section>
    </header>
  );
};

export default Header;
