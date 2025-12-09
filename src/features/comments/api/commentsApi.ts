import { queryOptions } from '@tanstack/react-query';

import { User } from '@features/auth/model';
import {
  COMMENTS_PATH,
  getCommentEndpoint,
  getCommentsByPostIdEndpoint,
} from '@features/comments/api/constants';
import {
  CreateCommentPayload,
  PostComment,
  ToggleCommentLikePayload,
} from '@features/comments/model/types';
import { localApi } from '@features/shared/model';

export const commentsApi = {
  baseKey: 'comments',

  getCommentsByPostIdOptions: (postId: number) =>
    queryOptions({
      queryKey: [commentsApi.baseKey, 'byPost', postId],
      queryFn: ({ signal }) =>
        localApi<PostComment[]>(getCommentsByPostIdEndpoint(postId), {
          signal,
        }),
    }),

  createComment: (payload: CreateCommentPayload) =>
    localApi<PostComment>(COMMENTS_PATH, {
      method: 'POST',
      json: {
        ...payload,
        likes: 0,
      },
    }),

  deleteComment: (id: number) =>
    localApi<void>(getCommentEndpoint(id), {
      method: 'DELETE',
    }),

  toggleCommentLike: async ({ comment, user }: ToggleCommentLikePayload) => {
    const likedComments = user.likedComments ?? [];
    const alreadyLiked = likedComments.includes(comment.id);

    let nextLikes = comment.likes;
    let nextLikedComments = likedComments;

    if (alreadyLiked) {
      nextLikes = Math.max(0, comment.likes - 1);
      nextLikedComments = likedComments.filter((id) => id !== comment.id);
    } else {
      nextLikes = comment.likes + 1;
      nextLikedComments = [...likedComments, comment.id];
    }

    const updatedComment = await localApi<PostComment>(
      getCommentEndpoint(comment.id),
      {
        method: 'PATCH',
        json: {
          likes: nextLikes,
        },
      }
    );

    const updatedUser = await localApi<User>(`/users/${user.id}`, {
      method: 'PATCH',
      json: {
        likedComments: nextLikedComments,
      },
    });

    return { updatedComment, updatedUser };
  },
};
