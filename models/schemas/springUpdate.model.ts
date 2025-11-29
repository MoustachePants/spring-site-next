import mongoose, { Document, Model, Schema } from 'mongoose';
import type { SpringUpdate as SpringUpdateType } from '../types/springUpdate';
import { ISpring } from '@/models/schemas/spring.model';

export interface ISpringUpdate extends Document, Omit<SpringUpdateType, '_id' | 'spring'> {
  spring: mongoose.Types.ObjectId;
}

const springUpdateSchema = new Schema<ISpringUpdate>(
  {
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: String, trim: true, default: '' },
    update: { type: String, trim: true, default: '' },
    waterStatus: { type: Number, required: true, min: 0 },
    cleanliness: { type: Number, required: true, min: 0 },
    spring: { type: Schema.Types.ObjectId, ref: 'spring', required: true },
  },
  {
    timestamps: false, // We're using createdAt manually
  }
);

springUpdateSchema.index({ spring: 1, createdAt: -1 });
springUpdateSchema.index({ createdAt: -1 });

const SpringUpdateModel =
  (mongoose.models.SpringUpdate as Model<ISpringUpdate>) ||
  mongoose.model<ISpringUpdate>('SpringUpdate', springUpdateSchema, 'updates');

export { SpringUpdateModel };
