import React from 'react';
import './TopDetailsActions.css';
import Icons from '@/style/icons';
import { useShare } from '@/hooks/useShare';

const TopDetailsActions: React.FC = () => {
  const { share } = useShare();

  const handleShare = () => {
    share({
      title: 'Spring Site',
      text: 'Check out this spring!',
    });
  };

  return (
    <div className="spring-details-header-actions">
      <div className="spring-details-header-action">
        <Icons.updates />
        <span>עדכונים מהשטח</span>
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
