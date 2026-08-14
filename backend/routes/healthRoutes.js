import { Router } from 'express';
import { getDBStatus } from '../config/db.js';

const router = Router();

router.get('/health', (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      server: 'running',
      mongodb: dbStatus,
      clerkAuth: Boolean(process.env.CLERK_SECRET_KEY),
      groqAI: Boolean(process.env.GROQ_API_KEY)
    }
  });
});

export default router;
