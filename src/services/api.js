// Your live Render cloud URL path
const API_BASE_URL = "https://preeti-resume-backend.onrender.com";

export const generateResume = async (resumeData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Securely passes the token received from the component
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