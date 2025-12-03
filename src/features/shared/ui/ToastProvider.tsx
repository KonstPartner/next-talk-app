'use client';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, ToastContainerProps } from 'react-toastify';

import { useThemeStore } from '@features/theme/model';

type ToastTheme = ToastContainerProps['theme'];

const ToastProvider = () => {
  const theme = useThemeStore((state) => state.theme);

  const getActualTheme = (): ToastTheme => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      return prefersDark ? 'dark' : 'light';
    }

    return theme === 'dark' ? 'dark' : 'light';
  };

  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={getActualTheme()}
    />
  );
};

export default ToastProvider;
