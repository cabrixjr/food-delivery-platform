import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';

const UserSettings = () => {
  const { user, logoutSession } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
      </div>
      <p className="text-gray-500 mb-8">Manage app preferences and account settings[cite: 1].</p>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user?.full_name || 'Client Account'}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
            Role: {user?.role || 'CLIENT'}
          </span>
        </div>

        {/* App Preferences */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-indigo-600" />
            Notifications
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">New Updates & Discounts</p>
              <p className="text-xs text-gray-500">Receive alerts when nearby hotels launch offers[cite: 1].</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                notifications ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Security & Logout */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Session Management</span>
          </div>
          <button
            onClick={logoutSession}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;