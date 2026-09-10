import React from 'react';
import { MapPin, Phone, Truck, ShoppingBag, Star } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        {hotel.interior_images && hotel.interior_images[0] ? (
          <img 
            src={hotel.interior_images[0]} 
            alt={hotel.business_name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-medium">
            No Interior Image
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800 flex items-center shadow-sm">
          <MapPin className="w-3.5 h-3.5 mr-1 text-red-500" />
          {hotel.distance_km} km away
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{hotel.business_name}</h3>
          <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded text-amber-700 text-sm font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
            {hotel.average_rating || 'N/A'}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{hotel.description || hotel.address_text}</p>

        {/* Live Service Capability Badges */}
        <div className="flex items-center space-x-2 mb-5">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
            hotel.offers_delivery ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <Truck className="w-3.5 h-3.5 mr-1" />
            {hotel.offers_delivery ? 'Delivery Available' : 'No Delivery'}
          </span>

          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
            hotel.takes_orders ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <ShoppingBag className="w-3.5 h-3.5 mr-1" />
            {hotel.takes_orders ? 'Taking Orders' : 'Closed for Orders'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <a 
            href={`tel:${hotel.contact_phone}`} 
            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            {hotel.contact_phone}
          </a>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;