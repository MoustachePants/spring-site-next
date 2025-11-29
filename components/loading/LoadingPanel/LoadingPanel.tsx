import React from 'react';
import './LoadingPanel.css';
import Loading from '../Loading/Loading';

const LoadingPanel: React.FC = () => {
  return (
    <div className="loading-panel">
      <Loading size="L" />
    </div>
  );
};

export default LoadingPanel;
