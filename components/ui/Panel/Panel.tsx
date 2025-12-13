'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useMobileSize } from '@/hooks/useMobileSize';
import './Panel.css';

interface PanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();
  const [snapPoint, setSnapPoint] = React.useState<'open' | 'middle' | 'closed'>('middle');

  // Define snap positions (pixel values from top)
  // We can calculate these dynamically or use fixed values/percentages
  // Open: 0
  // Middle: ~40% of screen height
  // Closed: ~85% of screen height
  const getSnapPositions = () => {
    if (typeof window === 'undefined') return { open: 0, middle: 300, closed: 600 };
    const height = window.innerHeight;
    return {
      open: height * 0.05,
      middle: height * 0.45,
      closed: height * 0.85,
    };
  };

  const handleDragEnd = (event: any, info: any) => {
    const { offset, velocity } = info;
    const positions = getSnapPositions();
    const currentY =
      (snapPoint === 'open'
        ? positions.open
        : snapPoint === 'middle'
          ? positions.middle
          : positions.closed) + offset.y;

    // Determine direction and magnitude
    const isSwipeDown = velocity.y > 200;
    const isSwipeUp = velocity.y < -200;

    let nextSnap = snapPoint;

    if (isSwipeUp) {
      if (snapPoint === 'closed') nextSnap = 'middle';
      else if (snapPoint === 'middle') nextSnap = 'open';
    } else if (isSwipeDown) {
      if (snapPoint === 'open') nextSnap = 'middle';
      else if (snapPoint === 'middle') nextSnap = 'closed';
    } else {
      // Snap to nearest
      const distOpen = Math.abs(currentY - positions.open);
      const distMiddle = Math.abs(currentY - positions.middle);
      const distClosed = Math.abs(currentY - positions.closed);

      if (distOpen < distMiddle && distOpen < distClosed) nextSnap = 'open';
      else if (distMiddle < distOpen && distMiddle < distClosed) nextSnap = 'middle';
      else nextSnap = 'closed';
    }

    setSnapPoint(nextSnap);
  };

  const positions = getSnapPositions();
  const y = isMobile
    ? snapPoint === 'open'
      ? positions.open
      : snapPoint === 'middle'
        ? positions.middle
        : positions.closed
    : 0;

  return (
    <motion.div
      className="side-panel"
      key={isMobile ? 'mobile' : 'desktop'}
      initial={false}
      animate={{ y }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      drag={isMobile ? 'y' : false}
      dragMomentum={false}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      dragConstraints={{
        top: positions.open,
        bottom: positions.closed,
      }}
    >
      <div className="side-panel-content-wrapper">
        {header}
        {children}
      </div>
    </motion.div>
  );
};

export default Panel;
