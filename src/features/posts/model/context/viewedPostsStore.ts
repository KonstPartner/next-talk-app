'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Post } from '@features/posts/model';

type ViewedPostsState = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  upsertPosts: (posts: Post[]) => void;
  clear: () => void;
};

const mergePosts = (prev: Post[], incoming: Post[]): Post[] => {
  if (!incoming.length) {
    return prev;
  }

  const map = new Map<number, Post>();

  for (const p of prev) {
    map.set(p.id, p);
  }

  for (const p of incoming) {
    map.set(p.id, p);
  }

  return Array.from(map.values());
};

export const useViewedPostsStore = create<ViewedPostsState>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      upsertPosts: (newPosts) =>
        set((state) => ({
          posts: mergePosts(state.posts, newPosts),
        })),
      clear: () => set({ posts: [] }),
    }),
    {
      name: 'talk_app_viewed_posts_store',
    }
  )
);
