'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS } from '@/models/constant/map';
import { Spring } from '@/models/types/spring';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapController: React.FC<{ selectedSpring?: Spring }> = ({ selectedSpring }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedSpring && selectedSpring.location) {
      const location = selectedSpring.location[0];
      const [lat, lng] = location.coordinates;
      map.setView([lat, lng], MAP_CONSTANTS.DEFAULT_ZOOM, {
        animate: true,
        duration: 0.7,
      });
    }
  }, [selectedSpring, map]);

  return null;
};

const Map: React.FC<{ springs?: Spring[]; selectedSpring?: Spring }> = ({
  springs = [],
  selectedSpring,
}) => {
  return (
    <MapContainer
      center={MAP_CONSTANTS.DEFAULT_CENTER}
      zoom={MAP_CONSTANTS.DEFAULT_ZOOM}
      minZoom={MAP_CONSTANTS.MIN_ZOOM}
      // maxBounds={MAP_CONSTANTS.ISRAEL_BOUNDS}
      // maxBoundsViscosity={MAP_CONSTANTS.MAX_BOUNDS_VISCOSITY}
      className="map-container"
      scrollWheelZoom={true}
    >
      <TileLayer url={MAP_CONSTANTS.TILE_LAYER_URL} attribution={MAP_CONSTANTS.ATTRIBUTION} />
      <MapController selectedSpring={selectedSpring} />
      {springs.map((spring) => {
        if (spring.location && spring.location.length > 0) {
          // Use the first location (or you could add markers for all locations)
          const location = spring.location[0];
          const [lat, lng] = location.coordinates;

          return (
            <Marker key={spring._id} position={[lat, lng]}>
              <Popup>
                <b>{spring.name}</b>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default Map;
