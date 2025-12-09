import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';

import { getUserEndpoint } from '@features/auth/api';
import { User } from '@features/auth/model';
import {
  API_POSTS_PATH,
  getPostEndpoint,
  getPostsByIds,
  getPostsPageEndpoint,
  POSTS_LIMIT,
} from '@features/posts/api/constants';
import type {
  MarkViewedPayload,
  MarkViewedResult,
  Post,
  PostsFilters,
  PostSort,
  PostsResponse,
  ToggleReactionPayload,
  ToggleReactionResult,
} from '@features/posts/model/types';
import { localApi } from '@features/shared/model';

export const postsApi = {
  baseKey: 'posts',

  getInfinitePostsOptions: (sort: PostSort, filters: PostsFilters) =>
    infiniteQueryOptions({
      queryKey: [postsApi.baseKey, 'infinite', sort, filters],
      queryFn: async ({ pageParam = 1, signal }) =>
        localApi<PostsResponse>(
          getPostsPageEndpoint(pageParam, POSTS_LIMIT, sort, filters),
          { signal }
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.data.length) {
          return undefined;
        }

        return allPages.length + 1;
      },
    }),

  getPostByIdOptions: (id: number, queryClient: QueryClient) =>
    queryOptions({
      queryKey: [postsApi.baseKey, 'byId', id],
      queryFn: ({ signal }) => localApi<Post>(getPostEndpoint(id), { signal }),

      initialData: () => {
        const cachedInfinite = queryClient.getQueryData<
          InfiniteData<PostsResponse>
        >([postsApi.baseKey, 'infinite']);

        if (!cachedInfinite) {
          return undefined;
        }

        for (const page of cachedInfinite.pages) {
          const found = page.data.find((p) => p.id === id);
          if (found) {
            return found;
          }
        }

        return undefined;
      },
    }),

  createPost: (payload: Omit<Post, 'id'>) =>
    localApi<Post>(API_POSTS_PATH, {
      method: 'POST',
      json: payload,
    }),

  updatePost: (payload: Post) =>
    localApi<Post>(getPostEndpoint(payload.id), {
      method: 'PATCH',
      json: payload,
    }),

  deletePost: (id: number) =>
    localApi<void>(getPostEndpoint(id), {
      method: 'DELETE',
    }),

  toggleReaction: async ({
    post,
    user,
    action,
  }: ToggleReactionPayload): Promise<ToggleReactionResult> => {
    const liked = user.likedPosts ?? [];
    const disliked = user.dislikedPosts ?? [];

    const hasLiked = liked.includes(post.id);
    const hasDisliked = disliked.includes(post.id);

    let nextLiked = liked;
    let nextDisliked = disliked;
    let likes = post.reactions.likes;
    let dislikes = post.reactions.dislikes;

    const removeFrom = (arr: number[]): number[] =>
      arr.filter((id) => id !== post.id);

    if (action === 'like') {
      if (hasLiked) {
        nextLiked = removeFrom(liked);
        likes = Math.max(0, likes - 1);
      } else {
        nextLiked = [...liked, post.id];
        likes += 1;

        if (hasDisliked) {
          nextDisliked = removeFrom(disliked);
          dislikes = Math.max(0, dislikes - 1);
        }
      }
    } else {
      if (hasDisliked) {
        nextDisliked = removeFrom(disliked);
        dislikes = Math.max(0, dislikes - 1);
      } else {
        nextDisliked = [...disliked, post.id];
        dislikes += 1;

        if (hasLiked) {
          nextLiked = removeFrom(liked);
          likes = Math.max(0, likes - 1);
        }
      }
    }

    const updatedPost = await localApi<Post>(getPostEndpoint(post.id), {
      method: 'PATCH',
      json: {
        reactions: {
          likes,
          dislikes,
        },
      },
    });

    const updatedUser = await localApi<User>(getUserEndpoint(user.id), {
      method: 'PATCH',
      json: {
        likedPosts: nextLiked,
        dislikedPosts: nextDisliked,
      },
    });

    return { updatedPost, updatedUser };
  },

  markPostViewed: async ({
    postId,
    currentViews,
    userId,
  }: MarkViewedPayload): Promise<MarkViewedResult> => {
    const updatedPost = await localApi<Post>(getPostEndpoint(postId), {
      method: 'PATCH',
      json: {
        views: currentViews + 1,
      },
    });

    if (!userId) {
      return { updatedPost };
    }

    const user = await localApi<User>(getUserEndpoint(userId));
    const viewed = Array.isArray(user.viewedPosts) ? user.viewedPosts : [];

    if (viewed.includes(postId)) {
      return { updatedPost, updatedUser: user };
    }

    const updatedUser = await localApi<User>(getUserEndpoint(userId), {
      method: 'PATCH',
      json: {
        viewedPosts: [...viewed, postId],
      },
    });

    return { updatedPost, updatedUser };
  },

  getPostsByIdsOptions: (ids: number[]) =>
    queryOptions({
      queryKey: [postsApi.baseKey, 'byIds', ids],
      queryFn: ({ signal }) => {
        if (!ids.length) {
          return Promise.resolve([] as Post[]);
        }

        return localApi<Post[]>(getPostsByIds(ids), { signal });
      },
      staleTime: 1000 * 60 * 5,
    }),
};
