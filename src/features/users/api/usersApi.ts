import { queryOptions } from '@tanstack/react-query';

import { getUserEndpoint } from '@features/auth/api';
import type { User } from '@features/auth/model';
import { localApi } from '@features/shared/model';

export const usersApi = {
  baseKey: 'users',

  getUserByIdOptions: (id: number) =>
    queryOptions({
      queryKey: [usersApi.baseKey, 'byId', id],
      queryFn: ({ signal }) => localApi<User>(getUserEndpoint(id), { signal }),
    }),
};
