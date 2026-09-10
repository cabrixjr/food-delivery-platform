import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestBrowserLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please enable GPS permissions.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  useEffect(() => {
    requestBrowserLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, loading, requestBrowserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};