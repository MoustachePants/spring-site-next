import mongoose, {Mongoose} from 'mongoose';

// Import all models to ensure they are registered
import  "../models/schemas/spring.model"

// MongoDB connection configuration
const mongodbUri = process.env.MONGODB_URI as string;

// Global cached connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using Mongoose with connection caching
 * - Implements connection caching for better performance
 * - Handles development vs production environments
 * - Provides detailed error handling
 */
export async function connectDB(dbName: string) {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  if (mongodbUri === '') {
      return
  }

  // Create new connection promise if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: dbName,
    };

    cached.promise = mongoose.connect(mongodbUri, opts)
      .then((mongoose) => {
        const connectedDbName = mongoose.connection.db?.databaseName;
        console.log(`Connected to MongoDB${connectedDbName ? ` (database: ${connectedDbName})` : ''}`);
        return mongoose;
      });
  }

  // Await connection and handle errors
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }

  return cached.conn;
}
