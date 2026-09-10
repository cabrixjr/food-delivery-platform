import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { X, Image, Utensils, Phone } from 'lucide-react';

const HotelGalleryModal = ({ hotel, onClose }) => {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'gallery'
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel?.id) {
      API.get(`/menus/hotel/${hotel.id}`)
        .then((res) => setMenuItems(res.data.menu))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [hotel]);

  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{hotel.business_name}</h2>
            <p className="text-sm text-gray-500">{hotel.address_text}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 bg-white px-6">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 flex items-center space-x-2 ${
              activeTab === 'menu'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Food Menu & Prices</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 flex items-center space-x-2 ${
              activeTab === 'gallery'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Interior Design & Photos</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'menu' ? (
            loading ? (
              <p className="text-center py-8 text-gray-500">Loading food menu...</p>
            ) : menuItems.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No menu items listed yet.</p>
            ) : (
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.item_name}</h4>
                      <p className="text-xs text-gray-500">{item.description}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-indigo-600">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.interior_images && hotel.interior_images.length > 0 ? (
                hotel.interior_images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="Interior" 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200" 
                  />
                ))
              ) : (
                <p className="col-span-full text-center py-8 text-gray-500">
                  No interior photos uploaded for this hotel[cite: 1].
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <a
            href={`tel:${hotel.contact_phone}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Hotel Counter
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default HotelGalleryModal;