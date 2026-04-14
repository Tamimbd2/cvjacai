const BASE_URL = '/api';

export const authApi = {
  signin: async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },
};

export const resumeApi = {
  classify: async (formData, token) => {
    // formData contains: job_circular, resume_files (file), top_k, skills, min_experience
    const response = await fetch(`${BASE_URL}/classify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
    return response.json();
  },
};
