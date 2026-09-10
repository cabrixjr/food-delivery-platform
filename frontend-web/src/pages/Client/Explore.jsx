import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import HotelCard from '../../components/Client/HotelCard';
import { Search, Filter, Loader } from 'lucide-react';

const Explore = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchExploreHotels = async () => {
    setLoading(true);
    try {
      const res = await API.get('/users/explore', {
        params: {
          search: searchTerm,
          offers_delivery: onlyDelivery,
        },
      });
      setHotels(res.data.hotels);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreHotels();
  }, [onlyDelivery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExploreHotels();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Explore Hotels</h1>
        <p className="text-gray-500 mt-1">Discover canteens and restaurants in different locations.</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by hotel name or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </form>

        <button
          onClick={() => setOnlyDelivery(!onlyDelivery)}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            onlyDelivery 
              ? 'bg-green-50 border-green-500 text-green-700' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          {onlyDelivery ? 'Delivery Only (Active)' : 'Filter Delivery'}
        </button>
      </div>

      {/* Hotel Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No hotels matched your search terms[cite: 1].</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;