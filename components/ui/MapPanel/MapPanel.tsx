'use client';

import React, { useRef } from 'react';
import { Sheet } from 'react-modal-sheet';
import './MapPanel.css';
import { useMobileSize } from '@/hooks/useMobileSize';

interface MapPanelProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const MapPanel: React.FC<MapPanelProps> = ({ header, children }) => {
  const isMobile = useMobileSize();
  const sheetRef = useRef<any>(null);

  // Snap points are heights (0 to 1) and must be ascending, ending with 1 (Full)
  // 0 (Hidden), 0.1 (10% height = Closed/Peeking), 0.4 (40% height = Middle), 1 (100% height = Open)
  const snapPoints = [0, 0.1, 0.4, 1]; 

  if (!isMobile) {
    // Desktop fallback: Render as a sidebar or just normal content
    // For now, let's render it as a sidebar-like panel on the left/right or just return children
    // The user really asked for "MapPanel component using react-modal-sheet" which implies mobile focus.
    // We can wrap it in a div that mimics a panel.
    return (
      <div className="map-panel-desktop">
        <div className="map-panel-header">
          {header}
        </div>
        <div className="map-panel-content">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="map-panel-mobile-wrapper">
      <Sheet
        ref={sheetRef}
        isOpen={true} // Always open
        onClose={() => {
          // Snap back to the index 1 (0.1 / 10%) instead of closing fully
          sheetRef.current?.snapTo(1);
        }}
        snapPoints={snapPoints}
        initialSnap={2} // Start at 0.4 (Middle)
        // react-modal-sheet handles z-index, usually high.
      >
        <Sheet.Container>
          <Sheet.Header>
             {/* Use the provided header prop or a default drag indicator */}
             {header ? (
               <div className="map-panel-sheet-header-wrapper">
                 {/* Provide a visual drag handle if the custom header doesn't have one */}
                 {/* Or wrap the header in something draggable? Header is draggable by default in library */}
                 {header}
               </div>
             ) : (
               <div className="map-panel-default-handle-wrapper">
                 <div className="map-panel-default-handle" />
               </div>
             )}
          </Sheet.Header>
          <Sheet.Content>
            {/* Scrollable content area */}
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