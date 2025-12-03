import { getUserByUsername, USERS_PATH } from '@features/auth/api/constants';
import type { AuthCredentialsDto, User } from '@features/auth/model';
import { localApi } from '@features/shared/model';

export const authApi = {
  baseKey: 'auth',

  register: async (payload: AuthCredentialsDto): Promise<User> => {
    const users = await localApi<User[]>(getUserByUsername(payload.username));

    if (users.length > 0) {
      throw new Error('User with this username already exists');
    }

    return await localApi<User>(USERS_PATH, {
      method: 'POST',
      json: { ...payload, likedPosts: [], dislikedPosts: [] },
    });
  },

  login: async (payload: AuthCredentialsDto): Promise<User> => {
    const users = await localApi<User[]>(getUserByUsername(payload.username));
    const user = users[0];

    if (!user) {
      throw new Error('User with this username does not exist');
    }

    if (user.password !== payload.password) {
      throw new Error('Invalid username or password');
    }

    return { likedPosts: [], dislikedPosts: [], ...user };
  },
};
