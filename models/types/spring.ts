import type { SpringUpdate } from './springUpdate';

export interface Spring {
  _id: string;
  name: string;
  mainRegion: string;
  subRegion: string;
  springDetails: SpringDetails;
  images: SpringImage[];
  location: SpringLocation;
  description: string;
  lastUpdate: string | Date;
  updates?: SpringUpdate[];
  __v?: number;
}

export interface SpringDetails {
  reserve: SpringReserveDetails;
  typeOf: string;
  howDeep: number;
  temperature: number;
  size: number;
  hasShadow: boolean;
  hasSitingSpots: boolean;
  IsAccessible: boolean;
  isShallow: boolean;
  isDeep: boolean;
  isHotSpring: boolean;
  hasClearWater: boolean;
  hasView: boolean;
}

export interface SpringReserveDetails {
  ifReserve: boolean;
  nameOfReserve?: string;
}

export interface SpringImage {
  image: string;
  credit?: string;
  link?: string;
}

export interface SpringLocation {
  region: {
    main: string;
    sub: string;
  };
  directions: string;
  wazeLink: string;
  minutesByFoot: number;
  coordinates: {
    pool: number[];
    parking: number[];
  };
}
