'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import './Panel.css';
import { useMobileSize } from '@/hooks/useMobileSize';
import { usePanelContext } from '@/context/PanelContext';

interface PanelProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Peeking = 0.1;
const Middle = 0.6;
const Open = 0.9;
const SNAP_POINTS = [Peeking, Middle, Open];

const PanelContent: React.FC<PanelProps> = ({ header: headerProp, children }) => {
  const isMobile = useMobileSize();
  const { currentSnapIndex, setCurrentSnapIndex, header: contextHeader } = usePanelContext();
  const [mounted, setMounted] = useState(false);

  const header = headerProp || contextHeader;

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSnapPoint = useMemo(() => {
    if (currentSnapIndex === 1) return Peeking;
    if (currentSnapIndex === 2) return Middle;
    if (currentSnapIndex === 3) return Open;
    return Middle;
  }, [currentSnapIndex]);

  const handleSnapChange = (value: string | number | null) => {
    if (typeof value === 'number') {
      const index = SNAP_POINTS.indexOf(value);
      if (index !== -1) {
        // Store as 1-based index to maintain compatibility with existing logic/context
        setCurrentSnapIndex(index + 1);
      }
    }
  };

  if (!mounted) return null;

  if (!isMobile) {
    return (
      <div className="map-panel">
        <div className="map-panel-content-wrapper">
          {header ? <div className="map-panel-header">{header}</div> : null}
          <div className="map-panel-content">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Drawer.Root
      open={true}
      dismissible={false}
      modal={false}
      snapPoints={SNAP_POINTS}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={handleSnapChange}
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Content className="map-panel-sheet-container">
          <Drawer.Title className="sr-only">תפריט מעיינות</Drawer.Title>
          <Drawer.Description className="sr-only">מידע ועדכונים על מעיינות</Drawer.Description>
          <div className="map-panel-drag-handle">
            <Drawer.Handle className="drawer-handle" />
          </div>
          {header ? <div className="map-panel-sheet-header-wrapper">{header}</div> : null}
          <div className="vaul-scrollable-content">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const Panel: React.FC<PanelProps> = (props) => {
  return <PanelContent {...props} />;
};

export default Panel;
