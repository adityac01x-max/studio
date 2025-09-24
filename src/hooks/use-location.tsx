
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LocationContextType {
  location: { lat: number; lng: number } | null;
  error: string | null;
  requestLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
         let errorMessage = 'An unknown error occurred.';
            if (err.code === err.PERMISSION_DENIED) {
            errorMessage = 'You have denied location access. Please enable it in your browser settings.';
            } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage = 'Location information is unavailable.';
            } else if (err.code === err.TIMEOUT) {
            errorMessage = 'The request to get user location timed out.';
            }
        setError(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
