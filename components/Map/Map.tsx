'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS } from '@/models/constant/map';
import L from 'leaflet';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { useDataContext } from '@/context/DataContext';
import SmallPreviewCard from '@/components/SmallPreviewCard/SmallPreviewCard';
import { UserLocation } from '@/models/types/userLocation';

const springIcon = L.icon({
  iconUrl: '/icons/spring_icon.svg',
  iconSize: [40, 45],
  iconAnchor: [20, 45],
  popupAnchor: [0, -42],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize: [60, 60],
  shadowAnchor: [20, 58],
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

const MapController: React.FC = () => {
  const map = useMap();
  const { selectedSpring } = useDataContext();

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

import Icons from '@/style/icons';

const UserLocationControl = ({
  userLocation,
  getLocation,
}: {
  userLocation: UserLocation | null;
  getLocation: () => void;
}) => {
  const map = useMap();
  const [isWaitingForLocation, setIsWaitingForLocation] = useState(false);

  useEffect(() => {
    if (isWaitingForLocation && userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], MAP_CONSTANTS.DEFAULT_ZOOM);
      setIsWaitingForLocation(false);
    }
  }, [userLocation, isWaitingForLocation, map]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], MAP_CONSTANTS.DEFAULT_ZOOM, {
        animate: true,
        duration: 0.6,
        easeLinearity: 0.1,
      });
    } else {
      setIsWaitingForLocation(true);
      getLocation();
    }
  };

  return (
    <button onClick={handleClick} className="user-location-btn" title="Show my location">
      <Icons.position width={20} height={20} />
    </button>
  );
};

const Map: React.FC = () => {
  const { mapState, filteredSpringsList } = useDataContext();
  const { userLocation, getLocation } = useCurrentPosition();
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
      <MapController />
      <UserLocationControl userLocation={userLocation} getLocation={getLocation} />
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
          <Popup>
            <b>Your Location</b>
          </Popup>
        </Marker>
      )}
      {filteredSpringsList &&
        filteredSpringsList.map((spring) => {
          const [lat, lng] = spring.location.coordinates.pool;

          return (
            <Marker key={spring._id} position={[lat, lng]} icon={springIcon}>
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
