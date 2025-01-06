import mongoose from 'mongoose';

/**
 * Track MongoDB connection
 */
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (!process.env.MONGODB_DB_NAME) {
    throw new Error('MONGODB_DB_NAME is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};
