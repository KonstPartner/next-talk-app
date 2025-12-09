'use client';

import { useEffect } from 'react';

import { useThemeStore } from '@features/theme/model';
import { ThemeType } from '@features/theme/model/types';

const applyThemeToDom = (theme: ThemeType) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  if (theme === 'system') {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    root.classList.toggle('dark', prefersDark);

    return;
  }

  root.classList.toggle('dark', theme === 'dark');
};

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  return { theme, setTheme };
};
