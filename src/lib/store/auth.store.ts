import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ExamCategory, SubscriptionTier } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateExamPreferences: (prefs: ExamCategory[]) => void;
  updateTier: (tier: SubscriptionTier) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
}

const MOCK_USER: User = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  phone: '+91 9876543210',
  role: 'student',
  tier: 'pro',
  examPreferences: ['SSC', 'Banking'],
  xp: 4250,
  streak: 12,
  createdAt: '2024-01-15',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1000));
        set({
          user: { ...MOCK_USER, email },
          isAuthenticated: true,
          isLoading: false,
        });
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        set({ user: MOCK_USER, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateExamPreferences: (prefs: ExamCategory[]) => {
        const { user } = get();
        if (user) set({ user: { ...user, examPreferences: prefs } });
      },

      updateTier: (tier: SubscriptionTier) => {
        const { user } = get();
        if (user) set({ user: { ...user, tier } });
      },

      addXP: (amount: number) => {
        const { user } = get();
        if (user) set({ user: { ...user, xp: user.xp + amount } });
      },

      incrementStreak: () => {
        const { user } = get();
        if (user) set({ user: { ...user, streak: user.streak + 1 } });
      },
    }),
    {
      name: 'examos-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
