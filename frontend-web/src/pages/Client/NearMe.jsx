import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { userService } from '../../services/userService';
import HotelCard from '../../components/Client/HotelCard';
import HotelGalleryModal from '../../components/Hotel/HotelGalleryModal';
import { MapPin, RefreshCw, Loader } from 'lucide-react';

const NearMe = () => {
  const { location, error: locError, loading: locLoading, requestBrowserLocation } = useContext(LocationContext);
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchNearbyHotels = async () => {
    if (!location) return;
    setLoadingHotels(true);
    try {
      const data = await userService.getNearMe(location.latitude, location.longitude, 15);
      setHotels(data.hotels || []);
    } catch (err) {
      console.error('Error fetching nearby hotels:', err);
    } finally {
      setLoadingHotels(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchNearbyHotels();
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <MapPin className="w-8 h-8 text-indigo-600 mr-2" />
            Hotels Near Me
          </h1>
          <p className="text-gray-500 mt-1">Discover verified food counters and canteens within your immediate radius.</p>
        </div>

        <button
          onClick={requestBrowserLocation}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh Location
        </button>
      </div>

      {locLoading || loadingHotels ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
          <p className="text-gray-500">Searching for nearby restaurants...</p>
        </div>
      ) : locError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
          <p className="font-semibold">{locError}</p>
          <button
            onClick={requestBrowserLocation}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
          >
            Retry Location Access
          </button>
        </div>
      ) : hotels.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No verified hotels found near your current location.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onOpenGallery={() => setSelectedHotel(hotel)}
            />
          ))}
        </div>
      )}

      {selectedHotel && (
        <HotelGalleryModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default NearMe;