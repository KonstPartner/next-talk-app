import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { postsApi } from '@features/posts/api/postsApi';

export const useInfinitePosts = () => {
  return useSuspenseInfiniteQuery(postsApi.getInfinitePostsOptions());
};
