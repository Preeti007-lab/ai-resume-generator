import { useAuth } from '@clerk/clerk-react';

// Your live Render cloud URL
const API_BASE_URL = "https://preeti-resume-backend.onrender.com";

export function useResumeApi() {
  const { getToken } = useAuth(); // Safely fetches your Clerk login token

  const generateResume = async (resumeData) => {
    try {
      const token = await getToken(); // Fetches the authorization code from Clerk

      const response = await fetch(`${API_BASE_URL}generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Sends your login key down to the Render server guardrail!
        },
        body: JSON.stringify(resumeData)
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  };

  return { generateResume };
}