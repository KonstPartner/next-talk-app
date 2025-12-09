export const COMMENTS_PATH = '/comments';

export const getCommentsByPostIdEndpoint = (postId: number) =>
  `${COMMENTS_PATH}?postId=${postId}`;

export const getCommentEndpoint = (id: number) => `${COMMENTS_PATH}/${id}`;
