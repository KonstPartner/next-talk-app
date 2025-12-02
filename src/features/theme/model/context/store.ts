'use client';

import { create } from 'zustand';

import { ThemeType } from '@features/theme/model/types';

type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));
