'use client';

import { PostSort } from '@features/posts/model';

type SortToggleProps = {
  value: PostSort;
  onChange: (value: PostSort) => void;
};

const SortToggle = ({ value, onChange }: SortToggleProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h1 className="text-foreground text-2xl font-bold">Posts</h1>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-foreground/70">Sort by:</span>
        <div className="border-border bg-background-secondary inline-flex overflow-hidden rounded-full border text-xs">
          <button
            type="button"
            onClick={() => onChange('new')}
            className={`cursor-pointer px-3 py-1.5 transition ${
              value === 'new'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/70 hover:bg-background'
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => onChange('popular')}
            className={`cursor-pointer px-3 py-1.5 transition ${
              value === 'popular'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/70 hover:bg-background'
            }`}
          >
            Most viewed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortToggle;
