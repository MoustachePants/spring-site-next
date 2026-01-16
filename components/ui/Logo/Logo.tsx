import React from 'react';
import Image from 'next/image';
import { Size } from '@/models/types/style';
import './Logo.css';

type LogoProps = {
  size: Size;
};

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div className={`logo-container ${size}`}>
      <Image
        src="/logo/logoMobile.svg"
        alt="Logo Mobile"
        fill
        className="logo-image logo-mobile"
        priority
      />
      <Image
        src="/logo/logoDesktop.svg"
        alt="Logo Desktop"
        fill
        className="logo-image logo-desktop"
        priority
      />
    </div>
  );
};

export default Logo;
