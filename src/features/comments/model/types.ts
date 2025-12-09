import { User } from '@features/auth/model';

export type PostComment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  userId: number;
};

export type CreateCommentPayload = {
  postId: number;
  body: string;
  userId: number;
};

export type ToggleCommentLikePayload = {
  comment: PostComment;
  user: User;
};
