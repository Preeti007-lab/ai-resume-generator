import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB instance with resilience
 * @returns {Promise<typeof mongoose>}
 */
export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI is not set in environment variables. Database operations will fail until configured.');
    return null;
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't crash process in dev mode to allow health check & configuration
    return null;
  }
};

/**
 * Get current database connection state
 * @returns {string} 'connected' | 'connecting' | 'disconnected' | 'unconfigured'
 */
export const getDBStatus = () => {
  if (!process.env.MONGODB_URI) return 'unconfigured';
  const state = mongoose.connection.readyState;
  switch (state) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
};
