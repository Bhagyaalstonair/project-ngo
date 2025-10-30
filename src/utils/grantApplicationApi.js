const API_BASE_URL = 'http://localhost:5000/api';

export const grantApplicationApi = {
  // Get all grant applications
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/grant-applications`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get specific grant application
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grant-applications/${id}`);
      if (!response.ok) throw new Error('Failed to fetch application');
      return await response.json();
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  // Submit new grant application
  create: async (applicationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grant-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Update grant application (admin only)
  update: async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grant-applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update application');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // Delete grant application (admin only)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grant-applications/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete application');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
};