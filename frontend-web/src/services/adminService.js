import API from './api';

export const adminService = {
  getPendingHotels: async () => {
    const response = await API.get('/admin/hotels/pending');
    return response.data;
  },

  verifyHotel: async (hotelId) => {
    const response = await API.patch(`/admin/hotels/${hotelId}/verify`);
    return response.data;
  },

  rejectHotel: async (hotelId, reason) => {
    const response = await API.patch(`/admin/hotels/${hotelId}/reject`, { reason });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await API.get('/admin/users');
    return response.data;
  }
};