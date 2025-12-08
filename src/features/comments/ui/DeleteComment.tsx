import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useDeleteComment } from '@features/comments/api';
import { PostComment } from '@features/comments/model';
import { Post } from '@features/posts/model';
import { ConfirmDialog } from '@entities/shared';

const DeleteComment = ({
  comment,
  postId,
}: {
  comment: PostComment;
  postId: Post['id'];
}) => {
  const { user } = useAuth();
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(postId);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    if (!user || user.id !== comment.userId) {
      return;
    }

    await deleteComment(comment.id);
    setOpenConfirm(false);
    toast.success('Comment has been deleted');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenConfirm(true)}
        disabled={isDeleting}
        className="text-foreground/60 flex cursor-pointer items-center gap-1 hover:text-red-500 disabled:cursor-not-allowed"
        title="Delete comment"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      <ConfirmDialog
        open={openConfirm}
        title="Delete comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteComment;
