import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import resumeRoutes from './routes/resumeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const createApp = () => {
  const app = express();

  // CORS configuration
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ].filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true); // Dev-friendly fallback
      },
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
      maxAge: 86400
    })
  );

  // Body parsers with safe limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 1. Diagnostic / Health Route (Public, before auth middleware)
  app.use('/', healthRoutes);

  // 2. Clerk Global Auth Middleware (Mount when CLERK_SECRET_KEY is configured)
  if (process.env.CLERK_SECRET_KEY && process.env.CLERK_SECRET_KEY.trim()) {
    app.use(clerkMiddleware());
  }

  // 3. Mount Application Protected Resume Routes
  app.use('/', resumeRoutes);

  // 4. 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
