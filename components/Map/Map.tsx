'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS } from '@/models/constant/map';
import { Spring } from '@/models/types/spring';
import L from 'leaflet';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { useDataContext } from '@/context/DataContext';
import SmallPreviewCard from '@/components/SmallPreviewCard/SmallPreviewCard';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapStateUpdater = () => {
  const { setMapState } = useDataContext();
  useMapEvents({
    moveend: (e) => {
      setMapState({
        center: [e.target.getCenter().lat, e.target.getCenter().lng],
        zoom: e.target.getZoom(),
      });
    },
  });
  return null;
};

const MapController: React.FC<{ selectedSpring?: Spring }> = ({ selectedSpring }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedSpring && selectedSpring.location && selectedSpring.location.coordinates) {
      const [lat, lng] = selectedSpring.location.coordinates.pool;
      map.setView([lat, lng], MAP_CONSTANTS.DEFAULT_ZOOM, {
        animate: true,
        duration: 0.7,
      });
    }
  }, [selectedSpring, map]);

  return null;
};

const Map: React.FC<{
  springs?: Spring[];
  selectedSpring?: Spring;
}> = ({ springs, selectedSpring }) => {
  const { mapState } = useDataContext();
  const userLocation = useCurrentPosition();
  // Create a custom icon for user location (blue marker)
  const userLocationIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={mapState?.center || MAP_CONSTANTS.DEFAULT_CENTER}
      zoom={mapState?.zoom || MAP_CONSTANTS.DEFAULT_ZOOM}
      minZoom={MAP_CONSTANTS.MIN_ZOOM}
      // maxBounds={MAP_CONSTANTS.ISRAEL_BOUNDS}
      // maxBoundsViscosity={MAP_CONSTANTS.MAX_BOUNDS_VISCOSITY}
      className="map-container"
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer url={MAP_CONSTANTS.TILE_LAYER_URL} attribution={MAP_CONSTANTS.ATTRIBUTION} />
      <MapStateUpdater />
      <MapController selectedSpring={selectedSpring} />
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
          <Popup>
            <b>Your Location</b>
          </Popup>
        </Marker>
      )}
      {springs &&
        springs.map((spring) => {
          const [lat, lng] = spring.location.coordinates.pool;

          return (
            <Marker key={spring._id} position={[lat, lng]}>
              <Popup className="leaflet-popup-reset">
                <SmallPreviewCard key={spring._id} spring={spring} />
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default Map;
