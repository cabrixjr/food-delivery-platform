import React, { useState } from 'react';
import ServiceToggle from '../../components/Hotel/ServiceToggle';
import API from '../../services/api';
import { PlusCircle, Utensils } from 'lucide-react';

const HotelDashboard = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      await API.post('/hotels/menu', {
        item_name: itemName,
        price: parseFloat(price),
        category,
        description
      });
      setStatusMsg('Menu item added successfully!');
      setItemName('');
      setPrice('');
      setCategory('');
      setDescription('');
    } catch (err) {
      setStatusMsg('Failed to add menu item.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Hotel Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage your food menu, price updates, and live availability[cite: 1].</p>

      {/* Live Service Toggles */}
      <ServiceToggle initialDelivery={false} initialOrders={true} />

      {/* Add Menu Item Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Utensils className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Add Menu Item</h2>
        </div>

        {statusMsg && (
          <p className="mb-4 text-sm font-medium text-indigo-600 bg-indigo-50 p-3 rounded-md">
            {statusMsg}
          </p>
        )}

        <form onSubmit={handleAddMenuItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Cheeseburger"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="9.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Main Course, Drinks..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Short item overview..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelDashboard;