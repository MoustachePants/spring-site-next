import React from 'react';
import { Spring } from '@/models/types/spring';
import './SpringsList.css';
import PreviewCard from '@/components/PreviewCard/PreviewCard';

const SpringsList: React.FC<{
  springs: Spring[];
}> = ({ springs }) => {
  return (
    <div className="springs-options-container">
      {springs.map((spring) => (
        <PreviewCard spring={spring} key={spring._id} />
      ))}
    </div>
  );
};

export default SpringsList;
