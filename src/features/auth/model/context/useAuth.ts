'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@features/auth/model/context/store';

export const useAuth = () => {
  const { user, isHydrated, hydrate, login, logout } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  return {
    user,
    isHydrated,
    login,
    logout,
  };
};
