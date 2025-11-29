import React from 'react';
import './DetailsPanel.css';
import Header from '../Header/Header';
import SpringsList from '../SpringsList/SpringsList';
import { Spring } from '@/models/types/spring';

type DetailsPanelProps = {
  springs: Spring[];
  setSelectedSpring: (spring: Spring) => void;
};

const DetailsPanel: React.FC<DetailsPanelProps> = ({ springs, setSelectedSpring }) => {
  return (
    <section className="side-panel">
      <div className="side-panel-header">
        <Header />
      </div>
      <div className="side-panel-content">
        <SpringsList springs={springs} setSelectedSpring={setSelectedSpring} />
      </div>
    </section>
  );
};

export default DetailsPanel;
