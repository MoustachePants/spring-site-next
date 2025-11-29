import React from 'react';
import './Header.css';
import Logo from '../../ui/Logo/Logo';
import SearchInput from '../../SearchInput/SearchInput';
import Filters from '../../panel/Filters/Filters';
import Icons from '@/style/icons';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo size="L" />
      <section className="header-filters-search">
        <div className="header-filters-and-search">
          <SearchInput />
          <div className="filter-button">
            <Icons.filter />
            <span>מתקדם</span>
          </div>
        </div>

        {/* <Filters /> */}
      </section>
    </header>
  );
};

export default Header;
