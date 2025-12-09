'use client';

import { UserCircle2 } from 'lucide-react';

import { useAuth } from '@features/auth/model';
import type { PostComment } from '@features/comments/model/types';
import { DeleteComment, LikeComment } from '@features/comments/ui';
import { useSuspenseUser } from '@features/users/api';

const CommentCard = ({
  comment,
  postId,
}: {
  comment: PostComment;
  postId: number;
}) => {
  const { user: currentUser } = useAuth();
  const { user: author } = useSuspenseUser(comment.userId);

  return (
    <article className="border-border bg-background-secondary flex gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm">
      <div className="bg-primary/10 text-primary mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        <UserCircle2 className="h-5 w-5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-foreground text-xs font-medium">
          {author?.username ?? 'User'}
        </span>

        <p className="text-foreground/90 text-sm leading-relaxed">
          {comment.body}
        </p>
      </div>

      <div className="text-foreground/60 flex flex-col items-center justify-end gap-3 text-[11px]">
        {currentUser?.id === comment.userId && (
          <DeleteComment comment={comment} postId={postId} />
        )}
        <LikeComment comment={comment} postId={postId} />
      </div>
    </article>
  );
};

export default CommentCard;
