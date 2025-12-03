'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS } from '@/models/constant/map';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { useDataContext } from '@/context/DataContext';
import SmallPreviewCard from '@/components/SmallPreviewCard/SmallPreviewCard';
import { UserLocation } from '@/models/types/userLocation';
import {
  springIcon,
  unselectedSpringIcon,
  parkingIcon,
  userLocationIcon,
} from './mapIcons';

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
  const { mapState, filteredSpringsList, selectedSpring } = useDataContext();
  const { userLocation, getLocation } = useCurrentPosition();

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
      {selectedSpring &&
      selectedSpring.location?.coordinates?.parking?.length >= 2 && (
        <Marker
          position={[
            selectedSpring.location.coordinates.parking[0],
            selectedSpring.location.coordinates.parking[1],
          ]}
          icon={parkingIcon}
        >
          <Popup>Parking for {selectedSpring.name}</Popup>
        </Marker>
      )}
      {filteredSpringsList &&
        filteredSpringsList.map((spring) => {
          const [lat, lng] = spring.location.coordinates.pool;
          const iconToUse =
            selectedSpring && selectedSpring._id !== spring._id ? unselectedSpringIcon : springIcon;

          return (
            <Marker key={spring._id} position={[lat, lng]} icon={iconToUse}>
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
