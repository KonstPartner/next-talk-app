'use client';

import { useEffect } from 'react';

import { useThemeStore } from '@features/theme/model';
import { ThemeType } from '@features/theme/model/types';

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const validThemes: ThemeType[] = ['light', 'dark', 'system'];

    const initialTheme =
      savedTheme && validThemes.includes(savedTheme) ? savedTheme : 'system';

    setTheme(initialTheme);
  }, [setTheme]);

  return { theme, setTheme };
};
