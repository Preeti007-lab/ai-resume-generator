import { Router } from 'express';
import {
  generateResume,
  getResumes,
  deleteResume
} from '../controllers/resumeController.js';
import { requireClerkAuth } from '../middleware/authMiddleware.js';
import {
  validateGenerateInput,
  validateDeleteInput
} from '../middleware/validationMiddleware.js';

const router = Router();

// All application resume routes require verified Clerk authentication
router.post('/generate', requireClerkAuth, validateGenerateInput, generateResume);
router.get('/getresumes', requireClerkAuth, getResumes);
router.delete('/deleteresume', requireClerkAuth, validateDeleteInput, deleteResume);

export default router;
