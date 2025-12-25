'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MAP_CONSTANTS, AVAILABLE_MAPS } from '@/models/constant/map';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { useDataContext } from '@/context/DataContext';
import SmallPreviewCard from '@/components/SmallPreviewCard/SmallPreviewCard';
import { UserLocation } from '@/models/types/userLocation';
import { springIcon, unselectedSpringIcon, parkingIcon, userLocationIcon } from './mapIcons';
import LoadingButton from '@/components/ui/LoadingButton/LoadingButton';

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

const MapControls = ({
  selectedMapType,
  onMapTypeChange,
  userLocation,
  getLocation,
}: {
  selectedMapType: any;
  onMapTypeChange: () => void;
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

  const handleLocationClick = (e: React.MouseEvent) => {
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

  const handleMapTypeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMapTypeChange();
  };

  return (
    <div className="map-controls-container">
      <button onClick={handleMapTypeClick} className="map-button" title={`Switch map`}>
        <Icons.map width={20} height={20} />
      </button>
      <LoadingButton
        onClick={handleLocationClick}
        className="map-button"
        title="Show my location"
        isLoading={isWaitingForLocation}
        loadingTimeoutMs={10000}
        onTimeout={() => setIsWaitingForLocation(false)}
      >
        <Icons.position width={20} height={20} />
      </LoadingButton>
    </div>
  );
};

const Map: React.FC = () => {
  const { mapState, filteredSpringsList, selectedSpring } = useDataContext();
  const { userLocation, getLocation } = useCurrentPosition();
  const [selectedMapType, setSelectedMapType] = useState(AVAILABLE_MAPS[0]);

  const handleMapTypeChange = () => {
    const currentIndex = AVAILABLE_MAPS.findIndex((map) => map.id === selectedMapType.id);
    const nextIndex = (currentIndex + 1) % AVAILABLE_MAPS.length;
    setSelectedMapType(AVAILABLE_MAPS[nextIndex]);
  };

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
      doubleClickZoom={true}
    >
      <TileLayer
        key={selectedMapType.id}
        url={selectedMapType.tileLayerUrl}
        attribution={selectedMapType.attribution}
      />
      <MapStateUpdater />
      <MapController />
      <MapControls
        selectedMapType={selectedMapType}
        onMapTypeChange={handleMapTypeChange}
        userLocation={userLocation}
        getLocation={getLocation}
      />
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
          <Popup>
            <b>Your Location</b>
          </Popup>
        </Marker>
      )}
      {selectedSpring && selectedSpring.location?.coordinates?.parking?.length >= 2 && (
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
