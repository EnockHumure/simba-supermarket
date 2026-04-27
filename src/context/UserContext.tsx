import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ADMIN_PHONE, ADMIN_PASSWORD, normalizeRwandanPhone } from '../i18n';

export interface UserProfile {
  name: string;
  email: string;
  password: string;
  phone?: string;
  visitCount: number;
  totalPurchases: number;
  manualDiscount: number;
  role: 'customer' | 'admin' | 'superadmin';
}

interface UserContextType {
  user: UserProfile | null;
  allProfiles: Record<string, UserProfile>;
  signup: (name: string, email: string, password: string, phone?: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (email: string, updates: Partial<UserProfile>) => void;
  resetPassword: (email: string, newPassword: string) => { success: boolean; error?: string };
  isLoyal: boolean;
  activeDiscount: number;
  isAdmin: boolean;
  isSuperAdmin: boolean;
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

  // Simple hash function for demo (in production, use bcrypt on backend)
  const hashPassword = (password: string): string => {
    return btoa(password); // Base64 encoding for demo only
  };

  const verifyPassword = (password: string, hash: string): boolean => {
    return btoa(password) === hash;
  };

  const signup = (name: string, email: string, password: string, phone?: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone ? normalizeRwandanPhone(phone) : undefined;
    const profiles = getProfiles();

    if (profiles[normalizedEmail]) {
      return { success: false, error: 'Account already exists. Please login instead.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const profile: UserProfile = {
      name,
      email: normalizedEmail,
      password: hashPassword(password),
      phone: normalizedPhone,
      visitCount: 1,
      totalPurchases: 0,
      manualDiscount: 0,
      role: 'customer',
    };

    const updatedProfiles = { ...profiles, [normalizedEmail]: profile };
    setUser(profile);
    saveProfiles(updatedProfiles);
    localStorage.setItem('simba_current_session', normalizedEmail);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const profiles = getProfiles();
    const profile = profiles[normalizedEmail];

    if (!profile) {
      return { success: false, error: 'Account not found. Please sign up first.' };
    }

    if (!verifyPassword(password, profile.password)) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const updatedProfile = {
      ...profile,
      visitCount: (profile.visitCount || 0) + 1,
    };

    const updatedProfiles = { ...profiles, [normalizedEmail]: updatedProfile };
    setUser(updatedProfile);
    saveProfiles(updatedProfiles);
    localStorage.setItem('simba_current_session', normalizedEmail);
    return { success: true };
  };

  const resetPassword = (email: string, newPassword: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const profiles = getProfiles();
    const profile = profiles[normalizedEmail];

    if (!profile) {
      return { success: false, error: 'Account not found.' };
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const updatedProfile = {
      ...profile,
      password: hashPassword(newPassword),
    };

    const updatedProfiles = { ...profiles, [normalizedEmail]: updatedProfile };
    saveProfiles(updatedProfiles);
    return { success: true };
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
  
  const isSuperAdmin = user?.email === 'humureenock@gmail.com' && user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || isSuperAdmin;

  return (
    <UserContext.Provider value={{ user, allProfiles, signup, login, logout, updateProfile, resetPassword, isLoyal, activeDiscount, isAdmin, isSuperAdmin }}>
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
