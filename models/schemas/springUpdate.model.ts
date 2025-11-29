import mongoose, { Document, Schema } from 'mongoose';
import type { SpringUpdate as SpringUpdateType } from '../types/springUpdate';

export interface ISpringUpdate extends Document, Omit<SpringUpdateType, '_id'> {}

const springUpdateSchema = new Schema<ISpringUpdate>(
  {
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: String, trim: true, default: '' },
    update: { type: String, trim: true, default: '' },
    waterStatus: { type: Number, required: true, min: 0 },
    cleanliness: { type: Number, required: true, min: 0 },
    spring: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spring-Refactored',
      required: true,
    } as mongoose.SchemaDefinitionProperty,
  },
  {
    timestamps: false, // We're using createdAt manually
  }
);

springUpdateSchema.index({ spring: 1, createdAt: -1 });
springUpdateSchema.index({ createdAt: -1 });

const SpringUpdateModel =
  mongoose.models.SpringUpdate ||
  mongoose.model<ISpringUpdate>('SpringUpdate', springUpdateSchema, 'updates');

export { SpringUpdateModel };

