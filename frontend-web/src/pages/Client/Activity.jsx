import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { History, PhoneCall, ShoppingBag, Clock } from 'lucide-react';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/activities')
      .then((res) => setActivities(res.data.activities))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <History className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-extrabold text-gray-900">Activity History</h1>
      </div>
      <p className="text-gray-500 mb-8">Review your past transactions and hotel interactions[cite: 1].</p>

      {loading ? (
        <p className="text-gray-500">Loading activities...</p>
      ) : activities.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl border border-gray-200">
          <p className="text-gray-500">No transaction activity recorded yet[cite: 1].</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((act) => (
            <div key={act.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  {act.action_type === 'CALL_HOTEL' ? <PhoneCall className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{act.hotel_name || 'System Action'}</h4>
                  <p className="text-sm text-gray-500">{act.action_type}</p>
                </div>
              </div>

              <div className="text-right">
                {act.amount > 0 && <p className="font-bold text-gray-900">${parseFloat(act.amount).toFixed(2)}</p>}
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {new Date(act.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;