import { PostsFilters, PostSort } from '@features/posts/model';

export const API_POSTS_PATH = '/posts';
export const POSTS_LIMIT = 25;

const buildTagLikePattern = (tagIds: number[]) => {
  if (!tagIds.length) {
    return '';
  }

  const inner = tagIds.join('|');

  return `(^|,)(${inner})(,|$)`;
};

export const getPostsPageEndpoint = (
  page: number,
  limit: number,
  sort: PostSort,
  filters: PostsFilters
) => {
  const params = new URLSearchParams();

  params.set('_page', String(page));
  params.set('_limit', String(limit));

  const sortField = sort === 'popular' ? 'views' : 'createdAt';
  params.set('_sort', sortField);
  params.set('_order', 'desc');

  const search = filters.search.trim();
  if (search) {
    params.set('title_like', search);
  }

  if (filters.tagIds.length > 0) {
    const pattern = buildTagLikePattern(filters.tagIds);
    params.set('tagIds_like', pattern);
  }

  return `${API_POSTS_PATH}?${params.toString()}`;
};

export const getPostEndpoint = (id: number) => `${API_POSTS_PATH}/${id}`;
