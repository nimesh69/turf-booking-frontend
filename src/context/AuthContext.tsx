import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types/auth.types';
import { storage } from '@/lib/storage';
import { USER_KEY } from '@/config/constants';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(storage.get<User>(USER_KEY));

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) storage.set(USER_KEY, u);
    else storage.remove(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
