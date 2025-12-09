'use client';

import { Search as SearchIcon } from 'lucide-react';

import { usePostsFilters } from '@features/posts/model';
import type { Tag } from '@features/tags/model/types';
import SearchControls from '@entities/posts/filter/SearchControls';
import SortControls from '@entities/posts/filter/SortControls';
import TagsControls from '@entities/posts/filter/TagsControls';
import { Button } from '@entities/shared';

export const PostFilters = ({ tags }: { tags: Tag[] }) => {
  const { applyFilters } = usePostsFilters();

  return (
    <section className="flex flex-col gap-6 p-3">
      <div className="flex grow flex-col gap-3">
        <SearchControls />
        {tags.length > 0 && <TagsControls tags={tags} />}
        <Button
          type="button"
          onClick={applyFilters}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mx-auto mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-1 py-2 text-xs font-medium transition sm:px-4 md:w-1/3"
        >
          <SearchIcon className="h-4 w-4" />
          <p>Search</p>
        </Button>
      </div>
      <div className="flex justify-end">
        <SortControls />
      </div>
    </section>
  );
};

export default PostFilters;
