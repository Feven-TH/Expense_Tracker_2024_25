// Fetch API for app.js (Expense Management)
import { apiClient } from "./client";

export const expenseApi = {
  getExpenses() {
    return apiClient.request('expenses', { method: 'GET' });
  },

  addExpense(expense) {
    return apiClient.request('expenses', {
      method: 'POST',
      body: expense,
    });
  },

  updateExpense(expenseId, updates) {
    return apiClient.request(`expenses/${expenseId}`, {
      method: 'PUT',
      body: updates,
    });
  },

  deleteExpense(expenseId) {
    return apiClient.request(`expenses/${expenseId}`, {
      method: 'DELETE',
    });
  },
};

// Fetch API for update.js (Expense Management)
export const updateApi = {
    updateExpense(expenseId, updates) {
      return apiClient.request(`expenses/${expenseId}`, {
        method: 'PUT',
        body: updates,
      });
    },
  };

  
