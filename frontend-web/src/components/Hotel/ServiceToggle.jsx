import React, { useState } from 'react';
import { toggleHotelService } from '../../services/api';
import { Truck, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';

const ServiceToggle = ({ initialDelivery, initialOrders }) => {
  const [offersDelivery, setOffersDelivery] = useState(initialDelivery);
  const [takesOrders, setTakesOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleToggle = async (type) => {
    setLoading(true);
    const newDelivery = type === 'delivery' ? !offersDelivery : offersDelivery;
    const newOrders = type === 'orders' ? !takesOrders : takesOrders;

    try {
      await toggleHotelService({
        offers_delivery: newDelivery,
        takes_orders: newOrders,
      });
      if (type === 'delivery') setOffersDelivery(newDelivery);
      if (type === 'orders') setTakesOrders(newOrders);
      setMessage({ type: 'success', text: 'Service status updated live!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update service status.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Live Service Availability</h2>
      <p className="text-gray-500 text-sm mb-6">
        Toggle your service status in real time to inform nearby clients whether you deliver or take orders.
      </p>

      {message && (
        <div className={`p-3 mb-4 rounded-lg flex items-center text-sm font-medium ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Delivery Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Truck className={`w-6 h-6 ${offersDelivery ? 'text-green-600' : 'text-gray-400'}`} />
            <div>
              <p className="font-semibold text-gray-800">Food Delivery</p>
              <p className="text-xs text-gray-500">{offersDelivery ? 'Currently delivering' : 'Delivery paused'}</p>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={() => handleToggle('delivery')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              offersDelivery ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {offersDelivery ? 'Active' : 'Disabled'}
          </button>
        </div>

        {/* Taking Orders Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingBag className={`w-6 h-6 ${takesOrders ? 'text-blue-600' : 'text-gray-400'}`} />
            <div>
              <p className="font-semibold text-gray-800">Order Taking</p>
              <p className="text-xs text-gray-500">{takesOrders ? 'Accepting new orders' : 'Orders paused'}</p>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={() => handleToggle('orders')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              takesOrders ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {takesOrders ? 'Active' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceToggle;