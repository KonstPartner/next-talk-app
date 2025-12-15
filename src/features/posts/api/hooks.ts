import { useEffect, useMemo } from 'react';
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserEndpoint } from '@features/auth/api';
import { useAuth, User } from '@features/auth/model';
import { postsApi } from '@features/posts/api/postsApi';
import {
  MarkViewedPayload,
  MarkViewedResult,
  Post,
  PostsFilters,
  PostSort,
  PostsResponse,
  ToggleReactionPayload,
  useViewedPostsStore,
} from '@features/posts/model';
import { localApi } from '@features/shared/model';

export const useInfinitePosts = (sort: PostSort, filters: PostsFilters) => {
  const stableFilters: PostsFilters = {
    search: filters.search.trim(),
    tagIds: [...filters.tagIds].sort(),
  };

  return useSuspenseInfiniteQuery(
    postsApi.getInfinitePostsOptions(sort, stableFilters)
  );
};

export const useSuspensePost = (id: number) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery(postsApi.getPostByIdOptions(id, queryClient));
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [postsApi.baseKey, 'create'],
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [postsApi.baseKey, 'infinite'],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [postsApi.baseKey, 'update'],
    mutationFn: postsApi.updatePost,
    onSuccess: (_data, post) => {
      queryClient.invalidateQueries({
        queryKey: [postsApi.baseKey, 'byId', post.id],
      });
      queryClient.invalidateQueries({
        queryKey: [postsApi.baseKey, 'infinite'],
      });
    },
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: [postsApi.baseKey, 'delete'],
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [postsApi.baseKey, 'infinite'] });
    },
  });
};

export const useApiToggleReaction = (sort: PostSort, filters: PostsFilters) => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { upsertPosts } = useViewedPostsStore();

  const stableFilters: PostsFilters = {
    search: filters.search.trim(),
    tagIds: [...filters.tagIds].sort(),
  };

  return useMutation({
    mutationKey: [postsApi.baseKey, 'toggleReaction'],
    mutationFn: (payload: ToggleReactionPayload) =>
      postsApi.toggleReaction(payload),

    onSuccess: ({ updatedPost, updatedUser }) => {
      queryClient.setQueryData<InfiniteData<PostsResponse>>(
        [postsApi.baseKey, 'infinite', sort, stableFilters],
        (old) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((p) =>
                p.id === updatedPost.id ? updatedPost : p
              ),
            })),
          };
        }
      );

      queryClient.setQueryData<Post>(
        [postsApi.baseKey, 'byId', updatedPost.id],
        updatedPost
      );

      upsertPosts([updatedPost]);

      if (updatedUser) {
        login(updatedUser);
      }
    },
  });
};

export const useMarkPostViewed = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { upsertPosts } = useViewedPostsStore();

  return useMutation<MarkViewedResult, Error, MarkViewedPayload>({
    mutationKey: [postsApi.baseKey, 'markViewed'],
    mutationFn: (payload) => postsApi.markPostViewed(payload),

    onSuccess: ({ updatedPost, updatedUser }) => {
      queryClient.setQueriesData<InfiniteData<PostsResponse, unknown>>(
        { queryKey: [postsApi.baseKey, 'infinite'] },
        (old) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((p) =>
                p.id === updatedPost.id ? updatedPost : p
              ),
            })),
          };
        }
      );

      queryClient.setQueryData<Post>(
        [postsApi.baseKey, 'byId', updatedPost.id],
        updatedPost
      );

      upsertPosts([updatedPost]);

      if (updatedUser) {
        login(updatedUser);
      }
    },
  });
};

export const useViewedPostsHistory = () => {
  const { user } = useAuth();
  const { posts, upsertPosts } = useViewedPostsStore();

  const viewedPosts = user?.viewedPosts;

  const viewedIds = useMemo(() => {
    if (!viewedPosts?.length) {
      return [];
    }

    return [...viewedPosts].reverse();
  }, [viewedPosts]);

  const { data } = useSuspenseQuery(postsApi.getPostsByIdsOptions(viewedIds));

  useEffect(() => {
    if (data?.length) {
      upsertPosts(data);
    }
  }, [data, upsertPosts]);

  const historyPosts = useMemo(
    () =>
      viewedIds
        .map((id) => posts.find((p) => p.id === id))
        .filter((p): p is Post => Boolean(p)),
    [posts, viewedIds]
  );

  return {
    posts: historyPosts,
  };
};

export const useClearViewedHistory = () => {
  const { user, login } = useAuth();
  const { clear } = useViewedPostsStore();

  return useMutation({
    mutationKey: [postsApi.baseKey, 'clearViewedHistory', user?.id],
    mutationFn: async () => {
      if (!user) {
        return;
      }

      const updatedUser = await localApi<User>(getUserEndpoint(user.id), {
        method: 'PATCH',
        json: { viewedPosts: [] },
      });

      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      if (updatedUser) {
        login(updatedUser);
      }

      clear();
    },
  });
};
