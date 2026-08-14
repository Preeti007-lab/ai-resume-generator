import { Resume } from '../models/Resume.js';
import { groqService } from '../services/groqService.js';

/**
 * Generate a professional resume with Groq AI and store in MongoDB
 * POST /generate
 */
export const generateResume = async (req, res, next) => {
  try {
    const clerkUserId = req.clerkUserId;
    const resumeInput = req.body;

    // Call Groq AI to synthesize and format the resume
    const generatedContent = await groqService.generateResume(resumeInput);

    const targetRole =
      generatedContent.personalDetails?.targetRole ||
      resumeInput.targetRole ||
      resumeInput.personalDetails?.targetRole ||
      'Professional Resume';

    const fullName =
      generatedContent.personalDetails?.fullName ||
      resumeInput.fullName ||
      resumeInput.personalDetails?.fullName ||
      'Candidate';

    const userEmail =
      generatedContent.personalDetails?.email ||
      resumeInput.email ||
      resumeInput.userEmail ||
      '';

    // Store in MongoDB with verified Clerk user ownership
    const newResume = new Resume({
      clerkUserId,
      title: `${targetRole} - ${fullName}`,
      targetRole,
      userEmail,
      resumeInput,
      generatedResume: generatedContent
    });

    const savedResume = await newResume.save();

    return res.status(201).json({
      success: true,
      message: 'Resume generated and saved successfully.',
      data: savedResume,
      resume: savedResume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve all resumes belonging exclusively to the authenticated Clerk user
 * GET /getresumes
 */
export const getResumes = async (req, res, next) => {
  try {
    const clerkUserId = req.clerkUserId;

    // Strictly user-scoped MongoDB query
    const resumes = await Resume.find({ clerkUserId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
      resumes: resumes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a specific resume owned by the authenticated Clerk user
 * DELETE /deleteresume
 */
export const deleteResume = async (req, res, next) => {
  try {
    const clerkUserId = req.clerkUserId;
    const resumeId = req.validatedResumeId;

    // Query must match BOTH the document _id AND the authenticated clerkUserId
    const deletedDoc = await Resume.findOneAndDelete({
      _id: resumeId,
      clerkUserId
    });

    if (!deletedDoc) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Resume not found or you are not authorized to delete it.',
          code: 'NOT_FOUND'
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resume deleted successfully.',
      deletedId: resumeId
    });
  } catch (error) {
    next(error);
  }
};
