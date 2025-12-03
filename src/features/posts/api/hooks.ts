import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from '@features/posts/api/postsApi';

export const useInfinitePosts = () => {
  return useSuspenseInfiniteQuery(postsApi.getInfinitePostsOptions());
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
