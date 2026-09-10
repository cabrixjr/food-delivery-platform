import API from './api';

export const userService = {
  getNearMe: async (latitude, longitude, maxDistanceKm = 10) => {
    const response = await API.get('/users/near-me', {
      params: { latitude, longitude, max_distance_km: maxDistanceKm },
    });
    return response.data;
  },

  exploreHotels: async (searchQuery = '', offersDelivery = false) => {
    const response = await API.get('/users/explore', {
      params: { search: searchQuery, offers_delivery: offersDelivery },
    });
    return response.data;
  },

  logCallInteraction: async (hotelId) => {
    const response = await API.post('/activities', {
      hotel_id: hotelId,
      action_type: 'CALL_HOTEL',
      details: { timestamp: new Date().toISOString() },
    });
    return response.data;
  }
};