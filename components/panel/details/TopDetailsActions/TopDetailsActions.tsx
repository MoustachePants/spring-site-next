import React from 'react';
import './TopDetailsActions.css';
import Icons from '@/style/icons';
import { useShare } from '@/hooks/useShare';

type TopDetailActionsProp = {
  scrollToUpdates: () => void;
};

const TopDetailsActions: React.FC<TopDetailActionsProp> = ({ scrollToUpdates }) => {
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: 'Spring Site',
      text: 'Check out this spring!',
    });
  };

  return (
    <div className="spring-details-header-actions">
      <div className="spring-details-header-action" onClick={scrollToUpdates}>
        <Icons.updates />
        <span>עדכונים</span>
      </div>
      <div className="spring-details-header-action">
        <Icons.wase />
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
