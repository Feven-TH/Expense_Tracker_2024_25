// API Client: Generic Fetch API Logic (Reusable Base)
const API_BASE_URL = 'http://localhost:3000'; // Adjust backend base URL

export const apiClient = {
  async request(endpoint, { method = 'GET', headers = {}, body } = {}) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      return response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  },
};