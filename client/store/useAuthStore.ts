import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'shopkeeper';
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'user' | 'shopkeeper' | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      login: (userData, token) => 
        set({ 
          user: userData, 
          token, 
          role: userData.role,
          isAuthenticated: true 
        }),

      logout: () => 
        set({ 
          user: null, 
          token: null, 
          role: null,
          isAuthenticated: false 
        }),
    }),
    {
      name: 'auth-storage', // name of item in the storage (must be unique)
    }
  )
);
