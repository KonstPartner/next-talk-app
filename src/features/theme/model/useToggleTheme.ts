import { useEffect } from 'react';

import { useThemeStore } from '@features/theme/model/context';
import { ThemeType } from '@features/theme/model/types';

const useToggleTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setThemeState = useThemeStore((state) => state.setTheme);

  const applyTheme = (mode: ThemeType) => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.toggle('dark', mediaQuery.matches);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const validThemes: ThemeType[] = ['light', 'dark', 'system'];
    const initialTheme =
      savedTheme && validThemes.includes(savedTheme) ? savedTheme : 'system';

    setThemeState(initialTheme);
    applyTheme(initialTheme);

    if (initialTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyTheme('system');
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const buttonClasses = (mode: ThemeType) =>
    [
      'inline-flex h-8 w-8 items-center justify-center rounded-full transition',
      'text-icon cursor-pointer',
      theme === mode
        ? 'bg-primary text-primary-foreground shadow'
        : 'bg-transparent',
    ].join(' ');

  return {
    handleThemeChange,
    buttonClasses,
  };
};

export default useToggleTheme;
