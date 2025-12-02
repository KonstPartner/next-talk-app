import { useMutation } from '@tanstack/react-query';

import { authApi } from '@features/auth/api/authApi';
import type { AuthCredentialsDto, User } from '@features/auth/model/types';

export const useRegister = () =>
  useMutation<User, Error, AuthCredentialsDto>({
    mutationKey: [authApi.baseKey, 'register'],
    mutationFn: authApi.register,
  });

export const useLogin = () =>
  useMutation<User, Error, AuthCredentialsDto>({
    mutationKey: [authApi.baseKey, 'login'],
    mutationFn: authApi.login,
  });
