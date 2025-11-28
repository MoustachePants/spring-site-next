'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS } from '@/models/constant/map';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapContainerRef.current, {
        maxBounds: MAP_CONSTANTS.ISRAEL_BOUNDS,
        maxBoundsViscosity: MAP_CONSTANTS.MAX_BOUNDS_VISCOSITY,
        minZoom: MAP_CONSTANTS.MIN_ZOOM,
      }).setView(MAP_CONSTANTS.DEFAULT_CENTER, MAP_CONSTANTS.DEFAULT_ZOOM);

      // Add OpenStreetMap tile layer
      L.tileLayer(MAP_CONSTANTS.TILE_LAYER_URL, {
        attribution: MAP_CONSTANTS.ATTRIBUTION,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
