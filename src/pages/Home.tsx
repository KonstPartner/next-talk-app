'use client';

import { Posts } from '@features/posts/ui';
import { Loader } from '@features/shared/ui';

const Home = () => {
  return (
    <section className="container">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Posts</h1>
      <Loader>
        <Posts />
      </Loader>
    </section>
  );
};

export default Home;
