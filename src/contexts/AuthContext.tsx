
"use client";
import type { User } from '@/types';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, name?: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUser = localStorage.getItem('unghostUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, name: string = 'Kullanıcı') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'mock-user-id', email, name };
    setUser(mockUser);
    localStorage.setItem('unghostUser', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setUser(null);
    localStorage.removeItem('unghostUser');
    setIsLoading(false);
    router.push('/login');
  }, [router]);

  const register = useCallback(async (email: string, name: string = 'Yeni Kullanıcı') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'new-mock-user-id', email, name };
    setUser(mockUser);
    localStorage.setItem('unghostUser', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  }, [router]);
  

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
