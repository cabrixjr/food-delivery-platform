import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

// Request Interceptor: Attach JWT Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getNearMeHotels = (lat, lng, maxDistance = 10) => 
  API.get(`/users/near-me?latitude=${lat}&longitude=${lng}&max_distance_km=${maxDistance}`);

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (data) => API.post('/auth/register', data);
export const toggleHotelService = (statusData) => API.patch('/hotels/service-status', statusData);

export default API;