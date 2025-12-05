'use client';

import { create } from 'zustand';

import { User } from '@features/auth/model/types';

const AUTH_STORAGE_KEY = 'talk_app_user';

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  hydrate: () => void;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) {
        set({ user: null, isHydrated: true });

        return;
      }

      const parsed = JSON.parse(raw) as User;
      set({ user: parsed, isHydrated: true });
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      set({ user: null, isHydrated: true });
    }
  },

  login: (user) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
    set({ user });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    set({ user: null });
  },
}));
