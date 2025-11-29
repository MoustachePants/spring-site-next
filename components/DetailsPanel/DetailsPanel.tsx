import React from 'react';
import './DetailsPanel.css';
import Header from '../Header/Header';
import SpringsList from '../SpringsList/SpringsList';
import { Spring } from '@/models/types/spring';

type DetailsPanelProps = {
  springs: Spring[];
  isLoading: boolean;
  onClickSpring: (springId: string) => Promise<void>;
};

const DetailsPanel: React.FC<DetailsPanelProps> = ({ springs, isLoading, onClickSpring }) => {
  return (
    <section className="side-panel">
      <div className="side-panel-header">
        <Header />
      </div>
      <div className="side-panel-content">
        <SpringsList springs={springs} onClickSpring={onClickSpring} />
      </div>
    </section>
  );
};

export default DetailsPanel;
