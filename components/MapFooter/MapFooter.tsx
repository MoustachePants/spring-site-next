import React from 'react';
import Link from 'next/link';
import './MapFooter.css';

const MapFooter: React.FC = () => {
  return (
    <footer className="map-footer">
      <Link href="/terms" className="footer-link">
        תנאי שימוש ופרטיות
      </Link>
      <span className="separator">|</span>
      <Link href="/accessibility" className="footer-link">
        הצהרת נגישות
      </Link>
    </footer>
  );
};

export default MapFooter;
