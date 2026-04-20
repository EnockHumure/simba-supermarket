import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ADMIN_PHONE, normalizeRwandanPhone } from '../i18n';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  visitCount: number;
  totalPurchases: number;
  manualDiscount: number; // Admin-controlled percentage
}

interface UserContextType {
  user: UserProfile | null;
  allProfiles: Record<string, UserProfile>;
  login: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  updateProfile: (email: string, updates: Partial<UserProfile>) => void;
  isLoyal: boolean;
  activeDiscount: number;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<Record<string, UserProfile>>({});

  const getProfiles = (): Record<string, UserProfile> => {
    const data = localStorage.getItem('simba_profiles');
    return data ? JSON.parse(data) : {};
  };

  const saveProfiles = (profiles: Record<string, UserProfile>) => {
    localStorage.setItem('simba_profiles', JSON.stringify(profiles));
    setAllProfiles(profiles);
  };

  const login = (name: string, email: string, phone?: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone ? normalizeRwandanPhone(phone) : undefined;
    const profiles = getProfiles();
    let profile = profiles[normalizedEmail];

    if (profile) {
      profile = {
        ...profile,
        name,
        email: normalizedEmail,
        phone: normalizedPhone || profile.phone,
        visitCount: (profile.visitCount || 0) + 1,
      };
    } else {
      profile = {
        name,
        email: normalizedEmail,
        phone: normalizedPhone,
        visitCount: 1,
        totalPurchases: 0,
        manualDiscount: 0,
      };
    }

    const updatedProfiles = { ...profiles, [normalizedEmail]: profile };
    setUser(profile);
    saveProfiles(updatedProfiles);
    localStorage.setItem('simba_current_session', normalizedEmail);
  };

  const updateProfile = (email: string, updates: Partial<UserProfile>) => {
    const profiles = getProfiles();
    const normalizedEmail = email.trim().toLowerCase();
    if (profiles[normalizedEmail]) {
      const updatedProfile = { ...profiles[normalizedEmail], ...updates };
      const updatedProfiles = { ...profiles, [normalizedEmail]: updatedProfile };
      saveProfiles(updatedProfiles);
      if (user?.email === normalizedEmail) {
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
    
    const currentSessionEmail = localStorage.getItem('simba_current_session');
    if (currentSessionEmail) {
      const profile = profiles[currentSessionEmail];
      if (profile) {
        setUser(profile);
      }
    }
  }, []);

  const isLoyal = user ? user.manualDiscount > 0 || user.totalPurchases >= 5 : false;
  const activeDiscount = user ? user.manualDiscount : 0;
  const isAdmin = user?.phone === ADMIN_PHONE;

  return (
    <UserContext.Provider value={{ user, allProfiles, login, logout, updateProfile, isLoyal, activeDiscount, isAdmin }}>
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
