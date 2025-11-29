import React from 'react';
import './DetailsPanel.css';
import Header from '../Header/Header';
import SpringsList from '../SpringsList/SpringsList';
import Loading from '../loading/Loading/Loading';
import { useDataContext } from '@/context/DataContext';
import ImageHeader from '../ImageHeader/ImageHeader';
import SpringDetails from '../SpringDetails/SpringDetails';
import { motion } from 'motion/react';
import { useMobileSize } from '../../hooks/useMobileSize';

const DetailsPanel: React.FC = () => {
  const { filteredSpringsList, selectedSpring, getSpringById, isSpringsListLoading } =
    useDataContext();
  const isMobile = useMobileSize();

  if (selectedSpring) {
    return (
      <section className="side-panel">
        <div className="side-panel-header">
          <ImageHeader src={selectedSpring.images[0].image} alt={selectedSpring.name} />
        </div>
        <div className="side-panel-content">
          <SpringDetails spring={selectedSpring} />
        </div>
      </section>
    );
  }

  return (
    <motion.div
      key={isMobile ? 'mobile' : 'desktop'}
      initial={{ y: isMobile ? 400 : 0 }}
      drag={isMobile ? 'y' : false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 40,
        bottom: 580,
      }}
      className="side-panel"
    >
      <div className="side-panel-header">
        <Header />
      </div>
      <div className="side-panel-content">
        {isSpringsListLoading ? (
          <Loading />
        ) : (
          <SpringsList springs={filteredSpringsList} onClickSpring={getSpringById} />
        )}
      </div>
    </motion.div>
  );
};

export default DetailsPanel;
