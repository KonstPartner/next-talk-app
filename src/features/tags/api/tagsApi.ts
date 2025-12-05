import { queryOptions } from '@tanstack/react-query';

import { localApi } from '@features/shared/model';

import { Tag } from '../model';

export const CATEGORIES_PATH = '/tags';

export const tagsApi = {
  baseKey: 'tags',

  getAllOptions: () =>
    queryOptions({
      queryKey: [tagsApi.baseKey, 'all'],
      queryFn: ({ signal }) => localApi<Tag[]>(CATEGORIES_PATH, { signal }),
      staleTime: Infinity,
      gcTime: Infinity,
    }),
};
