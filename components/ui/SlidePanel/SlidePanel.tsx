'use client';

import React from 'react';
import { motion, AnimatePresence, PanInfo, useDragControls } from 'motion/react';
import { useMobileSize } from '@/hooks/useMobileSize';
import { ChevronLeftIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import './SlidePanel.css';

type SlidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  title?: string;
};

const SlidePanel: React.FC<SlidePanelProps> = ({ isOpen, onClose, onOpen, children, title }) => {
  const isMobile = useMobileSize();
  const dragControls = useDragControls();

  const variants = {
    collapsed: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
    open: isMobile ? { y: 0, x: 0 } : { x: 0, y: 0 },
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (isOpen) {
      if (isMobile) {
        if (info.offset.y > threshold) onClose();
      } else {
        if (info.offset.x > threshold) onClose();
      }
    } else {
      if (isMobile) {
        if (info.offset.y < -threshold) onOpen();
      } else {
        if (info.offset.x < -threshold) onOpen();
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="slide-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <motion.div
        key={isMobile ? 'mobile' : 'desktop'}
        className={`slide-panel ${isMobile ? 'mobile' : 'desktop'}`}
        variants={variants}
        initial="collapsed"
        animate={isOpen ? 'open' : 'collapsed'}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        drag={isMobile ? 'y' : 'x'}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={isMobile ? { top: 0, bottom: 0 } : { left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <div
          className="slide-panel-handle"
          onPointerDown={(e) => dragControls.start(e)}
          onClick={isOpen ? onClose : onOpen}
        >
          {isMobile ? (
            <ChevronUpIcon className={`handle-icon ${isOpen ? 'rotate-180' : ''}`} />
          ) : (
            <ChevronLeftIcon className={`handle-icon ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </div>
        <div className="slide-panel-header" onPointerDown={(e) => dragControls.start(e)}>
          {title && <h2 className="slide-panel-title">{title}</h2>}
          <button className="slide-panel-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="slide-panel-content">{children}</div>
      </motion.div>
    </>
  );
};

export default SlidePanel;
