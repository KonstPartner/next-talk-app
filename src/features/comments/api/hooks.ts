'use client';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import type { User } from '@features/auth/model';
import { commentsApi } from '@features/comments/api/commentsApi';
import type {
  CreateCommentPayload,
  PostComment,
  ToggleCommentLikePayload,
} from '@features/comments/model/types';

export const useSuspenseComments = (postId: number) => {
  const { data } = useSuspenseQuery(
    commentsApi.getCommentsByPostIdOptions(postId)
  );

  return {
    comments: data,
  };
};

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<PostComment, Error, CreateCommentPayload>({
    mutationKey: [commentsApi.baseKey, 'create', postId],
    mutationFn: commentsApi.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [commentsApi.baseKey, 'byPost', postId],
      });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationKey: [commentsApi.baseKey, 'delete', postId],
    mutationFn: commentsApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [commentsApi.baseKey, 'byPost', postId],
      });
    },
  });
};

export const useToggleCommentLike = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    { updatedComment: PostComment; updatedUser: User },
    Error,
    ToggleCommentLikePayload
  >({
    mutationKey: [commentsApi.baseKey, 'toggleLike', postId],
    mutationFn: commentsApi.toggleCommentLike,
    onSuccess: ({ updatedComment }) => {
      queryClient.setQueryData<PostComment[]>(
        [commentsApi.baseKey, 'byPost', postId],
        (old) => {
          if (!old) {
            return old;
          }

          return old.map((c) =>
            c.id === updatedComment.id ? updatedComment : c
          );
        }
      );
    },
  });
};
