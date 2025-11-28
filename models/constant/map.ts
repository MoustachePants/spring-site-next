export const MAP_CONSTANTS = {
  DEFAULT_CENTER: [31.7683, 35.2137] as [number, number], // Jerusalem
  DEFAULT_ZOOM: 13,
  MIN_ZOOM: 7,
  ISRAEL_BOUNDS: [
    [25.0, 32.0], // South West (Expanded)
    [37.5, 38.0], // North East (Expanded)
  ] as [[number, number], [number, number]],
  MAX_BOUNDS_VISCOSITY: 1.0,
  TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
