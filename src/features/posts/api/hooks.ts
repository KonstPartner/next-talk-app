import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from '@features/posts/api/postsApi';
import {
  Post,
  PostSort,
  PostsResponse,
  ToggleReactionPayload,
} from '@features/posts/model';

export const useInfinitePosts = (sort: PostSort) => {
  return useSuspenseInfiniteQuery(postsApi.getInfinitePostsOptions(sort));
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

export const useToggleReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [postsApi.baseKey, 'toggleReaction'],
    mutationFn: (payload: ToggleReactionPayload) =>
      postsApi.toggleReaction(payload),

    onSuccess: ({ updatedPost }) => {
      queryClient.setQueryData<InfiniteData<PostsResponse>>(
        [postsApi.baseKey, 'infinite'],
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
