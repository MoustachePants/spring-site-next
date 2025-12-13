import React from 'react';
import './TopDetailsActions.css';
import Icons from '@/style/icons';
import { useShare } from '@/hooks/useShare';
import { useDataContext } from '@/context/DataContext';

type TopDetailActionsProp = {
  scrollToUpdates: () => void;
};

const TopDetailsActions: React.FC<TopDetailActionsProp> = ({ scrollToUpdates }) => {
  const { share } = useShare();
  const { selectedSpring } = useDataContext();

  const handleShare = () => {
    share({
      title: 'Spring Site',
      text: 'Check out this spring!',
    });
  };

  const handleNavigation = () => {
    const lat = selectedSpring?.location.coordinates.pool[0];
    const lng = selectedSpring?.location.coordinates.pool[1];
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="spring-details-header-actions">
      <div className="spring-details-header-action" onClick={scrollToUpdates}>
        <Icons.updates />
        <span>עדכונים</span>
      </div>
      <div className="spring-details-header-action" onClick={handleNavigation}>
        <Icons.navigation />
        <span>ניווט</span>
      </div>
      <div className="spring-details-header-action" onClick={handleShare}>
        <Icons.share />
        <span>שתף</span>
      </div>
    </div>
  );
};

export default TopDetailsActions;
