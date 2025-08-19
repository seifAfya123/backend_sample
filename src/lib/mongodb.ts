import mongoose from 'mongoose';
import config from '@/config';
import { ConnectOptions } from 'mongoose';
import { logger } from '@/lib/winston';
const clientOptions: ConnectOptions = {
  dbName: 'blogger',
  appName: 'blogger',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in config');
  }
  try {
    await mongoose.connect(config.DATABASE_URL as string, clientOptions);
    logger.info('Connected to MongoDB successfully ✅');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB successfully ✅');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);

    throw error;
  }
};
