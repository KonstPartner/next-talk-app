import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useCreateComment } from '@features/comments/api/hooks';
import { Post } from '@features/posts/model';
import CommentForm from '@entities/comments/CommentForm';
import { Button } from '@entities/shared';

const CreateComment = ({ postId }: { postId: Post['id'] }) => {
  const router = useRouter();
  const { user } = useAuth();

  const { mutateAsync: createComment, isPending: isCreating } =
    useCreateComment(postId);

  const handleCreate = async (body: string) => {
    if (!user) {
      toast.info('Please sign in to add a comment');
      router.push('/login');

      return;
    }

    await createComment({
      postId,
      body,
      userId: user.id,
    });

    toast.success('Comment has been added');
  };

  return (
    <div>
      {user ? (
        <CommentForm onSubmit={handleCreate} isSubmitting={isCreating} />
      ) : (
        <div className="border-border bg-background-secondary mb-4 flex items-center justify-between rounded-xl border px-4 py-3 text-xs">
          <span className="text-foreground/70">Sign in to add a comment.</span>
          <Button
            type="button"
            onClick={() => router.push('/login')}
            className="cursor-pointer px-3 py-1 text-xs"
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
