/**
 * Centralized Error Handler Middleware
 * Sanitizes errors and returns consistent responses without leaking secrets
 */
export const errorHandler = (err, req, res, next) => {
  // Log internal error on server console for observability
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Resource not found with the specified identifier format.',
        code: 'INVALID_ID'
      }
    });
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: {
        message: messages.join('. '),
        code: 'VALIDATION_ERROR'
      }
    });
  }

  // Clerk Auth Errors
  if (err.status === 401 || err.statusCode === 401 || err.message?.includes('Clerk')) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication failed. Please check your login session.',
        code: 'UNAUTHORIZED'
      }
    });
  }

  // Rate limit error
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: {
        message: 'Too many requests. Please slow down and try again in a few moments.',
        code: 'RATE_LIMITED'
      }
    });
  }

  // Default 500 Server Error
  const statusCode = err.statusCode || err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.userMessage || 'An unexpected server error occurred while processing your request. Please try again.',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      ...(!isProd && { devDetails: err.message })
    }
  });
};

/**
 * 404 Route Not Found Handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      code: 'NOT_FOUND'
    }
  });
};
