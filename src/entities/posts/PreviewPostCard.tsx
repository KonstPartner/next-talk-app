import { PreviewPost } from '@features/posts/model';
import ImagePlaceholder from '@entities/posts/ImagePlaceholder';

const PreviewPostCard = ({ post }: { post: PreviewPost }) => {
  return (
    <article className="border-border bg-background-secondary overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md">
      <ImagePlaceholder />

      <div className="p-6">
        <h2 className="text-foreground mb-3 text-2xl font-semibold">
          {post.title}
        </h2>

        <p className="text-foreground/80 mb-4 text-base">{post.body}</p>
      </div>
    </article>
  );
};

export default PreviewPostCard;
