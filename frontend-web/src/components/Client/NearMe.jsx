import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { getNearMeHotels } from '../../services/api';
import HotelCard from '../../components/Client/HotelCard';
import { Loader, AlertCircle, RefreshCw } from 'lucide-react';

const NearMe = () => {
  const { coords, error: geoError, loading: geoLoading, refreshLocation } = useContext(LocationContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setLoading(true);
      getNearMeHotels(coords.latitude, coords.longitude)
        .then((response) => {
          setHotels(response.data.hotels);
          setApiError(null);
        })
        .catch((err) => {
          setApiError('Failed to fetch nearby hotels.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [coords]);

  if (geoLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3 text-indigo-600">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="font-medium text-gray-700">Locating restaurants near you...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Near Me</h1>
          <p className="text-gray-500 mt-1">Discover hotels and canteens ranked by geographic proximity.</p>
        </div>
        <button 
          onClick={refreshLocation}
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2 text-gray-500" />
          Update Location
        </button>
      </div>

      {(geoError || apiError) && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{geoError || apiError}</span>
        </div>
      )}

      {hotels.length === 0 && !loading && !geoError ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-lg">No verified hotels found within a 10 km radius.</p>
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

export default NearMe;