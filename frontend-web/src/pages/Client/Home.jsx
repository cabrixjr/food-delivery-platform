import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Tag, Star, Sparkles, MessageSquare } from 'lucide-react';

const Home = () => {
  const [updates, setUpdates] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent home feeds (discounts & updates)
    const fetchHomeFeed = async () => {
      try {
        const [updatesRes, reviewsRes] = await Promise.all([
          API.get('/users/explore?offers_delivery=true'),
          API.get('/users/near-me?latitude=0&longitude=0&max_distance_km=1000')
        ]);
        setUpdates(updatesRes.data.hotels || []);
        setReviews(reviewsRes.data.hotels || []);
      } catch (err) {
        console.error('Home feed error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeFeed();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-10 shadow-lg">
        <div className="max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Live Hotel Connection Platform
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Find Nearby Restaurants & Canteens</h1>
          <p className="text-indigo-100 text-base">
            Check real-time delivery status, view interior designs, and call hotel counters directly[cite: 1].
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed: Hotel Updates & Active Delivery Services */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-indigo-600" /> Active Service Highlights
            </h2>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading highlights...</p>
          ) : updates.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p className="text-gray-500">No active hotel updates at the moment[cite: 1].</p>
            </div>
          ) : (
            updates.map((hotel) => (
              <div key={hotel.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{hotel.business_name}</h3>
                    <p className="text-sm text-gray-500">{hotel.address_text}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                    Delivering Now
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{hotel.description || 'Offers full food menu delivery and counter pickup services[cite: 1].'}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                  <span>Contact: {hotel.contact_phone}</span>
                  <span className="text-indigo-600 font-semibold cursor-pointer">View Details &rarr;</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar: Community Reviews & Flagged Ratings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" /> Community Feedback
          </h2>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            {reviews.slice(0, 3).map((hotel) => (
              <div key={hotel.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-800 text-sm">{hotel.business_name}</h4>
                  <div className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                    {hotel.average_rating || '5.0'}
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">"Verified food counter with fast delivery processing[cite: 1]."</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;