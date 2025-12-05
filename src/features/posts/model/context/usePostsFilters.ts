import { usePostsFiltersStore } from '@features/posts/model/context/filtersStore';

export const usePostsFilters = () => {
  const sort = usePostsFiltersStore((state) => state.sort);
  const setSort = usePostsFiltersStore((state) => state.setSort);
  const searchDraft = usePostsFiltersStore((state) => state.searchDraft);
  const setSearchDraft = usePostsFiltersStore((state) => state.setSearchDraft);
  const appliedFilters = usePostsFiltersStore((state) => state.appliedFilters);
  const applyFilters = usePostsFiltersStore((state) => state.applyFilters);
  const selectedTagIds = usePostsFiltersStore(
    (state) => state.selectedTagIdsDraft
  );
  const toggleTagDraft = usePostsFiltersStore((state) => state.toggleTagDraft);

  return {
    sort,
    setSort,
    searchDraft,
    setSearchDraft,
    appliedFilters,
    applyFilters,
    selectedTagIds,
    toggleTagDraft,
  };
};
