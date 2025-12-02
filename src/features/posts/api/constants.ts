export const API_POSTS_PATH = '/posts';
export const POSTS_LIMIT = 25;

export const getPostsPageEndpoint = (page: number, limit: number) =>
  `${API_POSTS_PATH}?_page=${page}&_limit=${limit}`;

export const getPostEndpoint = (id: number) => `${API_POSTS_PATH}/${id}`;
