import { usePostsFilters } from '@features/posts/model';
import { Input } from '@entities/shared';

const SearchControls = () => {
  const { searchDraft, setSearchDraft } = usePostsFilters();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
      <div className="flex-1">
        <label
          htmlFor="post-search"
          className="text-foreground/70 mb-1 block text-xs font-medium"
        >
          Search by title
        </label>
        <Input
          id="post-search"
          type="text"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          placeholder="Type to search…"
          className="bg-background-secondary"
        />
      </div>
    </div>
  );
};

export default SearchControls;
