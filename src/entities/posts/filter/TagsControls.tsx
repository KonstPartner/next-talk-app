'use client';

import { usePostsFilters } from '@features/posts/model';
import { Tag } from '@features/tags/model';
import { TagSelector } from '@features/tags/ui';

const TagsControls = ({ tags }: { tags: Tag[] }) => {
  const { selectedTagIds, toggleTagDraft } = usePostsFilters();

  return (
    <TagSelector
      tags={tags}
      selectedTagIds={selectedTagIds}
      onToggle={toggleTagDraft}
      label="Search by tags"
      className="bg-background-secondary"
    />
  );
};

export default TagsControls;
