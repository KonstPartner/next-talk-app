import { Eye } from 'lucide-react';
import Link from 'next/link';

import { Post } from '@features/posts/model';
import { PostOptions, ToggleReaction } from '@features/posts/ui';
import { useTagMap } from '@features/tags/model';
import ImagePlaceholder from '@entities/posts/ImagePlaceholder';

const PostCard = ({ post }: { post: Post }) => {
  const { tagMap } = useTagMap();

  const tags = post.tagIds.map((id) => tagMap.get(id)).filter(Boolean);

  return (
    <article className="border-border bg-background-secondary overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md">
      <Link href={`/posts/${post.id}`} aria-label={`Open post: ${post.title}`}>
        <ImagePlaceholder />
      </Link>
      <div className="flex items-end justify-between p-6">
        <div>
          <h2 className="text-foreground mb-3 text-2xl font-semibold">
            {post.title}
          </h2>
          <p className="text-foreground/80 mb-5 line-clamp-4 text-base">
            {post.body}
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag!.id}
                className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
              >
                {tag!.name}
              </span>
            ))}
          </div>
          <div className="text-foreground/70 flex items-center gap-6 text-sm">
            <ToggleReaction post={post} />

            <div className="flex items-center gap-1">
              <Eye className="text-icon h-4 w-4" />
              {post.views}
            </div>
          </div>
        </div>

        <PostOptions post={post} />
      </div>
    </article>
  );
};

export default PostCard;
