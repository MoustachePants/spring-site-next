export const mapCategories = {
  deep: 'עמוקים',
  hot: 'מעיין חם',
  accsessible: 'נגיש',
  shadow: 'מוצל',
  view: 'עם נוף',
  nearCar: 'קרוב לרכב',
  sitSpot: 'מקום ישיבה',
  shallow: 'רדודים',
} as const;

export type Category = keyof typeof mapCategories;
export const CATEGORIES = Object.keys(mapCategories) as Category[];

export const mapPlaces = {
  north: 'צפון',
  south: 'דרום',
  center: 'מרכז',
} as const;

export type Place = keyof typeof mapPlaces;
export const PLACES = Object.keys(mapPlaces) as Place[];
