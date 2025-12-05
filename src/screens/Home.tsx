'use client';

import { PostsSection } from '@features/posts/ui';
import { Loader } from '@features/shared/ui';

const Home = () => {
  return (
    <section className="container">
      <h1 className="text-foreground text-2xl font-bold">Posts</h1>
      <Loader>
        <PostsSection />
      </Loader>
    </section>
  );
};

export default Home;
