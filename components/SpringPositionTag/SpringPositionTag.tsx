import React from 'react';
import './SpringPositionTag.css';
import Icons from '@/style/icons';

type SpringPositionTagProps = {
  position: string;
};

const SpringPositionTag: React.FC<SpringPositionTagProps> = ({ position }) => {
  return (
    <div className="preview-card-subregion">
      <Icons.map />
      {position}
    </div>
  );
};

export default SpringPositionTag;
