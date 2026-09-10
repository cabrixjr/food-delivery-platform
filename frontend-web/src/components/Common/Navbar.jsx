import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo & Core Nav Links */}
          <div className="flex items-center space-x-8">
            <Link to="/near-me" className="flex items-center space-x-2">
              <span className="text-2xl font-black text-orange-600 tracking-tight">FDFoodFinder</span>
            </Link>

            {/* Navigation Options */}
            <nav className="hidden md:flex space-x-2">
              <Link
                to="/home"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/home') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/explore') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Explore
              </Link>
              <Link
                to="/near-me"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/near-me') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Near Me
              </Link>
              <Link
                to="/activity"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/activity') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Activity
              </Link>
              <Link
                to="/settings"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/settings') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Settings
              </Link>

              {/* Dynamic Dashboard Shortlink depending on User Role */}
              {user?.role === 'HOTEL' && (
                <Link
                  to="/hotel/dashboard"
                  className="px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
                >
                  Hotel Dashboard
                </Link>
              )}
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-lg text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>

          {/* User Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-gray-800">{user.name}</p>
                  <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
