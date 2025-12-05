import { User } from '@features/auth/model';

export type Post = {
  id: number;
  title: string;
  body: string;
  tagIds: number[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  createdAt: string;
};

export type PostsResponse = {
  data: Post[];
  total?: number;
};

export type PostFormValues = {
  title: string;
  body: string;
  tags: number[];
};

export type ToggleReactionPayload = {
  post: Post;
  user: User;
  action: 'like' | 'dislike';
};

export type ToggleReactionResult = {
  updatedPost: Post;
  updatedUser: User;
};

export type PostSort = 'new' | 'popular';

export type PostsFilters = {
  search: string;
  tagIds: number[];
};
