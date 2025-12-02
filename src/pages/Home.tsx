import { PostList } from '@entities/posts';

const Home = () => {
  return (
    <div className="w-full">
      <section className="container">
        <h1 className="text-foreground mb-6 text-2xl font-bold">Posts</h1>

        <div className="mx-auto w-4/6">
          <PostList posts={[]} />
        </div>
      </section>
    </div>
  );
};

export default Home;
