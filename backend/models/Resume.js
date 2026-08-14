import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: [true, 'Clerk user ID is required'],
      index: true,
      trim: true
    },
    title: {
      type: String,
      default: 'Professional Resume',
      trim: true
    },
    targetRole: {
      type: String,
      default: '',
      trim: true
    },
    userEmail: {
      type: String,
      default: '',
      trim: true
    },
    resumeInput: {
      personalDetails: {
        fullName: { type: String, default: '' },
        targetRole: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        links: { type: String, default: '' }
      },
      objective: { type: String, default: '' },
      experience: { type: Array, default: [] },
      education: { type: Array, default: [] },
      skills: { type: Array, default: [] },
      projects: { type: Array, default: [] },
      certifications: { type: Array, default: [] },
      achievements: { type: Array, default: [] }
    },
    generatedResume: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Generated resume content is required']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        return ret;
      }
    }
  }
);

// Compound index for efficient user-scoped queries and deletion
resumeSchema.index({ clerkUserId: 1, createdAt: -1 });

export const Resume = mongoose.model('Resume', resumeSchema);
