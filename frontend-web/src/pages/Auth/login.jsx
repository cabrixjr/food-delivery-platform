import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, DEMO_CREDENTIALS } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.success) {
      redirectByRole(res.user.role);
    } else {
      setError(res.error);
    }
  };

  const handleDemoLogin = (roleKey) => {
    const creds = DEMO_CREDENTIALS[roleKey];
    setEmail(creds.email);
    setPassword(creds.password);
    const res = login(creds.email, creds.password);
    if (res.success) {
      redirectByRole(res.user.role);
    }
  };

  const redirectByRole = (role) => {
    if (role === 'HOTEL') navigate('/hotel/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/near-me');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Demo Quick-Login Buttons */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 text-center">
            ⚡ Quick Demo Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('CLIENT')}
              className="py-1.5 px-2 bg-white border border-orange-300 rounded-lg text-xs font-semibold text-orange-700 hover:bg-orange-100 transition shadow-sm"
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('HOTEL')}
              className="py-1.5 px-2 bg-white border border-orange-300 rounded-lg text-xs font-semibold text-orange-700 hover:bg-orange-100 transition shadow-sm"
            >
              Hotel
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('ADMIN')}
              className="py-1.5 px-2 bg-white border border-orange-300 rounded-lg text-xs font-semibold text-orange-700 hover:bg-orange-100 transition shadow-sm"
            >
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-xl text-white bg-orange-600 hover:bg-orange-700 font-semibold shadow-md transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
