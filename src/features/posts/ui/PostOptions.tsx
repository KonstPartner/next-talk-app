import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { useAuth } from '@features/auth/model';
import { useDeletePost } from '@features/posts/api';
import { Post } from '@features/posts/model';
import { ConfirmDialog } from '@entities/shared';

const PostOptions = ({ post }: { post: Post }) => {
  const { user } = useAuth();
  const { mutateAsync: deletePost, isPending } = useDeletePost();

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = async () => {
    await deletePost(post.id);
    setOpenConfirm(false);
    toast.success('Post has been deleted');
  };

  return (
    <div>
      {user && user.id === post.userId && (
        <div className="flex flex-col gap-3">
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-background/80 text-foreground/70 hover:bg-background hover:text-foreground cursor-pointer rounded-md p-2 shadow transition"
            title="Edit post"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpenConfirm(true)}
            className="bg-background/80 hover:bg-background cursor-pointer rounded-md p-2 text-red-500/80 shadow transition hover:text-red-500"
            aria-label="Delete post"
            title="Delete post"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <ConfirmDialog
        open={openConfirm}
        title="Delete post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel={isPending ? 'Deleting…' : 'Delete'}
        onCancel={() => !isPending && setOpenConfirm(false)}
        onConfirm={() => !isPending && handleDelete()}
      />
    </div>
  );
};

export default PostOptions;
