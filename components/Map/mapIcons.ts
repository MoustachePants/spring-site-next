import L from 'leaflet';

const BASE_ICON_OPTIONS: L.IconOptions = {
  iconUrl: '', // Placeholder, required by type but overridden
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize: [60, 60],
  shadowAnchor: [20, 58],
};

export const springIcon = L.icon({
  ...BASE_ICON_OPTIONS,
  iconUrl: '/icons/spring_icon.svg',
  iconSize: [40, 45],
  iconAnchor: [20, 45],
  popupAnchor: [0, -42],
});

export const unselectedSpringIcon = L.icon({
  ...springIcon.options,
  className: 'map-spring-icon-not-selected',
});

export const userLocationIcon = L.icon({
  ...BASE_ICON_OPTIONS,
  iconUrl: '/icons/my_location.svg',
  iconSize: [40, 45],
  iconAnchor: [20, 45],
  popupAnchor: [0, -42],
});

export const parkingIcon = L.icon({
  ...BASE_ICON_OPTIONS,
  iconUrl: '/icons/parking.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});
