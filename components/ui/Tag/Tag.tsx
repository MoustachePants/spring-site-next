import React from 'react';
import './Tag.css';

type TagProps = {
  icon: React.ReactNode;
  label: string;
};

const Tag: React.FC<TagProps> = ({ icon, label }) => {
  return (
    <div className="preview-card-tag">
      {icon}
      {label}
    </div>
  );
};

export default Tag;
