import React from 'react';
import './Header.css';
import Logo from '../../ui/Logo/Logo';
import HeaderContent from './HeaderContent';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo size="L" />
      <HeaderContent />
    </header>
  );
};

export default Header;
