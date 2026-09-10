import API from './api';

export const hotelService = {
  getProfile: async () => {
    const response = await API.get('/hotels/profile');
    return response.data;
  },

  updateProfile: async (hotelData) => {
    const response = await API.put('/hotels/profile', hotelData);
    return response.data;
  },

  toggleDeliveryStatus: async (offers_delivery) => {
    const response = await API.patch('/hotels/delivery-status', { offers_delivery });
    return response.data;
  },

  toggleOrderTakingStatus: async (takes_orders) => {
    const response = await API.patch('/hotels/order-status', { takes_orders });
    return response.data;
  },

  uploadInteriorImages: async (formData) => {
    const response = await API.post('/hotels/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadVerificationDocs: async (formData) => {
    const response = await API.post('/hotels/upload-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};