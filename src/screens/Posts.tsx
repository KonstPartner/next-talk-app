'use client';

import dynamic from 'next/dynamic';

import { Loader } from '@features/shared/ui';

const PostsSection = dynamic(() => import('@features/posts/ui/PostsSection'), {
  ssr: false,
});

const Posts = () => {
  return (
    <section className="container">
      <h1 className="text-foreground text-2xl font-bold">Posts</h1>
      <Loader>
        <PostsSection />
      </Loader>
    </section>
  );
};

export default Posts;
