export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

export type PostsResponse = {
  data: Post[];
  total?: number;
};

export type PostFormValues = {
  title: string;
  body: string;
  tags: string;
};
