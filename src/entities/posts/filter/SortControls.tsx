import { PostSort, usePostsFilters } from '@features/posts/model';

const SortControls = () => {
  const { sort, setSort } = usePostsFilters();

  const handleSortChange = (value: PostSort) => {
    setSort(value);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-foreground/70">Sort by:</span>
      <div className="border-border bg-background-secondary inline-flex overflow-hidden rounded-full border text-xs">
        <button
          type="button"
          onClick={() => handleSortChange('new')}
          className={`cursor-pointer px-3 py-1.5 transition ${
            sort === 'new'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/70 hover:bg-background'
          }`}
        >
          Newest
        </button>
        <button
          type="button"
          onClick={() => handleSortChange('popular')}
          className={`cursor-pointer px-3 py-1.5 transition ${
            sort === 'popular'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/70 hover:bg-background'
          }`}
        >
          Most viewed
        </button>
      </div>
    </div>
  );
};

export default SortControls;
