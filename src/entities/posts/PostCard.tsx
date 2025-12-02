import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Post } from '@features/posts/model';
import ImagePlaceholder from '@entities/posts/ImagePlaceholder';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="border-border bg-background-secondary cursor-pointer overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md">
      <ImagePlaceholder />

      <div className="p-6">
        <h2 className="text-foreground mb-3 text-2xl font-semibold">
          {post.title}
        </h2>

        <p className="text-foreground/80 mb-5 line-clamp-4 text-base">
          {post.body}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-foreground/70 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <ThumbsUp className="text-icon h-4 w-4" />
            {post.reactions.likes}
          </div>

          <div className="flex items-center gap-1">
            <ThumbsDown className="text-icon h-4 w-4" />
            {post.reactions.dislikes}
          </div>

          <div className="flex items-center gap-1">
            <Eye className="text-icon h-4 w-4" />
            {post.views}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
