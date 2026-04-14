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
  shortlist: async (formData) => {
    // formData should contain: job_circular, resume_files (file), top_k, skills, min_experience
    const response = await fetch(`${BASE_URL}/classify`, { // Based on the root JSON I saw earlier: POST /api/classify
      method: 'POST',
      body: formData, // No Content-Type header needed for FormData; browser sets it with boundary
    });
    return response.json();
  },
};
