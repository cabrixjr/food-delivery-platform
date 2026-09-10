import axios from 'axios';

// Replace with your machine's local IP address for physical device testing
const BASE_URL = 'http://192.168.1.50:5000/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
});

export const fetchNearMeHotels = (latitude, longitude, maxDistance = 10) => {
  return API.get(`/users/near-me`, {
    params: {
      latitude,
      longitude,
      max_distance_km: maxDistance,
    },
  });
};

export default API;