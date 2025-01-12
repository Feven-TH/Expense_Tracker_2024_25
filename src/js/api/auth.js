// Fetch API for login.js
import { apiClient } from "./client";

export const loginApi = {
    login(credentials) {
      return apiClient.request('auth/login', {
        method: 'POST',
        body: credentials,
      });
    },
  };
  
  // Fetch API for register.js
  export const registerApi = {
    register(user) {
      return apiClient.request('auth/register', {
        method: 'POST',
        body: user,
      });
    },
  };
  