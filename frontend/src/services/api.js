import axios from 'axios';

const api = axios.create({
  // the backend server listens on PORT 5000 by default (see backend/server.js)
  // frontend was defaulting to 5001 which produced a connection-refused error
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
