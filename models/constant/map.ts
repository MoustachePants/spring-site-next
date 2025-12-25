export type MapType = {
  id: string;
  name: string;
  tileLayerUrl: string;
  attribution: string;
};

export const AVAILABLE_MAPS: MapType[] = [
  {
    id: 'standard',
    name: 'Standard',
    tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    id: 'satellite',
    name: 'Satellite',
    tileLayerUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
];

export const MAP_CONSTANTS = {
  INITIAL_CENTER: [31.60355, 34.95969] as [number, number], // Jerusalem
  INITIAL_ZOOM: 8,
  DEFAULT_ZOOM: 13,
  MIN_ZOOM: 7,
  ISRAEL_BOUNDS: [
    [25.0, 32.0], // South West (Expanded)
    [37.5, 38.0], // North East (Expanded)
  ] as [[number, number], [number, number]],
  MAX_BOUNDS_VISCOSITY: 1.0,
};
