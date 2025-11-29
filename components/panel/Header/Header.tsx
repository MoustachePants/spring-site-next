import React from 'react';
import './Header.css';
import Logo from '../../ui/Logo/Logo';
import SearchInput from '../../SearchInput/SearchInput';
import Filters from '../../panel/Filters/Filters';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo size="L" />
      <section className="header-filters">
        <SearchInput />
        <Filters />
      </section>
    </header>
  );
};

export default Header;
