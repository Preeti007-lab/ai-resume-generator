import Groq from 'groq-sdk';

/**
 * Service to orchestrate Groq AI resume generation
 */
export class GroqService {
  constructor() {
    this.model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  get client() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured in backend environment variables.');
    }
    return new Groq({ apiKey });
  }

  /**
   * Transform user input into an executive, ATS-optimized structured resume using Groq AI
   * @param {Object} resumeInput - Candidate details provided by user
   * @returns {Promise<Object>} Formatted structured resume object
   */
  async generateResume(resumeInput) {
    const prompt = this.buildPrompt(resumeInput);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an elite Senior Executive Resume Writer and Applicant Tracking System (ATS) optimization specialist.
Your mission is to take raw candidate information and craft a compelling, high-impact, professional resume.

CRITICAL RULES:
1. DO NOT fabricate or invent qualifications, past companies, degrees, dates, awards, or factual experiences that the candidate did not provide.
2. Polish and enhance phrasing: Use strong action verbs (e.g., "Architected", "Spearheaded", "Streamlined", "Accelerated"), quantify impact where indicated, and eliminate weak passive phrasing.
3. Write a high-impact 2-4 sentence Professional Summary tailored precisely to the candidate's target job title.
4. Cleanly format work experience into crisp, impactful bullet points.
5. Return ONLY a valid JSON object matching the requested schema with no surrounding conversational text or markdown code fences.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      });

      const rawContent = response.choices[0]?.message?.content;

      if (!rawContent || !rawContent.trim()) {
        throw new Error('Groq AI returned an empty completion.');
      }

      // Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(rawContent);
      } catch (parseError) {
        console.error('Failed to parse Groq response as JSON:', rawContent);
        throw new Error('AI response formatting error. Please try generating again.');
      }

      // Normalize output schema to guarantee structure
      return this.normalizeResumeOutput(parsed, resumeInput);
    } catch (error) {
      console.error('Groq AI Service Error:', error.message);

      if (error.status === 429 || error.message?.includes('rate limit')) {
        const rateLimitErr = new Error('AI generation rate limit exceeded. Please wait a moment and try again.');
        rateLimitErr.statusCode = 429;
        throw rateLimitErr;
      }

      if (error.code === 'ENOTFOUND' || error.name === 'FetchError' || error.message?.includes('fetch failed')) {
        const netErr = new Error('Failed to reach Groq AI services. Please check network connection.');
        netErr.statusCode = 503;
        throw netErr;
      }

      throw error;
    }
  }

  /**
   * Build structured user prompt for Groq
   */
  buildPrompt(input) {
    const personal = input.personalDetails || {
      fullName: input.fullName || '',
      targetRole: input.targetRole || '',
      email: input.email || '',
      phone: input.phone || '',
      location: input.location || '',
      links: input.links || ''
    };

    return `Transform the following candidate data into a polished executive ATS resume in JSON format.

CANDIDATE INPUT:
${JSON.stringify({
  personalDetails: personal,
  careerObjective: input.objective || input.summary || '',
  workExperience: input.experience || [],
  education: input.education || [],
  skills: input.skills || [],
  projects: input.projects || [],
  certifications: input.certifications || [],
  achievements: input.achievements || []
}, null, 2)}

REQUIRED JSON OUTPUT FORMAT:
{
  "personalDetails": {
    "fullName": "${personal.fullName}",
    "targetRole": "${personal.targetRole}",
    "email": "${personal.email}",
    "phone": "${personal.phone}",
    "location": "${personal.location}",
    "links": "${personal.links}"
  },
  "objective": "High impact 2-4 sentence executive summary",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "location": "Location",
      "startDate": "Start Date",
      "endDate": "End Date or Present",
      "isCurrent": false,
      "highlights": "• Enhanced bullet point with action verbs\n• Another quantified achievement bullet"
    }
  ],
  "education": [
    {
      "institution": "University/College",
      "degree": "Degree and Major",
      "graduationYear": "Year",
      "gpa": "GPA or Honors if provided"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "name": "Project Name",
      "techStack": "Technologies used",
      "link": "Link if provided",
      "description": "Crisp outcome-oriented description"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Org",
      "year": "Year"
    }
  ],
  "achievements": [
    "Key achievement 1"
  ]
}`;
  }

  /**
   * Normalize and preserve original data if fields are missing in AI response
   */
  normalizeResumeOutput(aiResult, originalInput) {
    const personal = originalInput.personalDetails || {
      fullName: originalInput.fullName || '',
      targetRole: originalInput.targetRole || '',
      email: originalInput.email || '',
      phone: originalInput.phone || '',
      location: originalInput.location || '',
      links: originalInput.links || ''
    };

    return {
      personalDetails: {
        fullName: aiResult.personalDetails?.fullName || personal.fullName,
        targetRole: aiResult.personalDetails?.targetRole || personal.targetRole,
        email: aiResult.personalDetails?.email || personal.email,
        phone: aiResult.personalDetails?.phone || personal.phone,
        location: aiResult.personalDetails?.location || personal.location,
        links: aiResult.personalDetails?.links || personal.links
      },
      objective: aiResult.objective || originalInput.objective || '',
      experience: Array.isArray(aiResult.experience) ? aiResult.experience : (originalInput.experience || []),
      education: Array.isArray(aiResult.education) ? aiResult.education : (originalInput.education || []),
      skills: Array.isArray(aiResult.skills) ? aiResult.skills : (originalInput.skills || []),
      projects: Array.isArray(aiResult.projects) ? aiResult.projects : (originalInput.projects || []),
      certifications: Array.isArray(aiResult.certifications) ? aiResult.certifications : (originalInput.certifications || []),
      achievements: Array.isArray(aiResult.achievements) ? aiResult.achievements : (originalInput.achievements || [])
    };
  }
}

export const groqService = new GroqService();
