import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import {
  API_POSTS_PATH,
  getPostEndpoint,
  getPostsPageEndpoint,
  POSTS_LIMIT,
} from '@features/posts/api/constants';
import type { Post, PostsResponse } from '@features/posts/model/types';
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

  getPostByIdOptions: (id: number, queryClient: QueryClient) =>
    queryOptions({
      queryKey: [postsApi.baseKey, 'byId', id],
      queryFn: ({ signal }) => localApi<Post>(getPostEndpoint(id), { signal }),

      initialData: () => {
        const cachedInfinite = queryClient.getQueryData<
          InfiniteData<PostsResponse>
        >([postsApi.baseKey, 'infinite']);

        if (!cachedInfinite) {
          return undefined;
        }

        for (const page of cachedInfinite.pages) {
          const found = page.data.find((p) => p.id === id);
          if (found) {
            return found;
          }
        }

        return undefined;
      },
    }),

  createPost: (payload: Omit<Post, 'id'>) =>
    localApi<Post>(API_POSTS_PATH, {
      method: 'POST',
      json: payload,
    }),

  updatePost: (payload: Post) =>
    localApi<Post>(getPostEndpoint(payload.id), {
      method: 'PATCH',
      json: payload,
    }),

  deletePost: (id: number) =>
    localApi<void>(getPostEndpoint(id), {
      method: 'DELETE',
    }),
};
