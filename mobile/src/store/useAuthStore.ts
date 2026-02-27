import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'Recep E.',
    avatar: undefined,
    preferredLanguages: ['ES', 'FR', 'JP'],
    completedDialogues: ['4'], // Meeting Someone completed
  },
  isAuthenticated: true, // Mock authenticated for now
  isLoading: false,
  token: null,

  setUser: (user) => set({ user, isAuthenticated: true }),
  
  setToken: (token) => set({ token }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    token: null 
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
}));
