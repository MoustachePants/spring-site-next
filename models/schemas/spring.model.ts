import mongoose, { Document, Schema, Model } from 'mongoose';
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
    hasShadow: { type: Boolean, default: false },
    hasSitingSpots: { type: Boolean, default: false },
    IsAccessible: { type: Boolean, default: false },
    isShallow: { type: Boolean, default: false },
    isDeep: { type: Boolean, default: false },
    isHotSpring: { type: Boolean, default: false },
    hasClearWater: { type: Boolean, default: false },
    hasView: { type: Boolean, default: false },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    image: { type: String, required: true },
    credit: { type: String, trim: true },
    link: { type: String, trim: true },
  },
  { timestamps: false, _id: false }
);

const locationSchema = new Schema(
  {
    region: {
      main: { type: String, trim: true },
      sub: { type: String, trim: true },
    },
    directions: { type: String, trim: true },
    wazeLink: { type: String, trim: true },
    minutesByFoot: { type: Number, min: 0, default: 0 },
    coordinates: {
      pool: {
        type: [Number],
        validate: {
          validator(value: number[]) {
            return Array.isArray(value) && value.length === 2;
          },
          message: 'Pool coordinates must include [latitude, longitude]',
        },
      },
      parking: {
        type: [Number],
        validate: {
          validator(value: number[]) {
            return Array.isArray(value) && value.length === 2;
          },
          message: 'Parking coordinates must include [latitude, longitude]',
        },
      },
    },
  },
  { _id: false }
);

const springSchema = new Schema<ISpring>({
  name: { type: String, required: true, trim: true },
  mainRegion: { type: String, required: true, trim: true },
  subRegion: { type: String, required: true, trim: true },
  springDetails: { type: springDetailsSchema, required: true },
  images: { type: [imageSchema], default: [] },
  location: { type: locationSchema, required: true },
  description: { type: String, trim: true },
  lastUpdate: { type: Date, default: Date.now },
});

springSchema.index({ mainRegion: 1, subRegion: 1 });
springSchema.index({ name: 'text', description: 'text' });

const SpringModel =
  (mongoose.models['Spring-Refactored'] as Model<ISpring>) ||
  mongoose.model<ISpring>('Spring-Refactored', springSchema, 'springs');

export { SpringModel };
