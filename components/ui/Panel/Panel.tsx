'use client';

import React, { useRef } from 'react';
import { Sheet } from 'react-modal-sheet';
import './Panel.css';
import { useMobileSize } from '@/hooks/useMobileSize';
import { PanelContextProvider, usePanelContext } from '@/context/PanelContext';

interface PanelProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const PanelContent: React.FC<PanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();
  const sheetRef = useRef<any>(null);
  const { isScrollAtTop, currentSnapIndex, setCurrentSnapIndex } = usePanelContext();

  const Hidden = { v: 0, i: 0 };
  const Peeking = { v: 0.1, i: 1 };
  const Middle = { v: 0.6, i: 2 };
  const Open = { v: 1, i: 3 };

  const snapPoints = [Hidden.v, Peeking.v, Middle.v, Open.v];

  const handleSnap = (index: number) => {
    setCurrentSnapIndex(index === Peeking.i ? Middle.i : index);
  };

  if (isMobile) {
    <div className="map-panel-mobile-wrapper">
      <Sheet
        ref={sheetRef}
        isOpen
        onClose={() => {
          sheetRef.current?.snapTo(Peeking.i);
        }}
        snapPoints={snapPoints}
        initialSnap={currentSnapIndex}
        onSnap={handleSnap}
      >
        <Sheet.Container>
          <Sheet.Header>
            {header ? (
              <div className="map-panel-sheet-header-wrapper">{header}</div>
            ) : (
              <div className="map-panel-sheet-header-wrapper shadow">
                <div className="header-indicator"></div>
              </div>
            )}
          </Sheet.Header>
          <Sheet.Content disableDrag={!isScrollAtTop}>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>;
  }

  return (
    <div className="map-panel">
      <div className="map-panel-content-wrapper">
        <div className="map-panel-header">{header}</div>
        <div className="map-panel-content">{children}</div>
      </div>
    </div>
  );
};

const Panel: React.FC<PanelProps> = (props) => {
  return (
    <PanelContextProvider>
      <PanelContent {...props} />
    </PanelContextProvider>
  );
};

export default Panel;
