import mongoose, { Document, Schema } from 'mongoose';
import type { Spring as SpringType } from '../types/spring';

export interface ISpring extends Document, Omit<SpringType, '_id'> {}

const reserveSchema = new Schema(
  {
    ifReserve: { type: Boolean, required: true },
    nameOfReserve: { type: String, trim: true },
  },
  { _id: false }
);

const springDetailsSchema = new Schema(
  {
    reserve: { type: reserveSchema, required: true },
    typeOf: { type: String, required: true, trim: true },
    howDeep: { type: Number, min: 0, required: true },
    temperature: { type: Number, min: -20, required: true },
    size: { type: Number, min: 0, required: true },
    shadow: { type: Boolean, default: false },
    sitingSpots: { type: Boolean, default: false },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    image: { type: String, required: true },
    name: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  { timestamps: false }
);

const imageCreditSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
  },
  { _id: false }
);

const extraLinkSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const locationSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator(value: number[]) {
          return Array.isArray(value) && value.length === 2;
        },
        message: 'Coordinates must include [latitude, longitude]',
      },
    },
  },
  { timestamps: false }
);

const accessibilitySchema = new Schema(
  {
    minutesByFoot: { type: Number, min: 0, default: 0 },
    disabled: { type: Boolean, default: false },
    wazeLink: { type: String, trim: true },
  },
  { _id: false }
);

const categoriesSchema = new Schema(
  {
    onlyFeet: { type: Boolean, default: false },
    swim: { type: Boolean, default: false },
    hotSprings: { type: Boolean, default: false },
    clearWater: { type: Boolean, default: false },
    view: { type: Boolean, default: false },
  },
  { _id: false }
);

const costSchema = new Schema(
  {
    ifCost: { type: Boolean, required: true },
    howMuch: { type: Number, min: 0, required: true },
  },
  { _id: false }
);

const springSchema = new Schema<ISpring>({
  name: { type: String, required: true, trim: true },
  mainRegion: { type: String, required: true, trim: true },
  subRegion: { type: String, required: true, trim: true },
  springDetails: { type: springDetailsSchema, required: true },
  costInShekels: { type: costSchema, required: true },
  images: { type: [imageSchema], default: [] },
  imagesCredit: { type: [imageCreditSchema], default: [] },
  extraLinks: { type: [extraLinkSchema], default: [] },
  location: { type: [locationSchema], default: [] },
  directions: { type: String, trim: true },
  accessibility: { type: accessibilitySchema, required: true },
  categories: { type: categoriesSchema, required: true },
  fullDescription: { type: String, trim: true },
  lastUpdate: { type: Date, default: Date.now },
});

springSchema.index({ mainRegion: 1, subRegion: 1 });
springSchema.index({ name: 'text', fullDescription: 'text' });

const SpringModel = mongoose.models.Spring || mongoose.model<ISpring>('Spring', springSchema);

export { SpringModel };

