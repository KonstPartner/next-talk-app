import { infiniteQueryOptions } from '@tanstack/react-query';

import {
  getPostsPageEndpoint,
  POSTS_LIMIT,
} from '@features/posts/api/constants';
import type { PostsResponse } from '@features/posts/model/types';
import { localApi } from '@features/shared/model';

export const postsApi = {
  baseKey: 'posts',

  getInfinitePostsOptions: () =>
    infiniteQueryOptions({
      queryKey: [postsApi.baseKey, 'infinite'],
      queryFn: async ({ pageParam = 1, signal }) =>
        localApi<PostsResponse>(getPostsPageEndpoint(pageParam, POSTS_LIMIT), {
          signal,
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.data?.length) {
          return undefined;
        }

        return allPages.length + 1;
      },

      initialPageParam: 1,
    }),
};
