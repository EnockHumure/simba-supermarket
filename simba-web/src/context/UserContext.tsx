import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  name: string;
  id: string;
  visitCount: number;
}

interface UserContextType {
  user: User | null;
  login: (name: string, id: string) => void;
  logout: () => void;
  isLoyal: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('simba_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Increment visit count on each session
      const updatedUser = { ...parsedUser, visitCount: parsedUser.visitCount + 1 };
      setUser(updatedUser);
      localStorage.setItem('simba_user', JSON.stringify(updatedUser));
    }
  }, []);

  const login = (name: string, id: string) => {
    const newUser = { name, id, visitCount: 1 };
    setUser(newUser);
    localStorage.setItem('simba_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simba_user');
  };

  const isLoyal = user ? user.visitCount > 1 : false;

  return (
    <UserContext.Provider value={{ user, login, logout, isLoyal }}>
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
