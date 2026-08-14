import mongoose from 'mongoose';

/**
 * Validate incoming POST /generate payload
 */
export const validateGenerateInput = (req, res, next) => {
  const body = req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid request body. JSON object expected.' }
    });
  }

  // Extract fields (supporting both flat structure and nested personalDetails structure)
  const fullName = body.fullName || body.personalDetails?.fullName || '';
  const targetRole = body.targetRole || body.personalDetails?.targetRole || '';
  const email = body.email || body.personalDetails?.email || '';

  const errors = [];

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('Full name is required.');
  } else if (fullName.length > 150) {
    errors.push('Full name must not exceed 150 characters.');
  }

  if (!targetRole || typeof targetRole !== 'string' || !targetRole.trim()) {
    errors.push('Target job title / role is required.');
  } else if (targetRole.length > 150) {
    errors.push('Target role must not exceed 150 characters.');
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email address is required.');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  }

  // Limit array sizes
  const arrayFields = ['experience', 'education', 'skills', 'projects', 'certifications', 'achievements'];
  for (const field of arrayFields) {
    if (body[field] && !Array.isArray(body[field])) {
      errors.push(`Field '${field}' must be an array.`);
    } else if (Array.isArray(body[field]) && body[field].length > 30) {
      errors.push(`Field '${field}' cannot exceed 30 entries.`);
    }
  }

  // Text length limit for objective/summary
  const objective = body.objective || body.summary || '';
  if (typeof objective === 'string' && objective.length > 3000) {
    errors.push('Career objective / summary must not exceed 3000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: errors.join(' '),
        details: errors
      }
    });
  }

  next();
};

/**
 * Validate DELETE /deleteresume parameters
 */
export const validateDeleteInput = (req, res, next) => {
  const resumeId = req.query.id || req.query.resumeId || req.body?.id || req.body?.resumeId;

  if (!resumeId || typeof resumeId !== 'string' || !resumeId.trim()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Resume identifier (id or resumeId) is required to delete.' }
    });
  }

  const trimmedId = resumeId.trim();

  // Validate MongoDB ObjectId format if 24-character hex string
  if (trimmedId.length === 24 && !mongoose.Types.ObjectId.isValid(trimmedId)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid resume identifier format.' }
    });
  }

  req.validatedResumeId = trimmedId;
  next();
};
