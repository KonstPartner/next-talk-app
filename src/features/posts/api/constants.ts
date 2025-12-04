import { PostSort } from '@features/posts/model';

export const API_POSTS_PATH = '/posts';
export const POSTS_LIMIT = 25;

export const getPostsPageEndpoint = (
  page: number,
  limit: number,
  sort: PostSort
) => {
  const sortField = sort === 'popular' ? 'views' : 'createdAt';

  return `${API_POSTS_PATH}?_page=${page}&_limit=${limit}&_sort=${sortField}&_order=desc`;
};

export const getPostEndpoint = (id: number) => `${API_POSTS_PATH}/${id}`;
