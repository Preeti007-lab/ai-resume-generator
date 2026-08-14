import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('🚀 Initializing AI Resume Generator Backend...');

  // Connect to MongoDB
  await connectDB();

  // Create Express App
  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 Clerk Auth: ${process.env.CLERK_SECRET_KEY ? 'Configured' : 'Missing CLERK_SECRET_KEY'}`);
    console.log(`🤖 Groq AI: ${process.env.GROQ_API_KEY ? 'Configured (' + (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile') + ')' : 'Missing GROQ_API_KEY'}`);
  });

  // Graceful shutdown
  const handleShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};

startServer().catch((err) => {
  console.error('Fatal Server Boot Error:', err);
  process.exit(1);
});
