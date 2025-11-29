import React from 'react';
import { Spring } from '@/models/types/spring';
import PreviewCard from '../ui/PreviewCard/PreviewCard';
import './SpringsList.css';

const SpringsList: React.FC<{
  springs: Spring[];
  setSelectedSpring: (spring: Spring) => void;
}> = ({ springs, setSelectedSpring }) => {
  return (
    <div className="springs-options-container">
      {springs.map((spring) => (
        <PreviewCard spring={spring} key={spring._id} onClick={setSelectedSpring} />
      ))}
    </div>
  );
};

export default SpringsList;
