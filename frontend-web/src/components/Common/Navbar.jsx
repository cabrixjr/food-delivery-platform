import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Home, Compass, MapPin, Activity, Settings, Building2, ShieldCheck, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logoutSession } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/near-me" className="flex items-center space-x-2">
              <span className="bg-indigo-600 text-white p-2 rounded-xl font-black text-lg">FD</span>
              <span className="font-extrabold text-xl text-gray-900 tracking-tight">FoodFinder</span>
            </Link>
          </div>

          {/* Client Navigation Links */}
          {(!user || user.role === 'CLIENT') && (
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/home"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/home') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </Link>

              <Link
                to="/explore"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/explore') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Compass className="w-4 h-4 mr-2" /> Explore
              </Link>

              <Link
                to="/near-me"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/near-me') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4 mr-2" /> Near Me
              </Link>

              <Link
                to="/activity"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/activity') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-4 h-4 mr-2" /> Activity
              </Link>

              <Link
                to="/settings"
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/settings') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Link>
            </div>
          )}

          {/* Role Dashboard Navigation Links */}
          <div className="flex items-center space-x-3">
            {user?.role === 'HOTEL' && (
              <Link
                to="/hotel/dashboard"
                className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold"
              >
                <Building2 className="w-4 h-4 mr-2" /> Hotel Portal
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <Link
                to="/admin/dashboard"
                className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold"
              >
                <ShieldCheck className="w-4 h-4 mr-2" /> Admin Panel
              </Link>
            )}

            {user ? (
              <button
                onClick={logoutSession}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;