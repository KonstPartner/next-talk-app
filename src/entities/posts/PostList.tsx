import { Post } from '@features/posts/model';
import PostCard from '@entities/posts/PostCard';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
