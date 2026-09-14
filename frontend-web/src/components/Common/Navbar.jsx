// frontend-web/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-orange-600">
        FoodFinder
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700 font-medium">
              Hi, {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
