import mongoose from 'mongoose';

import '../models/schemas/spring.model';
import '../models/schemas/springUpdate.model';

const mongodbUri = process.env.MONGODB_URI as string;

export async function connectDB(dbName: string) {
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  if (mongodbUri === '') {
    return;
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
