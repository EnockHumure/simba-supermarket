import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type FulfillmentMode = 'delivery' | 'pickup' | 'in-store';

interface FulfillmentContextType {
  mode: FulfillmentMode | null;
  location: string | null; // Neighborhood for delivery or Branch name for pickup
  setFulfillment: (mode: FulfillmentMode, location: string) => void;
  resetFulfillment: () => void;
  isFulfillmentSet: boolean;
}

const FulfillmentContext = createContext<FulfillmentContextType | undefined>(undefined);

export const FulfillmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<FulfillmentMode | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('simba_fulfillment_mode') as FulfillmentMode;
    const savedLocation = localStorage.getItem('simba_fulfillment_location');
    if (savedMode && savedLocation) {
      setMode(savedMode);
      setLocation(savedLocation);
    }
  }, []);

  const setFulfillment = (newMode: FulfillmentMode, newLocation: string) => {
    setMode(newMode);
    setLocation(newLocation);
    localStorage.setItem('simba_fulfillment_mode', newMode);
    localStorage.setItem('simba_fulfillment_location', newLocation);
  };

  const resetFulfillment = () => {
    setMode(null);
    setLocation(null);
    localStorage.removeItem('simba_fulfillment_mode');
    localStorage.removeItem('simba_fulfillment_location');
  };

  return (
    <FulfillmentContext.Provider value={{ 
      mode, 
      location, 
      setFulfillment, 
      resetFulfillment,
      isFulfillmentSet: !!mode && !!location 
    }}>
      {children}
    </FulfillmentContext.Provider>
  );
};

export const useFulfillment = () => {
  const context = useContext(FulfillmentContext);
  if (!context) {
    throw new Error('useFulfillment must be used within a FulfillmentProvider');
  }
  return context;
};
