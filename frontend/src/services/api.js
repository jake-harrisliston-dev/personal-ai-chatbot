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

      console.log(response)
      
      
      if (!response.ok) {

        // Handle 401 (session expired)
        if (response.status === 401) {
          throw new Error('Session expired. Try refreshing the page to continue.');
        }

        // handle 429 error
        if (response.status === 429) {
          console.log('CAUGHT 429 error')
          const error = await response.json();
          const limitError = new Error(error.detail || 'Message limit reached');
          limitError.status = 429;
          throw limitError;
        }

        const error = await response.json();
        throw new Error(error.detail || 'API request failed');
      }
      
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
};


export const api = {
  aiGenerate: (data) => {
    console.log("Sending to backend:", JSON.stringify(data));
    return apiCall(`/api/ai-generate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  formSubmit: (data) => {
    console.log("Form data recieved in api.js: ", JSON.stringify(data))
    return apiCall(`/api/form-submit`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};
