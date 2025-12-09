'use client';

import { create } from 'zustand';

import type { PostsFilters, PostSort } from '@features/posts/model';

type FiltersState = {
  sort: PostSort;
  searchDraft: string;
  selectedTagIdsDraft: number[];
  appliedFilters: PostsFilters;
  setSort: (sort: PostSort) => void;
  setSearchDraft: (value: string) => void;
  toggleTagDraft: (id: number) => void;
  applyFilters: () => void;
  resetFilters: () => void;
};

export const usePostsFiltersStore = create<FiltersState>((set, get) => ({
  sort: 'new',
  searchDraft: '',
  selectedTagIdsDraft: [],
  appliedFilters: {
    search: '',
    tagIds: [],
  },

  setSort: (sort) => set({ sort }),

  setSearchDraft: (value) => set({ searchDraft: value }),

  toggleTagDraft: (id) =>
    set((state) => {
      const exists = state.selectedTagIdsDraft.includes(id);

      return {
        selectedTagIdsDraft: exists
          ? state.selectedTagIdsDraft.filter((x) => x !== id)
          : [...state.selectedTagIdsDraft, id],
      };
    }),

  applyFilters: () => {
    const { searchDraft, selectedTagIdsDraft } = get();
    set({
      appliedFilters: {
        search: searchDraft,
        tagIds: selectedTagIdsDraft,
      },
    });
  },

  resetFilters: () =>
    set({
      searchDraft: '',
      selectedTagIdsDraft: [],
      appliedFilters: {
        search: '',
        tagIds: [],
      },
    }),
}));
