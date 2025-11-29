'use client';

import React, { ReactNode } from 'react';
import './Grid.css';
// NOT IN USE
type GridProps = {
  children: ReactNode;
  className?: string;
};

const Grid: React.FC<GridProps> = ({ children, className = '' }) => {
  return <div className={`grid-layout ${className}`}>{children}</div>;
};

export default Grid;
