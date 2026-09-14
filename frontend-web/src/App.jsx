import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';

// Import matching EXACT file path casing for Vercel Linux builder
import Navbar from './components/Common/Navbar';

// Auth Pages (capitalized 'Login' matching file system)
import Login from './pages/Auth/login';
import Register from './pages/Auth/Register';

// Page Views
import Home from './pages/Client/Home';
import Explore from './pages/Client/Explore';
import NearMe from './pages/Client/NearMe';
import Activity from './pages/Client/Activity';
import UserSettings from './pages/Client/Settings';
import HotelDashboard from './pages/hotel/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';

// Route Guard Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/near-me" replace />;
  }

  return children;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* Client Core Pages */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Near-me" element={<NearMe />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Settings" element={<UserSettings />} />

          {/* Protected Dashboard Pages */}
          <Route
            path="/hotel/Dashboard"
            element={
              <ProtectedRoute allowedRoles={['HOTEL', 'ADMIN']}>
                <HotelDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to={user ? "/near-me" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <AppContent />
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}
