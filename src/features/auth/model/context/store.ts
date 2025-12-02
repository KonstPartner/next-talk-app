'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@features/auth/model/types';

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AUTH_STORAGE_KEY = 'talk_app_user';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
