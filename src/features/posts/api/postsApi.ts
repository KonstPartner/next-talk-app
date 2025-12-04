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
  getPostsPageEndpoint,
  POSTS_LIMIT,
} from '@features/posts/api/constants';
import type {
  Post,
  PostSort,
  PostsResponse,
  ToggleReactionPayload,
  ToggleReactionResult,
} from '@features/posts/model/types';
import { localApi } from '@features/shared/model';

export const postsApi = {
  baseKey: 'posts',

  getInfinitePostsOptions: (sort: PostSort) =>
    infiniteQueryOptions({
      queryKey: [postsApi.baseKey, 'infinite', sort],
      queryFn: async ({ pageParam = 1, signal }) =>
        localApi<PostsResponse>(
          getPostsPageEndpoint(pageParam, POSTS_LIMIT, sort),
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
};
