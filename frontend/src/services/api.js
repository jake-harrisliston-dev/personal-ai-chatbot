const API_URL = 'http://localhost:8000';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
    try {
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      // Handle 401 (session expired)
      if (response.status === 401) {
        throw new Error('Session expired');
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
};


export const api = {
  aiGenerate: (data) => {
    console.log("Sending to API:", JSON.stringify(data));
    return apiCall(`/api/ai-generate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
