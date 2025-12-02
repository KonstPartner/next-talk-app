'use client';

import { useAuthStore } from '@features/auth/model/context/store';

export const useAuth = () => {
  const { user, login, logout, isHydrated } = useAuthStore();

  return {
    user,
    login,
    logout,
    isLoading: !isHydrated,
  };
};
