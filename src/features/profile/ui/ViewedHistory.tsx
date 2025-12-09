'use client';

import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import {
  useClearViewedHistory,
  useViewedPostsHistory,
} from '@features/posts/api/hooks';
import { AuthRedirectSection } from '@entities/auth';
import { PostList } from '@entities/posts';
import { Button } from '@entities/shared';

const ViewedHistory = () => {
  const { user } = useAuth();
  const { posts } = useViewedPostsHistory();
  const { mutateAsync: clearHistory, isPending } = useClearViewedHistory();

  const handleClear = async () => {
    await clearHistory();
    toast.success('Viewing history has been cleared');
  };

  if (!user) {
    return <AuthRedirectSection message="view your profile" />;
  }

  return (
    <section className="border-border bg-background-secondary rounded-xl border px-4 py-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-foreground text-lg font-semibold">Viewed posts</h2>

        {posts.length > 0 && (
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer px-3 py-1 text-xs"
            disabled={isPending}
            onClick={handleClear}
          >
            {isPending ? 'Clearing…' : 'Clear history'}
          </Button>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-foreground/60 text-sm">
          You haven&apos;t viewed any posts yet.
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </section>
  );
};

export default ViewedHistory;
