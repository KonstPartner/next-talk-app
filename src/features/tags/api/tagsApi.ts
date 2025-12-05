import { queryOptions } from '@tanstack/react-query';

import { localApi } from '@features/shared/model';
import { TAGS_PATH } from '@features/tags/api/constants';
import { Tag } from '@features/tags/model';

export const tagsApi = {
  baseKey: 'tags',

  getAllOptions: () =>
    queryOptions({
      queryKey: [tagsApi.baseKey, 'all'],
      queryFn: ({ signal }) => localApi<Tag[]>(TAGS_PATH, { signal }),
      staleTime: Infinity,
      gcTime: Infinity,
    }),
};
