'use client';

import React, { useRef } from 'react';
import { Sheet } from 'react-modal-sheet';
import './MapPanel.css';
import { useMobileSize } from '@/hooks/useMobileSize';
import { PanelContextProvider, usePanelContext } from '@/context/PanelContext';

interface MapPanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const MapPanelContent: React.FC<MapPanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();
  const sheetRef = useRef<any>(null);
  const { isScrollAtTop } = usePanelContext();

  const Hidden = { v: 0, i: 0 };
  const Peeking = { v: 0.1, i: 1 };
  const Middle = { v: 0.6, i: 2 };
  const Open = { v: 1, i: 3 };

  const snapPoints = [Hidden.v, Peeking.v, Middle.v, Open.v];

  if (!isMobile) {
    return (
      <div className="map-panel">
        <div className="map-panel-content-wrapper">
          <div className="map-panel-header">{header}</div>
          <div className="map-panel-content">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-panel-mobile-wrapper">
      <Sheet
        ref={sheetRef}
        isOpen
        onClose={() => {
          sheetRef.current?.snapTo(Peeking.i);
        }}
        snapPoints={snapPoints}
        initialSnap={Middle.i}
      >
        <Sheet.Container>
          <Sheet.Header>
            <div className="map-panel-sheet-header-wrapper">{header}</div>
          </Sheet.Header>
          <Sheet.Content disableDrag={!isScrollAtTop}>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
};

const MapPanel: React.FC<MapPanelProps> = (props) => {
  return (
    <PanelContextProvider>
      <MapPanelContent {...props} />
    </PanelContextProvider>
  );
};

export default MapPanel;
