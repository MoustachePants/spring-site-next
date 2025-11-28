import mongoose, {Mongoose} from 'mongoose';

// Import all models to ensure they are registered
import  "../models/schemas/spring.model"
import  "../models/schemas/springUpdate.model"

// MongoDB connection configuration
const mongodbUri = process.env.MONGODB_URI as string;

/**
 * Connect to MongoDB using Mongoose
 * - Handles development vs production environments
 * - Provides detailed error handling
 */
export async function connectDB(dbName: string) {
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  if (mongodbUri === '') {
      return
  }

  const opts = {
    bufferCommands: false,
    dbName: dbName,
  };

  try {
    const conn = await mongoose.connect(mongodbUri, opts);
    const connectedDbName = conn.connection.db?.databaseName;
    console.log(`Connected to MongoDB${connectedDbName ? ` (database: ${connectedDbName})` : ''}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
