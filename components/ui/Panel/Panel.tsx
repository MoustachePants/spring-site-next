'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useMobileSize } from '@/hooks/useMobileSize';
import './Panel.css';

interface PanelProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();

    return (
        <motion.div
        className="side-panel"
        key={isMobile ? 'mobile' : 'desktop'}
        initial={{ y: isMobile ? 400 : 0 }}
        drag={isMobile ? 'y' : false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
            top: 40,
            bottom: 580,
        }}
        >
        {header && <div className="side-panel-header">{header}</div>}
        <div className="side-panel-content">{children}</div>
        </motion.div>
    );

};

export default Panel;

