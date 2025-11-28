import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { RegisterProvider } from '../types/user';

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  provider: RegisterProvider;
  providerId?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toFormattedJSON(): {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    provider: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === 'email';
      },
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    name: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['email', 'google', 'github'],
      default: 'email',
      required: true,
    },
    providerId: {
      type: String,
      required: function (this: IUser) {
        return this.provider !== 'email';
      },
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ provider: 1, providerId: 1 });

// Virtual for projects associated with this user
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Format user data for client
userSchema.methods.toFormattedJSON = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
    avatar: this.avatar,
    provider: this.provider,
    emailVerified: this.emailVerified,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Prevent re-compilation in development
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export { User };
