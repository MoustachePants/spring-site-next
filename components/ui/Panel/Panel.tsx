'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, PanInfo, useDragControls } from 'motion/react';
import { useMobileSize } from '@/hooks/useMobileSize';
import './Panel.css';

interface PanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();

  // Snap points (y-position relative to screen top)
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const openY = windowHeight * 0.05;
  const closedY = windowHeight * 0.85;

  const y = useMotionValue(closedY);
  const [isOpen, setIsOpen] = useState(false);

  const controls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startPanelYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Initialize position
      // If we want to start closed or open?
      // MapPanel starts closed. Panel started 'middle'.
      // Let's start closed to be safe/consistent with MapPanel.
      animate(y, isOpen ? openY : closedY, {
        type: 'spring',
        damping: 25,
        stiffness: 250,
      });
    } else {
      y.set(0); // Desktop: reset to 0 (handled by CSS positioning/layout usually, or just 0 offset)
    }
  }, [isOpen, openY, closedY, y, isMobile]);

  const calculateSnap = (currentY: number, velocityY: number) => {
    let nextOpen = isOpen;
    if (velocityY > 300) {
      nextOpen = false;
    } else if (velocityY < -300) {
      nextOpen = true;
    } else {
      const distToOpen = Math.abs(currentY - openY);
      const distToClosed = Math.abs(currentY - closedY);
      nextOpen = distToOpen < distToClosed;
    }
    return nextOpen;
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const nextOpen = calculateSnap(y.get(), info.velocity.y);
    setIsOpen(nextOpen);
    if (nextOpen === isOpen) {
      animate(y, nextOpen ? openY : closedY, { type: 'spring', damping: 25, stiffness: 250 });
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !isMobile) return;

    const onTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
      startPanelYRef.current = y.get();
      isDraggingRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startYRef.current;
      const scrollTop = el.scrollTop;

      if (isDraggingRef.current) {
        if (e.cancelable) e.preventDefault();
        y.set(startPanelYRef.current + deltaY);
      } else if (scrollTop <= 0 && deltaY > 0) {
        isDraggingRef.current = true;
        if (e.cancelable) e.preventDefault();
        y.set(startPanelYRef.current + deltaY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const currentY = y.get();
        const nextOpen = calculateSnap(currentY, 0);
        setIsOpen(nextOpen);
        if (nextOpen === isOpen) {
          animate(y, nextOpen ? openY : closedY, { type: 'spring', damping: 25, stiffness: 250 });
        }
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile, isOpen, openY, closedY, y]);

  return (
    <motion.div
      className="side-panel"
      key={isMobile ? 'mobile' : 'desktop'}
      style={isMobile ? { y, height: '95vh' } : {}}
      drag={isMobile ? 'y' : false}
      dragListener={false}
      dragControls={controls}
      dragConstraints={isMobile ? { top: openY, bottom: closedY } : undefined}
      dragElastic={0.05}
      dragMomentum={false}
      onDragEnd={isMobile ? handleDragEnd : undefined}
    >
      <div className="side-panel-content-wrapper">
        <div
          onPointerDown={(e) => {
            controls.start(e);
          }}
          style={{ width: '100%', touchAction: 'none' }} // Ensure handle captures touches
        >
          {header}
        </div>
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            width: '100%',
            // Fix for iOS smooth scroll
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Panel;
