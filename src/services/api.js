/**
 * API Service for AI Resume Generator
 * Communicates with the Express backend endpoints:
 * - POST /generate
 * - GET /getresumes
 * - DELETE /deleteresume
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://preeti-resume-backend.onrender.com/';

/**
 * Helper to build standard auth headers
 * @param {string} token - Clerk session Bearer token
 * @returns {HeadersInit}
 */
const createHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API responses with clear error extraction
 * @param {Response} response
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const apiService = {
  /**
   * Generate and store a new resume
   * @param {Object} resumeData - Structured resume details entered by user
   * @param {string} token - Clerk authentication Bearer token
   * @returns {Promise<Object>} Generated resume data
   */
  generateResume: async (resumeData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}api/generate-resume`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(resumeData),
      });

      return await handleResponse(response);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please make sure your Express backend is running on ' + API_BASE_URL);
      }
      throw err;
    }
  },

  /**
   * Retrieve all resumes belonging to the authenticated user
   * @param {string} token - Clerk authentication Bearer token
   * @returns {Promise<Array>} List of saved resumes
   */
  getResumes: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getresumes`, {
        method: 'GET',
        headers: createHeaders(token),
      });

      const result = await handleResponse(response);
      // Support responses structured as { resumes: [...] } or directly [...]
      if (Array.isArray(result)) {
        return result;
      }
      if (result && Array.isArray(result.resumes)) {
        return result.resumes;
      }
      if (result && Array.isArray(result.data)) {
        return result.data;
      }
      return [];
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Unable to connect to the backend server. Please check your backend connection.');
      }
      throw err;
    }
  },

  /**
   * Delete a saved resume
   * @param {string} id - The resume ID to delete
   * @param {string} token - Clerk authentication Bearer token
   * @returns {Promise<Object>} Deletion result
   */
  deleteResume: async (id, token) => {
    try {
      // Send both as query param and in request body for maximum Express backend compatibility
      const url = new URL(`${API_BASE_URL}/deleteresume`);
      url.searchParams.append('id', id);
      url.searchParams.append('resumeId', id);

      const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: createHeaders(token),
        body: JSON.stringify({ id, resumeId: id }),
      });

      return await handleResponse(response);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Failed to reach backend server to delete resume.');
      }
      throw err;
    }
  }
};
