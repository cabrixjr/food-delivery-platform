import React from 'react';
import { Phone, MapPin, Truck, ShoppingBag, Eye } from 'lucide-react';

const HotelCard = ({ hotel, onOpenGallery }) => {
  const handleCallCounter = () => {
    if (hotel.contact_phone) {
      window.location.href = `tel:${hotel.contact_phone}`;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="h-44 bg-gray-100 relative overflow-hidden">
        {hotel.interior_images && hotel.interior_images[0] ? (
          <img
            src={hotel.interior_images[0]}
            alt={hotel.business_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <span>No Interior Image</span>
          </div>
        )}

        {hotel.distance_km && (
          <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            {hotel.distance_km} km away
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.business_name}</h3>
          <p className="text-xs text-gray-500 flex items-center mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
            {hotel.address_text}
          </p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description || 'Verified canteen counter offering fresh menu selections.'}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md ${
                hotel.offers_delivery
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Truck className="w-3.5 h-3.5 mr-1" />
              {hotel.offers_delivery ? 'Delivery Available' : 'No Delivery'}
            </span>

            <span
              className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md ${
                hotel.takes_orders
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1" />
              {hotel.takes_orders ? 'Taking Orders' : 'Closed'}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center gap-2">
          <button
            onClick={onOpenGallery}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 font-semibold text-xs rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" /> View Menu & Photos
          </button>

          <button
            onClick={handleCallCounter}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" /> Call Counter
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;