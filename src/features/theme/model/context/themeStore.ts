'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeType } from '@features/theme/model/types';

type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'talk_app_theme',
    }
  )
);
