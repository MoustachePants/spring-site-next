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
  // upperGalilee: 'הגליל העליון',
  // lowerGalilee: 'הגליל התחתון',
  // golan: 'הגולן',
  // yezreelValley: 'עמק יזרעאל',
  // carmel: 'הכרמל',
  // sharon: 'השרון',
  // shefela: 'השפלה',
  // jerusalemMountains: 'הרי ירושלים',
  // judeanDesert: 'מדבר יהודה',
  // jordanValley: 'בקעת הירדן',
  // northernNegev: 'הנגב הצפוני',
  // centralNegev: 'הנגב המרכזי',
  // arava: 'הערבה',
  // eilatArea: 'אזור אילת',
} as const;

export type Place = keyof typeof mapPlaces;
export const PLACES = Object.keys(mapPlaces) as Place[];
