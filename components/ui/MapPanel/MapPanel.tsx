'use client';

import React, { useRef } from 'react';
import { Sheet } from 'react-modal-sheet';
import './MapPanel.css';
import { useMobileSize } from '@/hooks/useMobileSize';

interface MapPanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const MapPanel: React.FC<MapPanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();
  const sheetRef = useRef<any>(null);

  // Snap points - 0 Hidden, 0.1 Peeking, 0.4 Middle, 1 Open
  const snapPoints = [0, 0.1, 0.4, 1];

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
          sheetRef.current?.snapTo(1); // 0.1
        }}
        snapPoints={snapPoints}
        initialSnap={2} // 0.4
      >
        <Sheet.Container>
          <Sheet.Header>
            <div className="map-panel-sheet-header-wrapper">
              {header}
            </div>
          </Sheet.Header>
          <Sheet.Content
            disableDrag={(state) => state.scrollPosition !== 'top'}
          >
            {children}
          </Sheet.Content>
        </Sheet.Container>
        {/* Optional: Backdrop. Usually desirable to dim background, 
            but for a Map Panel you might want to interact with the map when it's just "peeking" 
            or "half open". 
            If we want to interact with the map, we might need to disable backdrop or make it transparent/pointer-events-none 
            except when fully open? 
            For now, let's include it but maybe make it transparent or remove it if it blocks map interaction.
            Common map pattern: No backdrop, just the sheet floating over map. 
            Removing Backdrop for "Map" feel. 
        */}
        {/* <Sheet.Backdrop /> */}
      </Sheet>
    </div>
  );
};

export default MapPanel;
