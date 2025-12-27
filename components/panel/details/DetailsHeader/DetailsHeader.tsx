import React from 'react';
import './DetailsHeader.css';
import Link from 'next/link';
import Icons from '@/style/icons';
import TopDetailsActions from '../TopDetailsActions/TopDetailsActions';

interface DetailsHeaderProps {
  springUpdatesRef: React.RefObject<HTMLElement | null>;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ springUpdatesRef }) => {
  const scrollToUpdates = () => {
    if (springUpdatesRef.current) {
      springUpdatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="spring-details-header">
      <Link
        href="/"
        className="spring-details-back"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Icons.arrowRight />
        <span>לדף הראשי</span>
      </Link>
      <TopDetailsActions scrollToUpdates={scrollToUpdates} />
    </header>
  );
};

export default DetailsHeader;
