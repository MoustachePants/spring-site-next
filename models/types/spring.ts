import type { SpringUpdate } from './springUpdate';

export interface Spring {
  _id: string;
  name: string;
  mainRegion: string;
  subRegion: string;
  springDetails: SpringDetails;
  costInShekels: CostInShekels;
  images: SpringImage[];
  imagesCredit: SpringImageCredit[];
  extraLinks: SpringExtraLink[];
  location: SpringLocation[];
  directions: string;
  accessibility: SpringAccessibility;
  categories: SpringCategories;
  fullDescription: string;
  lastUpdate: Date | string;
  updates?: SpringUpdate[];
  __v?: number;
}

export interface SpringDetails {
  reserve: SpringReserveDetails;
  typeOf: string;
  howDeep: number;
  temperature: number;
  size: number;
  shadow: boolean;
  sitingSpots: boolean;
}

export interface SpringReserveDetails {
  ifReserve: boolean;
  nameOfReserve?: string;
}

export interface CostInShekels {
  ifCost: boolean;
  howMuch: number;
}

export interface SpringImage {
  _id: string;
  image: string;
  name?: string;
  link?: string;
}

export interface SpringImageCredit {
  name: string;
  link?: string;
}

export interface SpringExtraLink {
  label: string;
  url: string;
}

export interface SpringLocation {
  _id: string;
  type: 'water' | 'parking' | 'trail' | 'viewpoint' | string;
  coordinates: [number, number];
}

export interface SpringAccessibility {
  minutesByFoot: number;
  disabled: boolean;
  wazeLink?: string;
}

export interface SpringCategories {
  onlyFeet: boolean;
  swim: boolean;
  hotSprings: boolean;
  clearWater: boolean;
  view: boolean;
}
