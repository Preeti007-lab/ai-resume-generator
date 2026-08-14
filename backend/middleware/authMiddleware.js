import { getAuth } from '@clerk/express';

/**
 * Middleware to require and verify Clerk authentication
 * Extracts authoritative clerkUserId from verified token
 */
export const requireClerkAuth = (req, res, next) => {
  // If CLERK_SECRET_KEY is missing on server, protect endpoints with 401
  if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_SECRET_KEY.trim()) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication required. Server CLERK_SECRET_KEY is not configured.',
        code: 'UNAUTHORIZED'
      }
    });
  }

  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required. Please provide a valid Clerk authentication session token.',
          code: 'UNAUTHORIZED'
        }
      });
    }

    // Attach verified user ID to request
    req.clerkUserId = auth.userId;
    req.clerkSessionId = auth.sessionId;

    next();
  } catch (error) {
    console.error('Clerk Auth Middleware Error:', error.message);
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or expired authentication credentials.',
        code: 'INVALID_TOKEN'
      }
    });
  }
};
