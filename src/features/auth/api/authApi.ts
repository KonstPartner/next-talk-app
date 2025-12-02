import { USERS_PATH } from '@features/auth/api/constants';
import type { AuthCredentialsDto, User } from '@features/auth/model/types';
import { localApi } from '@features/shared/model';

export const authApi = {
  baseKey: 'auth',

  register: (payload: AuthCredentialsDto) =>
    localApi<User>(USERS_PATH, {
      method: 'POST',
      json: payload,
    }),

  login: (payload: AuthCredentialsDto) =>
    localApi<User>(USERS_PATH, {
      method: 'POST',
      json: payload,
    }),
};
