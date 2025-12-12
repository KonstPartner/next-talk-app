'use client';

import { useCallback, useEffect, useState } from 'react';

import { getPostEndpoint } from '@features/posts/api';
import { PreviewPost } from '@features/posts/model';
import { localApi } from '@features/shared/model';
import { PreviewPostCard } from '@entities/posts';

const RANDOM_MIN_ID = 1;
const RANDOM_MAX_ID = 50;
const INTERVAL_MS = 10_000;

const getRandomId = () =>
  Math.floor(Math.random() * (RANDOM_MAX_ID - RANDOM_MIN_ID + 1)) +
  RANDOM_MIN_ID;

const RandomPost = () => {
  const [post, setPost] = useState<PreviewPost | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const load = useCallback(async () => {
    const id = getRandomId();

    const data = await localApi<PreviewPost>(getPostEndpoint(id), {
      cache: 'no-store',
    });

    setPost(data);
    setAnimationKey(Date.now());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (cancelled) {
        return;
      }

      await load();
    };

    run();

    const timer = setInterval(run, INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [load]);

  if (!post) {
    return null;
  }

  return (
    <div key={animationKey} className="animate-slide-in-out">
      <PreviewPostCard post={post} />
    </div>
  );
};
export default RandomPost;
