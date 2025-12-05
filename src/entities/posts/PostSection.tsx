import { Eye } from 'lucide-react';

import { useSuspensePost } from '@features/posts/api';
import { ToggleReaction } from '@features/posts/ui';
import { useTagMap } from '@features/tags/model';
import { ImagePlaceholder } from '@entities/posts';

const PostSection = ({ id }: { id: number }) => {
  const { data: post } = useSuspensePost(id);
  const { tagMap } = useTagMap();

  const tags = post.tagIds.map((cid) => tagMap.get(cid)).filter(Boolean);

  return (
    <section className="container py-10">
      <article className="bg-background-secondary border-border mx-auto w-full max-w-3xl rounded-2xl border px-5 py-7 shadow-sm">
        <header className="border-border/70 mb-6 border-b pb-4">
          <ImagePlaceholder />
          <h1 className="text-foreground mb-2 text-3xl leading-tight font-bold">
            {post.title}
          </h1>

          <div className="text-foreground/60 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>
          </div>
        </header>

        <div className="prose prose-sm text-foreground/90 prose-p:mb-4 prose-p:leading-relaxed dark:prose-invert max-w-none">
          <p>{post.body}</p>
        </div>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag!.id}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag!.name}
              </span>
            ))}
          </div>
        )}

        <footer className="border-border/70 mt-8 border-t pt-4">
          <div className="flex items-center gap-10">
            <ToggleReaction post={post} />
          </div>
        </footer>
      </article>
    </section>
  );
};

export default PostSection;
