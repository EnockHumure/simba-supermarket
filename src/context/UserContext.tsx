import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  visitCount: number;
  totalPurchases: number;
  manualDiscount: number; // Admin-controlled percentage
}

interface UserContextType {
  user: UserProfile | null;
  allProfiles: Record<string, UserProfile>;
  login: (name: string, phone: string) => void;
  logout: () => void;
  updateProfile: (phone: string, updates: Partial<UserProfile>) => void;
  isLoyal: boolean;
  activeDiscount: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<Record<string, UserProfile>>({});

  // Load and persist from a "database" of phone numbers in localStorage
  const getProfiles = (): Record<string, UserProfile> => {
    const data = localStorage.getItem('simba_profiles');
    return data ? JSON.parse(data) : {};
  };

  const saveProfiles = (profiles: Record<string, UserProfile>) => {
    localStorage.setItem('simba_profiles', JSON.stringify(profiles));
    setAllProfiles(profiles);
  };

  const login = (name: string, phone: string) => {
    const profiles = getProfiles();
    let profile = profiles[phone];

    if (profile) {
      // Returning user: Increment visit count
      profile = { ...profile, name, visitCount: (profile.visitCount || 0) + 1 };
    } else {
      // New user: Create profile with zeroed purchase history
      profile = { 
        name, 
        phone, 
        visitCount: 1, 
        totalPurchases: 0, 
        manualDiscount: 0 
      };
    }

    const updatedProfiles = { ...profiles, [phone]: profile };
    setUser(profile);
    saveProfiles(updatedProfiles);
    localStorage.setItem('simba_current_session', phone);
  };

  const updateProfile = (phone: string, updates: Partial<UserProfile>) => {
    const profiles = getProfiles();
    if (profiles[phone]) {
      const updatedProfile = { ...profiles[phone], ...updates };
      const updatedProfiles = { ...profiles, [phone]: updatedProfile };
      saveProfiles(updatedProfiles);
      if (user?.phone === phone) {
        setUser(updatedProfile);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simba_current_session');
  };

  useEffect(() => {
    const profiles = getProfiles();
    setAllProfiles(profiles);
    
    const currentSessionPhone = localStorage.getItem('simba_current_session');
    if (currentSessionPhone) {
      const profile = profiles[currentSessionPhone];
      if (profile) {
        setUser(profile);
      }
    }
  }, []);

  const isLoyal = user ? user.manualDiscount > 0 || user.totalPurchases >= 5 : false;
  const activeDiscount = user ? user.manualDiscount : 0;

  return (
    <UserContext.Provider value={{ user, allProfiles, login, logout, updateProfile, isLoyal, activeDiscount }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
