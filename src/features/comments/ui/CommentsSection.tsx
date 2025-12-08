'use client';

import { useSuspenseComments } from '@features/comments/api/hooks';
import CreateComment from '@features/comments/ui/CreateComment';
import { Loader } from '@features/shared/ui';
import { CommentCard } from '@entities/comments';

type CommentsSectionProps = {
  postId: number;
};

const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const { comments } = useSuspenseComments(postId);

  return (
    <section className="mt-10">
      <h2 className="text-foreground mb-3 text-lg font-semibold">Comments</h2>
      <Loader>
        <CreateComment postId={postId} />
      </Loader>

      {comments.length ? (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <p className="text-foreground/60 text-sm">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
    </section>
  );
};

export default CommentsSection;
