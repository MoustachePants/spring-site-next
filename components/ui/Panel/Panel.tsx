'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const handleRef = useRef<HTMLDivElement>(null);

  // For content area drag detection
  const isDraggingPanelRef = useRef(false);
  const startTouchYRef = useRef(0);
  const startPanelYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      animate(y, isOpen ? openY : closedY, {
        type: 'spring',
        damping: 25,
        stiffness: 250,
      });
    } else {
      y.set(0);
    }
  }, [isOpen, openY, closedY, y, isMobile]);

  const calculateSnap = useCallback(
    (currentY: number, velocityY: number) => {
      if (velocityY > 300) {
        return false; // close
      } else if (velocityY < -300) {
        return true; // open
      } else {
        const distToOpen = Math.abs(currentY - openY);
        const distToClosed = Math.abs(currentY - closedY);
        return distToOpen < distToClosed;
      }
    },
    [openY, closedY]
  );

  const snapToPosition = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      animate(y, nextOpen ? openY : closedY, {
        type: 'spring',
        damping: 25,
        stiffness: 250,
      });
    },
    [y, openY, closedY]
  );

  // Handle drag end from the motion drag (handle area)
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const nextOpen = calculateSnap(y.get(), info.velocity.y);
    snapToPosition(nextOpen);
  };

  // Content area touch handling:
  // Only allow dragging the panel down when content is scrolled to top
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl || !isMobile) return;

    const onTouchStart = (e: TouchEvent) => {
      startTouchYRef.current = e.touches[0].clientY;
      startPanelYRef.current = y.get();
      isDraggingPanelRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentTouchY = e.touches[0].clientY;
      const deltaY = currentTouchY - startTouchYRef.current;
      const scrollTop = contentEl.scrollTop;

      // If we're already dragging the panel, continue
      if (isDraggingPanelRef.current) {
        if (e.cancelable) e.preventDefault();
        const newY = Math.max(openY, Math.min(closedY, startPanelYRef.current + deltaY));
        y.set(newY);
        return;
      }

      // Start panel drag if: content is at scroll top AND dragging down
      if (scrollTop <= 0 && deltaY > 5) {
        isDraggingPanelRef.current = true;
        if (e.cancelable) e.preventDefault();
        y.set(startPanelYRef.current + deltaY);
      }
      // Otherwise, let normal scrolling happen
    };

    const onTouchEnd = () => {
      if (isDraggingPanelRef.current) {
        isDraggingPanelRef.current = false;
        const currentY = y.get();
        const nextOpen = calculateSnap(currentY, 0);
        snapToPosition(nextOpen);
      }
    };

    contentEl.addEventListener('touchstart', onTouchStart, { passive: true });
    contentEl.addEventListener('touchmove', onTouchMove, { passive: false });
    contentEl.addEventListener('touchend', onTouchEnd);

    return () => {
      contentEl.removeEventListener('touchstart', onTouchStart);
      contentEl.removeEventListener('touchmove', onTouchMove);
      contentEl.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile, y, openY, closedY, calculateSnap, snapToPosition]);

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
        {/* Handle area - always draggable */}
        <div
          ref={handleRef}
          className="panel-handle-area"
          onPointerDown={(e) => {
            controls.start(e);
          }}
          style={{ width: '100%', touchAction: 'none' }}
        >
          {header}
        </div>
        {/* Content area - only drags panel down when scrolled to top */}
        <div
          ref={contentRef}
          className="panel-content-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            width: '100%',
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
