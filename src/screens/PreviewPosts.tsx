import { PreviewPost } from '@features/posts/model';
import { jsonPlaceholderApi } from '@features/shared/model';
import { PreviewPostCard } from '@entities/posts';

const PreviewPosts = async () => {
  const posts = await jsonPlaceholderApi<PreviewPost[]>('/posts', {
    next: { revalidate: 60 },
  });

  return (
    <section className="container">
      <h1 className="text-foreground text-2xl font-bold">Preview Posts</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PreviewPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PreviewPosts;
