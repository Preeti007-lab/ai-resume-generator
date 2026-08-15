// Live Render Cloud API URL or local environment override
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://preeti-resume-backend.onrender.com';
const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

/**
 * Generate a resume via AI Backend API
 * @param {Object} resumeData - Formatted user profile/resume payload
 * @param {string} token - Clerk user auth token
 */
export const generateResume = async (resumeData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(resumeData)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error?.message || data.message || `Server returned status: ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error('API Request Error (generateResume):', error);
    throw error;
  }
};

/**
 * Fetch all saved resumes for the authenticated user
 * @param {string} token - Clerk user auth token
 */
export const getResumes = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getresumes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error?.message || data.message || `Server returned status: ${response.status}`;
      throw new Error(errorMsg);
    }

    return data.data || data.resumes || data || [];
  } catch (error) {
    console.error('API Request Error (getResumes):', error);
    throw error;
  }
};

/**
 * Delete a specific resume by ID
 * @param {string} resumeId - Unique MongoDB resume ID
 * @param {string} token - Clerk user auth token
 */
export const deleteResume = async (resumeId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteresume?id=${encodeURIComponent(resumeId)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error?.message || data.message || `Server returned status: ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error('API Request Error (deleteResume):', error);
    throw error;
  }
};

export const apiService = {
  generateResume,
  getResumes,
  deleteResume
};

export default apiService;