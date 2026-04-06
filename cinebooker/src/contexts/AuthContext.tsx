import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const MOCK_USERS: (User & { password: string })[] = [
  { id: '1', email: 'user@demo.com', name: 'John Doe', role: 'user', password: 'password' },
  { id: '2', email: 'admin@demo.com', name: 'Admin User', role: 'admin', password: 'admin123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cineUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('cineUser', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: User = { id: Date.now().toString(), email, name, role: 'user' };
    setUser(newUser);
    localStorage.setItem('cineUser', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('cineUser');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
