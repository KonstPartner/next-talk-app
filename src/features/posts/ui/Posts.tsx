'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfinitePosts } from '@features/posts/api';
import { PostSort } from '@features/posts/model';
import { PostList } from '@entities/posts';
import { SortToggle } from '@entities/posts/';

const Posts = () => {
  const [sort, setSort] = useState<PostSort>('new');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(sort);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      hasTriggeredRef.current = false;
    }
  }, [isFetchingNextPage]);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mx-auto w-5/6 lg:w-4/6">
      <SortToggle value={sort} onChange={setSort} />

      {posts.length === 0 && (
        <div className="text-foreground/60">No posts yet.</div>
      )}

      {posts.length > 0 && <PostList posts={posts} />}

      {hasNextPage && (
        <div
          ref={ref}
          className="text-foreground/60 flex h-12 w-full items-center justify-center"
        >
          {!isFetchingNextPage && <span>Scroll to load more…</span>}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="text-foreground/60 py-6 text-center">
          Loading more...
        </div>
      )}
    </div>
  );
};

export default Posts;
