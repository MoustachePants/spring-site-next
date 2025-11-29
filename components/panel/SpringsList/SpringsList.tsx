import React from 'react';
import { Spring } from '@/models/types/spring';
import PreviewCard from '../PreviewCard/PreviewCard';
import './SpringsList.css';

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
