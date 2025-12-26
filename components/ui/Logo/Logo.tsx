'use client';

import React from 'react';
import Image from 'next/image';
import { useMobileSize } from '@/hooks/useMobileSize';
import { Size } from '@/models/types/style';
import './Logo.css';

type LogoProps = {
  size: Size;
};

const Logo: React.FC<LogoProps> = ({ size }) => {
  const isMobile = useMobileSize();

  return (
    <div className={`logo-container ${size}`}>
      <Image
        src={isMobile ? '/logo/logoMobile.svg' : '/logo/logoDesktop.svg'}
        alt="Logo"
        fill
        className="logo-image"
        priority
      />
    </div>
  );
};

export default Logo;
