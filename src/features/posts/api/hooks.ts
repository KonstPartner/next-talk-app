import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from '@features/posts/api/postsApi';
import {
  MarkViewedPayload,
  MarkViewedResult,
  Post,
  PostsFilters,
  PostSort,
  PostsResponse,
  ToggleReactionPayload,
} from '@features/posts/model';

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

  const stableFilters: PostsFilters = {
    search: filters.search.trim(),
    tagIds: [...filters.tagIds].sort(),
  };

  return useMutation({
    mutationKey: [postsApi.baseKey, 'toggleReaction'],
    mutationFn: (payload: ToggleReactionPayload) =>
      postsApi.toggleReaction(payload),

    onSuccess: ({ updatedPost }) => {
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
    },
  });
};

export const useMarkPostViewed = () => {
  const queryClient = useQueryClient();

  return useMutation<MarkViewedResult, Error, MarkViewedPayload>({
    mutationKey: [postsApi.baseKey, 'markViewed'],
    mutationFn: (payload) => postsApi.markPostViewed(payload),

    onSuccess: ({ updatedPost }) => {
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
    },
  });
};
