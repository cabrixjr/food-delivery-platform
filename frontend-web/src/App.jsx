import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Common/Navbar';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Page Views
import Home from './pages/Client/Home';
import Explore from './pages/Client/Explore';
import NearMe from './pages/Client/NearMe';
import Activity from './pages/Client/Activity';
import UserSettings from './pages/Client/Settings';
import HotelDashboard from './pages/hotel/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Client Core Pages */}
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/near-me" element={<NearMe />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/settings" element={<UserSettings />} />

                {/* Dashboard Pages */}
                <Route path="/hotel/dashboard" element={<HotelDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Default Fallback Redirect */}
                <Route path="*" element={<Navigate to="/near-me" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
