'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { Tag } from '@features/tags/model';

type TagSelectorProps = {
  tags: Tag[];
  selectedTagIds: number[];
  onToggle: (id: number) => void;
  label?: string;
  helperText?: string;
  className?: string;
};

const TagSelector = ({
  tags,
  selectedTagIds,
  onToggle,
  label = 'Tags',
  helperText,
  className,
}: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTags = useMemo(
    () => tags.filter((t) => selectedTagIds.includes(t.id)),
    [tags, selectedTagIds]
  );

  const selectedCount = selectedTagIds.length;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-foreground/70 mb-1 block text-xs font-medium">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`border-border bg-background text-foreground/85 transition, flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-xs font-medium ${className}`}
      >
        <span className="text-foreground/40">
          Tags
          {selectedCount > 0 && (
            <span className="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold">
              {selectedCount} selected
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="text-foreground/70 h-4 w-4" />
        ) : (
          <ChevronDown className="text-foreground/70 h-4 w-4" />
        )}
      </button>

      {!isOpen && selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => onToggle(tag.id)}
              className="border-primary/60 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10 cursor-pointer rounded-full border px-3 py-1 text-[11px] font-medium"
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = selectedTagIds.includes(tag.id);

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => onToggle(tag.id)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background-secondary text-foreground/80 hover:border-primary/60 hover:text-foreground'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      )}

      {helperText && <p className="text-foreground/60 text-xs">{helperText}</p>}
    </div>
  );
};

export default TagSelector;
